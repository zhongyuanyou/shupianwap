'use strict';
const Service = require('egg').Service;
const { contentApi } = require('./../../config/serveApi/index');
class FindDictService extends Service {
  async findDictChild(dictCode) {
    const { ctx, app } = this;
    // 先从redis查询数据字典是否存在,存在直接使用缓存的数据字典
    let dictResult = await ctx.service.redis.get(dictCode);
    if (dictResult) {
      return dictResult;
    }
    // redis不存在则去调用接口请求
    const dictUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.dataDict
    );
    const { code, message, data } = await ctx.service.curl.curlGet(dictUrl, { code: dictCode });
    if (code === 200 && data.length > 0) {
      // 数据获取成功将获取到的数据存入redis
      ctx.service.redis.set(dictCode, data, 60 * 60);
      dictResult = data;
    } else {
      dictResult = [];
      ctx.logger.error(code, message);
    }
    // 接口报错返回空
    return dictResult;
  }
}
module.exports = FindDictService;
