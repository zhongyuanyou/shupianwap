/** @Author: zky
 * @Date: 2020-12-25 11:40:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-25 11:40:00
 * @Description: 电话解密
 * @FilePath: /chips-wap/app/controller/decryption.js
 * */
'use strict';

const Controller = require('egg').Controller;
const { Prefix, Post } = require('egg-shell-decorators');
const { dashunApi } = require('../../config/serveApi/index');

@Prefix('/yk/biz_business')
class descryptionController extends Controller {
  @Post('/v1/show_real_phone.do')
  async descryption() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      encryptPhone: { type: 'string', required: true }, // 广告位置code
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    try {
      const url = ctx.helper.assembleUrl(
        app.config.apiClient.APPID[4],
        dashunApi.decryptionPhone
      );
      const params = {
        encryptPhone: ctx.request.body.encryptPhone,
      };
      const res = await service.curl.curlPost(url, params);
      console.log('电话解密', res);
      ctx.helper.success({
        ctx,
        code: 200,
        res: res.data,
      });
    } catch (err) {
      ctx.logger.error(err);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = descryptionController;
