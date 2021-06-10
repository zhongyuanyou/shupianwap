/* 产线配置文件 */

module.exports = {
  baseURL: 'https://spmicrouag.shupian.cn', // 薯片产线环境
  mchMerchantSgin: 'A604FF1CEEFE030F4D6CB1D452CA8B56',
  mchCoding: '20190620000111',
  imBaseUrl: 'https://im.shupian.cn', // IM 地址
  domainUrl: 'https://m.shupian.cn/', // 域名
  ossUrl: 'https://spapi.shupian.cn', // oss域名
  platformCode: 'COMDIC_PLATFORM_CRISPS', // 平台code
  terminalCode: 'COMDIC_TERMINAL_WAP', // 终端code
  imsysCode: 'crisps-app', // 薯片sysCode
  imsecret: 'bda65845493c8f8f7e0a86536a889396', // 薯片secret
  imappKey: '4R29RHK10AQILT8ONUAOC5DDST',
  // 网关签名code
  SYS_CODE: 'spc-wap',
  // 网关签名密钥
  SECRET: 'c8a4d4389b5d20f6b020ebfebb8bd428',
  // OSS资源路径(使用框架组上传)
  deleteUrl:
    'https://spmicrouag.shupian.cn/tac-external-platform-server/oss/deleteSingle',
  callBackUrl:
    'https://spmicrouag.shupian.cn/tac-external-platform-server/oss/callback',
  stsUrl: 'https://spmicrouag.shupian.cn/tac-external-platform-server/oss/sts',
  listUrl:
    'https://spmicrouag.shupian.cn/tac-external-platform-server/oss/find',
  fileUrl:
    'https://spmicrouag.shupian.cn/tac-external-platform-server/oss/find',
  mutlefindUrl:
    'https://spmicrouag.shupian.cn/tac-external-platform-server/oss/mutlefind',
}
