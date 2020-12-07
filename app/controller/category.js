'use strict';

const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { getCategoryDetailValidate } = require('../validate/categoryRules')

@Prefix('/nk/category')
class CategoryController extends Controller {
  @Get('/v1/category_detail.do')
  async getCategory() {
    const { ctx, service } = this;
    // 进行参数校验
    const valiErrors = getCategoryDetailValidate(this)
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const { status, data } = await service.common.category.getCategoryDetail(ctx.query.code, ctx.query.id)
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = CategoryController;
