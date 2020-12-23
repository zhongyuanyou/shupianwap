'use strict';
module.exports = {
  // 修改用户信息校验规则
  updateInfo: {
    type: { type: 'string', required: true }, // 类型(1 昵称 2生日 3性别 4电子邮件 5所在地 6姓名)
    value: { type: 'string', required: true }, // 值
  },
  // 查询用户信息校验规则
  dataInfo: {
    userId: { type: 'string', required: true }, // 用户id
  },
};
