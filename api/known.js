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
  content: {
    add: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/add.do`, // 文章、问题、回答新增 新增内容
    dlt: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/delete.do`, // 文章、问题、回答新增 删除
    edit: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/update.do`, // 文章、问题、回答新增 删除
  },
}
export default knownApi
