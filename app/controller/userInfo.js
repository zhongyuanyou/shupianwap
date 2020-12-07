/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');
const { userApi } = require('./../../config/serveApi/index');
const {
  updateInfo,
  dataInfo,
} = require('../validate/userInfo');
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
    // 参数校验
    getValiErrors(app, ctx, updateInfo, ctx.request.body);
    // 参数校验通过,正常响应
    const {
      id,
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
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], userApi.updateInfo);
    const { status, data } = await service.curl.curlPost(url, {
      method: 'POST',
      data: {
        id,
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
    // 参数校验
    getValiErrors(app, ctx, dataInfo, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.request.body;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], userApi.dataInfo);
    const { status, data } = await service.curl.curlGet(url, {
      method: 'GET',
      data: {
        id,
      },
    }
    );
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    }
  }
}
module.exports = MyController;
