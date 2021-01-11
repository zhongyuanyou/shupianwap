/**
 * @Description: 交易咨询表单
 * @author zhaoDongMing
 * @date
 */
import { CRISPS_C_MIDDLE_SERVICE_API } from '../config/constant'

const transactionConsApi = {
  get_sms_code: `${CRISPS_C_MIDDLE_SERVICE_API}/yk/trade/consult/get_sms_code2.do`, // 获取搜索词（推荐，热搜）
}
export { transactionConsApi }
