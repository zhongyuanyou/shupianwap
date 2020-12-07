'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');
@Prefix('/yk/content')
class ContentListController extends Controller {
  @Get('/v1/content_list.do')
  async getContentList () {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      categoryCode: { type: 'string', required: false },
      categoryId: { type: 'string', required: false },
      keyword: { type: 'string', required: false },
      limit: { type: 'Number', required: false },
      page: { type: 'Number', required: false },
      platformCode: { type: 'string', required: false },
      terminalCode: { type: 'string', required: false },
      sortOrder: { type: 'string', required: false },
      type: { type: 'string', required: false },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const sysCode = app.config.apiClient.APPID[0];
    const host = ctx.helper.getUrl(sysCode);
    const address = contentApi.findPage;
    const url = `${host}/${address}`;
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

module.exports = ContentListController
