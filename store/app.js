export const state = () => ({
  isShowOpenApp: true, // 底部打开app显示和隐藏
  isInApp: false, // 是否在APP中
  appInfo: {}, // app信息
  appPlatform: '', // app类型信息
})

export const mutations = {
  SET_IS_SHOW_OPEN_APP(state, val) {
    // 设置底部打开app显示和隐藏
    state.isShowOpenApp = val
  },
  SET_UA_INFO(state, val) {
    state.isInApp = val
    if (state.isInApp) state.isShowOpenApp = false
  },
  SET_APP_INFO(state, val) {
    state.appInfo = val
  },
  SET_APP_PLATFORM(state, val) {
    state.appPlatform = val
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
  setAppInfo({ commit }, data) {
    commit('SET_APP_INFO', data)
  },
  setAppPlatform({ commit }, data) {
    commit('SET_APP_PLATFORM', data)
  },
}
