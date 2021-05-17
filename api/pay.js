'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
// const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
const pay = {
  enablePayMoney(params) {
    // 查询当前订单的金额
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/pay/v2/enable_pay_money.do',
    })
  },
  getPayParams(params) {
    // 客服单付款 获取二维码
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/pay/v3/get_pay_params.do',
    })
  },
  getPayResult(params) {
    // 支付成功回调查询
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/pay/v2/get_pay_result.do',
    })
  },
}
export default pay
