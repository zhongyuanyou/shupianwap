'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
import { request } from '@/utils/request'

const complain = {
  list({ axios }, params) {
    // 编辑收货地址
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/complain/v1/list.do',
    })
  },
  add({ axios }, params) {
    // 提交吐槽
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/yk/complain/v1/add.do',
    })
  },
  detail({ axios }, params) {
    // 吐槽详情
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/complain/v1/detail.do',
    })
  },
}
export default complain
