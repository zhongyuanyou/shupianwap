/*
 * @Author: ma liang
 * @Date: 2020-12-17 16:19:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-17 16:19:00
 * @Description: file content
 * @FilePath: /chips-wap/client/api/help.js
 */

import { CHIPS_WAP_BASE_URL } from '../config/constant'

const helpApi = {
  findArticle: `${CHIPS_WAP_BASE_URL}/nk/help/v1/find_help_data.do`, // 帮助中心首页，查询广告+分类+文章列表
}
export { helpApi }
