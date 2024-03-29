/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-12-21 20:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/index.js
 */
export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit({ commit, state }, { app }) {
    // 从缓存的cookies获取城市信息
    const currentCity = app.$cookies.get('currentCity')
    const positionCityName = app.$cookies.get('positionCityName', { path: '/' })
    const positionCityCode = app.$cookies.get('positionCityCode', { path: '/' })

    const positionStatus = app.$cookies.get('positionStatus')
    const token = app.$cookies.get('token', { path: '/' })
    const userId = app.$cookies.get('userId', { path: '/' })
    const userType = app.$cookies.get('userType', { path: '/' })
    const userName = app.$cookies.get('userName', { path: '/' })
    const avatar = app.$cookies.get('avatar', { path: '/' })
    const customerID = app.$cookies.get('customerID', { path: '/' })


    commit('city/SET_CITY', currentCity || {})
    commit('city/SET_POSITION_CITY', positionCityName || '')
    commit('city/SET_POSITION_CODE', positionCityCode || '')

    commit('city/SET_POSITION_STATUS', positionStatus || null)
    if (token && userId && userType)
      commit('user/SET_USER', {
        token,
        userId,
        type: userType,
        nickName: userName,
        avatar: decodeURIComponent(avatar),
        customerID
      })
  },
}

export const strict = false
