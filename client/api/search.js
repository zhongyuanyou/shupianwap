/*
 * @Author: ma liang
 * @Date: 2020-12-19 09:34:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-19 09:34:00
 * @Description: file content
 * @FilePath: /chips-wap/client/api/search.js
 */

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const searchApi = {
  findKeywords: `${CHIPS_WAP_BASE_URL}/nk/search/v1/find_keyword_list.do`, // 获取搜索词（推荐，热搜）
}
export { searchApi }
