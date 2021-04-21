import Vue from 'vue'
import { appHandler } from './app-sdk'

export default ({ app, store, route }) => {
  Vue.prototype.$back = () => {
    if (store.state.app.isInApp) {
      appHandler.dggWebGoBack((res) => {})
    } else {
      app.router.back()
    }
  }

  Vue.prototype.$isLogin = async () => {
    if (store.state.user.userId && store.state.user.token) {
      return true
    } else if (store.state.app.isInApp) {
      await this.$appFn.dggLogin()
    } else {
      app.router.push({
        path: '/login',
        query: {
          redirect: route.fullPath,
        },
      })
    }
  }
}
