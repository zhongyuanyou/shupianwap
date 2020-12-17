'use strict';
const Service = require('egg').Service;
const { contentApi } = require('../../../config/serveApi/index');
class InformationService extends Service {
  /**
   * @author xyg
   * 获取内容列表服务API（GET）
   * @params { Object } 参数
   */
  async list(params = {}) {
    // 列表
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[0];
      const address = contentApi.findPage;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlGet(url, params);
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
  /**
   * @author xyg
   * 获取内容详情API（GET）
   * @params { Object } 参数
   */
  async detail(params = {}) {
    // 详情
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[0];
      const address = contentApi.infoDetail;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const res = await service.curl.curlGet(url, params);
        resolve(res);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = InformationService;
