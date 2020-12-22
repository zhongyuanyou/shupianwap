'use strict';
const Service = require('egg').Service;

class FindRegionService extends Service {
  // async findRegion(code) {
  //   const { ctx } = this;
  //   const result = await ctx.http.get(url, params, {
  //     // 默认将网管处理后的headers给后端服务
  //     headers: ctx.headers,
  //     timeout: 10 * 1000,
  //   });
  //   return result;
  // }
}
module.exports = FindRegionService;
