/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: CMS内容服务api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/content.js
 * */
'use strict';
module.exports.contentApi = {
  //  查询单个数据字典多个编码下子节点(只查询一级)
  dataDict: '/nk/dict/v1/find_list.do',
  //  查询多个数据字典多个编码下子节点(只查询一级)
  dataDicts: '/nk/dict/v1/find_list_by_codes.do',
};
