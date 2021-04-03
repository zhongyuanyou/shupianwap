'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const knownApi = {
  comments: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/list.do`, // 首页首屏服务端初始化请求数据
    publish: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/publish.do`, // 首页首屏服务端初始化请求数据
  },
}
export default knownApi
