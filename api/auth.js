/*
 * @Author: xiao pu
 * @Date: 2020-12-08 10:39:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-22 20:39:18
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
  checkSmsCode({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/login//v1/check-sms-code',
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

  /**
   * 获取协议内容
   * @param {object} params
   * @param {string} params.categoryCode  cms里面自己配置后获取到的
   * @param {string} params.includeField  如 title,content
   * @returns {Promise}
   */
  protocol(params) {
    return request({
      params,
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/protocol.do',
    })
  },

  /**
   * 获取图形码
   * @returns {Promise}
   */
  imgCode(params) {
    return request({
      params,
      url: CHIPS_WAP_BASE_URL + '/nk/login/v1/img_code.do',
    })
  },
}
export default auth
