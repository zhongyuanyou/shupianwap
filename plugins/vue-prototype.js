import Vue from 'vue'
import { appHandler } from './app-sdk'

export default ({ app, store, route }) => {
  /**
   * @Desc: 扩展从app回退,以及页面回退
   */
  Vue.prototype.$back = () => {
    if (store.state.app.isInApp) {
      appHandler.dggWebGoBack((res) => {})
    } else {
      app.router.back()
    }
  }

  /**
   * @returns 扩展登录,包含app登录,以及普通登录。app登录需返回值
   */
  Vue.prototype.$isLogin = () => {
    return new Promise((resolve, reject) => {
      if (store.state.user.userId && store.state.user.token) {
        resolve(true)
      } else if (store.state.app.isInApp) {
        appHandler.dggLogin((res) => {
          if (res.code === 200) {
            store.commit('user/SET_USER', res.data)
            resolve('app_login_success')
          } else {
            resolve('error')
          }
        })
      } else {
        resolve('needlogin')
      }
    })
  }
}
