import Vue from 'vue'
const domain = location.href.indexOf('3001') !== -1 ? '/' : 'shupian.cn'
Vue.prototype.$domain = domain
