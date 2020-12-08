'use strict';
module.exports = {
  // 获取资讯列表校验规则
  infoList: {
    categoryCode: { type: 'string', required: false },
    keyword: { type: 'string', required: false },
    limit: { type: 'number', required: true },
    page: { type: 'number', required: true },
  },
  // 资讯详情校验规则
  infoDetail: {
    id: { type: 'string', required: false },
  },
  // 分类首屏数据校验规则
  screenData: {
    categoryCode: { type: 'string', required: true },
    locationCode: { type: 'string', required: true },
  },
};
