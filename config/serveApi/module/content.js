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
  //  查询多个数据字典多个编码下子节点(查多级)
  dataDictsTier: '/nk/dict/find_dict_tier.do',
  feedbackAdd: '/nk/app/feedback/v1/add.do', // 添加吐槽
  feedbackDetail: '/nk/app/feedback/v1/detail.do', // 吐槽详情
  feedbackList: '/nk/app/feedback/v1/find_page.do', // 吐槽列表
  findPage: '/nk/app/content/v1/find_page.do', // 获取内容列表
  findAdList: '/nk/app/advertising/v1/find_advertising_list.do', // 获取广告列表
  findNav: '/nk/app/navigation/v1/find_page.do', // 获取导航列表
  findCategoryDetail: '/nk/app/category/v1/detail.do', // 根据编号查询分类
  infoList: '/nk/app/content/v1/find_page.do', // 资讯列表
  infoDetail: '/nk/app/content/v1/find_detail.do', // 资讯详情
  shoppingCarList: '/yk/shoppingCart/find_list.do', // 购物车列表
  shoppingCarAdd: '/yk/shoppingCart/add.do', // 购物车商品数量的修改
  shoppingCarUpdate: '/yk/shoppingCart/update_cart', // 购物车商品的删除等操作
  findSiteList: '/nk/app/website_config/v1/city_list.do', // 获取站点列表
  findKeyword: '/nk/app/content_keyword/v1/find_page.do', // 获取文章内容关键词
  findCityList: '/nk/app/website_config/v1/city_list.do', // 查询市级数据列表
};
