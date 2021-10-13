'use strict'

import { CHIPS_WAP_BASE_URL, CHIPS_APP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.132.54:7001/service'
const recommendApi = {
  recommendProduct: `${CHIPS_WAP_BASE_URL}/nk/recommend/v1/product.do`, // 推荐产品
  saleList: `${CHIPS_WAP_BASE_URL}/nk/recommend/v2/selling_goods.do`, // 推荐商品
  saleListApp: `${CHIPS_APP_BASE_URL}/nk/sale/goods/v2/find_recommend.do`, // 推荐商品APP中间层的
}
export { recommendApi }
