/*
 * @Author: tdb
 * @Date: 2021-06-09 11:34:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-09 11:34:00
 * @Description: 收藏功能，店铺功能
 * @FilePath: /chips-wap/client/api/search.js
 */

import { CHIPS_WAP_BASE_URL, CHIPS_MERCHANT_URL } from '../config/constant'

const shopApi = {
  addGoods: `${CHIPS_WAP_BASE_URL}/yk/save/v1/add_goods.do`, // 新增
  dltGoods: `${CHIPS_WAP_BASE_URL}/yk/save/v1/dlt_goods.do`, // 删除
  saveList: `${CHIPS_WAP_BASE_URL}/yk/save/v1/save_list.do`, // 收藏列表
  checkSave: `${CHIPS_WAP_BASE_URL}/yk/save/v1/check_save.do`, // 是否收藏
  batchCanelSave: `${CHIPS_WAP_BASE_URL}/yk/save/v1/batch_dlt_goods.do`, // 批量取消收藏 根据收藏id
  cancelSave: `${CHIPS_MERCHANT_URL}/yk/ordinary/user_personal_shop/v1/delete_personal_by_goods_id_or_code.do`, // 商户中心取消收藏
}
export { shopApi }
