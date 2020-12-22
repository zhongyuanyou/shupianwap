/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: 用户中心api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/user.js
 * */
"use strict";
module.exports.userApi = {
  login: "/nk/auth/v1/login.do",
  logout: "/nk/auth/v1/login_out.do",
  accountInfo: "/nk/account/v1/find_account_by_user_id.do", // 获取登录账户信息
  verifySmsCode: "/nk/sms/v1/verify_sms_code.do", // 校验短信验证码
  register: "/nk/register/v1/register_user.do",
  reset: "/nk/account/v1/reset_password_by_user_id.do",
  updateInfo: "/yk/user/v1/update_user_by_type.do", // 修改用户信息
  dataInfo: "/yk/user/v1/find_user_decrypt_by_id.do", // 查询用户信息
  updateShippingAddress: "/yk/profile/v1/update_user_address.do", // 编辑收货地址
  newShippingAddress: "/yk/profile/v1/save_user_address.do", // 新增收货地址
  listShippingAddress: "/yk/profile/v1/find_shopping_address_list.do", // 收货地址列表
  detailShippingAddress: "/yk/profile/v1/find_shopping_address_decrypt.do", // 收货地址详情
  delShippingAddress: "/yk/profile/v1/delete_shopping_address.do", // 删除收货地址
  getSmsCode: '/nk/sms/v1/send_sms_code.do', // 获取短信验证码
  imgCode: '/nk/auth/getVerifyCode.do', // 获取图形验证码
  verifyImgCode: '/nk/auth/verifyCode.do', // 校验图形验证码
  userConfig: '/nk/user/v1/find_config_by_code.do', // 用户配置规则
};
