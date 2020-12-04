'use strict';
const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');
const { iesApi } = require('./../../config/serveApi/index');

@Prefix('/nk/resources')
class ResourcesController extends Controller {
    @Post('/v1/zq_subscribe.do')
  async queryCmsCode() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      customerNumber: { type: 'string', required: true }, // 联系方式
      searchText: { type: 'string', required: true }, // 用户输入的关键词
      msgSourceChannel: { type: 'string', required: true }, // 消息来源渠道
      customerSourceChannel: { type: 'string', required: true }, // 客户来源渠道
      sourceAddr: { type: 'string', required: true }, // 来源地址
      customerName: { type: 'string', required: false }, // 客户名称
      consultationContent: { type: 'string', required: false }, // 咨询内容
      web: { type: 'string', required: false }, // 平台code
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
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
