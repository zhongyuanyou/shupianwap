'use strict';
const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');
const { iesApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/resources');

@Prefix('/nk/resources')
class ResourcesController extends Controller {
    @Post('/v1/zq_subscribe.do')
  async zqSubscribe() {
    const { ctx, service } = this;
    // 参数校验
    const valiErrors = rules.zqSubscribe(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    const url = iesApi.zq_subscribe;
    const { status, data } = await service.curl.curlPost(url, ctx.request.body);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = ResourcesController;
