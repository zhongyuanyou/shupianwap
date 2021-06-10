/*
 * @Author: xiao pu
 * @Date: 2020-12-23 17:07:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-28 23:57:27
 * @Description: file content
 * @FilePath: /chips-wap/utils/common.js
 */

/**
 * @description 浏览器端拨打电话
 * @param {string} tel  电话号码
 */

import CryptoJS from 'crypto-js'
import Qs from 'qs'

/**
 * @description input, textarea自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
 * 选择文本。createTextRange(setSelectionRange)是input, textarea方法
 * @param {htmlelement} textbox
 * @param {number} startIndex
 * @param {number} stopIndex
 */
function selectText(textbox, startIndex, stopIndex) {
  if (textbox.createTextRange) {
    // ie
    const range = textbox.createTextRange()
    range.collapse(true)
    range.moveStart('character', startIndex) // 起始光标
    range.moveEnd('character', stopIndex - startIndex) // 结束光标
    range.select() // 不兼容苹果
  } else {
    // firefox/chrome
    textbox.setSelectionRange(startIndex, stopIndex)
    textbox.focus()
  }
}

export const callPhone = (tel) => {
  window && (window.location.href = `tel:${tel}`)
}
/**
 * @description 复制内容到浏览器端粘贴板
 * @param {string} text
 * @returns {boolean} 是否拷贝成功
 */
export const copyToClipboard = (text) => {
  const textareaEl = document.createElement('textarea')
  textareaEl.setAttribute('readonly', 'readonly') // 防止手机上弹出软键盘
  textareaEl.value = text
  document.body.appendChild(textareaEl)
  textareaEl.focus()
  const valueLength = text.length
  // textareaEl.select()  // safari
  selectText(textareaEl, 0, valueLength)
  const res = document.execCommand('copy')
  document.body.removeChild(textareaEl)
  textareaEl.blur()
  console.log('复制是否成功：', res)
  return res
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

// 打开第三方链接
export const openLink = (link, data) => {
  const dataStr = Qs.stringify(data)
  window &&
    (window.location.href =
      link.indexOf('?') > -1 ? `${link}&${dataStr}` : `${link}?${dataStr}`)
}

export const setUrlParams = (url, data = {}) => {
  const urlObj = new URL('', url)
  const { search, origin, pathname } = urlObj || {}
  // search中的？解析忽略
  const searchObj = Qs.parse(search, { ignoreQueryPrefix: true }) || {}
  const newSearchObj = { ...searchObj, ...data }
  const newSearch = Qs.stringify(newSearchObj)
  return origin + pathname + '?' + newSearch
}

/**
 * @param {Any} val
 * @desc 判断类型
 */
export const custTypeOf = (val) => {
  return Object.prototype.toString.call(val).match(/([^\s.*]+)(?=]$)/g)[0]
}

/**
 *
 * @param {Object} dst 目标对象
 * @param {Object} src 被复制对象
 * @returns 目标对象
 */
export const deepCopy = (dst, src) => {
  if (custTypeOf(src) === 'Object' && custTypeOf(dst) === 'Object') {
    Object.keys(src).forEach((key) => {
      if (custTypeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (!dst[key]) {
          dst[key] = src[key]
        } else {
          deepCopy(dst[key], src[key])
        }
      } else if (custTypeOf(src[key]) === 'Array') {
        dst[key] =
          custTypeOf(dst[key]) === 'Array'
            ? dst[key].concat(src[key])
            : src[key]
      } else {
        dst[key] = src[key]
      }
    })
    return dst
  }
}
