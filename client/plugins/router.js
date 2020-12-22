/*
 * @Author: your name
 * @Date: 2020-02-21 04:16:27
 * @LastEditTime: 2020-02-21 19:51:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /xdy-wap/plugins/router.js
 */
import Vue from 'vue'
import { imInit } from '@/utils/im'
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      Vue.nextTick(() => {
        dggSensors.quick('autoTrackSinglePage')

        // 已登录用户，若未初始化IM，进行IM初始化
        const { token, userId, userType } = store.state.user.userInfo
        if (!store.state.im.imSdk && token) {
          // 初始化IM
          const initImSdk = imInit({
            token,
            userId,
            userType,
          })
          store.commit('im/SET_IM_SDK', initImSdk)
        }
      })
    }
    next()
  })
}
