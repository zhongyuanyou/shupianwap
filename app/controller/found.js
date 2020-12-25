/**
 * @author zky
 * @since 2020/12/2
 */
"use strict";
const Controller = require("egg").Controller;
const { Get, Prefix } = require("egg-shell-decorators");
const { contentApi } = require("./../../config/serveApi/index");
const { infoList, infoDetail, screenData } = require("../validate/found");
let information_class = []; // 资讯分类
let information_banner = []; // 资讯banner
let information_list = []; // 资讯列表
const getInformation = async function (
    service,
    bannerApi,
    listApi,
    locationCode,
    categoryCode,
    ctx,
    isInit
) {
    // 请求分类下的广告数据
    const getBanner = service.curl.curlPost(bannerApi, {
        locationCodeList: locationCode,
    });
    // 请求分类下的列表数据
    const getList = service.curl.curlGet(listApi, {
        categoryCode,
        limit: 10,
        page: 1,
    });
    const reqAll = [getBanner, getList];
    try {
        const initAllRes = await Promise.all(reqAll);
        // 广告数据处理
        if (
            initAllRes[0].code === 200 &&
            initAllRes[0].data &&
            Array.isArray(initAllRes[0].data)
        ) {
            information_banner = initAllRes[0].data || [];
        }
        // 资讯列表处理
        if (
            initAllRes[1].code === 200 &&
            initAllRes[1].data &&
            Array.isArray(initAllRes[1].data.rows)
        ) {
            information_list = initAllRes[1].data.rows;
        }
        const resData = isInit
            ? {
                  information_class,
                  information_banner,
                  information_list,
              }
            : {
                  information_banner,
                  information_list,
              };
        ctx.helper.success({
            ctx,
            code: 200,
            res: resData,
        });
    } catch (error) {
        ctx.logger.error(error);
        ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
    }
};
const getValiErrors = function (app, ctx, rules, data) {
    // 参数校验
    const valiErrors = app.validator.validate(rules, data);
    // 参数校验未通过
    if (valiErrors) {
        ctx.helper.fail({ ctx, code: 422, res: valiErrors });
        return;
    }
};
@Prefix("/nk/information")
class FoundController extends Controller {
    @Get("/v1/home.do")
    async home() {
        // 获取首屏数据，不需要传参
        const { ctx, app, service } = this;
        const url = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findCategoryDetail
        );
        // 获取分类
        const { data } = await service.curl.curlGet(url, {
            code: "con100000",
        });
        // 若获取分类请求正常返回数据
        const childList = data.childrenList || [];
        if (childList.length) {
            childList.forEach((item) => {
                delete item.childrenList;
            });
        }
        information_class = childList;
        const bannerApi = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findAdList
        );
        const listApi = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findPage
        );
        await getInformation(
            service,
            bannerApi,
            listApi,
            new Array("ad100026"),
            information_class[0].code,
            ctx,
            true
        );
    }

    @Get("/v1/list.do")
    async list() {
        // 获取资讯列表
        const { ctx, service, app } = this;
        getValiErrors(app, ctx, infoList, ctx.query);
        // 参数校验通过,正常响应
        const { limit = 10, page = 1, categoryCode, keyword } = ctx.query;
        const url = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findPage
        );
        const { data } = await service.curl.curlGet(url, {
            limit,
            page,
            categoryCode,
            keyword,
        });
        ctx.helper.success({
            ctx,
            code: 200,
            res: {
                information_list: data.rows || [],
                totalCount: data.total,
            },
        });
    }

    @Get("/v1/detail.do")
    async detail() {
        // 获取资讯详情
        const { ctx, service, app } = this;
        getValiErrors(app, ctx, infoDetail, ctx.query);
        // 参数校验通过,正常响应
        const { id } = ctx.query;
        const params = {
            id,
        };
        const { data } = await service.common.content.detail(params);
        ctx.helper.success({ ctx, code: 200, res: data });
    }

    @Get("/v1/banner_information.do")
    async information() {
        // 获取每个分类第一屏
        const { ctx, service, app } = this;
        getValiErrors(app, ctx, screenData, ctx.query);
        // 参数校验通过,正常响应
        const { categoryCode } = ctx.query;
        const bannerApi = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findAdList
        );
        const listApi = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.infoList
        );
        await getInformation(
            service,
            bannerApi,
            listApi,
            new Array("ad100026"),
            categoryCode,
            ctx,
            false
        );
    }
}

module.exports = FoundController;
