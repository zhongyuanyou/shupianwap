/*
 * @Author: xiao pu
 * @Date: 2020-12-03 15:34:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-26 15:42:45
 * @Description: file content
 * @FilePath: /chips-wap/app/controller/login.js
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');
const { userApi, contentApi } = require('./../../config/serveApi/index');

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

@Prefix('/nk/login/v1')
class LoginController extends Controller {
  @Post('/login.do')
  async login() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      accountChannel: { type: 'string', required: true },
      userType: { type: 'string', required: true },
      client: { type: 'string', required: true },
      platformType: { type: 'string', required: true },
      dataJson: { type: 'object', required: true },
      imgCaptcha: { type: 'string', required: false },
    };

    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    // 需要图形验证的
    const { imgCaptcha } = this.ctx.request.body;
    if (imgCaptcha) {
      const isSuccess = service.common.verificationCode.checkCaptcha(
        imgCaptcha
      );
      if (!isSuccess) {
        ctx.helper.fail({
          ctx,
          code: 422,
          res: {},
          detailMessage: '图形验证失败',
        });
        return;
      }

      ctx.request.body.dataJson = Object.assign({}, ctx.request.body.dataJson, {
        picVerify: true,
      });
    }

    Object.assign(ctx.headers, { sysCode: 'crisps-app' });
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[2],
      userApi.login
    );

    const data = await service.curl.curlPost(url, ctx.request.body);

    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data.data || {},
      detailMessage: data.message || '请求失败',
    });
  }

  @Get('/logout.do')
  async logout() {
    const { ctx, service, app } = this;
    const rules = {
      token: { type: 'string', required: true },
      userId: { type: 'string', required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[2],
      userApi.logout
    );
    Object.assign(ctx.headers, { sysCode: 'crisps-app' });
    const data = await service.curl.curlGet(url, ctx.query);
    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data,
      detailMessage: data.message || '请求失败',
    });
  }

  @Post('/register.do')
  async register() {
    // 获取资讯详情
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: 'string', required: true },
      smsCode: { type: 'string', required: true },
      password: { type: 'string', required: true },
      client: { type: 'string', required: true },
      platformType: { type: 'string', required: true },
      userType: { type: 'string', required: true },
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
    Object.assign(ctx.headers, { sysCode: 'crisps-app' });
    const data = await service.curl.curlPost(registerUrl, {
      dataJson: {
        phone,
        password,
        smsCode,
      },
      userType,
      client,
      platformType,
      accountChannel: 'AUTH_PHONE_VERIFY',
    });

    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data || {},
      detailMessage: data.message || '请求失败',
    });
  }

  @Post('/reset.do')
  async reset() {
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: 'string', required: true },
      smsCode: { type: 'string', required: true },
      newPassword: { type: 'string', required: true },
      userType: { type: 'string', required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    // 密码重置
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[3],
      userApi.reset
    );
    Object.assign(ctx.headers, { sysCode: 'crisps-app' });
    const data = await service.curl.curlPost(url, ctx.request.body);

    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data || {},
      detailMessage: data.message || '请求失败',
    });
  }

  @Get('/smsCode.do')
  async smsCode() {
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: 'string', required: true },
      type: ['login', 'register', 'reset', 'default'],
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const { phone, type } = ctx.query;
    const msgTemplateCode = {
      login: 'SMS_TMP_LOGIN', // 登录
      register: 'SMS_TMP_LOGIN', // 注册
      reset: 'USER_FORGET_PASS', // 重置密码
      default: 'SMS_TMP_USER', // 只是获取验证码
    }[type];

    Object.assign(ctx.headers, {
      sysCode: 'crisps-app',
      'Content-Type': 'application/json',
    });
    const data = await service.common.verificationCode.getSmsCode(
      phone,
      null,
      'ORDINARY_USER',
      msgTemplateCode
    );

    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data || {},
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data || {},
      detailMessage: data.message || '请求失败',
    });
  }

  @Post('/check-sms-code')
  async checkSmsCode() {
    const { ctx, service, app } = this;
    const rules = {
      phone: { type: 'string', required: true },
      userId: { type: 'string', required: false },
      userType: { type: 'string', required: true },
      smsCode: { type: 'string', required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;
    const data = await service.common.verificationCode.checkSmsCode(
      ctx.request.body.phone,
      ctx.request.body.userId,
      ctx.request.body.userType,
      ctx.request.body.smsCode
    );
    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data,
      detailMessage: data.message || '请求失败',
    });
  }

  @Post('/account_info.do')
  async accountInfo() {
    const { ctx, service, app } = this;
    const rules = {
      userId: { type: 'string', required: true },
    };
    if (getValiErrors(app, ctx, rules, ctx.request.body)) return;

    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[3],
      userApi.accountInfo
    );
    Object.assign(ctx.headers, { sysCode: 'crisps-app' });
    const data = await service.curl.curlPost(url, ctx.request.body);
    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data,
      detailMessage: data.message || '请求失败',
    });
  }

  @Get('/protocol.do')
  async protocol() {
    const { ctx, service, app } = this;
    const rules = {
      id: { type: 'string', required: false }, // 内容id
      categoryCode: { type: 'string', required: false }, // 分类编码,查询当前分类及其所有启用子类,多个code通过逗号
      includeField: { type: 'string', required: false }, // 必须要输出的内容字段，优先于excludeField，多个字段名称使用,（逗号）连接，默认排除content，需要输出时在此显式声明
    };
    if (getValiErrors(app, ctx, rules, ctx.query)) return;

    const { id, categoryCode, includeField } = ctx.query;
    const params = { id, categoryCode, includeField };
    // const data = await service.common.content.detail(params);
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.infoList
    );
    const data = await service.curl.curlGet(url, params);

    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data,
      detailMessage: data.message || '请求失败',
    });
  }

  // 获取图形验证码
  @Get('/img_code.do')
  async getVerificationImg() {
    const { ctx, service } = this;

    // const data = await service.common.verificationCode.getImgCode();
    const data = service.common.verificationCode.createCaptcha();

    if (data.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: data.data,
      });
      return;
    }
    ctx.helper.fail({
      ctx,
      code: data.code,
      res: data,
      detailMessage: data.message || '请求失败',
    });
  }
}

module.exports = LoginController;
