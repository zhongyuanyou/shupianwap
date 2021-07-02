/*
 * @Author:tdb
 * @Date: 2021-07-01 15:19:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-01 15:19:00
 * @Description: 营销活动卡API
 * @FilePath: /chips-wap/client/api/card.js
 */

import { CHIPS_PC_URL } from '../config/constant'

const cardApi = {
  userCardList: `${CHIPS_PC_URL}/yk/marking/user_act_card_list.do`, // 用户已领活动卡 get
  userCardDetail: `${CHIPS_PC_URL}/yk/marking/user_act_card_detail.do`, // 用户活动卡使用详情 get
  goodsCardList: `${CHIPS_PC_URL}/yk/marking/goods_card_list.do`, // 当前用户该商品可用活动卡 post
  cardList: `${CHIPS_PC_URL}/nk/marking/act_card_list.do`, // 活动卡列表 get
  cardDetail: `${CHIPS_PC_URL}/nk/marking/act_card_detail_one.do`, // 活动卡详情 get
}
export default cardApi
