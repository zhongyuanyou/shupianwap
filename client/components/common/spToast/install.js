import SpToast from './SpToast'

const toast = {}
toast.install = function (Vue, option) {
  const ToastExtend = Vue.extend(SpToast)
  const toastInstance = new ToastExtend()
  toastInstance.$mount(document.createElement('div'))
  document.body.appendChild(toastInstance.$el)
  Vue.prototype.$spToast = () => {}
  Vue.prototype.$spToast.show = toastInstance.show
  Vue.prototype.$spToast.success = toastInstance.success
  Vue.prototype.$spToast.error = toastInstance.error
  Vue.prototype.$spToast.loading = toastInstance.loading
}

export default toast
