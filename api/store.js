'use strict'
/*
 * @Author: majinghe
 * @Date: 2021-07-13 2:12:06 PM
 * @Description: 店铺中心API
 */

import { CHIPS_PC_URL,CHIPS_WAP_BASE_URL } from '../config/constant'
const storeApi = {
  plannerDetail:`${CHIPS_PC_URL}/nk/plannerCard/v1/planner_detail.do`,// 规划师名片
  plannerStoreInfo: `${CHIPS_PC_URL}/nk/store/v1/planner_store_info.do`, // 规划师店铺详情
  mchStoreInfo: `${CHIPS_PC_URL}/nk/store/v1/mch_store_info.do`, // 商户/团队店铺详情
  recommendGoods: `${CHIPS_PC_URL}/nk/store/v1/recommend_goods.do`, // 获得推荐商品列表
}
export { storeApi }
