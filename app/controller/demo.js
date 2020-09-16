'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const { ctx, service, app } = this;
    // 定义参数校验规则
    const rules = {
      id: { type: 'id', required: true },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.query);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 参数校验通过,正常响应
    const result = await service.demo.list(ctx.query.id);
    if (result.status) {
      ctx.helper.success({ ctx, code: 200, res: {
        userList: result.data.data.userList,
        total: result.data.data.total,
      } });
    } else {
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = UserController;
