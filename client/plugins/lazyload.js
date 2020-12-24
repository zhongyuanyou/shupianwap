import Vue from 'vue'
import { Lazyload } from '@chipspc/vant-dgg'
export default () => {
  Vue.use(Lazyload, {
    preLoad: 1,
    loading: '',
    attempt: 1,
  })
}
