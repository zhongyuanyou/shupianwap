/*
 * @Author: xiao pu
 * @Date: 2020-12-08 10:50:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-10 11:42:01
 * @Description: file content
 * @FilePath: /chips-wap/client/utils/request.js
 */

import Qs from 'qs'

// 保存axios插件的实例
let axiosInstance = null

export function saveAxiosInstance(axios) {
  axiosInstance = axios
}

// eslint-disable-next-line
/******************************* 工具函数 ************************************/
/**
 * @description 对请求结果的封装
 * @param {Object} config
 * @param {Object} config.axios axios对象
 * @param {string} config.url 请求地址
 * @param {Object} config.params 请求参数，注：无论post或者get 都用params传参
 * @param {Object} config.extraConfig  针对请求的去其他配置 如cancelToken，headers
 * @param {function} callback 自定义处理方式，传入的值 data, resolve, reject
 * @returns {Promise}
 *
 * @example
 * const config = {
 *  axios: $axios,
 *  url: '/login.do',
 *  method: 'post',
 *  params: {name:'xiaopu'},
 *  extraConfig:{headers:{}, cancelToken:}
 * }
 * request(config)
 *
 *
 */
export function request(
  { axios, url, params, extraConfig = {}, method = 'get' },
  callback
) {
  return new Promise((resolve, reject) => {
    // 传入axios 就使用，没有传入，就使用axios插件中获取到的实例
    if (!axios) axios = axiosInstance
    if (!axiosInstance) {
      reject(new Error('axios 为空'))
    }
    if (method === 'get') {
      params = { params, ...extraConfig }
    }
    axios[method](url, params, extraConfig)
      .then((data) => {
        console.log('request promise', data)
        if (typeof callback === 'function') {
          callback(data, resolve, reject)
          return
        }
        if (data) {
          if (data.code === 200) {
            resolve(data.data)
          } else {
            reject(data)
          }
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
