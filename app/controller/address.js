/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');
const { userApi } = require('./../../config/serveApi/index');
const {
  newUpdateShippingAddress,
  listShippingAddress,
  detailShippingAddress,
  statusShippingAddress,
} = require('../validate/address');
const getValiErrors = function(app, ctx, rules, data) {
  // 参数校验
  const valiErrors = app.validator.validate(rules, data);
  // 参数校验未通过
  if (valiErrors) {
    ctx.helper.fail({ ctx, code: 422, res: valiErrors });
    return;
  }
};

@Prefix('/yk/address')

class AddressController extends Controller {
  @Post('/v1/add_shipping_address.do')
  async addAndUpdate() {
    // 新增或编辑地址
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, newUpdateShippingAddress, ctx.request.body);
    // 参数校验通过,正常响应
    const {
      userId,
      contactName,
      phone,
      addressProvince,
      addressCity,
      addressArea,
      address,
      postcode,
      defaultAddress,
      ext1,
      ext2,
      ext3,
      ext4,
      ext5,
    } = ctx.request.body;
    const ads = ctx.request.body.id ? userApi.updateShippingAddress : userApi.newShippingAddress;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], ads);
    const params = ctx.request.body.id ? {
      userId,
      contactName,
      phone,
      province: addressProvince,
      city: addressCity,
      area: addressArea,
      defaultAddress,
      address,
      postcode,
      ext1,
      ext2,
      ext3,
      ext4,
      ext5,
      id: ctx.request.body.id,
    } : {
      userId,
      contactName,
      phone,
      province: addressProvince,
      city: addressCity,
      area: addressArea,
      defaultAddress,
      address,
      postcode,
      ext1,
      ext2,
      ext3,
      ext4,
      ext5,
    };
    const { status, data } = await service.curl.curlPost(url, params);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data || {} });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  @Get('/v1/shipping_address_list.do')
  async list() {
    // 查询收货地址列表
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, listShippingAddress, ctx.query);
    // 参数校验通过,正常响应
    const { userId } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], userApi.listShippingAddress);
    const { status, data } = await service.curl.curlGet(url, {
      userId,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data || [] });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  @Get('/v1/shipping_address_info.do')
  async info() {
    // 查询收货地址详情
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, detailShippingAddress, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3], userApi.detailShippingAddress);
    const { status, data } = await service.curl.curlGet(url, {
      id,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data || {} });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }

  @Get('/v1/del_address')
  async del() {
    // 删除收货地址
    const { ctx, service, app } = this;
    // 定义参数校验规则
    getValiErrors(app, ctx, statusShippingAddress, ctx.request.body);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[3],
      userApi.delShippingAddress);
    const { status, data } = await service.curl.curlGet(url, { id });
    console.log('详情detail', data);
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: data.data || {} });
    } else {
      ctx.logger.error(status, data);
      ctx.helper.fail({ ctx, code: 500, res: '后端接口异常！' });
    }
  }
}
module.exports = AddressController;
