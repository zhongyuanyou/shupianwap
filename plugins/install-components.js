import Vue from 'vue'
import { spMobileUpload } from '@fe/sp-ui-mobile'
import spToast from '@/components/common/spToast/install.js'
import openApp from '@/components/common/app/OpenApp.vue'
export default () => {
  Vue.use(spToast)
  Vue.component('spMobileUpload', spMobileUpload)
  Vue.component('openApp', openApp)
}
