/*
 * @Author: ma liang
 * @Date: 2020-12-12 14:27:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 14:27:00
 * @Description: file content
 * @FilePath: /chips-wap/client/api/public.js
 */

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const publicApi = {
  findAdvertising: `${CHIPS_WAP_BASE_URL}/nk/public/v1/find_advertising.do`, // 查询广告
  descrptionPhone: `${CHIPS_WAP_BASE_URL}/yk/biz_business/v1/show_real_phone.do`, // 电话解密
}
export { publicApi }
