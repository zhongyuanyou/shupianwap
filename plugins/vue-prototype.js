import Vue from 'vue'
import Pdf from '@fe/vue-pdf'
import { appHandler } from './app-sdk'

export default ({ app, store, route }) => {
  /**
   * @Desc: 扩展从app回退,以及页面回退
   */
  Vue.prototype.$back = () => {
    console.log('回退按钮')
    if (store.state.app.isInApp) {
      appHandler.dggWebGoBack((res) => { 
        console.log('回退按钮App返回',res)
      })
    } else {
      console.log('回退按钮wap返回')
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
    })
  }

  /**
   * 引入pdf插件
   */
  Vue.prototype.$pdf = Pdf
}
