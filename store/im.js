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
export const actions = {
  CLEAR_IM(state, data) {
    const imId = localStorage.getItem('myInfo')
      ? JSON.parse(localStorage.getItem('myInfo')).imUserId
      : {}
    console.log(state.imExample.regularVisitor, 123)
    // state.imExample.regularVisitor(
    //   {
    //     visitorId: imId,
    //     userId: data,
    //   },
    //   (res) => {
    //     console.log(res)
    //   }
    // )
  },
}
