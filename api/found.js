'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const foundApi = {
  initRequest: `${CHIPS_WAP_BASE_URL}/nk/information/v1/home.do`, // 首页首屏服务端初始化请求数据
  screenRequest: `${CHIPS_WAP_BASE_URL}/nk/information/v1/banner_information.do`, // 获取每个分类第一屏
  infoDetail: `${CHIPS_WAP_BASE_URL}/nk/information/v1/detail.do`, // 获取资讯详情
  infoList: `${CHIPS_WAP_BASE_URL}/nk/information/v1/list.do`, // 获取资讯列表
}
export { foundApi }
