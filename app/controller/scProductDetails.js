'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/sc_product')
class ScProductDetailsController extends Controller {
  @Get('/v1/detail.do')
  getScProductDetail() {
    // 获取服务产品详情
    const { ctx, service, app } = this;

  }
}
module.exports = ScProductDetailsController;
