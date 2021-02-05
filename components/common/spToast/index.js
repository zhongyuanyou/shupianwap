import vue from 'vue'
import SpToast from './SpToast'

let instance

/**
 * @description 创建自定义的toast实例
 * @returns {object} instance
 * @returns {function} instance.show
 * @returns {function} instance.success
 * @returns {function} instance.error
 * @returns {function} instance.warning
 * @returns {function} instance.loading
 * @returns {function} instance.showLoading
 * @returns {function} instance.hideLoading
 *
 * @example this.$xToast.show({
 *                message: '信息提交成功',
 *                duration: 1000,
 *                icon: 'toast_ic_comp',
 *                forbidClick: true,
 *          })
 *
 */
function createInstance() {
  if (process && process.server) {
    return {}
  }
  if (!window || !window.document) {
    return {}
  }

  if (instance) {
    instance.$destroy()
  }

  instance = new (vue.extend(SpToast))({
    el: document.createElement('div'),
  })
  document.body.appendChild(instance.$el)

  instance.install = function (Vue, option) {
    Vue.prototype.$xToast = instance
    Vue.prototype.$xToast.$_destroy = () => {
      instance.$destroy()
    }
  }

  return instance
}

export default createInstance()
