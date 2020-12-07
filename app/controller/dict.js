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
    const valiErrors = app.validator.validate(rules.queryCmsCode, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    const { code } = ctx.query;
    const sysCode = app.config.apiClient.APPID[0];
    const host = ctx.helper.getUrl(sysCode);
    const address = contentApi.dataDict;
    const url = `${host}/${address}`;
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
    const valiErrors = app.validator.validate(rules.queryCmsCodes, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    const { codes } = ctx.query;
    const sysCode = app.config.apiClient.APPID[0];
    const host = ctx.helper.getUrl(sysCode);
    const address = contentApi.dataDicts;
    const url = `${host}/${address}`;
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
