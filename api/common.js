'use strict'

import { CHIPS_WAP_BASE_URL, CHIPS_RESOURCE_URL } from '~/config/constant'

const commonApi = {
  detail: `${CHIPS_WAP_BASE_URL}/nk/category/v1/category_detail.do`, // 查询分类
  subForm: `${CHIPS_RESOURCE_URL}/nk/v1/business/add_allot_resource.do`, // 资源表单 对接客源中心 20210630版本
}
export { commonApi }
