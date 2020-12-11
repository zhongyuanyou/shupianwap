'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const goods = {
  searchServeGoodsList({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/goodslist/v1/get_serve_list.do',
    })
  },
}
export default goods
