/** @Author: ma liang
 * @Date: 2020-12-03 11:26:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-03 11:26:00
 * @Description: 用户中心api地址
 * @FilePath: /chips-wap/config/envConfig/serveApi/module/user.js
 * */
"use strict";
module.exports.userApi = {
  login: "/nk/api/auth/v1/login.do",
  logout: "/nk/api/auth/v1/login_out.do",
  verifySmsCode: "/nk/api/sms/v1/verify_sms_code.do",
  register: "/nk/api/register/v1/register_user.do",
  reset: "/nk/api/account/v1/reset_password_by_user_id.do",
};
