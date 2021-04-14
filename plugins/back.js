import Vue from 'vue'
import { appHandler } from './app-sdk'

export default ({ app, store }) => {
  Vue.prototype.$back = () => {
    if (store.state.app.isInApp) {
      appHandler.dggWebGoBack((res) => {})
    } else {
      app.router.back()
    }
  }
}
