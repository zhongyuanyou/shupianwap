/* eslint-disable */
/*
 * @Author: your name
 * @Date: 2021-1-29 15:27:32
 * @LastEditTime : 2021-1-29 15:27:32
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath:
 */
import Vue from 'vue'
export default ({ store }) => {
  Vue.prototype.$dggkefu = function () {
    dggMi.showPanel({
      type: 'groupToken',
      value: store.state.app.meiqiaGroupToken || '',
    })
  }
}
