/*
 * @Author: xiao pu
 * @Date: 2020-12-09 14:15:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-21 20:36:02
 * @Description: file content
 * @FilePath: /chips-wap/client/store/user.js
 */

import { auth } from '@/api'

export const state = () => ({
  userInfo: {},
  token: '',
  userId: '',
})
export const mutations = {
  SET_USER(state, data = {}) {
    this.$cookies.set('token', data.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
    })
    this.$cookies.set('userId', data.userId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
    })
    state.userInfo = data
    state.token = data.token
    state.userId = data.userId
  },
}

export const actions = {
  // 获取登录账户信息
  async GET_ACCOUNT_INFO({ commit, state }, data = {}) {
    let { userId } = data
    if (!userId) {
      userId = state.userId
    }
    try {
      const accountInfo = await auth.accountInfo({ userId })
      commit('SET_USER', { ...state.userInfo, ...accountInfo })
      return accountInfo
    } catch (error) {
      console.error('ACCOUNT_INFO:', error)
      return Promise.reject(error)
    }
  },
}
