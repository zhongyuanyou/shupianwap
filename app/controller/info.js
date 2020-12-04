/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');
const getValiErrors = function(app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return;
  }
};
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
    getValiErrors(app, ctx, rules, ctx.request.body);
    // 参数校验通过,正常响应
    const {
      userId,
      type,
      no,
      nickName,
      fullName,
      sex,
      phone,
      birthday,
      email,
      area,
      avatar,
    } = ctx.request.body;
    const { status, data } = await service.curl.curlPost(
      `${ctx.app.config.baseUrl}/user-auth/yk/user/v1/update_user_info.do`,
      {
        method: 'POST',
        data: {
          userId,
          type,
          no,
          nickName,
          fullName,
          sex,
          phone,
          birthday,
          email,
          area,
          avatar,
        },
      });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {
      } });
    }
  }

  @Get('/v1/info.do')
  async info() {
    // 查询用户信息
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      userId: { type: 'string', required: true }, // 用户id
    };
    // 参数校验
    getValiErrors(app, ctx, rules, ctx.query);
    // 参数校验通过,正常响应
    const { userId, token } = ctx.request.body;
    const { status, data } = await service.curl.curlGet(
      `${ctx.app.config.baseUrl}/user-auth/nk/api/user/v1/find_user_by_id.do`,
      {
        method: 'GET',
        data: {
          userId,
          token,
        },
      }
    );
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {
      } });
    }
  }
}
module.exports = MyController;
