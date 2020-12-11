'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
import { request } from '@/utils/request'

const category = {
  home({ axios }, params) {
    return request({
      axios,
      params,
      method: 'post',
      url: CHIPS_WAP_BASE_URL + '/nk/productCategory/v1/product_category.do',
    })
  },
}
export default category
