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
      type,
      value,
    } = ctx.request.body;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], userApi.updateInfo);
    const { status, data } = await service.curl.curlPost(url, {
      type,
      value,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data || {} });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  @Get('/v1/info.do')
  async info() {
    // 查询用户信息
    const { ctx, service, app } = this;
    // 参数校验
    getValiErrors(app, ctx, dataInfo, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], userApi.dataInfo);
    const { status, data } = await service.curl.curlGet(url, {
      id,
    }
    );
    console.log('数据', data);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data || {} });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = MyController;
