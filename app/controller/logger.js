'use strict';
const Controller = require('egg').Controller;

class LoggerController extends Controller {
  async list() {
    const { ctx, service } = this;
    ctx.body = await service.logger.list();
  }
}
module.exports = LoggerController;
