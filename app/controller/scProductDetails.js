'use strict';
const Controller = require('egg').Controller;
const { Post, Get, Prefix } = require('egg-shell-decorators');
const { productApi } = require('./../../config/serveApi/index');
const rules = require('./../validate/scProductDetails');

@Prefix('/nk/sc_product')
class ScProductDetailsController extends Controller {
  // 获取服务产品详情
  @Post('/v1/detail.do')
  async getScProductDetail() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductDetail(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const detailUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.productDetail
    );
    // 获取到请求的Url
    const serviceUrl = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.serviceItemList
    );
    // 发送httpClient请求
    const scProParams = Object.assign({}, ctx.request.body);
    // 删除商品ID
    delete scProParams.commodityId;
    // 删除是否加载服务项目
    delete scProParams.serviceItem;
    const { status, data } = await service.curl.curlPost(detailUrl, scProParams);
    if (status === 200 && data.code === 200) {
      // 产品详情获取成功时,获取产品对应的服务项目
      if (ctx.request.body.serviceItem === true) {
        const serviceResult = await service.curl.curlPost(serviceUrl, {
          classCode: data.data.classId,
        });
        if (serviceResult.status === 200 && serviceResult.data.code === 200) {
          const resData = data.data;
          resData.serviceItem = serviceResult.data.data.records;
          ctx.helper.success({ ctx, code: 200, res: resData });
        } else {
          ctx.logger.error(status, data);
          ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
        }
      } else {
        // 假如不需要加载服务项目,直接返回产品详情
        ctx.helper.success({ ctx, code: 200, res: data.data });
      }
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  // 获取服务产品服务项
  @Get('/v1/service_Items.do')
  async getScProductServiceItems() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductServiceItem(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.serviceItemList
    );
    const { status, data } = await service.curl.curlPost(url, ctx.query);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
  // 获取服务产品属性
  @Get('/v1/attr_list.do')
  async getScProductAttrList() {
    const { ctx, service, app } = this;
    // 参数校验
    const valiErrors = rules.getScProductAttrList(this);
    // 参数校验未通过
    if (valiErrors) {
      ctx.helper.fail({ ctx, code: 422, res: valiErrors });
      return;
    }
    // 获取到请求的Url
    const url = ctx.helper.assembleUrl(
      app.config.apiClient.APPID[1],
      productApi.skuAttrClassName
    );
    const { status, data } = await service.curl.curlPost(url, ctx.query);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = ScProductDetailsController;
