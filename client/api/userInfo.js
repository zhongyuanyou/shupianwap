'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
// import { request } from '@/utils/request'
//
// const userInfo = {
//   info({ axios }, params) {
//     // 获取用户信息
//     return request({
//       axios,
//       params,
//       method: 'get',
//       url: CHIPS_WAP_BASE_URL + '/yk/user/v1/info.do',
//     })
//   },
//   update({ axios }, params) {
//     // 修改用户信息
//     return request({
//       axios,
//       params,
//       method: 'post',
//       url: CHIPS_WAP_BASE_URL + '/yk/user/v1/update.do',
//     })
//   },
//   addressList({ axios }, params) {
//     // 获取收货地址列表
//     return request({
//       axios,
//       params,
//       method: 'get',
//       url: CHIPS_WAP_BASE_URL + '/yk/address/v1/shipping_address_list.do',
//     })
//   },
//   addressDetail({ axios }, params) {
//     // 获取收货地址详情
//     return request({
//       axios,
//       params,
//       method: 'get',
//       url: CHIPS_WAP_BASE_URL + '/yk/address/v1/shipping_address_info.do',
//     })
//   },
//   updateAddress({ axios }, params) {
//     // 编辑收货地址
//     return request({
//       axios,
//       params,
//       method: 'post',
//       url: CHIPS_WAP_BASE_URL + '/yk/address/v1/add_shipping_address.do',
//     })
//   },
//   delAddress({ axios }, params) {
//     // 删除收货地址
//     return request({
//       axios,
//       params,
//       method: 'get',
//       url: CHIPS_WAP_BASE_URL + '/yk/address/v1/del_address.do',
//     })
//   },
// }
// export default userInfo

const userinfoApi = {
  info: `${CHIPS_WAP_BASE_URL}/yk/user/v1/info.do`, // 获取用户信息
  update: `${CHIPS_WAP_BASE_URL}/yk/user/v1/update.do`, // 修改用户信息
  addressList: `${CHIPS_WAP_BASE_URL}/yk/address/v1/shipping_address_list.do`, // 收货地址列表
  addressDetail: `${CHIPS_WAP_BASE_URL}/yk/address/v1/shipping_address_info.do`, // 收货地址详情
  updateAddress: `${CHIPS_WAP_BASE_URL}/yk/address/v1/add_shipping_address.do`, // 修改收货地址
  delAddress: `${CHIPS_WAP_BASE_URL}/yk/address/v1/del_address.do`, // 删除收货地址
}
export { userinfoApi }
