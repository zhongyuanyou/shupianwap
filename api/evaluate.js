'use strict'

// import { CHIPS_WAP_BASE_URL } from '../config/constant'
const CHIPS_WAP_BASE_URL = 'http://172.16.133.115:7001/service'

const evaluateApi = {
  detail: `${CHIPS_WAP_BASE_URL}/yk/evaluate/v1/get_evaluate_detail.do`, // 首页首屏服务端初始化请求数据
}
export { evaluateApi }
