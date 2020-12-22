/*
 * @Author: maliang
 * @Date: 2020-12-22 14:15:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime:  2020-12-22 14:15:44
 * @Description: 缓存实例化的 IM
 * @FilePath: /chips-wap/client/store/im.js
 */
export const state = () => ({
  imExample: null,
})
export const mutations = {
  SET_IM_SDK(state, data = null) {
    state.imExample = data
  },
}
