'use strict';
module.exports = {
  // 获取产品详情参数校验
  getScProductDetail(_this) {
    const { ctx, app } = _this;
    const rules = {
      productId: { type: 'string', required: true },
      commodityId: { type: 'string', required: false },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
};
