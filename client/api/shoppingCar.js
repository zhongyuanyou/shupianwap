/*
 * @Author: xiao pu
 * @Date: 2020-12-09 17:07:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 17:17:25
 * @Description: file content
 * @FilePath: /chips-wap/client/api/shoppingCar.js
 */

'use strict'

import { CHIPS_APP_BASE_URL } from '../config/constant'

import { request } from '@/utils/request'

const shoppingCar = {
  list({ axios }, params) {
    return request({
      axios,
      params,
      method: 'get',
      url: CHIPS_APP_BASE_URL + '/yk/cart/find_list.do',
    })
  },
  update() {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/update_cart.do',
    })
  },

  add() {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_APP_BASE_URL + '/yk/cart/add.do',
    })
  },
}
export default shoppingCar
