/*
 * @Author: xiao pu
 * @Date: 2020-12-21 08:58:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-21 09:23:45
 * @Description: file content
 * @FilePath: /chips-wap/client/store/keepAlive.js
 */

export const state = () => ({
  keepAliveProps: {
    include: [],
    max: 10,
  },
})
export const mutations = {
  SET_KEEP_ALIVE(state, data = {}) {
    const { type, name, max } = data
    let index = -1
    switch (type) {
      case 'add':
        !state.keepAliveProps.include.includes(name) &&
          state.keepAliveProps.include.push(name)
        break
      case 'remove':
        index = state.keepAliveProps.include.indexOf(name)
        index > -1 && state.keepAliveProps.include.splice(index, 1)
        break
      case 'max':
        state.keepAliveProps.max = max
        break
    }
  },
}

export const actions = {}
