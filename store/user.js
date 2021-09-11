/*
 * @Author: xiao pu
 * @Date: 2020-12-09 14:15:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-21 20:36:02
 * @Description: file content
 * @FilePath: /chips-wap/client/store/user.js
 */

import { auth } from '@/api'
import { AVATAR } from '~/config/constant'
export const state = () => ({
  userInfo: {},
  token: '',
  userId: '',
  userType: '', // 用户类型
  userNo: '', // 用户编码
  userName: '', // 用户名称=nickName
  userPhone: '', // 用户电话=fullName 加密
  userPhoneFull: '', // 用户电话加密
  avatar: '', // 用户头像

  customerID: '',// 客户id
})
export const mutations = {
  SET_USER(state, data = {}) {
    this.$cookies.set('token', String(data.token), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('userId', String(data.userId), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('userType', String(data.userType || data.type), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    if (data.customerID) {
      this.$cookies.set('customerID', String(data.customerID), {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 过期时间
        domain: 'shupian.cn',
      })
    }
    state.userInfo = data
    state.token = String(data.token)
    state.userId = String(data.userId)
    state.userName = String(data.nickName)
    if (data.userType || data.type)
      state.userType = String(data.userType || data.type)
    state.avatar = String(data.avatar || AVATAR)
    if (data.customerID) {
      state.customerID = String(data.customerID)
    }
  },
  CLEAR_USER(state) {
    const clearKeys = ['token', 'userId', 'avatar', 'userNo', 'userName', 'userPhone', 'realStatus', 'mainAccountFull', 'userType', 'customerID']
    clearKeys.forEach((key) => {
      this.$cookies.remove(key, {
        path: '/',
        domain: 'shupian.cn',
      })
      this.$cookies.remove(key, {
        path: '/',
      })
    })
    state.token = ''
    state.userId = ''
    state.userType = ''
    state.userNo = ''
    state.userName = ''
    state.userPhone = ''
    state.realStatus = ''
    state.mainAccountFull = ''
    state.customerID = ''
    state.userInfo = {}
  },
  SET_INFO(state, data = {}) {
    console.log('SET_INFO', data);
    this.$cookies.set('userNo', String(data.no), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('userName', data.nickName, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('userPhone', data.decodePhone, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('realStatus', data.realStatus, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('mainAccountFull', data.mainAccountFull, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('avatar', data.url || AVATAR, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('userType', String(data.type || data.userType), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })
    this.$cookies.set('customerID', String(data?.customerInfo?.id || ''), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      domain: 'shupian.cn',
    })


    state.userNo = data.no
    state.userName = data.nickName
    state.userType = data.type || data.userType
    state.userPhone = data.fullName
    state.realStatus = data.realStatus
    state.mainAccountFull = data.mainAccountFull
    state.avatar = data.url || AVATAR
    state.customerID = data?.customerInfo?.id

    state.userInfo.userNo = data.no
    state.userInfo.userName = data.nickName
    state.userInfo.userPhone = data.fullName
    state.userInfo.realStatus = data.realStatus
    state.userInfo.mainAccountFull = data.mainAccountFull
    state.userInfo.avatar = data.url
    state.userInfo.customerID = data?.customerInfo?.id
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
  clearUser({ commit }) {
    commit('CLEAR_USER')
  },

  setUser({ commit }, data) {
    commit('SET_USER', data)
  },
  setInfo({ commit }, data) {
    commit('SET_INFO', data)
  },
}
