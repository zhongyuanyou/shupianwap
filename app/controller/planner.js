/*
 * @Author: xiao pu
 * @Date: 2020-12-04 10:54:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-04 14:18:45
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/planner.js
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

@Prefix("/nk/planner/v1")
class PlannerController extends Controller {
  @Get("/list.do")
  async list() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      userId: { type: "string", required: false }, // 查找我的规划师有用
      plannerName: { type: "string", required: false },
      region: { type: "string", required: false },
      sort: { type: "number", required: false },
      businessType: { type: "string", required: false },
      client: { type: "string", required: false },
      limit: { type: "number", required: true },
      page: { type: "number", required: true },
    };

    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const { status, data } = await service.curl.curlGet(
      `${ctx.app.config.baseUrl}`, // todo 后台Java地址没有确定
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

module.exports = PlannerController;
