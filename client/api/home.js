/*
 * @Author: ma liang
 * @Date: 2020-12-10 10:00:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-10 10:00:00
 * @Description: file content
 * @FilePath: /chips-wap/client/api/home.js
 */

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const homeApi = {
  initRequest: `${CHIPS_WAP_BASE_URL}/nk/home/v1/get_home_data.do`, // 首页首屏服务端初始化请求数据（导航 + 广告）
  asyncRequest: `${CHIPS_WAP_BASE_URL}/nk/home/v1/get_home_asyn_data.do`, // 首页异步加载数据 （广告+资讯）
}
export { homeApi }
