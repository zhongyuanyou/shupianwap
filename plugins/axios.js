import qs from 'qs'
import gatewaySign from '@fe/gateway-sign'
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
      config.headers.platformCode = BASE.platformCode // 平台code
      config.headers.terminalCode = BASE.terminalCode // 终端code
      const data = config.method === 'post' ? config.data : config.params
      const token = app.$cookies.get('token', {
        path: '/',
      })
      // // 签名
      const signData = gatewaySign.handleSign({
        method: config.method,
        rawData: data,
        sysCode: BASE.SYS_CODE,
        secret: BASE.SECRET,
        token,
        contentType: config.headers['Content-Type'],
      })
      config.headers = { ...signData }
      // config.headers.sysCode = 'crisps-app-wap-bff-api'
      // 获取token
      if (token) {
        config.headers['X-Auth-Token'] = token
        config.headers['X-Req-UserId'] = app.$cookies.get('userId', {
          path: '/',
        })
      }
      // 获取用户信息
      if (
        app.$cookies.get('userNo', {
          path: '/',
        })
      ) {
        config.headers['X-Req-UserNo'] = app.$cookies.get('userNo', {
          path: '/',
        })
        // config.headers['X-Req-UserName'] = app.$cookies.get('userName', {
        //   path: '/',
        // })
        // config.headers['X-Req-UserPhone'] = app.$cookies.get('userPhone', {
        //   path: '/',
        // })
      }
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
            const timer = setTimeout(() => {
              redirect('/my')
              clearTimeout(timer)
            }, 1500)
          } else {
            redirect('/my')
          }
        }
      } else {
        return result
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/404')
  //   } else if (code === 500) {
  //     redirect('/500')
  //   }
  // })
  saveAxiosInstance($axios)
}
