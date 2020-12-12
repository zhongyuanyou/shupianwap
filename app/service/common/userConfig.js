'use strict';
const Service = require('egg').Service;
const { userApi } = require('../../../config/serveApi/index');
class ConfigService extends Service {
  async getUserConfig(params = {}) {
    // 获取用户规则
    return new Promise(async resolve => {
      const { ctx, app } = this;
      const sysCode = app.config.apiClient.APPID[2];
      const address = userApi.userConfig;
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
}
module.exports = ConfigService;