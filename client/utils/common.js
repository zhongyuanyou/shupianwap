/*
 * @Author: xiao pu
 * @Date: 2020-12-23 17:07:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 17:09:45
 * @Description: file content
 * @FilePath: /chips-wap/client/utils/common.js
 */

/**
 * @description 浏览器端拨打电话
 * @param {string} tel  电话号码
 */

import CryptoJS from 'crypto-js'
export const callPhone = (tel) => {
  window && window.open(`tel:${tel}`, '_blank')
}

/**
 * @description 电话号码解密
 * @param {string} tel  电话号码
 */
export const parseTel = (tel) => {
  const parsedWordArray = CryptoJS.enc.Base64.parse(tel)
  const parsedTel = parsedWordArray.toString(CryptoJS.enc.Utf8)
  return parsedTel
}
