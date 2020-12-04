/*
 * @Author: xiao pu
 * @Date: 2020-12-03 15:34:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-04 10:43:09
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/login.js
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

  @Post("/register.do")
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
    const verifySmsResult = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/nk/api/sms/v1/verify_sms_code.do`,
      { smsCode, phone: account }
    );

    // todo 异常处理是否得当
    if (
      !verifySmsResult ||
      verifySmsResult.status !== 200 ||
      !verifySmsResult.data ||
      verifySmsResult.data.code !== 200
    ) {
      ctx.helper.fail({
        ctx,
        code: 422,
        res: verifySmsResult.data.message || "验证码有误",
      });
      return;
    }

    // 用户注册
    const {
      status,
      data = {},
    } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/nk/api/register/v1/register_user.do`,
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
    const { status, data = {} } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/nk/api/account/v1/reset_password_by_user_id.do`,
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
      code: status,
      res: data,
      detailMessage: data.message || "请求失败",
    });
  }
}

module.exports = LoginController;
