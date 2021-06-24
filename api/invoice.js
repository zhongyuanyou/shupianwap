'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
import { request } from '@/utils/request'

const invoiceApi = {
  // 全部发票列表在wap的订单列表
  // http://yapi.dgg.cn/project/111/interface/api/41538

  // 一下接口在pc
  // http://yapi.dgg.cn/project/935/interface/api/108229
  /**
   * 申请发票
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  apply_invoice({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/invoice/v1/apply_invoice.do',
    })
  },

  /**
   * 开票历史
   * @param {*} param0
   * @param {*} params
   * @returns
   */
  invoice_records({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/invoice/v1/invoice_records.do',
    })
  },

  /**
   * 发票详情
   * @param {*} param0.axios
   * @param {*} params
   * @param {number} params.id 发票id
   * @param {number} params.orderId 订单id
   * @returns
   */
  invoice_detail({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/invoice/v1/invoice_detail.do',
    })
  },

}
export { invoiceApi }
