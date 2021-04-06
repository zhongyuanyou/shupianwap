'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const contract = {
  authentication({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: 'http://172.16.133.40:7001/service/yk/contract/v2/authentication.do',
      // CHIPS_WAP_BASE_URL + '/yk/contract/v2/authentication.do',
    })
  },
  applycontart({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: 'http://127.0.0.1:7001/service/yk/contract/v2/applycontract.do',
      // CHIPS_WAP_BASE_URL + '/yk/contract/v2/applycontract.do',
    })
  },
  signcontart({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: 'http://127.0.0.1:7001/service/yk/contract/v2/sign.do', // CHIPS_WAP_BASE_URL + '/yk/contract/v2/sign.do',
    })
  },
  contartlist({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: 'http://127.0.0.1:7001/service/yk/contract/v2/list.do', // CHIPS_WAP_BASE_URL + '/yk/contract/v2/list.do',
    })
  },
}
export default contract
