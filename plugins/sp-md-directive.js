import Vue from 'vue'
Vue.directive('sensorsTrack', {
  bind: (el, binding, vnode) => {
    el.addEventListener('click', () => {
      const { arg = '', value } = binding
      window.sensors.track(arg, value)
    })
  },
  unbind: (el, binding) => {
    el.removeEventListener('click')
  },
})
