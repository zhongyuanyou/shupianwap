'use strict';
const Service = require('egg').Service;
const { productApi } = require('../../../config/serveApi/index');
const { BASE_CACHE_TIME } = require('../../../config/constant/cacheTime');
class tradingProduct extends Service {
  /**
   * @Author: MaLiang
   * 获取交易推荐商品列表服务API（HTTP）
   * @locationCodeList { Array } ids 产品id集合
   * @return { Object } 返回请求结果数据
   */
  async recommendList(ids = []) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[1],
        productApi.getTradingListToIds
      );
      try {
        const result = await service.curl.curlPost(url, {
          ids,
          fieldDetail: 1, // 字段详情  0不需要(默认) 1需要
        });
        resolve({
          code: result.code,
          message: result.message,
          data: result.data || [],
        });
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }

  /**
   * @Author: MaLiang
   * 批量查询交易产品分类详情（HTTP）
   * @codes { Array } 产品分类code列表
   * @return { Object } 返回请求结果数据
   */
  async getClassfiyDetail(codes) {
    if (codes && codes.length) {
      codes = JSON.stringify(codes);
    }
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      try {
        const cacheKey = ctx.helper.cacheKey(ctx.method, ctx.path, codes);
        const cacheData = await service.redis.get(cacheKey);
        if (cacheData) {
          resolve(cacheData);
        } else {
          const url = ctx.helper.assembleUrl(
            app.config.apiClient.APPID[1],
            productApi.getJyClassfiyDetails
          );
          const result = await service.curl.curlPost(url, codes);
          if (result.code === 200 && result.data.length) {
            // 缓存数据
            service.redis.set(cacheKey, result, BASE_CACHE_TIME);
          }
          resolve(result);
        }
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = tradingProduct;
