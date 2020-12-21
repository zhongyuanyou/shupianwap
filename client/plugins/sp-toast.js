import Vue from 'vue'
import { Toast } from '@chipspc/vant-dgg'
export default () => {
  Vue.prototype.$spToast = (
    params = {},
    iconPrefix = 'spiconfont',
    className = 'spToast'
  ) => {
    Toast({ ...params, iconPrefix, className })
  }
}
