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
  avatar: '', // 用户头像
})
export const mutations = {
  SET_USER(state, data = {}) {
    this.$cookies.set('token', String(data.token), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('userId', String(data.userId), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('userType', String(data.type), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('userName', String(data.nickName), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('avatar', String(data.avatar || AVATAR), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    state.userInfo = data
    state.token = String(data.token)
    state.userId = String(data.userId)
    state.userType = String(data.type)
    state.userName = String(data.nickName)
    state.avatar = String(data.avatar || AVATAR)
  },
  CLEAR_USER(state) {
    this.$cookies.remove('token', {
      path: '/',
    })
    this.$cookies.remove('userId', {
      path: '/',
    })
    this.$cookies.remove('userType', {
      path: '/',
    })
    this.$cookies.remove('userName', {
      path: '/',
    })
    this.$cookies.remove('userPhone', {
      path: '/',
    })
    state.token = ''
    state.userId = ''
    state.userType = ''
    state.userNo = ''
    state.userName = ''
    state.userPhone = ''
    state.realStatus = ''
    state.mainAccountFull = ''
    state.userInfo = {}
  },
  SET_INFO(state, data = {}) {
    this.$cookies.set('userNo', String(data.no), {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('userName', data.nickName, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('userPhone', data.fullName, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('realStatus', data.realStatus, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('mainAccountFull', data.mainAccountFull, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('avatar', data.url || AVATAR, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    this.$cookies.set('userType', data.type, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
      // domain: 'shupian.cn', // 加入根域名cookie供其他站点使用
    })
    state.userNo = data.no
    state.userName = data.nickName
    state.userType = data.type
    state.userPhone = data.fullName
    state.realStatus = data.realStatus
    state.mainAccountFull = data.mainAccountFull
    state.avatar = data.url || AVATAR
    state.userInfo.userNo = data.no
    state.userInfo.userName = data.nickName
    state.userInfo.userPhone = data.fullName
    state.userInfo.realStatus = data.realStatus
    state.userInfo.mainAccountFull = data.mainAccountFull
    state.userInfo.avatar = data.url
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
