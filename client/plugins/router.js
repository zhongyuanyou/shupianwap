/*
 * @Author: your name
 * @Date: 2020-02-21 04:16:27
 * @LastEditTime: 2020-02-21 19:51:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /xdy-wap/plugins/router.js
 */
import Vue from 'vue'
import { appHandler } from './app-sdk'
import { imInit } from '@/utils/im'
const infoList = [
  'my-shippingAddress', // 收货地址列表页面
  'my-interviewRecord', // 面谈记录列表页面
  'my-complain', // 新增吐槽页面
]
// const getInfo = function () {
//   return new Promise(function (resolve, reject) {
//     appHandler.dggGetUserInfo((res) => {
//       if (res.code === 200) {
//         const userInfo = JSON.parse(res.data)
//         resolve(userInfo)
//       }
//     })
//   })
// }
export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.client) {
      if (store.state.app.isInApp && infoList.includes(to.name)) {
        // 若跳转的页面在infoList中，则需要执行app请求用户信息操作
        appHandler.dggGetUserInfo((res) => {
          if (res.code === 200) {
            const userInfo = JSON.parse(res.data)
            if (userInfo.userId && userInfo.token) {
              store.commit('user/SET_USER', userInfo)
              next()
            }
          }
        })
      } else {
        next()
      }
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
    if (!store.state.app.isInApp) {
      next()
    }
  })
}
