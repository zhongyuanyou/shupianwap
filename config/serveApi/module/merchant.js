/*
 * @Author: xiao pu
 * @Date: 2020-12-10 09:42:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-10 20:21:16
 * @Description: 商户中心api地址
 * @FilePath: /chips-wap/config/serveApi/module/merchant.js
 */

"use strict";
module.exports.merchantApi = {
  list: "/yk/merchant/user/v1/get_mch_settled_info_list.do", // 获取入驻商户用户列表
  detail: "/usermore/mch-user-info-more/v1/get_ygInformation.do", // 名片信息
  rank: "/yk/merchant/mch-point-change-log/v1/get_our_ranking.do", // 同城排名积分
  addressList: "/yk/merchant/mch_address/v1/get_address_batch.do", // 办公地址
  categoryList: "/yk/merchant/mch_address/v1/get_address_by_id.do", // 类目列表
  sensitiveInfo: "/yk/common/v1/get_sensitive_info.do", // 隐私信息
};
