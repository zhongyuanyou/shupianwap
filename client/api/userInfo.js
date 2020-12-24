'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const userinfoApi = {
  info: `${CHIPS_WAP_BASE_URL}/yk/user/v1/info.do`, // 获取用户信息
  update: `${CHIPS_WAP_BASE_URL}/yk/user/v1/update.do`, // 修改用户信息
  configuration: `${CHIPS_WAP_BASE_URL}/nk/user/v1/configuration.do`, // 获取用户配置
  addressList: `${CHIPS_WAP_BASE_URL}/yk/address/v1/shipping_address_list.do`, // 收货地址列表
  addressDetail: `${CHIPS_WAP_BASE_URL}/yk/address/v1/shipping_address_info.do`, // 收货地址详情
  updateAddress: `${CHIPS_WAP_BASE_URL}/yk/address/v1/add_shipping_address.do`, // 修改收货地址
  delAddress: `${CHIPS_WAP_BASE_URL}/yk/address/v1/del_address.do`, // 删除收货地址
}
export { userinfoApi }
