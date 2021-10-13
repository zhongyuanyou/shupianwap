'use strict'
/**
 * ORDER_ORDER_RESOURCE_STATUS_HANDLED
 * @author tangdaibing
 * @description 性能优化版本APi 930
 * @since 2021/09/28
 * @lastEditDate 2021/09/28
 * */
import { request } from '@/utils/request'
import { CHIPS_APP_BASE_URL, CHIPS_WAP_BASE_URL, CHIPS_PC_URL, CRISPS_C_MIDDLE_SERVICE_API } from '@/config/constant'
const category = {
  // 订单列表
  list({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/order_list.do',
    })
  },
  // 客户单列表
  cusList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/cus_order_list.do',
    })
  },
  // 根据客户单id查询客户单详情
  getDetailByCusOrderId({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/cus_order_detail.do',
    })
  },
  // 订单详情
  getDetailByOrderId({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/order_detail.do',
    })
  },
  // 分批支付列表
  batchPayList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/batch_pay_list.do',
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
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/confirm_order.do',
    })
  },
  // 根据客户单id查询关联订单
  getChildOrder({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/child_order.do',
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
      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/add_order.do', // CHIPS_WAP_BASE_URL2 + '/yk/order/v2/add_order.do',
    })
  },



  /**
   * 提交订单（从待提交订单列表提交订单）
   * @link http://yapi.dgg.cn/project/111/interface/api/125889
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  commit_order({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',

      url: CHIPS_WAP_BASE_URL + '/yk/order_performance/v1/commit_order.do', // CHIPS_WAP_BASE_URL2 + '/yk/order/v2/add_order.do',
      // url: 'http://127.0.0.1:7001/service/yk/order/v1/commit_order.do',
    })
  },



  /**
   *CHIPS_PC_URL
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  findTaskByOrder({ axios }, params) {
    return request({
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/yk/order/v1/findTaskByOrder.do',
    })
  },
  /**
   *
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  findProductionOrderByOrderDetailsId(params) {
    return request({
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/yk/order/v1/findProductionOrderByOrderDetailsId.do',
    })
  },


  // 查询周期产品批次进度列表(周期产品) yk/order/v2/find_service_by_details_id.do
  getProcessList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + 'yk/order/v2/find_service_by_details_id.do',
    })
  },
  // 查询批次进度信息(周期产品) /yk/order/v2/find_task_by_server.do
  getProcessInfoBatch({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + '/yk/order/v2/find_task_by_server.do',
    })
  },
  // 查询进度信息(非周期产品) /yk/order/v2/get_order_track_list.do
  getProcessInfo({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + '/yk/order/v2/get_order_track_list.do',
    })
  },
  // 同意下单协议交易委托协议
  aggrement({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/aggrement.do',
    })
  },
  getcalculation({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/order/v2/coupon_calculation.do',
    })
  },
  annexList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/contract/v2/list.do',
    })
  },

  // 营销优惠结算v2，提交订单使用
  //  http://yapi.dgg.cn/project/452/interface/api/82297
  settlement({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/order/v2/settlement.do', // CHIPS_WAP_BASE_URL2 + '/yk/order/v2/add_order.do',
    })
  },
  // 待提交订单结算
  discountsSettlement({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/order/v2/discountsSettlement.do',
    })
  },
  // 待提交订单结算
  settle_order_by_unsubmit({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CRISPS_C_MIDDLE_SERVICE_API + '/yk/settle/v3/settle_order_by_unsubmit.do',
    })
  },
  settle_order_by_unsubmitStr: CRISPS_C_MIDDLE_SERVICE_API + '/yk/settle/v3/settle_order_by_unsubmit.do',



}
export default category
