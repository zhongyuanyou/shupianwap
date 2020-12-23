/*
 * @Author: xiao pu
 * @Date: 2020-12-23 17:07:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 20:44:04
 * @Description: file content
 * @FilePath: /chips-wap/client/utils/common.js
 */

/**
 * @description 浏览器端拨打电话
 * @param {string} tel  电话号码
 */
export const callPhone = (tel) => {
  window && window.open(`tel:${tel}`, '_blank')
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
  textareaEl.select()
  const res = document.execCommand('copy')
  document.body.removeChild(textareaEl)
  console.log('复制成功')
  return res
}
