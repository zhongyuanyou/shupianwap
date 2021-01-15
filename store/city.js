/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-11-27 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/module/city.js
 */
import { Toast } from '@chipspc/vant-dgg'
import { getPositonCity } from '@/utils/position'
export const state = () => ({
  // 默认城市
  defaultCity: {
    code: '510100',
    name: '成都市',
  },
  currentCity: {}, // 当前选择的城市
  positionCityName: '', // 当前定位城市的名称
  positionStatus: null, // 定位状态（0：定位失败 1：定位成功但未开通该城市服务 2：定位成功且有对应的城市服务）
  positionLoading: false, // 重新定位loading弹框
})
export const mutations = {
  // 设置当前选择城市
  SET_CITY(state, data) {
    state.currentCity = data
    this.$cookies.set('currentCity', state.currentCity, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
    })
  },
  // 设置当前定位城市
  SET_POSITION_CITY(state, name) {
    state.positionCityName = name
    this.$cookies.set('positionCityName', state.positionCityName, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
    })
  },
  // 设置当前定位状态
  SET_POSITION_STATUS(state, num) {
    state.positionStatus = num
    this.$cookies.set('positionStatus', state.positionStatus, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
    })
  },
  UPDATE_LOADING_STADUS(state, boole) {
    state.positionLoading = boole
  },
}

export const actions = {
  async POSITION_CITY({ commit, state }, { type }) {
    if (type === 'rest') {
      commit('UPDATE_LOADING_STADUS', true) // 显示loading
    }
    const { code, data, message } = await getPositonCity()
    // 定位成功,且匹配到开通服务的站点
    if (code === 200) {
      commit('SET_POSITION_CITY', data.name)
      commit('SET_POSITION_STATUS', 2)
      if (type === 'rest') {
        commit('UPDATE_LOADING_STADUS', false) // 隐藏loading
        Toast.success({
          duration: 2000,
          message: '定位成功',
          forbidClick: true,
          className: 'my-toast-style',
        })
        return
      }
      // 切换当前选择城市到定位的城市
      commit('SET_CITY', {
        name: data.name,
        code: data.code,
      })
      return
    }
    // 定位成功，但未匹配到开通服务的站点
    if (code === 5003) {
      commit('SET_POSITION_CITY', data.name)
      commit('SET_POSITION_STATUS', 1)
      if (type === 'rest') {
        commit('UPDATE_LOADING_STADUS', false) // 隐藏loading
        Toast.success({
          duration: 2000,
          message: '定位成功',
          forbidClick: true,
          className: 'my-toast-style',
        })
        return
      }
      // 若是重新定位，定位后不重置当前城市
      commit('SET_CITY', state.defaultCity)
      return
    }

    // 定位失败
    if (type === 'rest') {
      commit('UPDATE_LOADING_STADUS', false) // 隐藏loading
      // 轻提示
      Toast.fail({
        duration: 2000,
        message: '定位失败，建议清除浏览器缓存后再试',
        forbidClick: true,
        className: 'my-toast-style',
      })
    }
    console.log(message)
    // 定位失败，设置默认城市为成都
    commit('SET_POSITION_CITY', '')
    commit('SET_POSITION_STATUS', 0)
    if (type === 'rest' && state.currentCity.name) return // 若是重新定位，定位失败并且当前有已选城市不重置当前城市
    commit('SET_CITY', state.defaultCity)
  },
}
