/**
 * @Description: 交易咨询表单
 * @author zhaoDongMing
 * @date
 */
import {
  CRISPS_C_MIDDLE_SERVICE_API,
  CHIPS_RESOURCE_API,
} from '../config/constant'

const transactionConsApi = {
  get_sms_code: `${CRISPS_C_MIDDLE_SERVICE_API}/nk/trade/consult/get_sms_code2.do`, // 获取搜索词（推荐，热搜）
  add_consult: `${CRISPS_C_MIDDLE_SERVICE_API}/nk/trade/consult/add1.do`, // 未登录用户留言
  consult: `${CRISPS_C_MIDDLE_SERVICE_API}/nk/trade/consult/consult.do`, // 登录用户留言
  resouse_form: `${CHIPS_RESOURCE_API}/nk/v1/business/add_allot_resource.do`, // 客源中心表单接口
}
export { transactionConsApi }
