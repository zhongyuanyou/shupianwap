'use strict';
const Service = require('egg').Service;
const { contentApi } = require('../../../config/serveApi/index');
class InformationService extends Service {
  async list(params = {}) {
    // 列表
    return new Promise(async resolve => {
      const { ctx, app } = this;
      const sysCode = app.config.apiClient.APPID[0];
      const address = contentApi.findPage;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await ctx.curl(url, {
          method: 'GET',
          dataType: 'json',
          headers: ctx.headers,
          data: params,
          timeout: 10 * 1000,
        });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  async detail(id) {
    // 详情
    return new Promise(async resolve => {
      const { ctx, app } = this;
      const sysCode = app.config.apiClient.APPID[0];
      const address = contentApi.infoDetail;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await ctx.curl(url, {
          method: 'GET',
          dataType: 'json',
          headers: ctx.headers,
          data: { id },
          timeout: 10 * 1000,
        });
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = InformationService;
