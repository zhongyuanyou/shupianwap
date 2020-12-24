import Vue from 'vue'
import { Lazyload } from '@chipspc/vant-dgg'
export default () => {
  Vue.use(Lazyload, {
    preLoad: 1,
    loading:
      'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/index/ailImg.png',
    attempt: 1,
  })
}
