'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
const knownApi = {
  comments: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/list.do`, // 评论列表
    publish: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/publish.do`, // 发布评论
  },
  home: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/index.do`, // 文章、问题、回答列表
    userInfo: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/userInfo.do`, // 用户信息
  },
  questionArticle: {
    categoryList: `${CHIPS_WAP_BASE_URL}/nk/known_category/v1/list.do`, // 获取分类列表
    list: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_page.do`, // 获取列表数据
  },
}
export default knownApi
