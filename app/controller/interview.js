/** @Author: MaLiang
 * @Date: 2020-12-09 14:29:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 14:29:00
 * @Description: wap端面谈记录页接口
 * @FilePath: /chips-wap/app/controller/interview.js
 * */
"use strict";

const Controller = require("egg").Controller;
const { dashunApi } = require("../../config/serveApi/index");
const { Get, Prefix, Post } = require("egg-shell-decorators");

@Prefix("/nk/interview")
class interviewController extends Controller {
    // 客户查看面谈记录列表
    @Get("/v1/get_interview_list.do")
    async getInterviewList() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
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

        const url = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[4],
            dashunApi.interviewList
        );
        try {
            // 获取面谈记录列表
            const resData = await service.curl.curlGet(url, {
                limit: ctx.query.limit,
                start: ctx.query.page,
            });
            console.log('resData', resData);
            let data =
                resData.code === 200
                    ? resData.data
                    : {
                          totalCount: 0,
                          records: [],
                      };
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

    // 更改面谈状态
    @Post("/v1/update_interview_status.do")
    async updateInterviewStatus() {
        const { ctx, service, app } = this;
        // 定义参数校验规则
        const rules = {
            id: { type: "string", required: true }, // 面谈记录id
            type: { type: "integer", required: true, min: 0, max: 1 }, // 更改状态类型（0：取消面谈 1：面谈完成确认）
        };
        // 参数校验
        const valiErrors = app.validator.validate(rules, ctx.request.body);
        // 参数校验未通过
        if (valiErrors) {
            ctx.helper.fail({ ctx, code: 422, res: valiErrors });
            return;
        }
        let url = "";
        // 取消面谈
        if (ctx.request.body.type === 0) {
            url = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[4],
                dashunApi.interviewCancel
            );
        }
        // 面谈完成确认
        if (ctx.request.body.type === 1) {
            url = ctx.helper.assembleUrl(
                app.config.apiClient.APPID[4],
                dashunApi.interviewConfirm
            );
        }
        try {
            const resData = await service.curl.curlPost(
                `${url}?id=${ctx.request.body.id}`
            );
            if (resData.data.code === 200) {
                ctx.helper.success({
                    ctx,
                    code: 200,
                    res: resData.data.message || "",
                });
            } else {
                ctx.helper.fail({
                    ctx,
                    code: resData.data.code,
                    res: resData.data.message || "",
                });
            }
        } catch (error) {
            ctx.logger.error(error);
            ctx.helper.fail({ ctx, code: 500, res: "后端接口异常！" });
        }
    }
}

module.exports = interviewController;
