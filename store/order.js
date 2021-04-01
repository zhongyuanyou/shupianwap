export const state = () => ({
  orderData: null,
  payTypeCode: {
    1: '全款',
    2: '按节点付费',
    3: '定金尾款',
    4: '服务完结收费',
  },
  orderStatusCode: {
    1: 'ORDER_CUS_STATUS_UNPAID', // 未付款
    2: 'ORDER_CUS_STATUS_PROGRESSING', // 进行中
    3: 'ORDER_CUS_STATUS_COMPLETED', // 已完成
    4: 'ORDER_CUS_STATUS_CANCELLED', // 已取消
  },
  // 分批支付状态
  batchPayStatus: {
    1: 'ORDER_BATCH_PAYMENT_PAY_0', // 未支付
    2: 'ORDER_BATCH_PAYMENT_PAY_1', // 应支付
    3: 'ORDER_BATCH_PAYMENT_PAY_2', // 已
  },
})

export const mutations = {
  set_order_data(state, val) {
    state.orderData = val
    const date = new Date(new Date().getTime() + 120 * 60 * 1000)
  },
}

export const actions = {
  setOrderData({ commit }, data) {
    commit('set_order_data', data)
  },
}
