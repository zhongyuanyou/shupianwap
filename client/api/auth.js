/*
 * @Author: xiao pu
 * @Date: 2020-12-08 10:39:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 13:49:02
 * @Description: file content
 * @FilePath: /chips-wap/client/api/auth.js
 */

'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const auth = {
  login({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/login.do',
    })
  },

  register({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/register.do',
    })
  },

  logout({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/logout.do',
    })
  },

  reset({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/reset.do',
    })
  },

  smsCode({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/smsCode.do',
    })
  },
  /**
   * 根据UserId 获取用户信息
   * @param {object} params
   * @param {string} params.userId
   * @returns {Promise}
   */
  accountInfo(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/account_info.do',
    })
  },
}
export default auth
