'use strict'
import { CHIPS_WAP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.132.163:7001/service'
// const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
const activityApi = {
  activityTypeOptions: `${CHIPS_WAP_BASE_URL}/nk/activity/v1/activity_type_options.do`, // 活动选项
  activityProductList: `${CHIPS_WAP_BASE_URL}/nk/activity/v1/activity_product_list.do`, // 活动产品列表
  activityAdvertising: `${CHIPS_WAP_BASE_URL}/nk/activity/v1/advertising.do`, // 广告位
}
export { activityApi }
