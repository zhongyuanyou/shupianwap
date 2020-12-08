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
            findType: { type: "integer", required: true }, // 查询类型 （0：只查推荐（置顶）+ 高亮 1：查询推荐（非高亮） 2：查询热搜 3：查询3中类型的列表数据）
            topLimit: { type: "integer", required: false }, // 查询置顶的每页数量
            topPage: { type: "integer", required: false }, // 查询置顶的当前页
            heightLimit: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
            heightPage: { type: "integer", required: false }, // 查询置顶+高亮的每页数量
            hotLimit: { type: "integer", required: false }, // 查询热搜的每页数量
            hotPage: { type: "integer", required: false }, // 查询热搜的每页数量
            platformCode: { type: "string", required: false }, // 平台
            terminalCode: { type: "string", required: false }, // 终端
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
        });
        // 查询推荐（非高亮）
        const findRecommend = service.curl.curlGet(navUrl, {
            isRecommend: 1,
            isHighlight: 0,
            limit: ctx.query.topLimit,
            page: ctx.query.topPage,
        });
        // 查询热搜
        const findHot = service.curl.curlGet(navUrl, {
            isRecommend: 0,
            sortOrder: "allSearchTimes=desc",
            limit: ctx.query.hotLimit,
            page: ctx.query.hotPage,
        });
        let reqArr = [];
        switch (ctx.query.findType) {
            case 0:
                reqArr = [findTopHeight];
                break;
            case 1:
                reqArr = [findRecommend];
                break;
            case 2:
                reqArr = [findHot];
                break;
            case 3:
                reqArr = [findTopHeight, findRecommend, findHot];
                break;
            default:
                reqArr = [findTopHeight, findRecommend, findHot];
        }
        const data = {};
        try {
            const resData = await Promise.all(reqArr);
            if (
                ctx.query.findType !== 3 &&
                resData[0].status === 200 &&
                resData[0].data.code === 200
            ) {
                data.rows = resData[0].data.data.rows;
                data.currentPage = resData[0].data.data.currentPage;
                data.total = resData[0].data.data.total;
                data.pageSize = resData[0].data.data.pageSize;
                data.totalPage = resData[0].data.data.totalPage;
                ctx.helper.success({
                    ctx,
                    code: 200,
                    res: data,
                });
                return;
            }
            let topHeightList = {}; // 推荐高亮列表
            let topUnHeightList = {}; // 推荐非高亮
            let hotList = {}; //热搜
            if (resData[0].status === 200 && resData[0].data.code === 200) {
                topHeightList.rows = resData[0].data.data.rows;
                topHeightList.currentPage = resData[0].data.data.currentPage;
                topHeightList.total = resData[0].data.data.total;
                topHeightList.pageSize = resData[0].data.data.pageSize;
                topHeightList.totalPage = resData[0].data.data.totalPage;
            }
            if (resData[1].status === 200 && resData[1].data.code === 200) {
                topUnHeightList.rows = resData[1].data.data.rows;
                topUnHeightList.currentPage = resData[1].data.data.currentPage;
                topUnHeightList.total = resData[1].data.data.total;
                topUnHeightList.pageSize = resData[1].data.data.pageSize;
                topUnHeightList.totalPage = resData[1].data.data.totalPage;
            }
            if (resData[2].status === 200 && resData[2].data.code === 200) {
                hotList.rows = resData[2].data.data.rows;
                hotList.currentPage = resData[2].data.data.currentPage;
                hotList.total = resData[2].data.data.total;
                hotList.pageSize = resData[2].data.data.pageSize;
                hotList.totalPage = resData[2].data.data.totalPage;
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
