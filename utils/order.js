/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31
 * @Description: 订单功能显示差异判断，订单状态判断，支付状态判断
 */
// 客户单状态code
const ORDERSTATUSCODE = {
  1: 'ORDER_CUS_STATUS_UNPAID', // 未付款
  2: 'ORDER_CUS_STATUS_PROGRESSING', // 进行中
  3: 'ORDER_CUS_STATUS_COMPLETED', // 已完成
  4: 'ORDER_CUS_STATUS_CANCELLED', // 已取消
}
// 客户单支付状态code
const PAYSTATUSCODE = {
  1: 'ORDER_CUS_PAY_STATUS_UN_PAID', // 未支付
  2: 'ORDER_CUS_PAY_STATUS_PART_PAID', // 部分支付
  3: 'ORDER_CUS_PAY_STATUS_COMPLETED_PAID', // 支付完成
}

// 订单页面展示合同操作按钮判断
const checkContractStatus = function (data) {
  // 当客户订单状态为已取消时不展示按钮
  if (data.cusOrderStatusNo === 'ORDER_CUS_STATUS_CANCELLED') return false
  if (data.cusOrderStatusNo !== 'ORDER_CUS_STATUS_CANCELLED') {
    // 当订单状态不为已取消时
    // 当合同状态为草稿或签署中或无合同信息时显示签署合同按钮
    if (
      (data.contractStatus &&
        (data.contractStatus === 'STRUTS_QSZ' ||
          data.contractStatus === 'STRUTS_CG')) ||
      !data.contractStatus
    ) {
      return 1
    }
  }
  // 当合同状态为已完成时显示查看合同按钮
  if (data.contractStatus && data.contractStatus === 'STRUTS_YWC') return 2
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31 08:50
 * @params:orderData 订单数据
 */
const checkOrdertStatus = function (orderData) {
  if (
    orderData.cusOrderStatusNo !== ORDERSTATUSCODE[4] &&
    orderData.orderPayStatusNo === PAYSTATUSCODE[1]
  ) {
    // 当且仅当客户订单状态为非已取消并且未支付时展示取消订单按钮
    return 1
  }
  if (orderData.orderStatusNo === 'ORDER_ORDER_RESOURCE_STATUS_HANDLED') {
    // 当订单状态为 资源商品 待确认时显示确认订单按钮
    return 2
  }
  if (
    orderData.isNeedPay &&
    orderData.cusOrderStatusNo !== ORDERSTATUSCODE[4]
  ) {
    // 当订单需要付款且客户单状态不等于已取消时显示立即付款按钮
    return 3
  }
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31 08:50
 * @params:cusOrderStatus 客户单状态
 */
const checkCusOrderStatus = function (cusOrderStatus) {
  if (!cusOrderStatus) return 0
  for (const key in ORDERSTATUSCODE) {
    if (ORDERSTATUSCODE[key] === cusOrderStatus) return key
  }
}
module.exports = {
  checkContractStatus,
  checkOrdertStatus,
  checkCusOrderStatus,
}
