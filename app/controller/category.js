/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/category/v1')

class CategoryController extends Controller {
  @Post('/product_category.do')
  async category() {
    // 查询产品分类
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      locationCode: { type: 'string', required: false },
      isRecommend: { type: 'number', required: true },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    if (ctx.query.locationCode) {
      // 若有locationCode参数，则需获取广告数据
    }
  }
}

module.exports = CategoryController;
