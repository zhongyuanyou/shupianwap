import Vue from 'vue'
import { Lazyload } from '@chipspc/vant-dgg'
export default () => {
  Vue.use(Lazyload, {
    preLoad: 1,
    loading:
      'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg?x-oss-process=image/resize,m_fill,w_240,h_240,limit_0',
    attempt: 1,
  })
}
