'use strict'
import { request } from '@/utils/request'
// import { CHIPS_WAP_BASE_URL } from '@/config/constant'
const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service/'
const known = {
  add({ axios }, params) {
    // 添加文章/回答/问题
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + 'nk/question_article/v2/add',
    })
  },
}
export default known
