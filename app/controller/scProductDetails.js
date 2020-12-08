'use strict';
const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');
const { productApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/scProductDetails');

@Prefix('/nk/sc_product')
class ScProductDetailsController extends Controller {
  // 获取服务产品详情
  @Post('/v1/detail.do')
  async getScProductDetail() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductDetail(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.scProductDetail
    );
    // 发送httpClient请求
    const { status, data } = await service.curl.curlPost(url, ctx.request.body);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = ScProductDetailsController;
