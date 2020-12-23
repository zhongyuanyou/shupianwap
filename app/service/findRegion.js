'use strict';
const Service = require('egg').Service;
const { contentApi } = require('./../../config/serveApi/index');
class FindRegionService extends Service {
  async findRegion(code) {
    const { ctx } = this;
    // 有缓存直接使用缓存
    const websiteItem = await ctx.service.redis.get(code);
    if (websiteItem) {
      return websiteItem;
    }
    // 没有缓存调用接口根据code查询站点
    const result = await ctx.http.get(contentApi.findCodeWebsite, { code }, {
      // 默认将网管处理后的headers给后端服务
      headers: ctx.headers,
      timeout: 10 * 1000,
    });
    // 查询到数据返回数据
    if (result.code === 200) {
      const { id, pid, code, name } = result.data;
      ctx.service.redis.set(code, { id, pid, code, name });
      return { id, pid, code, name };
    }
    // 接口报错返回空
    return null;

  }
}
module.exports = FindRegionService;
