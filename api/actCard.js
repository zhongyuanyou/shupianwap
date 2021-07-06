'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL, CHIPS_PC_URL } from '@/config/constant'

const actCard = {
  // ------------- 以下是活动卡
  /**
   *
   * @param {object} param0
   * @param {object} params
   * @param {number} params.type 活动卡优惠类型 1：折扣 2：满减
   * @param {number} params.page
   * @param {number} params.limit
   * @returns
   */
  // 分页查询活动卡
  act_card_list({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/nk/marking/act_card_list.do',
    })
  },
  /**
   * 商品活动卡查询
   * @param {object} param0
   * @param {object} params
   * @param {string} params.condition 查询条件 1 查询可用 2查询不可用
   * @param {array} params.productList 商品列表
   * @returns
   */
  goods_card_list({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/nk/marking/goods_card_list.do',
    })
  },

  /**
   * 用户活动卡详情查询
   * @param {object} param0
   * @param {object} params
   * @param {string} params.userCardId
   * @returns
   */
  user_card_detail_one({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/nk/marking/user_card_detail_one.do',
    })
  },

  /**
 * 活动卡详情查询单个
 * @param {object} param0
 * @param {object} params
 * @param {string} params.id
 * @returns
 */
  act_card_detail_one({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/nk/marking/act_card_detail_one.do',
    })
  },

  /**
    * 用户活动卡列表
     * @param {object} param0
     * @param {object} params
     * @param {object} params
     * @param {object} params.orderBy
     * @param {object} params.condition 排序 1 时间倒叙 2时间正序 默认1
     * @param {object} params.page
     * @param {object} params.limit
     * @returns
   */
  user_act_card_list({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/nk/marking/user_act_card_list.do',
    })
  },

  /**
   * 虚拟商品下单活动卡下单
   * @param {object} param0
   * @param {object} params
   * @returns
   */
  add_order({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/nk/marking/user_act_card_list.do',
    })
  },
}

export default actCard
