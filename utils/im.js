import imSdk from '@dgg/sp-im-sdk'

/**
 * @description: 初始化im
 * @param {String} env: 环境 必传
 * @param {String} token: 登录的获取的X-Auth-Token 必传
 * @param {String} userId: 用户中心userID 必传
 * @param {String} userTypeFlag: 用户类型 必传
 * @param {String} sysCode: 平台sysCode 必传
 * @param {String} secret: secret 必传
 * @param {Function} onError: 报错
 * @return: void
 */
export function imInit(data = {}) {
  const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
  const BASE = {
    // 开发、测试环境
    development: 'T',
    // 预发布环境
    release: 'D',
    // 生产环境
    production: 'P',
  }
  const env = BASE[DGG_SERVER_ENV]
  const initSdk = imSdk.instance({
    env, // 'D|T|Y|P'
    token: data.token,
    userId: data.userId,
    userTypeFlag: data.userType,
    sysCode: 'crisps-app',
    secret: 'b06ca305974e8b6b590b8315f72a7438',
    appKey: '4R29RHK10AQILT8ONUAOC5DDST',
    isConnectSocket: false,
    onError: (res) => {
      console.log(res)
    },
  })
  return initSdk
}

/**
 * @description: 获取未读数总数
 * @param {Object} imExample: 初始化IM的实例  必传
 * @param {Object} data: 非必传
 * @return: void
 */
export function pullUnreadMsgCount(imExample, data = {}) {
  return new Promise((resolve) => {
    imExample.pullUnreadMsgCount({}, (res) => {
      resolve(res)
    })
  })
}
