'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.133.40:7001/service'
const userinfoApi = {
  info: `${CHIPS_WAP_BASE_URL}/yk/user/v1/info.do`, // 获取用户信息
  update: `${CHIPS_WAP_BASE_URL}/yk/user/v1/update.do`, // 修改用户信息
  loginOut: `${CHIPS_WAP_BASE_URL}/nk/login/v1/logout.do`, // 退出登录
  configuration: `${CHIPS_WAP_BASE_URL}/nk/user/v1/configuration.do`, // 获取用户配置
  findUserDecryptById: `${CHIPS_WAP_BASE_URL}/yk/user/v1/find_user_decrypt_by_id.do`, // 通过用户id查询明文用户详情
}
export { userinfoApi }
