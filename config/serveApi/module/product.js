/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: 产品中心api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/product.js
 * */
"use strict";
module.exports.productApi = {
    getServeList: "/nk/product/service/v1/search.do", // 服务产品列表
    getJyServeList: "/nk/product/trading/v1/serarch.do", // 交易产品列表
    getTradingListToIds: "/nk/product/trading/v1/get_details.do", // ids获取交易推荐产品列表
};
