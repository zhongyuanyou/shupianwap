'use strict';
const svgCaptcha = require('svg-captcha');

const Service = require('egg').Service;
const { userApi } = require('../../../config/serveApi/index');
class CodeService extends Service {
  async getSmsCode(phone, userId, userType, msgTemplateCode) {
    // 获取验证码
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[3];
      const address = userApi.getSmsCode;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlPost(url, {
          phone,
          userId,
          userType,
          msgTemplateCode,
        });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  async checkSmsCode(phone, userId, userType, smsCode) {
    // 校验验证码
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[3];
      const address = userApi.verifySmsCode;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlPost(url, {
          phone,
          userId,
          userType,
          smsCode,
        });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  async getImgCode() {
    // 获取图形验证码
    return new Promise(async (resolve) => {
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
    return new Promise(async (resolve) => {
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

  /**
   * @description 生成验证码
   * @param {object}} params
   */
  createCaptcha(params = {}) {
    // 验证码配置信息  参考：https://github.com/produck/svg-captcha
    const defaultOptions = {
      size: 4, // 验证码长度(显示几个字符)
      ignoreChars: '0o1i',
      fontSize: 40, // 验证码的字体大小
      width: 85, // 验证码的宽度
      height: 32, // 验证码的高度
      background: '#cc9966', // 验证码的背景颜色
    };
    Object.assign(defaultOptions, params);
    // 第三方插件，实现验证码功能
    const captcha = svgCaptcha.create(defaultOptions);
    // 将验证码text文本保存到全局session中
    this.ctx.session.captcha = captcha.text.toLowerCase();
    return Object.assign(captcha, { code: 200 });
  }

  /**
   * @description 校验生成的图片返回的验证码
   * @param {string} captcha
   */
  checkCaptcha(captcha) {
    return this.ctx.session.captcha === ('' + captcha).toLowerCase();
  }
}
module.exports = CodeService;
