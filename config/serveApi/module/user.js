/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: 用户中心api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/user.js
 * */
"use strict";
module.exports.userApi = {
  updateInfo: '/user-auth/yk/user/v1/update_user_info.do', // 修改用户信息
  dataInfo: '/user-auth/nk/api/user/v1/find_user_by_id.do', // 查询用户信息
  updateShippingAddress: '', // 编辑收货地址
  newShippingAddress: '/yk/api/profile/v1/save_user_address.do', // 新增收货地址
  listShippingAddress: '/nk/api/profile/v1/find_shopping_address_list.do', // 收货地址列表
  detailShippingAddress: '/nk/api/profile/v1/find_shopping_address_info.do', // 收货地址详情
  delShippingAddress: '', // 删除收货地址
  defaultShippingAddress: '', // 设置为默认收货地址
};
