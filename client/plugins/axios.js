import qs from 'qs'
import { saveAxiosInstance } from '@/utils/request'
const BASE = require('~/config/index.js')
export default function ({ $axios, redirect, app }) {
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
      config.headers.sysCode = 'zdm-api'
      config.headers['X-Auth-Token'] = app.$cookies.get('token')
      config.headers['X-Req-UserId'] = app.$cookies.get('userId')
      // config.headers['X-Auth-Token'] = '607991860798845556'
      // config.headers['X-Req-UserId'] = '607991757719633892'
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
        if (code === 5223) {
          redirect('/404')
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
