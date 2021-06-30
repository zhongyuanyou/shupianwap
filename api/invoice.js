'use strict'

import { CHIPS_PC_URL } from '../config/constant'
import { request } from '@/utils/request'

const invoiceApi = {
  // 全部发票列表在wap的订单列表
  // http://yapi.dgg.cn/project/111/interface/api/41538

  // 一下接口在pc
  // http://yapi.dgg.cn/project/935/interface/api/108229
  /**
   * 申请发票
   * @param {object} param0
   * @param {object} params
   * @returns
   */
  apply_invoice({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/invoice/v1/apply_invoice.do',
    })
  },

  /**
   * 开票历史
   * @param {object} param0
   * @param {object} params
   * @returns
   */
  invoice_records({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/yk/invoice/v1/invoice_records.do',
    })
  },

  /**
   * 发票详情
   * @param {object} param0
   * @param {object} params
   * @param {number} params.id 发票id
   * @param {number} params.orderId 订单id
   * @param {number} params.type 是否查询订单商品信息，1查询，默认不查
   * @returns
   */
  invoice_detail({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/yk/invoice/v1/invoice_detail.do',
    })
  },

  /**
   * 预览发票
   * @param {*} param0
   * @param {*} params
   * @param {number} params.orderId 订单id
   * @returns
   */
  preview_invoice ({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/invoice/v1/preview_invoice.do',
    })
  },


    /**
   * 发送发票到邮箱
   * @param {object} param0
   * @param {object} params
   * @param {number} params.email 邮箱
   * @param {number} params.invoiceId 发票id
   * @returns
   */
     send_invoice_to_email({ axios }, params) {
      return request({
        axios,
        params,
        method: 'post',
        url: CHIPS_PC_URL + '/yk/invoice/v1/send_invoice_to_email.do',
      })
    },





  /** ------------------发票抬头-------------------------- */
  /**
   * 抬头列表
   * @param {object} param0
   * @param {null} params

   * @returns
   */
  invoice_header_list({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/invoice/v1/invoice_header_list.do',
    })
  },

  /**
   * 添加发票抬头
   * @param {object} param0
   * @param {object} params
   */
  add_invoice_header({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/invoice/v1/add_invoice_header.do',
    })
  },
  /**
 * 修改发票抬头
 * @param {object} param0
 * @param {object} params
 */
  update_invoice_header({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/invoice/v1/update_invoice_header.do',
    })
  },
    /**
 * 删除发票抬头
 * @param {object} param0
 * @param {object} params
 * @param {array} params.ids 抬头id
 */
  dlt_invoice_header({ axios }, params) {
      return request({
        axios,
        params,
        method: 'post',
        url: CHIPS_PC_URL + '/yk/invoice/v1/dlt_invoice_header.do',
      })
    },
}



export { invoiceApi }
