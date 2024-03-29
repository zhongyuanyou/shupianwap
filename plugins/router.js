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
import getUserSign from '~/utils/fingerprint'

const infoList = [
  'my-shippingAddress', // 收货地址列表页面
  'my-interviewRecord', // 面谈记录列表页面
  'my-complain', // 新增吐槽页面
  'my-planner', // 我的规划师页面
  'shoppingCar', // 购物车页面
  'my-help', // 帮助中心
  'spread-myDemandCard', // 免费找
  'known',
  'known-home', // 必懂个人主页
  'known-home-attention', // 必懂个人主页
  'known-home-fans', // 必懂个人主页
  'known-home-list', // 必懂个人主页
  'known-more',
  'known-search',
  'known-search-result',
  'known-publish-answer',
  'known-publish-article',
  'known-publish-chooseque',
  'known-publish-question',
  'known-detail-answer',
  'known-detail-article',
  'known-detail-question',
  'known-detail-invitationList',
  'known-detail-invitationSearch',
  'my-collection',
  'activity-coupon',
  'order-invoice',
  'order-invoice-detail',
  'order-invoice-headAdd',
  'order-invoice-headEdit',
  'order-invoice-invoiceApply',
  'order-invoice-preview',
  'NeedCard',
  'my-coupon',
  'myDemandCard',
  'order',
  'order-confirmUnSubmitOrder',
  'order-detail',
  'detail-server-financing-creditEvaluation',
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
  app.router.afterEach(() => {
    Vue.nextTick(() => {
      window.spptMd.quick('autoTrackSinglePage')
    })
  })
  app.router.beforeEach((to, from, next) => {
    const query = to.query
    // APP里导航栏参数处理
    if (
      from.query &&
      from.query.isHideH5Nav &&
      from.query.isHideH5Nav !== '0' &&
      !to.query.isHideH5Nav
    ) {
      query.isHideH5Nav = '1'
      next({
        path: to.path,
        query,
      })
    }
    if (to.name === 'detail') {
      // 跳转至服务商品详情页路由重定向处理
      if (to.query && to.query.classCodeOne) {
        const code1 = to.query.classCodeOne
        const urlObj = {
          FL20210425164438: '/detail/server/zscq', // 商标
          FL20210425164496: '/detail/server/zscq', // 专利
          FL20210425164558: '/detail/server/financing', // 融资
          FL20210604312000: '/detail/server/law', // 法律
          FL20210428166370: '/detail/server/law', // 法律
          FL20210526292003: '/detail/server/internet', // IT 互联网
          FL20210425164016: '/detail/server/internet', // IT 互联网
        }
        const detailUrl = urlObj[code1] || '/detail'
        delete to.query.classCodeOne
        const queryData = Object.assign(to.query, {
          productId: to.query.productId,
        })
        next({
          path: detailUrl,
          query: queryData,
        })
      }
    }

    if (process.client) {
      const loginRoutePath = '/login' // 登录路由
      const defaultRoutePath = '/' // 首页路由
      // 路由守卫
      // 第三方跳转登录页清除token
      if (to.query.sourcePlatform) {
        store.dispatch('user/clearUser')
      }
      const token = app.$cookies.get('token') // 获取缓存用户token
      if (token) {
        if (!store.state.user.userInfo.token || !store.state.user.token) {
          const userId = app.$cookies.get('userId')
          const userName = app.$cookies.get('userName')
          const userType = app.$cookies.get('userType')
          const userPhone = app.$cookies.get('userPhone')
          const avatar = app.$cookies.get('avatar')
          store.dispatch('user/setUser', {
            token,
            userId,
            userName,
            userType,
            userPhone,
            avatar,
          })
        }
      }
      if (!store.state.app.isInApp && !store.state.app.isApplets) {
        // wap页面中
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
      } else if (store.state.app.isApplets && !store.state.app.isInApp) {
        // 小程序中
        // 获取小程序中本地缓存的用户信息
        // if (routerBlackList.includes(to.path)) {
        //   if (store.state.user.token && store.state.user.userId) {
        //     next()
        //   } else {
        //     const uni = Vue.prototype.uni
        //     uni.navigateTo({
        //       url: '/pages/my_son/login/wxLogin',
        //     })
        //   }
        // }
        next()
      } else {
        // app中
        // 验证跳转页面是否嵌入app中后是否需获取app中到用户详情
        // eslint-disable-next-line no-lonely-if
        if (store.state.app.isInApp && infoList.includes(to.name)) {
          // 若跳转的页面在infoList中，则需要执行app请求用户信息操作
          appHandler.dggGetUserInfo((res) => {
            if (res.code === 200) {
              try {
                // const userInfo = res.data || {}
                console.log(res.data)
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
            } else {
              store.commit('user/CLEAR_USER')
              next()
            }
          })
        } else {
          next()
        }
      }
      Vue.nextTick(async () => {
        // 已登录用户，若未初始化IM，进行IM初始化
        let token = app.$cookies.get('token', { path: '/' })
        let userId = app.$cookies.get('userId', { path: '/' })
        let userType = app.$cookies.get('userType', { path: '/' })
        const deviceId = await getUserSign()
        if (!token) {
          const info = localStorage.getItem('myInfo')
            ? JSON.parse(localStorage.getItem('myInfo'))
            : {}
          userType = 'VISITOR'
          token = info.token
          userId = info.userId
        }

        // if (!store.state.im.imExample && token) {
        // 初始化IM
        if (!store.state.im.imExample) {
          const initImSdk = imInit({
            token,
            userId,
            userType,
            deviceId,
            operUserType: userType,
          })
          store.commit('im/SET_IM_SDK', initImSdk)
        }
      })
    }
  })
}
