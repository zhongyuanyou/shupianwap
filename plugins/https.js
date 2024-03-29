import qs from 'qs'
import axios from 'axios'
import { HttpLogger } from 'zipkin-transport-http'
import { Tracer, BatchRecorder, ExplicitContext, jsonEncoder } from 'zipkin'
import wrapAxios from './zipkin-axios'
import { saveAxiosInstance } from '@/utils/request'
import xToast from '@/components/common/spToast'

const BASE = require('~/config/index.js')
const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
const ctxImpl = new ExplicitContext() // 进程内的上下文
// const recorder = new ConsoleRecorder();
const localServiceName = BASE.terminalCode // 此应用程序的名称
const remoteServiceName = BASE.terminalCode // 您所在应用程序的名称

const tracer = new Tracer({
  ctxImpl,
  localServiceName,
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      // take a look
      endpoint: 'https://dzipkin.shupian.cn/api/v2/spans',
      jsonEncoder: jsonEncoder.JSON_V2,
    }),
  }),
})

const $axios = wrapAxios(axios.create(), { tracer, remoteServiceName })

export default function (ctx, inject) {
  const { redirect, app, store } = ctx
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
      if (DGG_SERVER_ENV === 'development') {
        // 本地根据自己的需求进行配置
        config.headers.sysCode = 'crisps-app-wap-bff-api'
      } else {
        // 在app正式上线未做负载前,此sysCode不修改
        config.headers.sysCode = 'crisps-app-wap-bff-api'
      }
      // 获取token
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
      // 获取用户信息
      if (
        app.$cookies.get('X-Req-UserNo', {
          path: '/',
        })
      ) {
        config.headers['X-Req-UserNo'] = app.$cookies.get('userNo', {
          path: '/',
        })
        config.headers['X-Req-UserName'] = app.$cookies.get('userName', {
          path: '/',
        })
        config.headers['X-Req-UserPhone'] = app.$cookies.get('userPhone', {
          path: '/',
        })
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
  saveAxiosInstance($axios)
  ctx.$axios = $axios
  inject('axios', $axios)
}
