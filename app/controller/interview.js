/** @Author: MaLiang
 * @Date: 2020-12-09 14:29:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 14:29:00
 * @Description: wap端面谈记录页接口
 * @FilePath: /chips-wap/app/controller/interview.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { contentApi } = require("../../config/serveApi/index");
const { Get, Prefix, Post } = require("egg-shell-decorators");

@Prefix("/nk/interview")
class interviewController extends Controller {
    @Get("/v1/get_interview_list.do")
    async getInterviewList() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            categoryCode: { type: "string", required: true }, // 分类code
            platformCode: { type: "string", required: true }, // 平台code
            limit: { type: "integer", required: true }, // 每页条数
            page: { type: "integer", required: true }, // 当前页
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
            contentApi.findNav
        );
        try {
            // 获取面谈记录列表
            const resData = await service.curl.curlGet(navUrl, {
                categoryCode: ctx.query.categoryCode,
                platformCode: ctx.query.platformCode,
                limit: ctx.query.limit,
                page: ctx.query.page,
            });
            let data = resData.data.code === 200 ? resData.data.data : {};
            ctx.helper.success({
                ctx,
                code: 200,
                res: data,
            });
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = interviewController;
