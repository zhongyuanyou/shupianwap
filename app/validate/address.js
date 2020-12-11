'use strict';
module.exports = {
  // 新增或编辑收货地址校验规则
  newUpdateShippingAddress: {
    userId: { type: 'string', required: true }, // 用户id
    contactName: { type: 'string', required: true }, // 联系人姓名
    phone: { type: 'string', required: true }, // 手机号码
    addressProvince: { type: 'string', required: false }, // 省
    addressCity: { type: 'string', required: false }, // 市
    addressArea: { type: 'string', required: false }, // 区
    address: { type: 'string', required: true }, // 详细地址
    postcode: { type: 'string', required: false }, // 邮政编码
    ext1: { type: 'string', required: false }, // 扩展字段
    ext2: { type: 'string', required: false }, // 扩展字段
    ext3: { type: 'string', required: false }, // 扩展字段
    ext4: { type: 'string', required: false }, // 扩展字段
    ext5: { type: 'string', required: false }, // 扩展字段
    id: { type: 'string', required: false }, // 收货地址
  },
  // 查询收货地址列表校验规则
  listShippingAddress: {
    userId: { type: 'string', required: true }, // 用户id
    limit: { type: 'string', required: false }, // 每页显示条数
    page: { type: 'string', required: false }, // 当前页
  },
  // 查询收货地址详情校验规则
  detailShippingAddress: {
    id: { type: 'string', required: true }, // 收货地址id
  },
  // 删除或设置默认校验规则
  statusShippingAddress: {
    id: { type: 'string', required: true }, // 收货地址id
    userId: { type: 'string', required: false }, // 用户id
  },
};
