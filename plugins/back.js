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

  Vue.prototype.$isLogin = () => {
    if (store.state.user.userId && store.state.user.token) {
      return true
    } else if (store.state.app.isInApp) {
      appHandler.dggLogin((res) => {
        if (res.code === 200) {
          store.commit('user/SET_USER', res.data)
          return 'app_login_success'
        }
      })
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
