'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const CHIPS_WAP_BASE_URL2 = 'http://127.0.0.1:7001/service'
const category = {
  // 订单列表
  list({ axios }, params) {
    console.log('paramsparams', params)
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL2 + '/yk/order/v2/order_list.do',
    })
  },
  // 客户单列表
  cusList({ axios }, params) {
    console.log('paramsparams', params)
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL2 + '/yk/order/v2/order_list.do',
    })
  },
  // 根据客户单id查询客户单详情
  getDetailByCusOrderId({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL2 + '/yk/order/v2/cus_order_detail.do',
    })
  },
  // 客户单详情
  getDetailByOrderId({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL2 + '/yk/order/v2/order_detail.do',
    })
  },
}
export default category
