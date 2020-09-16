'use strict';
const Service = require('egg').Service;
const qs = require('querystring');

class DemoService extends Service {
  async list(id) {
    const { ctx } = this;
    const queryString = qs.stringify({
      pageNumber: 1,
      pageSize: 10,
      teamId: id,
    });
    const result = await ctx.curl(`http://yapi.dgg.cn/mock/9/api/user?${queryString}`, {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });
    return result;
  }
}
module.exports = DemoService;
