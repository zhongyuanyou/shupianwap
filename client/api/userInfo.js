'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
import { request } from '@/utils/request'

const userInfo = {
  info({ axios }, params) {
    // 获取用户信息
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/user/v1/info.do',
    })
  },
  update({ axios }, params) {
    // 修改用户信息
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/user/v1/update.do',
    })
  },
  addressList({ axios }, params) {
    // 获取收货地址列表
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/address/v1/shipping_address_list.do',
    })
  },
  addressDetail({ axios }, params) {
    // 获取收货地址详情
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/address/v1/shipping_address_info.do',
    })
  },
  updateAddress({ axios }, params) {
    // 编辑收货地址
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/address/v1/add_shipping_address.do',
    })
  },
  delAddress({ axios }, params) {
    // 删除收货地址
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/address/v1/del_address.do',
    })
  },
}
export default userInfo
