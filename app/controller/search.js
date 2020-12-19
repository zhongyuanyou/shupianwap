/** @Author: MaLiang
 * @Date: 2020-12-08 09:35:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 09:35:00
 * @Description: wap端搜索页接口
 * @FilePath: /chips-wap/app/controller/search.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { contentApi } = require("../../config/serveApi/index");
const { Get, Prefix, Post } = require("egg-shell-decorators");

@Prefix("/nk/search")
class searchController extends Controller {
    /**
     * 查询站点
     */
    @Get("/v1/find_keyword_list.do")
    async findKeywordList() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            findType: { type: "integer", required: true, min: 0, max: 3 }, // 查询类型 （0：只查推荐（置顶）+ 高亮 1：查询推荐（非高亮） 2：查询热搜 3：查询3中类型的列表数据）
            topLimit: { type: "integer", required: false }, // 查询置顶的每页数量
            topPage: { type: "integer", required: false }, // 查询置顶的当前页
            heightLimit: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
            heightPage: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
            hotLimit: { type: "integer", required: false }, // 查询热搜的每页数量
            hotPage: { type: "integer", required: false }, // 查询热搜的每页数量
            platformCode: { type: "string", required: true }, // 平台
            terminalCode: { type: "string", required: true }, // 终端
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.query);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        const navUrl = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[0],
            contentApi.findKeyword
        );
        const excludeField = "";
        // 查询推荐（置顶） + 高亮
        const findTopHeight = service.curl.curlGet(navUrl, {
            isRecommend: 1,
            isHighlight: 1,
            limit: ctx.query.heightLimit,
            page: ctx.query.heightPage,
            platformCode: ctx.query.platformCode,
            terminalCode: ctx.query.terminalCode,
        });
        // 查询推荐（非高亮）
        const findRecommend = service.curl.curlGet(navUrl, {
            isRecommend: 1,
            isHighlight: 0,
            limit: ctx.query.topLimit,
            page: ctx.query.topPage,
            platformCode: ctx.query.platformCode,
            terminalCode: ctx.query.terminalCode,
        });
        // 查询热搜
        const findHot = service.curl.curlGet(navUrl, {
            isRecommend: 0,
            sortOrder: "allSearchTimes=desc",
            limit: ctx.query.hotLimit,
            page: ctx.query.hotPage,
            platformCode: ctx.query.platformCode,
            terminalCode: ctx.query.terminalCode,
        });
        let reqArr = [];
        let newRules = {};
        switch (ctx.query.findType) {
            case 0:
                // 定义参数校验规则
                newRules = {
                    heightLimit: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
                    heightPage: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
                };
                reqArr = [findTopHeight];
                break;
            case 1:
                // 定义参数校验规则
                newRules = {
                    topLimit: { type: "integer", required: false }, // 查询置顶的每页数量
                    topPage: { type: "integer", required: false }, // 查询置顶的当前页
                };
                reqArr = [findRecommend];
                break;
            case 2:
                // 定义参数校验规则
                newRules = {
                    hotLimit: { type: "integer", required: false }, // 查询热搜的每页数量
                    hotPage: { type: "integer", required: false }, // 查询热搜的每页数量
                };
                reqArr = [findHot];
                break;
            case 3:
                // 定义参数校验规则
                newRules = {
                    topLimit: { type: "integer", required: false }, // 查询置顶的每页数量
                    topPage: { type: "integer", required: false }, // 查询置顶的当前页
                    heightLimit: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
                    heightPage: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
                    hotLimit: { type: "integer", required: false }, // 查询热搜的每页数量
                    hotPage: { type: "integer", required: false }, // 查询热搜的每页数量
                };
                reqArr = [findTopHeight, findRecommend, findHot];
                break;
            default:
        }
        // 参数校验
        const nweValiErrors = app.validator.validate(newRules, ctx.query);
        // 参数校验未通过
        if (nweValiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        const data = {};
        try {
            let topHeightList = []; // 推荐高亮列表
            let topUnHeightList = []; // 推荐非高亮
            let hotList = []; //热搜
            const resData = await Promise.all(reqArr);
            if (ctx.query.findType !== 3 && resData[0].code === 200) {
                topUnHeightList = resData[0].data.rows;
                ctx.helper.success({
                    ctx,
                    code: 200,
                    res: {
                        topUnHeightList,
                    },
                });
                return;
            }
            if (resData[0].code === 200) {
                topHeightList = resData[0].data.rows;
            }
            if (resData[1].code === 200) {
                topUnHeightList = resData[1].data.rows;
            }
            if (resData[2].code === 200) {
                hotList = resData[2].data.rows;
            }
            ctx.helper.success({
                ctx,
                code: 200,
                res: {
                    topHeightList,
                    topUnHeightList,
                    hotList,
                },
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}
module.exports = searchController;
