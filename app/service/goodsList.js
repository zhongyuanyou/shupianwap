"use strict";
const Service = require("egg").Service;
const { productApi } = require('./../../config/serveApi/index');
class goodsListService extends Service {
  /**
   * 获取服务商品数据（POST）
   * @data { Object } data 请求参数
   * @return { Object } 返回请求结果数据
   */
  async getGoodsList(data) {
    return new Promise(async resolve => {
      const { ctx, app, service } = this;
      const sysCode = app.config.apiClient.APPID[1];
      const address = productApi.getServeList;
      const url = ctx.helper.assembleUrl(sysCode, address);
      if (!url) {
        resolve({ ctx, code: 202, res: '缺少后端服务请求API路径' });
      }
      try {
        // 忽略fegin校验条件
        ctx.headers['X-User-Agent'] = '4b43c3f3-d817-4576-95b1-ad8519a2f14e';
        let params = JSON.parse(JSON.stringify(data))
        delete params.needTypes
        const result = await service.curl.curlPost(url, params);
        resolve(result);
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = goodsListService;
