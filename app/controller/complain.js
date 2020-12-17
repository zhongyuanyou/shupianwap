/*
 * @Author: xiao pu
 * @Date: 2020-12-04 13:53:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-04 16:54:15
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/complain.js
 */

"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");
const { contentApi } = require("./../../config/serveApi/index");

function getValiErrors(app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return true;
  }
  return false;
}

function getComplainUrl(app, ctx, urlKey) {
  const sysCode = app.config.apiClient.APPID[0];
  const host = ctx.helper.getUrl(sysCode);
  const address = contentApi[urlKey];
  const url = `${host}/${address}`;
  return url;
}

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

    const url = getComplainUrl(app, ctx, "feedbackAdd");

    const { data } = await service.curl.curlPost(url, ctx.request.body);

    ctx.helper.success({
      ctx,
      code: 200,
      res: data,
    });
  }

  @Get("/detail.do")
  async detail() {
    const { ctx, service, app } = this;
    const rules = {
      id: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const url = getComplainUrl(app, ctx, "feedbackDetail");
    const { data = {} } = await service.curl.curlGet(url, ctx.query);
    ctx.helper.success({
      ctx,
      code: 200,
      res: data || {},
    });
  }

  @Get("/list.do")
  async list() {
    const { ctx, service, app } = this;
    const rules = {
      userId: { type: "string", required: true },
      page: { type: "number", required: true },
      limit: { type: "number", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const url = getComplainUrl(app, ctx, "feedbackList");
    const { data = {} } = await service.curl.curlGet(url, ctx.query);
    ctx.helper.success({
      ctx,
      code: 200,
      res: data || {},
    });
  }
}

module.exports = ComplainController;
