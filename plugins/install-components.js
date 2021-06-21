import Vue from 'vue'
import Pdf from '@fe/vue-pdf'
import SpUIMobile from '@fe/sp-ui-mobile'
import spVideo from '@/components/common/spVideo'
import spToast from '@/components/common/spToast'
import openApp from '@/components/common/app/OpenApp.vue'

export default () => {
  Vue.use(spToast)
  Vue.use(SpUIMobile)
  Vue.use(spVideo)
  Vue.component('openApp', openApp)
  Vue.component('pdf', Pdf)
}
