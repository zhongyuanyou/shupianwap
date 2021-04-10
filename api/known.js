'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const knownApi = {
  comments: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/list.do`, // 评论列表
    publish: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/publish.do`, // 发布评论
    like: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/like.do`, // 点赞评论
  },
  home: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/index.do`, // 文章、问题、回答列表
    userInfo: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/userInfo.do`, // 用户信息
    operation: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/operation.do`, // 点赞、点踩、收藏操作(包含取消)
  },
  question: {
    list: `${CHIPS_WAP_BASE_URL}/service/nk/question_article/v2/find_page.do`,
    detail: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_detail.do`,
  },
}
export default knownApi
