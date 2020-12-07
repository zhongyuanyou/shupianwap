/** @Author: MaLiang
 * @Date: 2020-12-03 15:11:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 15:11:00
 * @Description: wap端首页接口
 * @FilePath: /chips-wap/app/controller/home.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { contentApi } = require("../../config/serveApi/index");
const { Get, Prefix, Post } = require("egg-shell-decorators");

// 获取广告列表
const getBannerList = async (ctx, service, locationCodeList) => {
    try {
        return await service.common.banner.getAdList(locationCodeList);
    } catch (error) {
        ctx.logger.error(error);
    }
};

@Prefix("/nk/home")
class homeController extends Controller {
    /**
     * 查询首页首屏数据（广告、导航）
     */
    @Post("/v1/get_home_data.do")
    async findAdNav() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            locationCodeList: { type: "array", required: true }, // 广告编码
            fixedNavCategoryCode: { type: "string", required: true }, // 固定导航分类编码
            fixedNavPlatformCode: { type: "string", required: true }, // 固定导航平台code
            fixedLimit: { type: "integer", required: true }, // 固定导航每页条数
            fixedPage: { type: "integer", required: true }, // 固定导航当前页
            rollNavCategoryCode: { type: "string", required: true }, // 滚动导航分类编码
            rollNavPlatformCode: { type: "string", required: true }, // 滚动导航平台code
            rollLimit: { type: "integer", required: true }, // 滚动导航每页条数
            rollPage: { type: "integer", required: true }, // 滚动导航当前页
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 获取广告
        const findBanner = getBannerList(
            ctx,
            service,
            ctx.request.body.locationCodeList
        );
        const includeField = "id,imageUrl,name,url,wapRoute"; // 字段筛选过滤
        const navUrl = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findNav
        );
        // 获取固定导航数据
        const findFixedNav = service.curl.curlGet(navUrl, {
            method: "GET",
            data: {
                categoryCode: ctx.request.body.fixedNavCategoryCode,
                platformCode: ctx.request.body.fixedNavPlatformCode,
                limit: ctx.request.body.fixedLimit,
                page: ctx.request.body.fixedPage,
                includeField,
            },
        });
        // 获取滚动导航数据
        const findRollNav = service.curl.curlGet(navUrl, {
            method: "GET",
            data: {
                categoryCode: ctx.request.body.rollNavCategoryCode,
                platformCode: ctx.request.body.rollNavPlatformCode,
                limit: ctx.request.body.rollLimit,
                page: ctx.request.body.rollPage,
                includeField,
            },
        });
        const reqArr = [findBanner, findFixedNav, findRollNav];
        try {
            const resData = await Promise.all(reqArr);
            let advertising = {}; // 广告数据
            let fixedNavList = []; // 固定导航数据
            let rollNavList = []; // 滚动导航数据
            // 广告数据处理
            if (resData[0].code === 200) {
                advertising = resData[0].data;
            }
            // 固定导航数据处理
            if (resData[1].data.code === 200) {
                fixedNavList = resData[1].data.data;
            }
            // 滚动导航数据处理
            if (resData[2].data.code === 200) {
                rollNavList = resData[2].data.data;
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    advertising,
                    fixedNavList,
                    rollNavList,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
    /**
     * 查询首页非首屏数据（站点、广告、资讯、推荐交易商品）
     */
    @Post("/v1/get_home_asyn_data.do")
    async findHomeAsynData() {
        const { ctx, service } = this;
        // 定义参数校验规则
        const rules = {
            locationCodeList: { type: "array", required: true }, // 广告编码
            infoLimit: { type: "integer", required: true }, // 资讯每页数量
            infoPage: { type: "integer", required: true }, // 资讯当前页
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 获取站点
        const findCity = service.common.city.getCityList();
        // 获取广告
        const findBanner = getBannerList(
            ctx,
            service,
            ctx.request.body.locationCodeList
        );
        // 获取资讯（调公用接口）
        const findInformation = service.common.banner.getAdList(
            ctx.request.body.locationCodeList
        );
        const reqArr = [findCity, findBanner, findInformation];
        try {
            const resData = await Promise.all(reqArr);
            let cityList = []; // 站点数据
            let advertising = {}; // 广告数据
            let information = []; // 资讯数据
            // 站点数据处理
            if (resData[0].code === 200) {
                cityList = resData[0].data;
            }
            // 广告数据处理
            if (resData[1].code === 200) {
                advertising = resData[1].data;
            }
            // 资讯数据处理
            if (resData[2].code === 200) {
                information = resData[2].data;
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    cityList,
                    advertising,
                    information,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = homeController;
