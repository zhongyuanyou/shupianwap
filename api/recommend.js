'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const recommendApi = {
  recommendProduct: `${CHIPS_WAP_BASE_URL}/nk/recommend/v1/product.do`, // 推荐产品
  saleList: `${CHIPS_WAP_BASE_URL}/nk/recommend/v2/selling_goods.do`, // 推荐商品
}
export { recommendApi }
