/** @Author: MaLiang
 * @Date: 2020-12-08 14:47:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 14:47:00
 * @Description: wap端帮助中心页接口
 * @FilePath: /chips-wap/app/controller/help.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { Get, Prefix } = require("egg-shell-decorators");

// 获取文章列表
const getarticleList = async (ctx, service, params) => {
    try {
        return await service.common.content.list(params);
    } catch (error) {
        ctx.logger.error(error);
    }
};

@Prefix("/nk/help")
class helpController extends Controller {
    @Get("/v1/find_help_data.do")
    async findInit() {
        const { ctx, service, app } = this;
        let rules = {
            findType: { type: "integer", required: true, min: 0, max: 1 }, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
        };
        // 参数校验
        const firstValiErrors = app.validator.validate(rules, ctx.query);
        // 参数校验未通过
        if (firstValiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        if (ctx.query.findType === 0) {
            // 定义页面初始化参数校验规则
            rules = {
                locationCode: { type: "string", required: true }, // 广告位code
                code: { type: "string", required: true }, // 获取分类列表选项的code
                limit: { type: "integer", required: true }, // 查询文章的每页条数
                page: { type: "integer", required: true }, // 查询文章的当前页
            };
        }
        if (ctx.query.findType === 1) {
            // 检索查询文章
            rules = {
                categoryCode: { type: "string", required: true }, // 分类code筛选文章
                limit: { type: "integer", required: true }, // 查询文章的每页条数
                page: { type: "integer", required: true }, // 查询文章的当前页
                keyword: { type: "string", required: false }, // 关键词搜索文章
            };
        }
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.query);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        // 只查询文章列表
        if (ctx.query.findType === 1) {
            try {
                const articleResData = await getarticleList({
                    categoryCode: ctx.query.categoryCode,
                    limit: ctx.query.limit,
                    page: ctx.query.page,
                    keyword: ctx.query.keyword,
                });
                if (articleResData.data.code === 200) {
                    ctx.helper.success({
                        ctx,
                        code: 200,
                        res: {
                            rows: articleResData.data.data.rows,
                            total: articleResData.data.data.total,
                        },
                    });
                }
            } catch (error) {
                ctx.logger.error(error);
                ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
            }
            return;
        }

        // 获取帮助中心广告
        const adData = service.common.banner.getAdList(ctx.query.locationCode);
        // 获取帮助中心分类
        const categoryData = service.common.category.getCategoryDetail(
            ctx.query.code
        );
        const reqArr = [adData, categoryData];
        try {
            const resData = await Promise.all(reqArr);
            let adListData = [];
            let categoryList = []; // 分类数据
            let articleData = {}; // 文章数据
            if (resData[0].code === 200) {
                adListData = resData[0].data || [];
            }
            if (resData[1].data.code === 200) {
                categoryList = resData[1].data.data || [];
            }
            if (categoryList.length) {
                // 获取文章列表
                const articleRes = await getarticleList({
                    categoryCode: categoryList[0].code,
                    limit: ctx.query.limit,
                    page: ctx.query.page,
                });
                if (articleRes.data.code === 200) {
                    articleData.rows = articleRes.data.data.rows;
                    articleData.total = articleRes.data.data.total;
                }
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    adListData,
                    categoryList,
                    articleData,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = helpController;
