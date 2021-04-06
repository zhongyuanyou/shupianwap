/*
 * @Author:tang dai bing
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

// 支付类型CODE
const PAYTYPECODE = {
  1: 'PRO_PRE_PAY_POST_SERVICE', // 先付款后服务
  2: 'PRO_PRE_DEPOSIT_POST_OTHERS', // 先定金后尾款
  3: 'PRO_PRE_SERVICE_POST_PAY_BY_NODE', // 按服务节点付费
  4: 'PRO_PRE_SERVICE_FINISHED_PAY', // 服务完结收费
}

/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31 08:50
 * @params:orderData 订单数据
 * @Description:根据订单状态和合同状态判断显示合同按钮,返参 false不显示，1 签署合同 2查看合同
 */
const checkContractStatus = function (data) {
  // 当客户订单状态为已取消时不展示按钮
  if (data.cusOrderStatusNo === ORDERSTATUSCODE[4]) return false

  if (
    (data.contractStatus &&
      (data.contractStatus === 'STRUTS_QSZ' ||
        data.contractStatus === 'STRUTS_CG')) ||
    !data.contractStatus
  ) {
    // 当合同状态为草稿或签署中或无合同信息时显示签署合同按钮
    return 1
  }
  // 当合同状态为已完成时显示查看合同按钮
  if (data.contractStatus && data.contractStatus === 'STRUTS_YWC') return 2
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31 08:50
 * @params:orderData 订单数据
 * @Description:根据不同的订单状态和支付状态判断显示不同的订单操作按钮和支付按钮
 */
const isShowCanCelBtn = function (orderData) {
  // 当且仅当客户订单状态为待付款并且支付状态为未支付时展示取消订单按钮
  return orderData.cusOrderStatusNo === ORDERSTATUSCODE[1]
  // && orderData.orderPayStatusNo === PAYSTATUSCODE[1]  暂时修改逻辑放出取消订单按钮
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31
 * @params:orderData 订单数据
 * @Description:判断是否显示确认订单按钮 true为显示
 */
const isShowConfirmBtn = function (orderData) {
  return orderData.orderStatusNo === 'ORDER_ORDER_RESOURCE_STATUS_HANDLED'
  // 当订单状态为 资源商品 待确认时显示确认订单按钮
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31
 * @params:orderData 订单数据
 * @Description:判断是否显示支付按钮，返回数据: false 不显示，1显示立即付款， 2显示支付余款
 */
const isShowPayBtn = function (orderData) {
  if (
    orderData.isNeedPay &&
    orderData.cusOrderPayStatusNo === PAYSTATUSCODE[1] &&
    orderData.cusOrderStatusNo !== ORDERSTATUSCODE[3] &&
    orderData.cusOrderStatusNo !== ORDERSTATUSCODE[4]
  ) {
    // 显示立即付款按钮的条件
    // 1订单可付款
    // 2客户单支付状态为待付款
    // 3订单状态不等于已取消
    // 3订单状态不等于已完成
    return 1
  } else if (
    orderData.isNeedPay &&
    orderData.cusOrderPayStatusNo === PAYSTATUSCODE[2] &&
    orderData.cusOrderStatusNo !== ORDERSTATUSCODE[3] &&
    orderData.cusOrderStatusNo !== ORDERSTATUSCODE[4]
  ) {
    // 显示支付余款的条件
    // 1订单可付款
    // 2客户单支付状态为部分付款
    // 2订单状态不等于已取消
    // 3订单状态不等于已完成
    return 2
  } else {
    return false
  }
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31
 * @params:cusOrderStatusNo 客户单状态CODE
 * @Description:返回 订单状态类型 1待付款 2进行中 3已完成 4已取消
 */
const checkCusOrderStatus = function (cusOrderStatusNo) {
  if (!cusOrderStatusNo) return 0
  for (const key in ORDERSTATUSCODE) {
    if (ORDERSTATUSCODE[key] === cusOrderStatusNo) return Number(key)
  }
}
/*
 * @LastEditors: tang dai bing
 * @LastEditTime: 2021-03-31
 * @params:cusOrderStatusNo 客户单状态CODE
 * @Description:支付类型判断 返参：1先付款后服务 2先定金后尾款 3按服务节点付费 4PRO_PRE_SERVICE_FINISHED_PAY
 */
const checkPayType = function (cusOrderPayType) {
  console.log('cusOrderPayType', cusOrderPayType)
  if (!cusOrderPayType) return 0
  for (const key in PAYTYPECODE) {
    if (PAYTYPECODE[key] === cusOrderPayType) return Number(key)
  }
}
module.exports = {
  checkContractStatus,
  checkCusOrderStatus,
  isShowCanCelBtn,
  isShowConfirmBtn,
  isShowPayBtn,
  checkPayType,
}
