'use strict'
import { CHIPS_WAP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.132.163:7001/service'
// const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
const afterSaleApi = {
  list: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/list.do`, // 售后列表
  detail: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/detail.do`, // 售后详情
  operation: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/operation.do`, // 操作（撤回，平台介入，用户确认）
  record: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/record.do`, // 获取处理记录列表
  refundList: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/refundList.do`, // 退款列表
  refundInfo: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/refundInfo.do`, // 退款详情
  refundApply: `${CHIPS_WAP_BASE_URL}/nk/orderSale/v1/refund.do`, // 退款申请
}
export { afterSaleApi }
