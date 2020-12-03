/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: 中间层调用java服务的api地址聚合
 * @FilePath: /chips-wap/config/envConfig/serveApi/index.js
 * */
"use strict";
const { algorithmApi } = require("./module/algorithm"); // 算法
const { bigDataApi } = require("./module/bigData"); // 大数据
const { contentApi } = require("./module/content"); // CMS内容
const { productApi } = require("./module/product"); // 产品中心
const { userApi } = require("./module/user"); // 用户中心

module.exports = {
    algorithmApi,
    bigDataApi,
    contentApi,
    productApi,
    userApi,
};
