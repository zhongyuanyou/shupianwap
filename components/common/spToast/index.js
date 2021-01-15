import vue from 'vue'
import SpToast from './SpToast'

// const toast = {}
let instance

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
    // const ToastExtend = Vue.extend(SpToast)
    // const toastInstance = new ToastExtend()
    // toastInstance.$mount(document.createElement('div'))
    // document.body.appendChild(instance.$el)
    Vue.prototype.$xToast = instance
    Vue.prototype.$xToast.$_destroy = () => {
      instance.$destroy()
    }
    // Vue.prototype.$xToast.show = toastInstance.show
    // Vue.prototype.$xToast.success = toastInstance.success
    // Vue.prototype.$xToast.error = toastInstance.error
    // Vue.prototype.$xToast.loading = toastInstance.loading
    // Vue.prototype.$xToast.showLoading = toastInstance.showLoading
    // Vue.prototype.$xToast.hideLoading = toastInstance.hideLoading
    // Vue.prototype.$xToast.warning = toastInstance.warning
  }

  return instance
}

export default createInstance()
