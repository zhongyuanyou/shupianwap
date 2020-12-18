'use strict';
const Service = require('egg').Service;
const { userApi } = require('../../../config/serveApi/index');
class CodeService extends Service {
  async getSmsCode(phone, userId, userType, msgTemplateCode) {
    // 获取验证码
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[3];
      const address = userApi.getSmsCode;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlPost(url, { phone, userId, userType, msgTemplateCode });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  async checkSmsCode(phone, userId, userType, smsCode) {
    // 校验验证码
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[2];
      const address = userApi.verifySmsCode;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlPost(url, { phone, userId, userType, smsCode });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  async getImgCode() {
    // 获取图形验证码
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[2];
      const address = userApi.imgCode;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlGet(url, {});
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  async checkImgCode(verifyCode) {
    // 校验图形验证码
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[2];
      const address = userApi.verifyImgCode;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlGet(url, { verifyCode });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = CodeService;
