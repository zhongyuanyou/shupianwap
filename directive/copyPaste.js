/*
 * @Author: xiao pu
 * @Date: 2021-02-05 13:40:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 13:42:29
 * @Description: file content
 * @FilePath: /chips-wap/directive/copyPaste.js
 */

// 禁用拷贝与复制
export const forbidCopyPaste = {
  name: 'forbid-copy-paste',
  bind(el) {
    let inputDom = el
    if (el.tagName !== 'INPUT') {
      inputDom = el.querySelector('input')
    }
    if (inputDom.tagName === 'INPUT') {
      el.inputDom = inputDom
    }

    el.handle = (event) => {
      event.preventDefault()
      return false
    }

    el.forbidHandler = (element) => {
      if (!element || !element.addEventListener) return
      el.removeHandler(element)
      element.addEventListener('copy', el.handle)
      element.addEventListener('paste', el.handle)
    }

    el.removeHandler = (element) => {
      if (!element || !element.removeEventListener) return
      element.removeEventListener('copy', el.handle)
      element.removeEventListener('paste', el.handle)
    }

    el.forbidHandler(el.inputDom)
  },
  inserted(el) {
    el.forbidHandler(el.inputDom)
  },
  update(el) {
    el.forbidHandler(el.inputDom)
  },
  unbind(el) {
    el.removeHandler(el.inputDom)
  },
}
