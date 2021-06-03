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
      url: CHIPS_WAP_BASE_URL + '/nk/goodslist/v2/get_jy_list.do',
    })
  },
  transactionList({ axios }, params) {
    // 新搜索交易商品列表
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/commodity/v2/get_serve_list.do',
    })
  },
  // /service/nk/commodity/v2/get_filter_code.do
  getCategoryCodes({ axios }, params) {
    // 获取分类codes
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/commodity/v2/get_filter_code.do',
    })
  },
}
export default goods
