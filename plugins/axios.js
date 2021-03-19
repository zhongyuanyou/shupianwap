import qs from 'qs'
import { saveAxiosInstance } from '@/utils/request'
import xToast from '@/components/common/spToast'
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
const BASE = require('~/config/index.js')
export default function ({ $axios, redirect, app, store }) {
  $axios.defaults.withCredentials = false
  $axios.defaults.timeout = 12000
  // 设置基本URL
  if (process.server) {
    $axios.defaults.baseURL = BASE.baseURL
  } else {
    $axios.defaults.baseURL = '/api'
  }
  $axios.interceptors.request.use(
    (config) => {
      if (
        config.method === 'post' &&
        config.headers['Content-Type'] ===
          'application/x-www-form-urlencoded;charset=UTF-8'
      ) {
        config.data = qs.stringify(config.data)
      }
      config.params = config.params || {}
      if (DGG_SERVER_ENV === 'development') {
        // 本地根据自己的需求进行配置
        config.headers.sysCode = 'crisps-app-wap-bff-api'
      } else {
        // 在app正式上线未做负载前,此sysCode不修改
        config.headers.sysCode = 'crisps-app-wap-bff-api'
      }
      if (
        app.$cookies.get('token', {
          path: '/',
        })
      ) {
        config.headers['X-Auth-Token'] = app.$cookies.get('token', {
          path: '/',
        })
        config.headers['X-Req-UserId'] = app.$cookies.get('userId', {
          path: '/',
        })
      }
      // config.headers['X-Auth-Token'] = '607991860798845556'
      // config.headers['X-Req-UserId'] = '607991757719633892'
      config.headers['X-Auth-Token'] =
        app.$cookies.get('token') || store.state.user.token
      config.headers['X-Req-UserId'] =
        app.$cookies.get('userId') || store.state.user.userId
      config.headers['X-Req-UserNo'] =
        app.$cookies.get('userNo') || store.state.user.userNo
      config.headers['X-Req-UserName'] =
        app.$cookies.get('userName') || store.state.user.userName
      config.headers['X-Req-UserPhone'] =
        app.$cookies.get('userPhone') || store.state.user.userPhone
      // 请求头设置站点code
      const cityCode = app.$cookies.get('currentCity', {
        path: '/',
      })
      if (cityCode && cityCode !== '{}') {
        config.headers.areaCode = JSON.parse(cityCode).code
      } else {
        config.headers.areaCode = store.state.city.defaultCity.code
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  $axios.interceptors.response.use(
    (response) => {
      const result = response.data
      const code = result.code
      // 网关会对带有yk地址的请求做token有效性验证，若失效，网关直接抛出5223，wap里面跳转到 我的
      if (code === 5223) {
        // 清空登录信息
        store.commit('user/CLEAR_USER')
        if (!store.state.app.isInApp) {
          if (process && process.client) {
            xToast.error('登录失效，请重新登录')
            setTimeout(() => {
              redirect('/my')
            }, 1500)
          } else {
            redirect('/my')
          }
        }
      }

      return result
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/404')
    } else if (code === 500) {
      redirect('/500')
    }
  })
  saveAxiosInstance($axios)
}
