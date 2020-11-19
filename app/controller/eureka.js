'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/eureka')
class EurekaController extends Controller {
  @Get('/v1/get_eureka')
  async index() {
    const { ctx } = this;
    // 获取Eureka的后端节点
    const serverUrl = ctx.helper.getUrl('DGG.TAC.MSGCENTER.PUSH');
    ctx.helper.success({ ctx, code: 200, res: `获得到后端服务节点URL: ${serverUrl}` });
  }
}
module.exports = EurekaController;
