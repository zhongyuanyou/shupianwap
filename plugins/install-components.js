import Vue from 'vue'
import Pdf from '@fe/vue-pdf'
import SpUIMobile from '@fe/sp-ui-mobile'
import spToast from '@/components/common/spToast'
import openApp from '@/components/common/app/OpenApp.vue'
export default () => {
  Vue.use(spToast)
  Vue.use(SpUIMobile)
  Vue.component('openApp', openApp)
  Vue.component('pdf', Pdf)
}
