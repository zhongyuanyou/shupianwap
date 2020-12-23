export const state = () => ({
  isShowOpenApp: true, // 底部打开app显示和隐藏
  isInApp: false, // 是否在APP中
})

export const mutations = {
  SET_IS_SHOW_OPEN_APP(state, val) {
    // 设置底部打开app显示和隐藏
    state.isShowOpenApp = val
  },
  SET_UA_INFO(state, val) {
    state.isInApp = val
  },
}

export const actions = {
  SET_IS_SHOW_OPEN_APP({ commit }, data) {
    // 设置底部打开app显示和隐藏
    commit('SET_IS_SHOW_OPEN_APP', data)
  },
  setUAInfo({ commit }, data) {
    commit('SET_UA_INFO', data)
  },
}
