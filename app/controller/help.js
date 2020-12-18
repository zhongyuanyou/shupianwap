/** @Author: MaLiang
 * @Date: 2020-12-08 14:47:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 14:47:00
 * @Description: wap端帮助中心页接口
 * @FilePath: /chips-wap/app/controller/help.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { Post, Prefix } = require("egg-shell-decorators");

// 获取文章列表
const getarticleList = async (ctx, service, params) => {
    try {
        return await service.common.content.list(params);
    } catch (err) {
        ctx.logger.error(err);
    }
};

@Prefix("/nk/help")
class helpController extends Controller {
    @Post("/v1/find_help_data.do")
    async findInit() {
        const { ctx, service, app } = this;
        let rules = {
            findType: { type: "integer", required: true, min: 0, max: 1 }, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
        };
        // 参数校验
        const firstValiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (firstValiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        if (ctx.request.body.findType === 0) {
            // 定义页面初始化参数校验规则
            rules = {
                locationCode: { type: "string", required: true }, // 广告位code
                code: { type: "string", required: true }, // 获取分类列表选项的code
                limit: { type: "integer", required: true }, // 查询文章的每页条数
                page: { type: "integer", required: true }, // 查询文章的当前页
                platformCode: { type: "string", required: true }, // 查询文章的平台code
                terminalCode: { type: "string", required: true }, // 查询文章的终端code
                includeField: { type: "string", required: true }, // 查询文章的终端code
            };
        }
        if (ctx.request.body.findType === 1) {
            // 检索查询文章
            rules = {
                categoryCode: { type: "string", required: true }, // 分类code筛选文章
                limit: { type: "integer", required: true }, // 查询文章的每页条数
                page: { type: "integer", required: true }, // 查询文章的当前页
                keyword: { type: "string", required: false }, // 关键词搜索文章
                keywordField: { type: "string", required: false }, // 关键词搜索文章
                platformCode: { type: "string", required: true }, // 查询文章的平台code
                terminalCode: { type: "string", required: true }, // 查询文章的终端code
                includeField: { type: "string", required: true }, // 查询文章的终端code
            };
        }
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }

        let cacheData = {
            adListData: [], // 广告数据
            categoryList: [], // 分类数据
            articleData: [], // 文章列表数据
        };
        // 只查询文章列表
        if (ctx.request.body.findType === 1) {
            try {
                const articleResData = await getarticleList(ctx, service, {
                    categoryCode: ctx.request.body.categoryCode,
                    limit: ctx.request.body.limit,
                    page: ctx.request.body.page,
                    platformCode: ctx.request.body.platformCode,
                    terminalCode: ctx.request.body.terminalCode,
                    keyword: ctx.request.body.keyword,
                    keywordField: ctx.request.body.keywordField,
                    includeField: ctx.request.body.includeField,
                });
                if (articleResData.code === 200) {
                    cacheData.articleData = articleResData.data.rows;
                    ctx.helper.success({
                        ctx,
                        code: 200,
                        res: cacheData,
                    });
                }
            } catch (error) {
                ctx.logger.error(error);
                ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
            }
            return;
        }

        // 获取帮助中心广告
        const params = [ctx.request.body.locationCode];
        const adData = service.common.banner.getAdList(params);
        // 获取帮助中心分类
        const categoryData = service.common.category.getCategoryDetail(
            ctx.request.body.code
        );
        const reqArr = [adData, categoryData];
        try {
            const resData = await Promise.all(reqArr);
            if (resData[0].code === 200) {
                cacheData.adListData =
                    resData[0].data[ctx.request.body.locationCode]
                        .sortMaterialList || [];
            }
            if (resData[1].code === 200) {
                cacheData.categoryList = resData[1].data
                    ? resData[1].data.childrenList
                    : [];
            }
            if (cacheData.categoryList.length) {
                // 获取文章列表
                const articleRes = await getarticleList(ctx, service, {
                    categoryCode: cacheData.categoryList[0].code,
                    limit: ctx.request.body.limit,
                    page: ctx.request.body.page,
                    platformCode: ctx.request.body.platformCode,
                    terminalCode: ctx.request.body.terminalCode,
                    includeField: ctx.request.body.includeField,
                });
                console.log(111, articleRes);
                if (articleRes.code === 200) {
                    cacheData.articleData = articleRes.data.rows;
                }
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: cacheData,
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = helpController;
