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
    userInfo: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/homeUserInfo.do`, // 用户信息
    operation: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/operation.do`, // 点赞、点踩、收藏操作(包含取消)
    focusFansList: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/focusFansList.do`, // 粉丝/关注 列表
    attention: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_user_relations.do`, // 用户关注/取消关注其他用户
  },
  questionArticle: {
    categoryList: `${CHIPS_WAP_BASE_URL}/nk/known_category/v1/list.do`, // 获取分类列表
    list: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_page.do`, // 获取列表数据
    recommendList: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/recommend_page.do`, // 获取推荐列表数据
    attentionUserList: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_my_attention_user_page.do`, // 获取关注用户列表
  },
  content: {
    add: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/add.do`, // 文章、问题、回答新增 新增内容
    dlt: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/delete.do`, // 文章、问题、回答新增 删除
    edit: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/update.do`, // 文章、问题、回答新增 删除
  },
  question: {
    list: `${CHIPS_WAP_BASE_URL}/service/nk/question_article/v2/find_page.do`,
    detail: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_detail.do`,
  },
  search: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/search.do`, // 搜索历史记录 搜索类型 1: 问题  2: 文章  3: 用户
  },
}
export default knownApi
