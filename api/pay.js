'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'

const pay = {
  enablePayMoney({ axios }, params) {
    // 查询当前订单的金额
    return request({
      axios,
      params,
      method: 'post',
      url: 'http://yapi.dgg.cn/mock/111/service/yk/pay/v2/enable_pay_money.do',
    })
  },
  // receiveCoupon({ axios }, params) {
  //   // 客服单付款
  //   return request({
  //     axios,
  //     params,
  //     method: 'post',
  //     url: CHIPS_WAP_BASE_URL + '/yk/v2/coupon/receive.do',
  //   })
  // },
  // useWithdrawal({ axios }, params) {
  //   // 使用撤销优惠券
  //   return request({
  //     axios,
  //     params,
  //     method: 'post',
  //     url: CHIPS_WAP_BASE_URL + '/yk/v2/coupon/use_withdrawal.do',
  //   })
  // },
}
export default pay
