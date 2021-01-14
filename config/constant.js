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

export const CHIPS_WAP_BASE_URL = `/${CHIPS_WAP_INSTANCE_NAME}/${CHIPS_WAP_SERVICE_PREFIX}` // 使用网关调用路径的规则：项目实例名 / 自己服务路径前缀
export const CHIPS_APP_BASE_URL = `/${CHIPS_APP_INSTANCE_NAME}/${CHIPS_APP_SERVICE_PREFIX}` // 使用网关调用路径的规则：项目实例名 / 自己服务路径前缀

export const CRISPS_C_MIDDLE_SERVICE_API = 'crisps-c-middle-service-api'
export const CHIPS_PLATFORM_CODE = 'COMDIC_PLATFORM_CRISPS' // 薯片平台code
export const WAP_TERMINAL_CODE = 'COMDIC_TERMINAL_WAP' // WAP终端code

export const GOODSDETAIL =
  'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg' // 产品详情默认图片
export const GOODSLIST =
  'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg' // 产品列表默认图片
