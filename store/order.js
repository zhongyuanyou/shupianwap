export const state = () => ({
  orderData: null,
  payTypeCode: {
    1: '全款',
    2: '按节点付费',
    3: '定金尾款',
    4: '服务完结收费',
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
