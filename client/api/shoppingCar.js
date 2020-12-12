/*
 * @Author: xiao pu
 * @Date: 2020-12-09 17:07:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 10:40:56
 * @Description: file content
 * @FilePath: /chips-wap/client/api/shoppingCar.js
 */

'use strict'

import { CHIPS_APP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const shoppingCar = {
  list(params) {
    return request({
      params,
      url: CHIPS_APP_BASE_URL + '/yk/cart/find_list.do',
    })
  },
  update(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/update_cart.do',
    })
  },

  add(params) {
    return request({
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/add.do',
    })
  },
}
export default shoppingCar
