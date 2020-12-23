'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const productDetailsApi = {
  scProductDetail: `${CHIPS_WAP_BASE_URL}/nk/sc_product/v1/detail.do`, // 服务产品基本信息(基本信息+运营信息（富文本字段就是服务详情）+基本服务项目+SKU属性ID列表)
  recPlanner: `${CHIPS_WAP_BASE_URL}/nk/recommend/v1/planner.do`, // 服务获取推荐规划师
  tcProductDetail: `${CHIPS_WAP_BASE_URL}/nk/tc_product/v1/detail.do`, // 交易产品详情信息
}
export default productDetailsApi
