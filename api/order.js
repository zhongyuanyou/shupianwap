'use strict'
import { request } from '@/utils/request'
// import { CHIPS_WAP_BASE_URL } from '@/config/constant'
import { CHIPS_APP_BASE_URL } from '@/config/constant'
const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
// const CHIPS_APP_BASE_URL =
//   'https://dspmicrouag.shupian.cn/crisps-c-middle-service-api'
const category = {
  // 订单列表
  list({ axios }, params) {
    console.log('paramsparams', params)
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/order_list.do',
    })
  },
  // 客户单列表
  cusList({ axios }, params) {
    console.log('paramsparams', params)
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/order_list.do',
    })
  },
  // 根据客户单id查询客户单详情
  getDetailByCusOrderId({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/cus_order_detail.do',
    })
  },
  // 客户单详情
  getDetailByOrderId({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/order_detail.do',
    })
  },
  // 分批支付列表
  batchPayList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/batch_pay_list.do',
    })
  },
  // 取消订单
  cancelOrder({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/cancle_order.do',
    })
  },
  // 确认订单 确认完成
  confirmOrder({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/confirm_order.do',
    })
  },
  // 根据客户单id查询关联订单
  getChildOrder({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/child_order.do',
    })
  },
  // 获取账单明细 yk/order/find_pay_bill_details.do
  getBillDetail({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url:
        CHIPS_APP_BASE_URL +
        '/crisps-c-middle-service-api/yk/order/find_pay_bill_details.do',
    })
  },
  // 提交订单
  placeOrder({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: 'http://127.0.0.1:7001/service/yk/order/v2/add_order.do', // CHIPS_WAP_BASE_URL2 + '/yk/order/v2/add_order.do',
    })
  },
  // 查询订单详情
  detailOrder({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/add_order.do',
    })
  },
  // 查询周期产品批次进度列表(周期产品)
  getProcessList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + 'yk/order/v2/find_service_by_details_id.do',
    })
  },
  // 查询进度信息(周期产品)
  getProcessInfoBatch({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + '/yk/order/v2/find_task_by_server.do',
    })
  },
  // 查询进度信息(非周期产品)
  getProcessInfo({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + '/yk/order/v2/get_order_track_list.do',
    })
  },
}
export default category
