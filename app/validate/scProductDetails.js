'use strict';
module.exports = {
  // 获取产品详情参数校验
  getScProductDetail(_this) {
    const { ctx, app } = _this;
    const rules = {
      productId: { type: 'id', required: true }, // 产品id
      needOperating: { type: 'string', required: false }, // 是否加载运营信息
      needRefConfig: { type: 'string', required: false }, // 是否加载配置规则
      needSkuAttr: { type: 'string', required: false }, // 是否展示sku属性
      needAttr: { type: 'string', required: false }, // 是否展示筛选、商品属性
      needTag: { type: 'string', required: false }, // 是否展示标签
      commodityId: { type: 'string', required: false }, // 商品ID（用于分享时的产品查看）
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    return valiErrors;
  },
};
