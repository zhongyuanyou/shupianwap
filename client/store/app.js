export const state = () => ({
  isShowOpenApp: true, // 底部打开app显示和隐藏
})

export const mutations = {
  SET_IS_SHOW_OPEN_APP(state, val) {
    // 设置底部打开app显示和隐藏
    state.isShowOpenApp = val
  },
}

export const actions = {
  SET_IS_SHOW_OPEN_APP({ commit }, data) {
    // 设置底部打开app显示和隐藏
    commit('SET_IS_SHOW_OPEN_APP', data)
  },
}
