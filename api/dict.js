'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

// 查询数据字典
const dict = {
  findCmsCode({ axios }, params) {
    // 单字典查询，只支持一个code查询，返回单层级字典
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/dict/v1/cms_code.do',
    })
  },
  findCmsCodes({ axios }, params) {
    // 单字典查询，支持多个code查询，返回单层级字典
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/dict/v1/cms_codes.do',
    })
  },
  findCmsTier({ axios }, params) {
    // 单字典查询，只支持一个code查询，返回所有层级字典
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/dict/v1/cms_code_tier.do',
    })
  },
}
export default dict
