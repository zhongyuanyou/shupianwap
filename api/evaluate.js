'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const evaluateApi = {
  detail: `${CHIPS_WAP_BASE_URL}/yk/evaluate/v1/get_evaluate_detail.do`, // 首页首屏服务端初始化请求数据
  list: `${CHIPS_WAP_BASE_URL}/yk/evaluate/v1/get_evaluate_list.do`, // 评论列表
  add: `${CHIPS_WAP_BASE_URL}/yk/evaluate/v1/add_evaluate.do`, // 提交评论
  evaluateNum: `${CHIPS_WAP_BASE_URL}/yk/evaluate/v1/evaluate_num.do`, // 获取待评价数量 | GET
  getAvatar: `${CHIPS_WAP_BASE_URL}/nk/planner/v1/get_avatar.do`, // 获取头像 | GET
}
export { evaluateApi }
