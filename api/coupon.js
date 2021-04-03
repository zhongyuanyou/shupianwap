'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'

const coupon = {
  getCouponList(params) {
    // 获取优惠券列表
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/coupon/v2/find_my_coupon_page.do',
    })
  },
  receiveCoupon(params) {
    // 领取优惠券
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/coupon/v2/receive_coupon.do',
    })
  },
  useWithdrawal(params) {
    // 使用撤销优惠券
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/coupon/v2/use_withdrawal.do',
    })
  },
  findOrderCouponPage(params) {
    // 查询订单可用/不可用优惠劵列表
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/coupon/v2/find_order_coupon_page.do',
    })
  },
  findPage(params) {
    // 查询优惠劵列表（领券中心、商品详情领券）
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/coupon/v2/find_page.do',
    })
  },
}
export default coupon
