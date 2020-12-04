/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Post, Prefix } = require('egg-shell-decorators');

@Prefix('/yk/user')

class MyController extends Controller {
  @Post('/v1/update.do')
  async update() {
    // 修改个人信息
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
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
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
  }
}
module.exports = MyController;
