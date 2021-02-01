/*
 * @Author: xiao pu
 * @Date: 2021-01-18 16:50:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-18 16:51:45
 * @Description: file content
 * @FilePath: /chips-wap/mixins/formHandle.js
 */
export default {
  directives: {
    // 禁用拷贝与复制
    forbidCopyPaste: {
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
    },
  },
  computed: {},
  methods: {},
}
