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
      attrIds: { type: 'array', required: false }, // 属性id集合
      needAttrVal: { type: 'number', required: false }, // 是否需要属性值集合
      start: { type: 'number', required: false }, // 多少条
      limit: { type: 'number', required: false }, // 多少条
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
  // 获取商品销售的站点
  // 获取产品详情参数校验
  getScProductSite(_this) {
    const { ctx, app } = _this;
    const rules = {
      productGroupId: { type: 'id', required: true }, // 产品组ID
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
  // 获取服务资源
  getServiceResource(_this) {
    const { ctx, app } = _this;
    const rules = {
      classCode: { type: 'string', required: true }, // 产品分类
      searchKey: { type: 'string', required: false }, // 查询内容关键字
      goodsNo: { type: 'string', required: false }, // 资源编码
      goodsPriceStart: { type: 'number', required: false }, // 资源价格-起
      goodsPriceEnd: { type: 'number', required: false }, // 资源价格-止
      fieldList: { type: 'array', required: false }, // 资源字段查询
      withFieldFlg: { type: 'number', required: false }, // 需要详情标志  0不需要(默认) 1需要
      orderBy: { type: 'id', required: false }, // 排序类型  数据字典
      isAsc: { type: 'boolean', required: false }, // 是否是顺序 true顺序(默认)  false 逆序
      page: { type: 'number', required: false }, // 当前页
      limit: { type: 'number', required: false }, // 每页条数
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    return valiErrors;
  },
};
