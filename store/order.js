export const state = () => ({
  orderData: {},
})

export const mutations = {
  set_order_data(state, val) {
    state.orderData = val
  },
}

export const actions = {
  setOrderData({ commit }, data) {
    commit('set_order_data', data)
  },
}
