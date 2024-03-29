'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.133.214:7001/service'

const knownApi = {
  comments: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/list.do`, // 评论列表
    publish: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/publish.do`, // 发布评论
    like: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/like.do`, // 点赞评论
    delete: `${CHIPS_WAP_BASE_URL}/nk/known_comments/v1/delete.do`, // 删除评论
  },
  home: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/index.do`, // 文章、问题、回答列表
    userInfo: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/homeUserInfo.do`, // 用户信息
    operation: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/operation.do`, // 点赞、点踩、收藏操作(包含取消)
    focusFansList: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/focusFansList.do`, // 粉丝/关注 列表
    attention: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_user_relations.do`, // 用户关注/取消关注其他用户
    collection: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/collection.do`, // 我的收藏列表 1问题 2文章 3回答
    adList: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/adList.do`, // 我的收藏列表 1问题 2文章 3回答
  },
  questionArticle: {
    categoryList: `${CHIPS_WAP_BASE_URL}/nk/known_category/v1/list.do`, // 获取分类列表
    list: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_page.do`, // 获取列表数据
    webList: '/crisps-cms-web-api/nk/api/questionArticle/find_page',
    recommendList: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/recommend_page.do`, // 获取推荐列表数据
    attentionUserList: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_my_attention_user_page.do`, // 获取关注用户动态列表
    subjectList: `${CHIPS_WAP_BASE_URL}/nk/known_category/v1/subject.do`, // 获取分类列表
    attentionMore: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/attention_more.do`, // 关注更多列表
    detail: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_detail.do`,

    articleDetail: `${CHIPS_WAP_BASE_URL}/nk/known_share/v1/article_detail.do`,
    anserShareDetail: `${CHIPS_WAP_BASE_URL}/nk/known_share/v1/anser_detail.do`, // 回答分享详情
    recommendArticle: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/recommendArticle.do`,
    findAttention: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/findAttention.do`,
    findMyInvitedPage: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_my_invited_page.do`, // 我被邀请回答的问题分页查询
    findListByStatus: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_page_bystatus.do`, // 搜索 文章 | 问题 | 回答 list
  },
  content: {
    add: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/add.do`, // 文章、问题、回答新增 新增内容
    dlt: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/delete.do`, // 文章、问题、回答新增 删除
    edit: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/update.do`, // 文章、问题、回答新增 删除
    topic: `${CHIPS_WAP_BASE_URL}/nk/known_category/v1/topic.do`, // 话题列表 1代表返回的数据中只有一级分类 2代表返回的数据中包含一级分类和二级分类
  },
  question: {
    list: `${CHIPS_WAP_BASE_URL}/service/nk/question_article/v2/find_page.do`,
    detail: `${CHIPS_WAP_BASE_URL}/nk/question_article/v2/find_detail.do`,
    searchAnswerUser: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/searchAnswerUser.do`, // 搜索回答用户|GET
    recommendAnswerUser: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/recommendAnswerUser.do`, // 推荐回答用户|GET
    invite: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/invite.do`, // 邀请用户回答|POST
    writeAnswer: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/writeAnswer.do`, // 写回答列表（推荐、邀请）| GET
  },
  search: {
    list: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/search.do`, // 搜索历史记录 搜索类型 1: 问题  2: 文章  3: 用户
    listV2: `${CHIPS_WAP_BASE_URL}/nk/known_home/v2/search.do`,
  },
  createCenter: {
    findListByStatus: `${CHIPS_WAP_BASE_URL}/yk/known/v2/find_question_article_bystatus.do`, // 搜索 文章 | 问题 | 回答 list
  },
  video: {
    videoList: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/video_list.do`, // 查询视频列表
    videoDetail: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/video_detail.do`, // 查询视频详情
    videoUserDetail: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/video_user_detail.do`, // 查询视频详情,包含用户信息及头像
    courseList: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/course_list.do`, // 查询课程列表
    courseDetail: `${CHIPS_WAP_BASE_URL}/nk/known_home/v1/course_detail.do`, // 查询课程详情
    materialVideoShare: `${CHIPS_WAP_BASE_URL}/nk/known_share/v1/material_video_share.do`, // 分享物料视频id
  },
}
export default knownApi
