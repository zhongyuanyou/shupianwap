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
            findType: { type: "integer", required: true }, // 查询类型 （0：只查推荐 1：只查置顶 2：查询置顶加推荐）
            topLimit: { type: "integer", required: false }, // 查询置顶的每页数量
            topPage: { type: "integer", required: false }, // 查询置顶的当前页
            recomLimit: { type: "integer", required: false }, // 查询推荐的每页数量
            recomPage: { type: "integer", required: false }, // 查询推荐的每页数量
            topPage: { type: "integer", required: false }, // 查询置顶的当前页
            platformCode: { type: "string", required: false }, // 平台
            terminalCode: { type: "string", required: false }, // 终端
            sortOrder: { type: "string", required: false }, // 列表排序，多个字段名称使用（;分号）连接，如搜索置顶isTop=desc,如置顶倒序->阅读量倒序isTop=desc;allSearchTimes=desc
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
        // 查询推荐
        const findTop = service.curl.curlGet(navUrl, {
            method: "GET",
            data: {
                isRecommend: 1,
            },
        });
        // 查询热搜
        const findRecommend = service.curl.curlGet(navUrl, {
            method: "GET",
            data: {
                isRecommend: 0,
                sortOrder: "allSearchTimes=desc",
            },
        });
    }
}
module.exports = searchController;
