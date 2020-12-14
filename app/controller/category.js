'use strict';

const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');
const { getCategoryDetailValidate } = require('../validate/categoryRules')

@Prefix('/nk/category')
class CategoryController extends Controller {
  @Get('/v1/category_detail.do')
  async getCategory() {
    // 获取CMS分类
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
  @Get('/v1/get_product_category.do')
  async getProductCategory() {
    // 获取产品的分类
    const { ctx, service, app } = this;
    try {
      // 定义参数校验规则
      const rules = {
        productTypeCode: { type: 'string', required: true }, // 产品类型
        code: { type: 'string', required: false }, // 产品类型
      };
      // 参数校验
      const valiErrors = app.validator.validate(rules, ctx.query);
      // 参数校验未通过
      if (valiErrors) {
        ctx.helper.fail({ ctx, code: 422, res: valiErrors });
        return;
      }
      const {status, data} = await service.common.category.getProductCategory(ctx.query);
      // 成功之后的响应
      if (status === 200 && data.code === 200) {
        ctx.helper.success({ ctx, code: 200, res: data });
      } else {
        ctx.helper.fail({ ctx, code: 500, res: data.message });
      }
    } catch (e) {
      ctx.logger.error(e);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = CategoryController;
