'use strict'
import qs from 'qs'

const demo = {
  queryDemoList({ $axios }, params) {
    return $axios({
      method: 'get',
      headers: { 'x-cache-control': 'cache' },
      url: '/chips-wap/service/yk/demo/v1/get_test',
      params,
    })
  },
  addDemoData({ $axios }, params) {
    return $axios({
      method: 'post',
      url: '/chips-wap/service/yk/demo/v1/post_test',
      data: qs.stringify(params),
    })
  },
}
export default demo
