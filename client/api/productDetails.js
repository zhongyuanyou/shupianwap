'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const productDetailsApi = {
  scProductDetail: `${CHIPS_WAP_BASE_URL}/service/nk/sc_product/v1/detail.do`, // 产品基本信息(基本信息+运营信息（富文本字段就是服务详情）+基本服务项目+SKU属性ID列表)
}
export default productDetailsApi
