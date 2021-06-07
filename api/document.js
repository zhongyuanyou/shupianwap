'use strict'

import { CHIPS_APP_BASE_URL } from '../config/constant'
// const CHIPS_WAP_BASE_URL = 'http://172.16.133.115:7001/service'

const documentApi = {
  forward: `${CHIPS_APP_BASE_URL}/yk/documentlibrary/v2/add_forwarding.do`, // 转发记录
  download: `${CHIPS_APP_BASE_URL}/yk/documentlibrary/v2/download_to_email.do`, // 下载到邮箱

}
export { documentApi }
