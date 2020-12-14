/**
 * @Description: 本模块用于交易资源详情各项数据查询
 * @author zhaoDongMing
 * @date
 */
'use strict';
const Controller = require('egg').Controller;
const { Get, Prefix } = require('egg-shell-decorators');
const { productApi } = require('./../../config/serveApi/index');
const rules = require('../validate/tcProduct');

@Prefix('/nk/tc_product')
class TcProductController extends Controller {
  @Get('/v1/detail.do')
  async getTcProductDetail() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getTcProductDetail(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.getTcProductDetail
    );
    const {
      productId, // 产品ID
      fieldDetail = 1, // 字段详情  0不需要(默认) 1需要
      costDetail = 0, // 成本详情  0不需要(默认) 1需要
      originalData = 0, // 脱敏字段原数据  0不需要(默认) 1需要
      classifyConfig = 0, // 交易资源分类配置  0不需要(默认) 1需要
    } = ctx.query;
    const { status, data } = await service.curl.curlPost(url, {
      id: productId,
      fieldDetail,
      costDetail,
      originalData,
      classifyConfig,
    });
    if (status === 200 && data.code === 200) {
      // 假如不需要加载服务项目,直接返回产品详情
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = TcProductController;
