'use strict'
import { request } from '@/utils/request'
import { CHIPS_PC_URL } from '@/config/constant'
const contract = {
  authentication({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/contract/v1/authentication.do',
    })
  },
  applycontart({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/contract/v2/applycontract.do',
    })
  },
  signcontart({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/contract/v1/sign.do',
    })
  },
  contartlist({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/yk/contract/v3/list.do',
    })
  },
  decryptionPhone({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/nk/entry/v1/decryption.do',
    })
  },
  encryptionPhone({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/nk/entry/v1/encryption.do',
    })
  },
  getContractDetail({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/yk/contract/v1/detail.do',
    })
  },
}
export default contract
