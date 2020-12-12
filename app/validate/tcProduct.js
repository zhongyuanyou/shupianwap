'use strict';
module.exports = {
  // 获取产品详情参数校验
  getTcProductDetail(_this) {
    const { ctx, app } = _this;
    const rules = {
      productId: { type: 'string', required: true }, // 产品id
      fieldDetail: { type: 'number', required: false }, // 字段详情  0不需要(默认) 1需要
      costDetail: { type: 'number', required: false }, // 成本详情  0不需要(默认) 1需要
      originalData: { type: 'number', required: false }, // 脱敏字段原数据  0不需要(默认) 1需要
      classifyConfig: { type: 'number', required: false }, // 交易资源分类配置  0不需要(默认) 1需要
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
};
