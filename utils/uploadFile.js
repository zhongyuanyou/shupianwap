/* eslint-disable */
const uploadUrl = 'https://cdn.shupian.cn'
const env = {
  development: 'd',
  release: 't',
  production: 'p',
}
import { ossApi } from '@/api/index'
import axios from 'axios'

/**
 * @description 根据数字生成对应长度的随机字符串
 * @param {Number} length
 * @returns {String}
 */
function genID(length) {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36)
}

/**
 * @description 向oss上传文件并向paas回调
 * @param {Object} data
 * @param {String} data.file 需要上传的文件
 * @param {String} data.sys_code 网关SYSCODE
 * @param {String} data.ext 传给paas平台的自定义扩展字段
 * @param {String} data.fileuid 自定义文件ID，应用前端上传文件时与PaaS平台约定的必传回调参数
 * @returns {Promise}
 */
export function uploadAndCallBack({ file, sys_code, ext = '', fileuid = '' }) {
  console.log(ossApi.getOssToken)
  return new Promise(async (allResolve, reject) => {
    if (!fileuid) {
      reject('命名规则不能为空')
      return
    }
    // 1 向node层获取oss的身份认鉴权
    const ossTokenResult = await axios.get(ossApi.getOssToken)
    console.log(ossTokenResult)
    const { signature, OSSAccessKeyId, policy } = ossTokenResult.data.data

    // 获取文件大小
    const size = file.size

    // 获取文件mimeType
    const mimeType = file.type

    // 获取文件原始文件名
    const file_original_name = file.name

    // 生成储存文件名，可由 uploadUrl + filename 访问到图片，例： a/b/c.jpg 表示在oss中的目录为 a/b/ ,文件名为 c.jpg
    // 则访问路径为 https://cdn.shupian.cn/a/b/c.jpg
    const filename = `${genID(10)}-${file_original_name}`

    // 组装paas回调参数
    let callbackBody = {
      env: env[process.env.DGG_SERVER_ENV],
      mimeType,
      file_original_name,
      fileuid,
      size,
      filename,
      sys_code,
      ext,
    }

    // 2 带着这个身份鉴权直接向oss上传文件
    const formData = new FormData()
    formData.append('key', filename)
    formData.append('policy', policy)
    formData.append('OSSAccessKeyId', OSSAccessKeyId)
    formData.append('signature', signature)
    formData.append('file', file)
    console.log(formData, 1111111111)
    const uploadResult = await axios.post('/cdnapi', formData)
    console.log(uploadResult)
    if (uploadResult.status === 204) {
      const callBackResult = await axios.post(ossApi.paasCallBack, callbackBody)
      if (callBackResult.data.code === 200) {
        allResolve(callBackResult.data)
      } else {
        reject(callBackResult.data)
      }
    }
    // if (uploadResult.status === 204) {
    //   const callBackResult = await axios.post(ossApi.paasCallBack, callbackBody)
    //   if (callBackResult.data.code === 200) {
    //     allResolve(callBackResult.data)
    //   } else {
    //     reject(callBackResult.data)
    //   }
    // }
  })
}
