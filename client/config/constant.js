/*
 * @Author: xiao pu
 * @Date: 2020-12-09 10:24:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 17:26:44
 * @Description: file content
 * @FilePath: /chips-wap/client/config/constant.js
 */

const CHIPS_WAP_INSTANCE_NAME = 'crisps-app-wap-bff-api'
const CHIPS_WAP_SERVICE_PREFIX = 'service'

// c端 app调用的java聚合中间层
const CHIPS_APP_INSTANCE_NAME = 'crisps-c-middle-service-api'
const CHIPS_APP_SERVICE_PREFIX = 'crisps-c-middle-service-api'

export const CHIPS_WAP_BASE_URL = `/${CHIPS_WAP_INSTANCE_NAME}/${CHIPS_WAP_SERVICE_PREFIX}` // 使用网关调用路径的规则：项目实例名 / 自己服务路径前缀
export const CHIPS_APP_BASE_URL = `/${CHIPS_APP_INSTANCE_NAME}/${CHIPS_APP_SERVICE_PREFIX}` // 使用网关调用路径的规则：项目实例名 / 自己服务路径前缀
