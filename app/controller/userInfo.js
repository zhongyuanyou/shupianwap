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
    const { data } = await service.curl.curlPost(url, {
      type,
      value,
    });
    ctx.helper.success({ ctx, code: 200, res: data || {} });
  }

  @Get('/v1/info.do')
  async info() {
    // 查询用户信息
    const { ctx, service, app } = this;
    let infoData = null;
    // 参数校验
    getValiErrors(app, ctx, dataInfo, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], userApi.dataInfo);
    const res = await service.curl.curlGet(url, {
      id,
    }
    );
    if (res.code === 200) {
      // 请求文件地址接口
      infoData = res.data;
      const addressUrl = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], userApi.fileAddress);
      const { code, message, data } = await service.curl.curlPost(addressUrl, {
        userId: res.data.id,
        fileType: 'HEAD_NORMAL',
      }
      );
      if (code === 200) {
        infoData.fileId = data.fileId;
        infoData.url = data.url;
        ctx.helper.success({ ctx, code: 200, res: infoData || {} });
      } else {
        ctx.logger.error(code, message);
      }
    } else {
      ctx.logger.error(res.code, res.message);
    }
  }
}
module.exports = MyController;
