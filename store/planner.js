export const state = () => ({
  recodBottomPlanner: {}, // 推荐钻展规划师
  sharePlannerInfo: {}, // 全域保护的钻展规划师
  isShare: false,
})

export const mutations = {
  SET_REC_PLANNER(state, val) {
    state.recodBottomPlanner = val
  },
  SET_SHARE_PLANNER(state, val) {
    state.sharePlannerInfo = val
    state.isShare = true
  },
  CLEAR_SHARE_PLANNER(state) {
    state.sharePlannerInfo = {}
    state.isShare = false
  },
}

export const actions = {
  setRecPlanner({ commit }, data) {
    commit('SET_REC_PLANNER', data)
  },
  setSharePlanner({ commit }, data) {
    commit('SET_SHARE_PLANNER', data)
  },
  clearSharePlanner({ commit }) {
    commit('CLEAR_SHARE_PLANNER')
  },
}
