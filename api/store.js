'use strict'
/*
 * @Author: majinghe
 * @Date: 2021-07-13 2:12:06 PM
 * @Description: 店铺中心API
 */

import { CHIPS_PC_URL } from '../config/constant'

const storeApi = {
  plannerStoreInfo: `${CHIPS_PC_URL}/yk/save/v1/add_goods.do`, // 规划师店铺详情
  mchStoreInfo: `${CHIPS_PC_URL}/nk/store/v1/mch_store_info.do`, // 商户/团队店铺详情
  recommendGoods: `${CHIPS_PC_URL}/nk/store/v1/recommend_goods.do`, // 获得推荐商品列表
}
export { storeApi }
