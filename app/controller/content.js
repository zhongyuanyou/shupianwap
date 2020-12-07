'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');
const { getContentListValidate } = require('../validate/contentRules');
@Prefix('/yk/content')
class ContentController extends Controller {
  @Get('/v1/content_list.do')
  async getContentList () {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const valiErrors = getContentListValidate(this)
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const sysCode = app.config.apiClient.APPID[0];
    const address = contentApi.findPage;
    const url = ctx.helper.assembleUrl(sysCode, address);
    ctx.query.limit = ctx.query.limit ? ctx.query.limit : 10
    ctx.query.page = ctx.query.page ? ctx.query.page : 10
    const { status, data } = await service.curl.curlAll(url, {
      method: 'GET',
      data: ctx.query,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = ContentController
