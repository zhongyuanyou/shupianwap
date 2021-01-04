import Vue from 'vue'
import spToast from '@/components/common/spToast/install.js'
import openApp from '@/components/common/app/OpenApp.vue'
export default () => {
  Vue.use(spToast)
  Vue.component('openApp', openApp)
}
