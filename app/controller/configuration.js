/**
 * @author zky
 * @since 2020/12/24
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/user')
class ConfigurationController extends Controller {
  @Get('/v1/configuration.do')
  async configuration() {
    // 查询用户配置
    const { ctx, service, app } = this;
    const rules = {
      code: { type: 'string', required: true },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const params = {
      code: ctx.query.code,
    };
    const res = await service.common.userConfig.getUserConfig(params);
    if (res.code === 200) {
      ctx.helper.success({
        ctx,
        code: 200,
        res: res.data,
      });
    } else {
      ctx.logger.error(res.code, res.message);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = ConfigurationController;
