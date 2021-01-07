'use strict'

import { CHIPS_APP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const consult = {
  getCMSCode(params) {
    // 获取cmscode
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/trade/consult/get_sms_code2.do',
    })
  },
  consultAddLogin(params) {
    // 未登录留言
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/trade/consult/add1.do',
    })
  },
  consultAdd(params) {
    // 登录留言
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/trade/consult/consult.do',
    })
  },
}
export default consult
