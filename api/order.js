'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const CHIPS_WAP_BASE_URL2 = 'http://127.0.0.1:7001/service'
const category = {
  list({ axios }, params) {
    console.log('paramsparams', params)
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL2 + '/yk/order/v2/order_list.do',
    })
  },
  detail({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL2 + '/yk/order/v2/order_detail.do',
    })
  },
}
export default category
