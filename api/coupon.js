'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'

const coupon = {
  getCouponList({ axios }, params) {
    // 获取优惠券列表
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/marketingCoupon/v2/find_my_coupon_page',
    })
  },
  receiveCoupon({ axios }, params) {
    // 领取优惠券
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + 'yk/marketingCoupon/v2/receive_coupon',
    })
  },
  useWithdrawal({ axios }, params) {
    // 使用撤销优惠券
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/marketingCoupon/v2/use_withdrawal',
    })
  },
}
export default coupon
