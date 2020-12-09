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
      serviceItem: { type: 'boolean', required: false }, // 是否加载服务项
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    return valiErrors;
  },
  // 获取产品详情参数校验
  getScProductServiceItem(_this) {
    const { ctx, app } = _this;
    const rules = {
      name: { type: 'string', required: false }, // 服务项名称
      serviceCode: { type: 'string', required: false }, // 服务项编码
      classCode: { type: 'string', required: true }, // 产品分类编码
      returnItemValue: { type: 'string', required: false }, // 是否查询服务项值 1:是 0：否 默认为0
      start: { type: 'number', required: false }, // 当前页
      limit: { type: 'number', required: false }, // 多少条
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
  // 获取产品详情参数校验
  getScProductAttrList(_this) {
    const { ctx, app } = _this;
    const rules = {
      attrType: { type: 'string', required: true }, // 属性类型
      productTypeCode: { type: 'string', required: true }, // 产品类型
      classCode: { type: 'string', required: true }, // 产品分类code
      attrIds: { type: 'string', required: false }, // 属性id集合
      needAttrVal: { type: 'number', required: false }, // 是否需要属性值集合
      start: { type: 'number', required: false }, // 多少条
      limit: { type: 'number', required: false }, // 多少条
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
};
