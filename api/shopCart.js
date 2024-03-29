/*
 * @Author: xiao pu
 * @Date: 2020-12-09 17:07:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-17 10:43:47
 * @Description: file content
 * @FilePath: /chips-wap/client/api/shoppingCar.js
 */

'use strict'

import { CHIPS_APP_BASE_URL, CHIPS_WAP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const shopCart = {
  list(params) {
    return request({
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + '/yk/cart/v2/find_list.do',
    })
  },
  update(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/v2/update_cart.do',
    })
  },

  add(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/v2/add.do',
    })
  },

  // 服务产品详情
  productDetail(params, config = {}) {
    const { userId, deviceCode, reqArea, terminalCode } = config
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/nk/service/product/v1/find_detail.do',
      extraConfig: {
        headers: {
          'X-Req-UserId': userId,
          'X-Device-Code': deviceCode,
          'X-Req-Area': reqArea,
          terminalCode,
        },
      },
    })
  },

  // 商品的价格 服务资源等
  skuDetail(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/nk/service/product/v1/find_skuDetail.do',
    })
  },

  // 服务资源 列表
  resourceList(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/sc_product/v1/service_resource.do',
    })
  },
  // 购物车结算
  bill(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/v2/bill.do',
    })
  },
}
export default shopCart
