'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const { ctx, service } = this;
    try {
      const result = await service.demo.list(ctx.query.id);
      ctx.helper.success({ ctx, code: 200, res: result });
    } catch (err) {
      ctx.helper.fail({ ctx, code: 500, res: err });
    }
  }
}
module.exports = UserController;
