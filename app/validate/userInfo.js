'use strict';
module.exports = {
  // 修改用户信息校验规则
  updateInfo: {
    userId: { type: 'string', required: true }, // 用户id
    type: { type: 'string', required: false }, // 用户类型
    no: { type: 'string', required: false }, // 用户编号
    nickName: { type: 'string', required: false }, // 用户昵称
    fullName: { type: 'string', required: false }, // 姓名
    sex: { type: 'string', required: false }, // 性别
    phone: { type: 'string', required: false }, // 手机号
    status: { type: 'number', required: false }, // 状态
    birthday: { type: 'string', required: false }, // 生日
    email: { type: 'string', required: false }, // 电子邮件
    area: { type: 'string', required: false }, // 区域
    avatar: { type: 'string', required: false }, // 头像地址
  },
  // 查询用户信息校验规则
  dataInfo: {
    userId: { type: 'string', required: true }, // 用户id
  },
};
