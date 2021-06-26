'use strict'
// import { CHIPS_WAP_BASE_URL } from '../config/constant'
const CHIPS_WAP_BASE_URL = 'http://172.16.135.188:7001/service'
// const CHIPS_WAP_BASE_URL = 'http://127.0.0.1:7001/service'
const walletApi = {
  info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/info.do`, // 获取账户信息
  authentication_info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/authentication_info.do`, // 获取认证详情
  open_and_activation: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/open_and_activation.do`, // 开通并激活钱包
  bill_list: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/bill_list.do`, // 账单列表
  bill_details: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/withdraw_detail.do`, // 账单详情,提现详情
  cardList: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/card_list.do`, // 银行卡列表
  card_info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/card_info.do`, // 开户行信息
  cardDetails: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/card_details.do`, // 银行卡详情
  add_bank_card: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/bind_card.do`, // 添加银行卡
  card_no: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/card_no.do`, // 根据卡号查银行
  account_balance_info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/account_balance_info.do`,
  unbundle: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/unbundle.do`, // 解绑银行卡
  account_info: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/account_info.do`, // 实名认证信息
  reset_password: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/reset_password.do`, // 根据电话修改密码
  check_set_password: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/check_set_password.do`, // 检测是否设置密码
  withdraw: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/withdraw.do`, // 余额提现
  // withdrawRecord: `${CHIPS_WAP_BASE_URL}/nk/wallet/v1/withdraw.do`, // 余额提现记录
}
export { walletApi }
