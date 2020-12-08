"use strict";
const Service = require("egg").Service;
const { contentApi } = require('./../../config/serveApi/index');
class getJyFiltersService extends Service {
  /**
   * 获取交易筛选数据（get）
   * @return { Object } 返回请求结果数据
   */
  async getGetJyFilters() {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[0];
      const address = contentApi.dataDicts;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        const result = await service.curl.curlGet(url, {code: 'CONDITION-QF-SORT'});
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = getJyFiltersService;
