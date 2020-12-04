/**
 * @author zky
 * @since 2020/12/2
 */
'use strict';

const Controller = require('egg').Controller;
const { Get, Post, Prefix } = require('egg-shell-decorators');

@Prefix('/yk/address')

class AddressController extends Controller {
  @Post('/v1/add_shipping_address.do')
  async addAndUpdate() {
    // 新增或编辑地址
    const { ctx, service, app } = this;
    // 定义参数校验规则
  }
}
module.exports = AddressController;
