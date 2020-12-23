/*
 * @Author: xiao pu
 * @Date: 2020-12-23 17:07:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 17:09:45
 * @Description: file content
 * @FilePath: /chips-wap/client/utils/common.js
 */

/**
 * @description 浏览器端拨打电话
 * @param {string} tel  电话号码
 */
export const callPhone = (tel) => {
  window && window.open(`tel:${tel}`, '_blank')
}
