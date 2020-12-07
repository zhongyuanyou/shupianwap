'use strict';
const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');

@Prefix('/yk/demo')
class UserController extends Controller {

  @Get('/v1/get_test')
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
    const { pageNumber = 10, pageSize = 1, id } = ctx.query;
    const { status, data } = await service.curl.curlAll('http://172.16.136.109:7001/service/nk/login/v1/logout.do', {
      method: 'get',
      data: {
        pageNumber,
        pageSize,
        teamId: id,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {
        userList: data.data.userList,
        total: data.data.total,
      } });
    } else {
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  @Post('/v1/post_test')
  async toList() {
    const { ctx, app } = this;
    // 定义参数校验规则
    const rules = {
      id: { type: 'id', required: true },
    };
    // 参数校验
    const valiErrors = app.validator.validate(rules, ctx.request.body);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    const { status, data } = await ctx.service.demo.list(ctx.request.body.id);
    // 成功之后的响应
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {
        userList: data.data.userList,
        total: data.data.total,
      } });
    } else {
      ctx.helper.fail({ ctx, code: 500, res: data.message });
    }
  }
}
module.exports = UserController;
