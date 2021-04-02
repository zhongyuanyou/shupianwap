'use strict'
import { request } from '@/utils/request'
// import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
const pay = {
  enablePayMoney({ axios }, params) {
    // 查询当前订单的金额
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + 'yk/pay/v2/enable_pay_money.do',
    })
  },
  getPayParams({ axios }, params) {
    // 客服单付款 获取二维码
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + 'yk/pay/v2/get_pay_params.do',
    })
  },
  getPayResult({ axios }, params) {
    // 支付成功回调查询
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + 'yk/pay/v2/get_pay_result.do',
    })
  },
}
export default pay
