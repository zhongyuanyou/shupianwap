'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.133.40:7001/service'
const userinfoApi = {
  info: `${CHIPS_WAP_BASE_URL}/yk/user/v1/info.do`, // 获取用户信息
  update: `${CHIPS_WAP_BASE_URL}/yk/user/v1/update.do`, // 修改用户信息
  loginOut: `${CHIPS_WAP_BASE_URL}/nk/login/v1/logout.do`, // 退出登录
  configuration: `${CHIPS_WAP_BASE_URL}/nk/user/v1/configuration.do`, // 获取用户配置
  findUserDecryptById: `${CHIPS_WAP_BASE_URL}/yk/user/v1/find_user_decrypt_by_id.do`, // 通过用户id查询明文用户详情
  addressList: `${CHIPS_WAP_BASE_URL}/yk/address/v1/shipping_address_list.do`, // 获取收货地址列表
  addressDetail: `${CHIPS_WAP_BASE_URL}/yk/address/v1/shipping_address_info.do`, // 获取收货地址详情
  updateAddress: `${CHIPS_WAP_BASE_URL}/yk/address/v1/add_shipping_address.do`, // 新增/修改收货地址
  delAddress: `${CHIPS_WAP_BASE_URL}/yk/address/v1/del_address.do`, // 删除收货地址
  info_decrypt: `${CHIPS_WAP_BASE_URL}/yk/user/v1/find_user_decrypt_by_id.do`, // 获取用户信息明文
}
export { userinfoApi }
