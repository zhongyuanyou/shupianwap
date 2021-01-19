import Vue from 'vue'
Vue.directive('sensorsTrack', {
  bind: (el, binding, vnode) => {
    el.myClick = () => {
      const { arg = '', value } = binding
      window.sensors.track(arg, value)
    }
    el.addEventListener('click', el.myClick)
  },
  unbind: (el, binding) => {
    el.removeEventListener('click', el.myClick)
  },
})
