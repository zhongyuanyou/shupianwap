/*
 * @Author: xiao pu
 * @Date: 2020-12-09 10:24:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 10:58:27
 * @Description: file content
 * @FilePath: /chips-wap/client/config/constant.js
 */

const CHIPS_WAP_INSTANCE_NAME = 'crisps-app-wap-bff-api'
const CHIPS_WAP_SERVICE_PREFIX = 'service'

// c端 app调用的java聚合中间层
const CHIPS_APP_INSTANCE_NAME = 'crisps-c-middle-service-api'
const CHIPS_APP_SERVICE_PREFIX = ''
export const CRM_MIDDLE_APP = `/crm-middle-app/api/crisps-crm/${CHIPS_WAP_SERVICE_PREFIX}`
export const CHIPS_WAP_BASE_URL = `/${CHIPS_WAP_INSTANCE_NAME}/${CHIPS_WAP_SERVICE_PREFIX}` // 使用网关调用路径的规则：项目实例名 / 自己服务路径前缀
// export const CHIPS_WAP_BASE_URL = `http://172.16.132.240:7001/service`
export const CHIPS_APP_BASE_URL = `/${CHIPS_APP_INSTANCE_NAME}/${CHIPS_APP_SERVICE_PREFIX}` // 使用网关调用路径的规则：项目实例名 / 自己服务路径前缀
export const CRISPS_C_MIDDLE_SERVICE_API = 'crisps-c-middle-service-api'
export const CHIPS_RESOURCE_URL = 'crisps-resource-house'
export const GOODSDETAIL =
  'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg' // 产品详情默认图片
export const GOODSLIST =
  'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg' // 产品列表默认图片
export const AVATAR =
  'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png' // 产品列表默认图片
export const APPISPROD = false // APP是否上线
export const HELP_CLASS_CODE = {
  // 帮助中心分类code
  qdaCode: 'con100120', // 企大宝(案加)
  spAppCode: 'con100029', // 薯片app
  qdsCode: 'con100045', // 企大顺
  wapCode: 'con100029', //  薯片wap
}

export const PLATFORM_CODE = {
  // 平台code
  wap: 'COMDIC_PLATFORM_CRISPS',
}

export const TERMINAL_CODE = {
  // 终端code
  app: 'COMDIC_TERMINAL_APP',
  wap: 'COMDIC_TERMINAL_WAP',
}

export const DOMAIN = (() => {
  if (process.client) {
    return location.href.indexOf('3001') !== -1 ? '/' : 'shupian.cn'
  }
})()
