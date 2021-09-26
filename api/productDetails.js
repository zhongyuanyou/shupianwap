'use strict'

import { CHIPS_WAP_BASE_URL, CHIPS_PC_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.132.240:7001/service'
const productDetailsApi = {
  scProductDetail: `${CHIPS_WAP_BASE_URL}/nk/sc_product/v1/detail.do`, // 服务产品基本信息(基本信息+运营信息（富文本字段就是服务详情）+基本服务项目+SKU属性ID列表)
  recPlanner: `${CHIPS_WAP_BASE_URL}/nk/recommend/v1/planner.do`, // 服务获取推荐规划师
  tcProductDetail: `${CHIPS_WAP_BASE_URL}/nk/tc_product/v1/detail.do`, // 交易产品详情信息
  sellingGoodsDetail: `${CHIPS_WAP_BASE_URL}/nk/selling_goods/v2/detail.do`, // 销售商品详情
  findServiceAttr: `${CHIPS_WAP_BASE_URL}/nk/selling_goods/v2/find_service_attr.do`, // 查询产品SKU
  sales_product_details: `${CHIPS_PC_URL}/nk/product/v1/sales_product_details.do`, // 批量查询销售商品
  financing: {
    // 详情页中,融资对应api
    get_city: `${CHIPS_WAP_BASE_URL}/nk/selling_goods/v1/financing_city_list.do`, // 查询城市
  },
}
export default productDetailsApi
