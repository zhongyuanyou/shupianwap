/*
 * @Author: xiao pu
 * @Date: 2020-12-03 15:34:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 20:33:04
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/login.js
 */
"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");
const { userApi } = require("./../../config/serveApi/index");

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

@Prefix("/nk/login/v1")
class LoginController extends Controller {
  @Post("/login.do")
  async login() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      accountChannel: { type: "string", required: true },
      userType: { type: "string", required: true },
      client: { type: "string", required: true },
      platformType: { type: "string", required: true },
      dataJson: { type: "object", required: true },
    };

    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;
    Object.assign(ctx.header, { sysCode: "crisps-app" });
    Object.assign(ctx.headers, { sysCode: "crisps-app" });
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[2],
      userApi.login
    );

    const { status, data } = await service.curl.curlPost(url, ctx.request.body);

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
      code: data.code || status,
      res: data.data || {},
      detailMessage: data.message || "请求失败",
    });
  }

  @Get("/logout.do")
  async logout() {
    const { ctx, service, app } = this;
    const rules = {
      token: { type: "string", required: true },
      userId: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[2],
      userApi.logout
    );
    const { status, data } = await service.curl.curlGet(url, ctx.query);
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

  @Post("/register.do")
  async register() {
    // 获取资讯详情
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: "string", required: true },
      smsCode: { type: "string", required: true },
      password: { type: "string", required: true },
      client: { type: "string", required: true },
      platformType: { type: "string", required: true },
      userType: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    const {
      phone,
      password,
      smsCode,
      userType,
      client,
      platformType,
    } = ctx.request.body;
    // 调用java接口的登录接口，进行注册 登录，一把梭
    const registerUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[2],
      userApi.login
    );
    const { status, data = {} } = await service.curl.curlPost(registerUrl, {
      dataJson: {
        phone,
        password,
        smsCode,
      },
      userType,
      client,
      platformType,
      accountChannel: "AUTH_PHONE_VERIFY",
    });

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
      code: data.code || status,
      res: data || {},
      detailMessage: data.message || "请求失败",
    });
  }

  @Post("/reset.do")
  async reset() {
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: "string", required: true },
      smsCode: { type: "string", required: true },
      newPassword: { type: "string", required: true },
      userType: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    // 密码重置
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[2],
      userApi.reset
    );
    const { status, data = {} } = await service.curl.curlPost(
      url,
      ctx.request.body
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
      code: data.code || status,
      res: data || {},
      detailMessage: data.message || "请求失败",
    });
  }

  @Get("/smsCode")
  async smsCode() {
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: "string", required: true },
      type: ["login", "register", "reset"],
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const { phone, type } = ctx.query;
    const msgTemplateCode = {
      login: "SMS_TMP_LOGIN",
      register: "SMS_TMP_LOGIN",
      reset: "USER_FORGET_PASS",
    }[type];

    const { status, data } = await service.common.verificationCode.getSmsCode(
      phone,
      null,
      null,
      msgTemplateCode
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
      code: data.code || status,
      res: data || {},
      detailMessage: data.message || "请求失败",
    });
  }
}

module.exports = LoginController;
