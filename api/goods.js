'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const goods = {
  searchServeGoodsList({ axios }, params) {
    // 搜索服务商品列表接口
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/goodslist/v1/get_serve_list.do',
    })
  },
  searchJyGoodsList({ axios }, params) {
    // 搜索交易商品列表
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/goodslist/v1/get_jy_list.do',
    })
  },
}
export default goods
