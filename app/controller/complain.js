/*
 * @Author: xiao pu
 * @Date: 2020-12-04 13:53:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-04 14:43:11
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/complain.js
 */

"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");

const getValiErrors = function (app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return true;
  }
  return false;
};

const cmsTestUrl = "https://dchipswg.dgg.net:443";

@Prefix("/yk/complain/v1")
class ComplainController extends Controller {
  @Post("/add.do")
  async add() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      content: { type: "string", required: true }, // 查找我的规划师有用
      feedbackTypeId: { type: "string", required: true },
      userId: { type: "string", required: true },
      imgs: { type: "string", required: false },
      platformCode: { type: "string", required: false },
      platformName: { type: "string", required: false },
      terminalCode: { type: "string", required: false },
      terminalName: { type: "string", required: false },
    };

    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    const { status, data } = await service.curl.curlPost(
      //   `${ctx.app.config.baseUrl}/crisps-cms-web-api/nk/app/feedback/v1/add.do`,
      `${cmsTestUrl}/crisps-cms-web-api/nk/app/feedback/v1/add.do`,
      ctx.request.body
    );

    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }

    ctx.helper.fail({
      ctx,
      code: status,
      res: data,
      detailMessage: data.message || "请求失败",
    });
  }

  @Get("/detail.do")
  async detail() {
    const { ctx, service, app } = this;
    const rules = {
      id: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const { status, data = {} } = await service.curl.curlGet(
      `${ctx.app.config.baseUrl}`, // todo 后台Java地址没有确定
      ctx.query
    );
    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: status,
      res: data,
      detailMessage: data.message || "请求失败",
    });
  }
}

module.exports = ComplainController;
