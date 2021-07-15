/* T环境配置文件 */

module.exports = {
  baseURL: 'https://dspmicrouag.shupian.cn', // 网关地址
  mchMerchantSgin: '62070A76D7BF904888B75450D2D6B4C4',
  mchCoding: '20190620000111',
  imBaseUrl: 'https://dcpsim.shupian.cn', // IM 地址
  domainUrl: 'https://dm.shupian.cn/', // 域名
  ossUrl: 'https://dspapi.shupian.cn', // oss域名
  platformCode: 'COMDIC_PLATFORM_CRISPS', // 平台code
  terminalCode: 'COMDIC_TERMINAL_WAP', // 终端code
  imsysCode: 'crisps-app', // imsysCode
  imsecret: '31b07a35b549a5046fb1cace1377c15e', // imsecret
  imappKey: '4R29RHK10AQILT8ONUAOC5DDST', // im
  // 网关签名code
  SYS_CODE: 'spc-wap',
  // 网关签名密钥
  SECRET: '1624afea172ca5ed25a5ac6722b7d232',
  // OSS资源路径(使用框架组上传)
  deleteUrl:
    'https://dspmicrouag.shupian.cn/tac-external-platform-server/oss/deleteSingle',
  callBackUrl:
    'https://dspmicrouag.shupian.cn/tac-external-platform-server/oss/callback',
  stsUrl: 'https://dspmicrouag.shupian.cn/tac-external-platform-server/oss/sts',
  listUrl:
    'https://dspmicrouag.shupian.cn/tac-external-platform-server/oss/find',
  fileUrl:
    'https://dspmicrouag.shupian.cn/tac-external-platform-server/oss/find',
  mutlefindUrl:
    'https://dspmicrouag.shupian.cn/tac-external-platform-server/oss/mutlefind',
    formApi: 'https://dspmicrouag.shupian.cn/crisps-resource-house', // 资源表单地址 新 -企大顺
}
