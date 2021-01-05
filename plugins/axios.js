import qs from 'qs'
import { saveAxiosInstance } from '@/utils/request'
const BASE = require('~/config/index.js')
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
export default function ({ $axios, redirect, app, store }) {
  // 设置基本URL
  if (process.server) {
    $axios.defaults.baseURL = BASE.baseURL
  } else {
    $axios.defaults.baseURL = '/api'
  }
  $axios.interceptors.request.use(
    (config) => {
      console.log('config', config)
      if (
        config.method === 'post' &&
        config.headers['Content-Type'] ===
          'application/x-www-form-urlencoded;charset=UTF-8'
      ) {
        config.data = qs.stringify(config.data)
      }
      config.params = config.params || {}
      if (DGG_SERVER_ENV === 'development') {
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
      if (process.env.NODE_ENV === 'production') {
        // 清空登录信息
        store.commit('user/CLEAR_USER')
        // 在登录失效的情况下，wap里面跳转到 我的
        if (code === 5223 && !store.state.app.isInApp) {
          redirect('/my')
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
