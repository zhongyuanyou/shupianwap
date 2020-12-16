/*
 * @Author: xiao pu
 * @Date: 2020-12-14 09:17:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-15 16:03:30
 * @Description: file content
 * @FilePath: /chips-wap/client/api/planner.js
 */
'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const planner = {
  /**
   * @description 规划师列表接口
   * @param {string} plannerName 规划师姓名
   * @param {Object} regionDto 区域
   * @param {number} regionDto.codeState 区域类型
   * @param {String[]} regionDto.regions 区域code
   * @param {Object} sort 排序
   * @param {string} sort.sortType 排序方式 "pointSort":积分排序, "reputationSort":好评率排序 , "payNumSort":成交次数排序
   * @param {number} sort.value 排序类型 1:升序 ,  2:降序
   * @param {string} userId 用户ID
   * @param {number} status 在职状态(-1全部 0禁用/小黑屋 1启用 3离职）默认 全部
   * @param {number} limit 当前页最多条数
   * @param {number} page 当前页
   * @returns {promise}
   */
  list(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/planner/v1/list.do',
    })
  },

  /**
   * @description 规划师详情接口
   * @param {Object} params 请求参数
   * @param {string} params.id 规划师id
   * @returns {promise}
   */
  detail(params) {
    return request({
      params,
      url: CHIPS_WAP_BASE_URL + '/nk/planner/v1/detail.do',
    })
  },

  /**
   * @description 获取电话号码
   * @param {string} id 业务id  (如:商户id,商户用户id,联系人id)
   * @param {string} sensitiveInfoType 类型：预约人手机号:APPOINTMENT 商户用户手机号: MCH_USER 商户超管手机号：MCH_ADMIN_USER 商户法人身份证号：MCH_LEGAL_PERSON_CARD_NO 联系人手机号: MCH_LINK_MAN 用户的身份证号码: MCH_USER_PERSON_CARD_NO, 默认：MCH_USER
   * @returns {promise}
   */
  tel(params) {
    return request({
      params,
      url: CHIPS_WAP_BASE_URL + '/nk/planner/v1/tel.do',
    })
  },
}
export default planner
