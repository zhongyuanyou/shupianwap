/*
 * @Author: ma liang
 * @Date: 2020-11-27 16:33:00
 * @LastEditTime: 2020-11-27 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chips-wap/client/store/module/city.js
 */
import getPosition from '~/utils/position'
export default {
  namespaced: true,
  state: {
    currentCity: {},
  },
  mutations: {
    // 城市定位
    POSITION_CITY(state, cityList = []) {
      getPosition()
        .then((res) => {
          // 定位成功
          const city = res.city
          // 遍历城市列表，找到对应城市
          const isHas = cityList.find(
            (item) => item.name.indexOf(city.substr(0, city.length - 1)) !== -1
          )
          if (!isHas) {
            state.currentCity = {
              code: 'COMPANY_CD',
              cityName: '成都',
            }
            return
          }
          state.currentCity = isHas
        })
        .catch(() => {
          // 定位失败，设置默认城市为成都
          state.currentCity = {
            code: 'COMPANY_CD',
            cityName: '成都',
          }
        })
    },
  },
}
