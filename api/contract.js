'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.133.40:7001/service'
const contract = {
  authentication({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/contract/v2/authentication.do',
    })
  },
  applycontart({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/contract/v2/applycontract.do',
    })
  },
  signcontart({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/contract/v2/sign.do',
    })
  },
  contartlist({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/contract/v2/list.do',
    })
  },
}
export default contract
