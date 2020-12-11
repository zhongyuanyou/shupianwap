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
};
