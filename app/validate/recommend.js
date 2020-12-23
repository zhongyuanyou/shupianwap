'use strict';
module.exports = {
  // 获取推荐数据
  getRecommendPlanner(_this) {
    const { ctx, app } = _this;
    const rules = {
      area: { type: 'string', required: true }, // 区域编码
      deviceId: { type: 'string', required: true }, // 设备ID
      level_2_ID: { type: 'string', required: true }, // 二级产品分类
      login_name: { type: 'string', required: false }, // 规划师ID
      productType: { type: 'string', required: true }, // 产品类型
      sceneId: { type: 'string', required: true }, // 场景ID
      user_id: { type: 'string', required: false }, // 用户ID
      platform: { type: 'string', required: true }, // 平台（app,m,pc）
      page: { type: 'number', required: true }, // 当前页
      limit: { type: 'number', required: true }, // 每页条数
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
  getRecommendProduct(_this) {
    const { ctx, app } = _this;
    const rules = {
      searchType: { type: 'number', required: false }, // 查询类型
      userId: { type: 'string', required: false }, // 用户id
      deviceId: { type: 'string', required: true }, // 设备ID
      formatId: { type: 'string', required: false }, // 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传）
      areaCode: { type: 'string', required: true }, // 区域编码
      sceneId: { type: 'string', required: true }, // 场景ID
      storeId: { type: 'string', required: false }, // 商户ID(只有规划师主页才传)
      productId: { type: 'string', required: false }, // 产品ID（产品详情页必传）
      productType: { type: 'string', required: false }, // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
      title: { type: 'string', required: false }, // 产品名称（产品详情页传、咨询页等）
      platform: { type: 'string', required: true }, // 平台（app,m,pc）
      page: { type: 'number', required: true }, // 每页条数
      limit: { type: 'number', required: true }, // 每页条数
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    return valiErrors;
  },
};
