/*
 * @Author: your name
 * @Date: 2020-02-21 04:16:27
 * @LastEditTime: 2020-12-31 11:11:43
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
  'my-planner', // 我的规划师页面
  'shoppingCar', // 购物车页面
  'my-help', // 帮助中心
  'spread-myDemandCard', // 免费找
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
      // 第三方跳转登录页清除token
      if (to.query.sourcePlatform) {
        store.dispatch('user/clearUser')
      }
      const token = app.$cookies.get('token') // 获取缓存用户token
      if (!store.state.app.isInApp) {
        if (token) {
          if (to.path === loginRoutePath) {
            // 如果跳转登录页面，将被重定向到首页
            next({
              path: defaultRoutePath,
            })
          } else {
            next()
          }
        } else if (routerBlackList.includes(to.path)) {
          next({
            path: loginRoutePath,
            query: { redirect: to.path },
          })
        } else {
          next()
        }
      } else {
        // 验证跳转页面是否嵌入app中后是否需获取app中到用户详情
        // eslint-disable-next-line no-lonely-if
        if (store.state.app.isInApp && infoList.includes(to.name)) {
          // 若跳转的页面在infoList中，则需要执行app请求用户信息操作
          appHandler.dggGetUserInfo((res) => {
            if (res.code === 200) {
              try {
                // const userInfo = res.data || {}
                let userInfo = {}
                if (typeof res.data === 'string') {
                  userInfo = JSON.parse(res.data)
                } else {
                  userInfo = res.data
                }
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
