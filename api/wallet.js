'use strict'
// import { CHIPS_WAP_BASE_URL } from '../config/constant'
const CHIPS_WAP_BASE_URL = 'http://172.16.135.181:7001/service'
// const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
const walletApi = {
  info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/info.do`, // 获取账户信息
  authentication_info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/authentication_info.do`, // 获取认证详情
  open_and_activation: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/open_and_activation.do`, // 开通并激活钱包
  bill_list: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/bill_list.do`, // 账单列表
  bill_details: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/bill_details.do`, // 账单详情
  cardList: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/card_list.do`, // 银行卡列表
  cardDetail: `${CHIPS_WAP_BASE_URL}/yk/wallet/v1/card_detail.do`, // 银行卡详情
  add_bank_card: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/bind_card.do`, // 添加银行卡
  card_no: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/card_no.do`,
  account_balance_info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/account_balance_info.do`,
  unbundle: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/unbundle.do`, // 解绑银行卡
}
export { walletApi }
