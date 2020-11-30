/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-11-27 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/index.js
 */
export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    // 从缓存的cookies获取城市信息
    const currentCity = app.$cookies.get('currentCity')
    const positionCityName = app.$cookies.get('positionCityName')
    const positionStatus = app.$cookies.get('positionStatus')
    if (currentCity && positionCityName && positionStatus) {
      commit('city/SET_CITY', currentCity)
      commit('city/SET_POSITION_CITY', positionCityName)
      commit('city/SET_POSITION_STATUS', positionStatus)
    }
  },
}
