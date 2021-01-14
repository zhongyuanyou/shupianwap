'use strict'
/**
 * 留言相关接库（表单提交）
 *
 * */
import { CHIPS_APP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const consult = {
  getCMSCode(params) {
    // 获取cmscode（留言）
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/nk/trade/consult/get_sms_code2.do',
    })
  },
  consultAddLogin(params) {
    // 未登录留言（留言）
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/nk/trade/consult/add1.do',
    })
  },
  consultAdd(params) {
    // 登录留言（留言）
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/nk/trade/consult/consult.do',
    })
  },
  // cms的增加留言接口（提交到智企）
  cmsAddConsult: CHIPS_APP_BASE_URL + '/nk/trade/consult/cms_add_consult.do',
}
export default consult
