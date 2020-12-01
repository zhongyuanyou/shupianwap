/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-11-27 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/module/city.js
 */
import getPosition from '~/utils/position'
export const state = () => ({
  currentCity: {}, // 当前选择的城市
  positionCityName: '', // 当前定位城市
  positionStatus: null, // 定位状态（0：定位失败 1：定位成功但未开通该城市服务 2：定位成功且有对应的城市服务）
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
  // 设置当前定位城市
  SET_POSITION_STATUS(state, num) {
    state.positionStatus = num
    this.$cookies.set('positionStatus', state.positionStatus, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 过期时间
    })
  },
}

export const actions = {
  POSITION_CITY({ commit }, { cityList, type }) {
    // 调用城市定位方法
    getPosition()
      .then((res) => {
        // 定位成功
        const city = res.city
        if (cityList.length) {
          // 遍历城市列表，找到对应城市
          const isHas = cityList.find(
            (item) => item.name.indexOf(city.substr(0, city.length - 1)) !== -1
          )
          // 匹配到对应城市
          if (isHas) {
            commit('SET_POSITION_CITY', city.substr(0, city.length - 1))
            commit('SET_POSITION_STATUS', 2)
            if (type === 'rest') return // 若是重新定位，定位成功不重置当前城市
            commit('SET_CITY', isHas)
            return
          }
        }
        // 未匹配到对应城市
        commit('SET_POSITION_CITY', city.substr(0, city.length - 1))
        commit('SET_POSITION_STATUS', 1)
        if (type === 'rest') return // 若是重新定位，定位后不重置当前城市
        commit('SET_CITY', {
          code: 'COMPANY_CD',
          name: '成都',
        })
      })
      .catch(() => {
        // 定位失败，设置默认城市为成都
        commit('SET_POSITION_CITY', '')
        commit('SET_POSITION_STATUS', 0)
        if (type === 'rest') return // 若是重新定位，定位失败不重置当前城市
        commit('SET_CITY', {
          code: 'COMPANY_CD',
          name: '成都',
        })
      })
  },
}