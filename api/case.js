'use strict'

// import { CHIPS_PC_URL } from '../config/constant'
import { request } from '@/utils/request'
const CHIPS_PC_URL="http://172.16.132.83:7002/service"
const caseApi = {


  /**
   * 申请发票
   * java
   * @link http://yapi.dgg.cn/project/1334/interface/api/108709
   * node中间层
   * @link http://yapi.dgg.cn/project/935/interface/api/114533
   * @param {object} params
   * @param {[{column,asc}]} params.orderItems column排序字段,asc：true正序
   * @param {array} params.ids 产品id集合
   * @param {array} params.upOrDown 上架状态 0下架 1上架 默认1
   * @param {string} params.productTypeCode	产品类型
   * @param {string} params.productOneBelongCode	产品一级分类
   * @param {string} params.productTwoBelongCode	产品二级分类
   * @param {string} params.productThreeBelongCode	产品三级分类
   * @param {string} params.dealProvince 省
   * @param {string} params.dealCity 市
   * @param {string} params.dealArea 区
   * @returns
   */
   case_list( params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_PC_URL + '/nk/case/v1/case_list.do',
    })
  },

/**
 * @link http://yapi.dgg.cn/project/935/interface/api/114563
 * @param {object} params
 * @param {number} params.id
 * @returns
 */
  case_detail( params) {
    return request({
      params,
      method: 'get',
      url: CHIPS_PC_URL + '/nk/case/v1/case_detail.do',
    })
  },

}


export { caseApi }
