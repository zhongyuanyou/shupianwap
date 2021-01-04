'use strict'

import { CHIPS_WAP_BASE_URL } from '../config/constant'
const interviewApi = {
  list: `${CHIPS_WAP_BASE_URL}/nk/interview/v1/get_interview_list.do`, // 获取用户信息
  cancel: `${CHIPS_WAP_BASE_URL}/nk/interview/v1/update_interview_status.do`, // 取消面谈
  detail: `${CHIPS_WAP_BASE_URL}/nk/interview/v1/interview_detail.do`, // 面谈详情
}
export { interviewApi }
