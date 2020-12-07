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
      ext1,
      ext2,
      ext3,
      ext4,
      ext5,
      id = null,
    } = ctx.request.body;
    const ads = id ? userApi.updateShippingAddress : userApi.newShippingAddress;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], ads);
    const params = id ? {
      userId,
      contactName,
      phone,
      addressProvince,
      addressCity,
      addressArea,
      address,
      postcode,
      ext1,
      ext2,
      ext3,
      ext4,
      ext5,
      id,
    } : {
      userId,
      contactName,
      phone,
      addressProvince,
      addressCity,
      addressArea,
      address,
      postcode,
      ext1,
      ext2,
      ext3,
      ext4,
      ext5,
    };
    const { status, data } = await service.curl.curlPost(url, {
      method: 'POST',
      data: params,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {

      } });
    }
  }

  @Get('/v1/shipping_address_list.do')
  async list() {
    // 查询收货地址列表
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, listShippingAddress, ctx.query);
    // 参数校验通过,正常响应
    const { userId, limit, page } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], userApi.listShippingAddress);
    const { status, data } = await service.curl.curlGet(url, {
      method: 'GET',
      data: {
        userId,
        limit,
        page,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {

      } });
    }
  }

  @Get('/v1/shipping_address_info')
  async info() {
    // 查询收货地址详情
    const { ctx, service, app } = this;
    getValiErrors(app, ctx, detailShippingAddress, ctx.query);
    // 参数校验通过,正常响应
    const { id } = ctx.query;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0], userApi.detailShippingAddress);
    const { status, data } = await service.curl.curlGet(url, {
      method: 'GET',
      data: {
        id,
      },
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {

      } });
    }
  }

  @Post('/v1/del_default_address')
  async status() {
    // 删除或将收货地址设为默认
    const { ctx, service, app } = this;
    // 定义参数校验规则
    getValiErrors(app, ctx, statusShippingAddress, ctx.request.body);
    // 参数校验通过,正常响应
    const { id, userId = null } = ctx.request.body;
    const url = ctx.helper.assembleUrl(app.config.apiClient.APPID[0],
      userId ? userApi.delShippingAddress : userApi.defaultShippingAddress);
    const params = userId ? { id } : { id, userId };
    const { status, data } = await service.curl.curlGet(url, {
      method: 'GET',
      data: params,
    });
    if (status === 200 && data.code === 200) {
      ctx.helper.success({ ctx, code: 200, res: {

      } });
    }
  }
}
module.exports = AddressController;
