/*
 * @Author: your name
 * @Date: 2020-02-21 04:16:27
 * @LastEditTime: 2020-12-29 09:51:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/plugins/router.js
 */
import Vue from 'vue'
import { appHandler } from './app-sdk'
import { imInit } from '@/utils/im'
import routerBlackList from '@/config/routerBlackList'
const infoList = [
  'my-shippingAddress', // 收货地址列表页面
  'my-interviewRecord', // 面谈记录列表页面
  'my-complain', // 新增吐槽页面
  'shoppingCar', // 购物车页面
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
      const loginRoutePath = '/login' // 登录路由
      const defaultRoutePath = '/' // 首页路由
      // 路由守卫
      const token = app.$cookies.get('token') // 获取缓存用户token
      if (!store.state.app.isInApp) {
        if (token) {
          // 若用户已登录
          try {
            if (to.path === loginRoutePath) {
              // 如果跳转登录页面，将被重定向到首页
              next({
                path: defaultRoutePath,
              })
            } else {
              next()
            }
          } catch (err) {
            console.log('错误', err)
          }
        } else {
          // 若用户未登录
          // eslint-disable-next-line no-lonely-if
          if (routerBlackList.includes(to.path)) {
            next({
              path: loginRoutePath,
            })
          } else {
            next()
          }
        }
      } else {
        // 验证跳转页面是否嵌入app中后是否需获取app中到用户详情
        // eslint-disable-next-line no-lonely-if
        if (store.state.app.isInApp && infoList.includes(to.name)) {
          // 若跳转的页面在infoList中，则需要执行app请求用户信息操作
          appHandler.dggGetUserInfo((res) => {
            if (res.code === 200) {
              try {
                const userInfo = JSON.parse(res.data)
                console.log('来自app的userInfo：', userInfo)
                if (userInfo && userInfo.userId && userInfo.token) {
                  store.commit('user/SET_USER', userInfo)
                }
                next()
              } catch (err) {
                next()
              }
            }
          })
        } else {
          next()
        }
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
    // if (!store.state.app.isInApp) {
    //   next()
    // }
  })
}
