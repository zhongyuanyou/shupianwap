/*
 * @Author: xiao pu
 * @Date: 2021-02-05 13:25:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 13:34:04
 * @Description: file content
 * @FilePath: /chips-wap/directive/focus.js
 */

/**
 * @description 控制聚焦/失焦 ，自动查找input元素
 * @example <Search
 *             v-model="search.keywords"
 *             v-focus="focusCommand"
 *             placeholder="请输入规划师姓名"
 *             @searchKeydownHandle="handleSearch"
 *          />
 */
export const focus = {
  name: 'focus',
  bind(el, binding, vnode) {
    el.focusHandler = (event) => {
      console.log('focusHandler!')
      const { context } = vnode
      const { expression } = binding
      if (!context[expression]) {
        context[expression] = true
      }
    }
    el.blurHandler = (event) => {
      console.log('blurHandler!')
      const { context } = vnode
      const { expression } = binding
      if (context[expression]) {
        context[expression] = false
      }
    }

    el.addFocus = (element) => {
      if (!element) return
      el.removeFocus(element)
      element.addEventListener('focus', el.focusHandler)
    }
    el.addBlur = (element) => {
      if (!element) return
      el.removeBlur(element)
      element.addEventListener('blur', el.blurHandler)
    }

    el.removeFocus = (element) => {
      if (!element) return
      element.removeEventListener('focus', el.focusHandler)
    }
    el.removeBlur = (element) => {
      if (!element) return
      element.removeEventListener('blur', el.blurHandler)
    }

    el.getInput = (element) => {
      let inputDom = element
      if (inputDom.tagName !== 'INPUT') {
        inputDom = element.querySelector('input')
      }
      if (inputDom.tagName === 'INPUT') return inputDom
      return null
    }
  },
  inserted(el, binding) {
    console.log('focus dirctive inserted')
    const inputDom = el.getInput(el)
    if (!inputDom) return
    el.inputDom = inputDom
    const { value, expression } = binding
    value || !expression ? inputDom.focus() : inputDom.blur()
    el.addFocus(inputDom)
    el.addBlur(inputDom)
  },

  update(el, binding, vnode) {
    console.log('focus dirctive update')
    const inputDom = el.getInput(el)
    if (!inputDom) return
    el.inputDom = inputDom
    const { value, expression } = binding
    console.log('value:', value)
    el.removeFocus(inputDom)
    el.removeBlur(inputDom)
    value || !expression ? inputDom.focus() : inputDom.blur()
    el.addFocus(inputDom)
    el.addBlur(inputDom)
  },

  unbind(el) {
    el.removeFocus(el.inputDom)
    el.removeBlur(el.inputDom)
  },
}
