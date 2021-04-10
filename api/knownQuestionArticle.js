'use strict'
import { request } from '@/utils/request'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'

const knownQuestionArticle = {
  // 获取分类列表
  categoryList(params) {
    return request({
      params,
      method: 'get',
      url: CHIPS_WAP_BASE_URL + '/nk/known_category/v1/list.do',
    })
  },
  // 获取问题，文章，回答的常规列表列表数据
  list(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/question_article/v2/find_page.do',
    })
  },
  // 获取热榜数据列表
  hotlist(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/question_article/v2/find_hot_page.do',
    })
  },
}
export default knownQuestionArticle
