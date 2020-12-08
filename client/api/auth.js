/*
 * @Author: xiao pu
 * @Date: 2020-12-08 10:39:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-08 16:15:32
 * @Description: file content
 * @FilePath: /chips-wap/client/api/auth.js
 */

'use strict'

import { request } from '@/utils/request'

const auth = {
  login({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: '/chips-wap/service/nk/login/v1/login.do',
    })
  },

  register({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: '/chips-wap/service/nk/login/v1/register.do',
    })
  },

  logout({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: '/chips-wap/service/nk/login/v1/logout.do',
    })
  },

  reset({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: '/chips-wap/service/nk/login/v1/reset.do',
    })
  },

  smsCode({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: '/chips-wap/service/nk/login/v1/smsCode.do',
    })
  },
}
export default auth
