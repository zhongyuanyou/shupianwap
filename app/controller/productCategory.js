/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');

@Prefix('/nk/productCategory')

class ProductCategoryController extends Controller {
  @Post('/v1/product_category.do')
  async category() {
    // 查询产品分类
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      locationCode: { type: 'string', required: false }, // 广告位置编号
      isRecommend: { type: 'number', required: true }, // 1:需要推荐分类 0:不需要推荐分类
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], contentApi.findAdList);
    // 获取广告数据，若有locationCode的情况下
    const getAdvertising = await service.curl.curlPost(url, {
      method: 'POST',
      data: {
        locationCode: ctx.query.locationCode,
      },
    });
    // 参数校验通过,正常响应
    if (ctx.query.locationCode) {
      // 若有locationCode参数，则需获取广告数据
    }
  }
}

module.exports = ProductCategoryController;
