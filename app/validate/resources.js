'use strict';
module.exports = {
  //  智企资源表单提交验证规则
  zqSubscribe: {
    customerNumber: { type: 'string', required: true }, // 联系方式
    searchText: { type: 'string', required: true }, // 用户输入的关键词
    msgSourceChannel: { type: 'string', required: true }, // 消息来源渠道
    customerSourceChannel: { type: 'string', required: true }, // 客户来源渠道
    sourceAddr: { type: 'string', required: true }, // 来源地址
    customerName: { type: 'string', required: false }, // 客户名称
    consultationContent: { type: 'string', required: false }, // 咨询内容
    web: { type: 'string', required: false }, // 平台code
  },
};
