'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const { ctx, service } = this;
    ctx.body = await service.user.list(ctx.query.id);
  }
}
module.exports = UserController;
