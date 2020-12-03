/*
 * @Author: xiao pu
 * @Date: 2020-12-03 15:34:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 20:07:50
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/login.js
 */
"use strict";
const Controller = require("egg").Controller;
const { Get, Post, Prefix } = require("egg-shell-decorators");
const getInformation = async function (
  service,
  api,
  locationCode,
  categoryCode,
  fn
) {
  // 请求分类下的广告数据
  const getBanner = service.curl.curlGet(
    `${api}/crisps-cms-web-api/nk/app/advertising/v1/find_advertising.do`,
    {
      method: "GET",
      data: {
        locationCode,
      },
    }
  );
  // 请求分类下的列表数据
  const getList = service.curl.curlGet(
    `${api}/crisps-cms-web-api/nk/app/content/v1/find_page.do`,
    {
      method: "GET",
      data: {
        categoryCode,
        type: "资讯",
        limit: 10,
        page: 1,
        platformCode: "薯片",
      },
    }
  );
  const reqAll = [getBanner, getList];
  try {
    const initAllRes = await Promise.all(reqAll);
    console.log(initAllRes);
    fn();
  } catch (error) {
    console.log(error);
  }
};
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

    const { status, data } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/user-auth/nk/api/auth/v1/login.do`,
      ctx.request.body
    );

    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
    }
  }

  @Get("/logout.do")
  async logout() {
    const { ctx, service, app } = this;
    const rules = {
      token: { type: "string", required: true },
      userId: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const { status, data } = await service.curl.curlGet(
      `${ctx.app.config.baseUrl}/user-auth/nk/api/auth/v1/login_out.do`,
      ctx.query
    );
    if (status === 200 && data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: {},
      });
    }
  }

  @Get("/register.do")
  async register() {
    // 获取资讯详情
    const { ctx, service, app } = this;
    const rules = {
      account: { type: "string", required: true },
      smsCode: { type: "string", required: true },
      password: { type: "string", required: true },
      accountType: { type: "string", required: true },
      userType: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;
    // 参数校验通过,正常响应
    const {
      account,
      smsCode,
      password,
      accountType,
      userType,
    } = ctx.request.body;

    // 先验证手机的验证码
    const {
      smsStatus,
      smsdata,
    } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/nk/api/sms/v1/verify_sms_code.do`,
      { smsCode, phone: account }
    );

    // todo 异常处理是否得当
    if (smsStatus !== 200 || smsdata.code !== 200) {
      ctx.helper.fail({ ctx, code: 422, res: smsdata.message || "验证码有误" });
      return;
    }

    // 用户注册
    const {
      registerStatus,
      registerdata,
    } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/nk/api/register/v1/register_user.do`,
      { account, password, accountType, userType }
    );

    if (registerStatus === 200 || registerdata.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: registerdata.data || {},
      });
      return;
    }
  }

  @Get("/reset.do")
  async reset() {
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: "string", required: true },
      smsCode: { type: "string", required: true },
      newPassword: { type: "string", required: true },
      accountType: { type: "string", required: true },
      userType: { type: "string", required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    // 密码重置
    const {
      status,
      data,
    } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/nk/api/account/v1/reset_password_by_user_id.do`,
      { account, password, accountType, userType }
    );

    if (status === 200 || data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
  }
}

module.exports = LoginController;
