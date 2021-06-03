import Vue from 'vue'
import SpUIMobile from '@fe/sp-ui-mobile'
import spToast from '@/components/common/spToast'
import openApp from '@/components/common/app/OpenApp.vue'
import SpVideo from '@/components/common/spVideo'
export default () => {
  Vue.use(spToast)
  Vue.use(SpUIMobile)
  Vue.use(SpVideo)
  Vue.component('openApp', openApp)
}
