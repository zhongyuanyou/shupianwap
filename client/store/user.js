/*
 * @Author: xiao pu
 * @Date: 2020-12-09 14:15:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 15:58:14
 * @Description: file content
 * @FilePath: /chips-wap/client/store/user.js
 */

export const state = () => ({
  userInfo: {},
})
export const mutations = {
  SET_USER(state, data = {}) {
    state.userInfo = data
  },
}

export const actions = {}
