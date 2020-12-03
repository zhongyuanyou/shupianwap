'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/dict/v1')
class DictController extends Controller {
  @Get('/cms_code.do')
  async queryCmsCode() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      categoryCode: { type: 'string', required: false },
      keyword: { type: 'string', required: false },
      limit: { type: 'number', required: true },
      page: { type: 'number', required: true },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    // const { pageNumber = 10, pageSize = 1, id } = ctx.query;
    // const { status, data } = await service.curl.curlAll('/nk/dict/v1/find_list.do', {
    //   method: 'GET',
    //   data: {
    //     pageNumber,
    //     pageSize,
    //     teamId: id,
    //   },
    // });
  }
}

module.exports = DictController;
