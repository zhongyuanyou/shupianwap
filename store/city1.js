/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-11-27 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/module/city.js
 */
import myToast from '@/components/common/spToast'
import { getPositonCity } from '@/utils/position'
export const state = () => ({
  // 默认城市
  defaultCity: {
    code: '510100',
    name: '成都市',
    pid: '510000',
    pname: '四川省',
  },
  currentCity: {}, // 当前选择的城市
  positionCityName: '', // 当前定位城市的名称
  positionCityCode: '', // 当前定位城市的名称
  positionStatus: null, // 定位状态（0：定位失败 1：定位成功但未开通该城市服务 2：定位成功且有对应的城市服务）
  code: '',
})
export const mutations = {
  // 设置当前选择城市
  SET_CITY(state, data) {
    state.currentCity = data
  },
  // 设置当前定位城市
  SET_POSITION_CITY(state, name) {
    state.positionCityName = name
  },
  // 设置当前定位城市code
  SET_POSITION_CODE(state, code) {
    console.log(state, code, 13213)
    state.positionCityCode = code
  },
  // 设置当前定位状态
  SET_POSITION_STATUS(state, num) {
    state.positionStatus = num
  },
  // 修改城市CODE
  SET_CODE(state, code) {
    state.code = code
  },
}

export const actions = {
  /** @description 获取当前定位城市
   * @params type == 'init' : 无loading，无成功失败提示，定位失败或成功都会重置当前选择城市 currentCity
   * @params type == 'rest' : 有loading，有成功失败提示，定位失败或成功不会重置当前选择城市 currentCity
   */
  async POSITION_CITY({ commit, state }, { type = null }) {
    if (type === 'rest') {
      myToast.showLoading({
        message: '定位中',
        type: 'loading',
        forbidClick: false,
      })
    }
    try {
      const { code, data } = await getPositonCity()
      // 定位成功,且匹配到开通服务的站点
      if (code === 200 && data.code && data.code !== [] && data.code !== '0') {
        commit('SET_POSITION_CITY', data.name)
        commit('SET_POSITION_CODE', data.code)

        commit('SET_POSITION_STATUS', 2)
        if (type === 'rest') {
          myToast.hideLoading()
          myToast.success('定位成功')
          return
        }
        // 切换当前选择城市到定位的城市
        commit('SET_CITY', {
          name: data.name,
          code: data.code,
          pid: data.pid,
          pname: data.pname,
        })
      } else {
        commit('SET_CITY', state.defaultCity)
        commit('SET_POSITION_CITY', state.defaultCity.name)
        commit('SET_POSITION_CODE', state.defaultCity.code)
        // 定位失败
        if (type === 'rest') {
          myToast.hideLoading()
          myToast.error('定位失败，建议检查GPS是否打开或清除浏览器缓存再试')
        }
      }
    } catch (error) {
      commit('SET_CITY', state.defaultCity)
      commit('SET_POSITION_CITY', state.defaultCity.name)
      commit('SET_POSITION_CODE', state.defaultCity.code)
    }
  },
  setCode({ commit }, code) {
    commit('SET_CODE', code)
  },
}
