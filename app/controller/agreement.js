'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');

@Prefix('/nk/agreement')
class AgreementController extends Controller {
  @Get('/v1/get_agreement_list.do')
  async getAgreement() {
    const { ctx, service, app } = this;
    try {
      // 请求协议列表数据
      const { status, data } = await service.common.content.list({
        categoryCode: 'protocol100000',
        includeField: 'title,content,id', // 需要后端返回的数据
      });
      if (status === 200 && data.code === 200) {
        ctx.helper.success({ ctx, code: 200, res: data.data});
      } else {
        ctx.helper.fail({ ctx, code: 500, res: data.message });
      }
    } catch (e) {
      ctx.logger.error(e);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}

module.exports = AgreementController;
