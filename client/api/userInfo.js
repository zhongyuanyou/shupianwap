'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
import { request } from '@/utils/request'

const userInfo = {
  info({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/yk/user/v1/info.do',
    })
  },
}
export default userInfo
