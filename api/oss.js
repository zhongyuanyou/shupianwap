'use strict'
import { ossUrl } from '~/config/index'
const ossApi = {
  add: `${ossUrl}/api/oss/v1/upload`, // 上传图片
  getOssToken: `/ossapi/api/oss/v1/getStraightOssToken.do`, // 文件直传-获取OSS鉴权
  paasCallBack: `${ossUrl}/api/oss/v1/straightOssCallback.do`, // 文件直传-获取OSS鉴权
}
export { ossApi }
