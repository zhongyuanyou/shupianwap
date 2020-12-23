'use strict';
const Service = require('egg').Service;
const { contentApi } = require('../../../config/serveApi/index');
const { ADVERT_TIME } = require('../../../config/constant/cacheTime');
class bannerService extends Service {
  /** @Author: MaLiang
   * 获取广告列表服务API（HTTP）
   * @locationCodeList { Array } locationCodeList 广告编码
   * @return { Object } 返回请求结果数据
   */
  async getAdList(locationCodeList = []) {
    return new Promise(async (resolve) => {
      const { ctx, app, service } = this;
      const cacheKey = ctx.helper.cacheKey(
        ctx.method,
        ctx.path,
        locationCodeList
      );
      // 获取缓存的广告数据
      const cacheData = await service.redis.get(cacheKey);
      if (cacheData) {
        // 命中缓存
        resolve(cacheData);
        return;
      }
      const adUrl = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[0],
        contentApi.findAdList
      );
      try {
        const result = await service.curl.curlPost(adUrl, {
          locationCodeList,
        });
        const advertising = {};
        // 广告数据处理
        if (result.code === 200 && result.data.length) {
          result.data.forEach((item) => {
            advertising[item.locationCode] = item;
          });
          // 缓存数据
          service.redis.set(
            cacheKey,
            {
              code: result.code,
              message: result.message,
              data: advertising,
            },
            ADVERT_TIME
          );
        }
        resolve({
          code: result.code,
          message: result.message,
          data: advertising,
        });
      } catch (err) {
        ctx.logger.error(err);
        resolve(ctx.helper.errMessage(err));
      }
    });
  }
}
module.exports = bannerService;
