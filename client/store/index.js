/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-11-27 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
import city from './module/city'
Vue.use(Vuex)
const store = () =>
  new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
      city,
    },
  })
export default store
