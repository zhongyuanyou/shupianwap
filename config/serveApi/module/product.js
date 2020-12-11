/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: 产品中心api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/product.js
 * */
'use strict';
module.exports.productApi = {
  productDetail: '/nk/product/service/v1/detail.do', // 产品详情
  productDetails: '/nk/product/service/v1/details.do', // 批量获取产品详情
  serviceItemList: '/nk/service_item/v1/search.do', // 服务项目集合
  serviceItemDetails: '/nk/service_item/v1/get_details.do', // 服务项目集合
  goodsDetail: '/nk/product/service/goods/v1/get_detail.do', // 商品详情
  goodsDetails: '/nk/product/service/goods/v1/get_details.do', // 批量获取商品详情
  goodsPrice: '/nk/product/service/goods/v1/calculation_price.do', // 商品价格（不同的）
  skuAttrClassName: '/nk/attributes/v1/search.do', // 获取每一类sku属性的类名
  getServeList: '/nk/product/service/v1/search.do', // 服务产品列表
  getJyServeList: '/nk/product/trading/v1/serarch.do', // 交易产品列表
  getTradingListToIds: '/nk/product/trading/v1/get_details.do', // ids获取交易推荐产品列表
  getClassificationList: '/nk/classification/v1/search.do', // 产品分类列表
  getProGroupByPutAway: '/nk/product/service/v1/pro_group_by_put_away.do', // 产品组所有上架产品列表
  getServiceResource: '/nk/product/service_resource/v1/search.do', // 获取服务资源
};
