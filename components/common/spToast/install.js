import SpToast from './SpToast'

const toast = {}
toast.install = function (Vue, option) {
  const ToastExtend = Vue.extend(SpToast)
  const toastInstance = new ToastExtend()
  toastInstance.$mount(document.createElement('div'))
  document.body.appendChild(toastInstance.$el)
  Vue.prototype.$xToast = () => {}
  Vue.prototype.$xToast.show = toastInstance.show
  Vue.prototype.$xToast.success = toastInstance.success
  Vue.prototype.$xToast.error = toastInstance.error
  Vue.prototype.$xToast.loading = toastInstance.loading
  Vue.prototype.$xToast.showLoading = toastInstance.showLoading
  Vue.prototype.$xToast.hideLoading = toastInstance.hideLoading
}

export default toast
