'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { contentApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/dict');

@Prefix('/nk/dict')
class DictController extends Controller {
  @Get('/v1/cms_code.do')
  async queryCmsCode() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.queryCmsCode(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    const { code } = ctx.query;
    // 获取到请求地址
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.dataDict
    );
    // 发送httpClient请求
    const { status, data } = await service.curl.curlAll(url, {
      method: 'GET',
      data: {
        code,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  @Get('/v1/cms_codes.do')
  async queryCmsCodes() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.queryCmsCodes(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    const { codes } = ctx.query;
    // 获取到请求地址
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[0],
      contentApi.dataDicts
    );
    // 发送httpClient请求
    const { status, data } = await service.curl.curlAll(url, {
      method: 'GET',
      data: {
        codes,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = DictController;
