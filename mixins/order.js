/**
 * ORDER_ORDER_RESOURCE_STATUS_HANDLED
 * @author tangdaibing
 * @since 2021/04/01
 * @lastEditDate 2021/04/03
 * @param operateSourcePlat 操作系统来源  薯片：ORDER_PLAT_C,企大顺：ORDER_PLAT_B,企大宝：ORDER_PLAT_S,运营后台：ORDER_PLAT_A 系统 SYSTEM
 * @param operateTerminal 操作终端 pc端：ORDER_TERMINAL_PC,wap端：ORDER_TERMINAL_WAP,小程序：ORDER_TERMINAL_WECHAT_APPLETS,app端：ORDER_TERMINAL_APP
 * @param cusOrderId 客户单id
 * @param orderId 订单id
 * @param orderSkuList 订单产品集合
 * @param orderSkuEsList 订单产品集合
 * @param orderList 订单列表
 * */

import { auth } from '@/api'
import orderApi from '@/api/order'
// 客户单状态code
const ORDERSTATUSCODE = {
  1: 'ORDER_CUS_STATUS_UNPAID', // 未付款
  2: 'ORDER_CUS_STATUS_PROGRESSING', // 进行中
  3: 'ORDER_CUS_STATUS_COMPLETED', // 已完成
  4: 'ORDER_CUS_STATUS_CANCELLED', // 已取消
  5: 'ORDER_CUS_STATUS_UNSUBMITE', // 待提交
}

// 支付类型CODE
const PAYTYPECODE = {
  1: 'PRO_PRE_PAY_POST_SERVICE', // 先付款后服务
  2: 'PRO_PRE_DEPOSIT_POST_OTHERS', // 先定金后尾款
  3: 'PRO_PRE_SERVICE_POST_PAY_BY_NODE', // 按服务节点付费
  4: 'PRO_PRE_SERVICE_FINISHED_PAY', // 服务完结收费
}
// 客户单支付状态code
const PAYSTATUSCODE = {
  1: 'ORDER_CUS_PAY_STATUS_UN_PAID', // 未支付
  2: 'ORDER_CUS_PAY_STATUS_PART_PAID', // 部分支付
  3: 'ORDER_CUS_PAY_STATUS_COMPLETED_PAID', // 支付完成
}
// 根据订单状态判断订单状态名称
const orderStatusObj = {
  // 销售商品待提交
  SALE_STATUS_UNSUBMITE: {
    type: 'PRO_CLASS_TYPE_SALES',
    code: 'ORDER_ORDER_SALE_STATUS_UNSUBMITE',
    name: '待提交',
    cripsName: '待提交',
    status: 'ORDER_CUS_STATUS_UNSUBMITE',
  },
  // 交易商品 待提交
  TRADE_STATUS_UNSUBMITE: {
    type: 'PRO_CLASS_TYPE_TRANSACTION',
    code: 'ORDER_ORDER_TRADE_STATUS_UNSUBMITE',
    name: '待提交',
    cripsName: '待提交',
    status: 'ORDER_CUS_STATUS_UNSUBMITE',
  },
  //  资源商品 待提交：
  RESOURCE_STATUS_UNSUBMITE: {
    type: 'PRO_CLASS_TYPE_SERVICE_RESOURCE',
    code: 'ORDER_ORDER_RESOURCE_STATUS_UNSUBMITE',
    name: '待提交',
    cripsName: '待提交',
    status: 'ORDER_CUS_STATUS_UNSUBMITE',
  },
  // 服务商品  待提交：
  SERVER_STATUS_UNSUBMITE: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_UNSUBMITE',
    name: '待提交',
    cripsName: '待提交',
    status: 'ORDER_CUS_STATUS_UNSUBMITE',
  },

  TRADE_STATUS_UN_PAID: {
    type: 'PRO_CLASS_TYPE_TRANSACTION',
    code: 'ORDER_ORDER_TRADE_STATUS_UN_PAID',
    name: '未付款',
    cripsName: '未付款',
    status: 'ORDER_CUS_STATUS_UNPAID',
  },
  TRADE_STATUS_HANDLING: {
    type: 'PRO_CLASS_TYPE_TRANSACTION',
    code: 'ORDER_ORDER_TRADE_STATUS_HANDLING',
    name: '处理中',
    cripsName: '交易中',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  TRADE_STATUS_HANDLED: {
    type: 'PRO_CLASS_TYPE_TRANSACTION',
    code: 'ORDER_ORDER_TRADE_STATUS_HANDLED',
    name: '已处理',
    cripsName: '待确认',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  TRADE_STATUS_COMPLETED: {
    type: 'PRO_CLASS_TYPE_TRANSACTION',
    code: 'ORDER_ORDER_TRADE_STATUS_COMPLETED',
    name: '已完成',
    cripsName: '已完成',
    status: 'ORDER_CUS_STATUS_COMPLETED',
  },
  TRADE_STATUS_CANCELLED: {
    type: 'PRO_CLASS_TYPE_TRANSACTION',
    code: 'ORDER_ORDER_TRADE_STATUS_CANCELLED',
    name: '已取消',
    cripsName: '已取消',
    status: 'ORDER_CUS_STATUS_CANCELLED',
  },
  SALES_STATUS_UN_PAID: {
    type: 'PRO_CLASS_TYPE_SALES',
    code: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
    name: '未付款',
    cripsName: '未付款',
    status: 'ORDER_CUS_STATUS_UNPAID',
  },
  SALES_STATUS_HANDLING: {
    type: 'PRO_CLASS_TYPE_SALES',
    code: 'ORDER_ORDER_SALE_STATUS_HANDLING',
    name: '待发货',
    cripsName: '进行中',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  SALES_STATUS_HANDLED: {
    type: 'PRO_CLASS_TYPE_SALES',
    code: 'ORDER_ORDER_SALE_STATUS_HANDLED',
    name: '待收货',
    cripsName: '待确认',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  SALES_STATUS_COMPLETED: {
    type: 'PRO_CLASS_TYPE_SALES',
    code: 'ORDER_ORDER_SALE_STATUS_COMPLETED',
    name: '已完成',
    cripsName: '已完成',
    status: 'ORDER_CUS_STATUS_COMPLETED',
  },
  SALES_STATUS_CANCELLED: {
    type: 'PRO_CLASS_TYPE_SALES',
    code: 'ORDER_ORDER_SALE_STATUS_CANCELLED',
    name: '已取消',
    cripsName: '已取消',
    status: 'ORDER_CUS_STATUS_CANCELLED',
  },

  RESOURCE_STATUS_UN_PAID: {
    type: 'PRO_CLASS_TYPE_SERVICE_RESOURCE',
    code: 'ORDER_ORDER_RESOURCE_STATUS_UN_PAID',
    name: '未付款',
    cripsName: '未付款',
    status: 'ORDER_CUS_STATUS_UNPAID',
  },
  RESOURCE_STATUS_HANDLING: {
    type: 'PRO_CLASS_TYPE_SERVICE_RESOURCE',
    code: 'ORDER_ORDER_RESOURCE_STATUS_HANDLING',
    name: '处理中',
    cripsName: '进行中',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  RESOURCE_STATUS_HANDLED: {
    type: 'PRO_CLASS_TYPE_SERVICE_RESOURCE',
    code: 'ORDER_ORDER_RESOURCE_STATUS_HANDLED',
    name: '待确认',
    cripsName: '待确认',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  RESOURCE_STATUS_COMPLETED: {
    type: 'PRO_CLASS_TYPE_SERVICE_RESOURCE',
    code: 'ORDER_ORDER_RESOURCE_STATUS_COMPLETED',
    name: '已完成',
    cripsName: '已完成',
    status: 'ORDER_CUS_STATUS_COMPLETED',
  },
  RESOURCE_STATUS_CANCELLED: {
    type: 'PRO_CLASS_TYPE_SERVICE_RESOURCE',
    code: 'ORDER_ORDER_RESOURCE_STATUS_CANCELLED',
    name: '已取消',
    cripsName: '已取消',
    status: 'ORDER_CUS_STATUS_CANCELLED',
  },

  SERVER_STATUS_UN_PAID: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_UN_PAID',
    name: '未付款',
    cripsName: '未付款',
    status: 'ORDER_CUS_STATUS_UNPAID',
  },
  SERVER_STATUS_UN_ASSIGN: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_UN_ASSIGN',
    name: '待分配',
    cripsName: '办理中',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  SERVER_STATUS_UN_RECEICE_ORDER: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_UN_RECEICE_ORDER',
    name: '待接单',
    cripsName: '办理中',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  SERVER_STATUS_HANDLING: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_HANDLING',
    name: '处理中',
    cripsName: '办理中',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  SERVER_STATUS_HANDLED: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_HANDLED',
    name: '已处理',
    cripsName: '待确认',
    status: 'ORDER_CUS_STATUS_PROGRESSING',
  },
  SERVER_STATUS_COMPLETED: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_COMPLETED',
    name: '已完成',
    cripsName: '已完成',
    status: 'ORDER_CUS_STATUS_COMPLETED',
  },
  SERVER_STATUS_CANCELLED: {
    type: 'PRO_CLASS_TYPE_SERVICE',
    code: 'ORDER_ORDER_SERVER_STATUS_CANCELLED',
    name: '已取消',
    cripsName: '已取消',
    status: 'ORDER_CUS_STATUS_CANCELLED',
  },
}

// 发票
const billStatusCodesObj = {
  1: 'INVOICE_STATUS_WAITE',
  2: 'INVOICE_STATUS_PROCESS',
  3: 'INVOICE_STATUS_SUCCESS',
  4: 'INVOICE_STATUS_FAIL',
  5: 'INVOICE_STATUS_AUDIT',
  6: 'INVOICE_STATUS_REJECT',
}
export default {
  data() {
    return {
      payOrderList: [], // 待付款的子订单
      showJiufenModal: false,
      remainTotalPayIds: '', // 分批支付剩余支付批次id
      addOrderXy: {},
      tranXy: {},
      showMydialog: false,
      thisTimePayTotal: 0, // 本期应付批次总额
      allTimePayTotal: 0, // 未支付批次总额
      batchIds: '', // 分批支付id集合
      // 客户单状态CODE对应文字
      CUSORDERSTATUSCODE: {
        ORDER_CUS_STATUS_UNPAID: '待付款', // 未付款
        ORDER_CUS_STATUS_PROGRESSING: '办理中', // 进行中
        ORDER_CUS_STATUS_COMPLETED: '已完成', // 已完成
        ORDER_CUS_STATUS_CANCELLED: '已取消', // 已取消
        ORDER_CUS_STATUS_UNSUBMITE: '待提交',
      },
      // 客户单付款状态CODE对应文字
      PAYSTATUSCODENAME: {
        ORDER_CUS_PAY_STATUS_UN_PAID: '待付款',
        ORDER_CUS_PAY_STATUS_PART_PAID: '部分支付',
        ORDER_CUS_PAY_STATUS_COMPLETED_PAID: '支付完成',
      },
      // 客户单类型
      orderProTypeNoS: {
        1: 'PRO_CLASS_TYPE_TRANSACTION', // 交易
        2: 'PRO_CLASS_TYPE_SALES', // 销售
        3: 'PRO_CLASS_TYPE_SERVICE_RESOURCE', // 资源
        4: 'PRO_CLASS_TYPE_SERVICE', // 服务
      },
      // 订单商品类型
      skuTypes: {
        1: 'ORDER_PRO_TYPE_TRADE', // 交易
        2: 'ORDER_PRO_TYPE_SALE', // 销售
        3: 'ORDER_PRO_TYPE_RESOURCE', // 资源
        4: 'ORDER_PRO_TYPE_SERVICE', // 服务
      },
      // 分批支付状态 alreadyPayment
      batchPayStatus: {
        1: 'ORDER_BATCH_PAYMENT_PAY_0', // 未支付
        2: 'ORDER_BATCH_PAYMENT_PAY_1', // 应支付
        3: 'ORDER_BATCH_PAYMENT_PAY_2', // 已支付
      },
      // 付款节点
      batchNumber: {
        0: '全款',
        1: '首款',
        2: '中期款',
        3: '尾款',
      },
      // 支付类型
      orderPayType: {
        PRO_PRE_PAY_POST_SERVICE: {
          name: '先付款后服务',
          number: 1,
        },
        PRO_PRE_DEPOSIT_POST_OTHERS: {
          name: '先定金后尾款',
          number: 2,
        },
        PRO_PRE_SERVICE_POST_PAY_BY_NODE: {
          name: '先服务按节点付费',
          number: 3,
        },
        PRO_PRE_SERVICE_FINISHED_PAY: {
          name: '服务完结收费',
          number: 4,
        },
      },
      cusOrderCancelReasonName: '', // 订单取消原因
      opType: '', // 操作类型： cancelOrder 取消订单 payMoney 发起支付 confirmComplete 确认完成
    }
  },
  methods: {
    // 初始化选中的订单数据
    initItem(order) {
      this.batchIds = ''
      this.thisTimePayTotal = 0 // 本期应付批次总额
      this.allTimePayTotal = 0 // 未支付批次总额
      this.orderData = order
      // if (this.orderData.id !== order.id || !this.orderData.orderList) {
      //   // 当前选中订单与上次选中订单相同则不初始化数据
      //   this.batchIds = ''
      //   this.thisTimePayTotal = 0 // 本期应付批次总额
      //   this.allTimePayTotal = 0 // 未支付批次总额
      //   this.orderData = order
      // }
    },
    // 判断是否有关联订单  0 无 1有
    checkHasOtherOrder() {
      return this.orderData.orderList.length > 1
    },
    // 判断是否有应付款的子订单
    checkHasPayChildOrder() {
      const newArr = JSON.parse(JSON.stringify(this.orderData.orderList))
      this.payOrderList = newArr.filter((item) => {
        return item.isNeedPay === 1
      })
      if (this.payOrderList.length > 1) {
        return 1
      }
    },
    // 开始支付时判断
    startPay() {
      if (
        this.orderData.payType &&
        this.orderData.payType === 'ORDER_PAY_MODE_OFFLINE'
      ) {
        this.$xToast.error('请前往线下银行网点进行支付！')
        return
      }
      if (
        this.orderData.payType &&
        this.orderData.payType === 'ORDER_PAY_MODE_SECURED'
      ) {
        this.$xToast.error('该订单为担保交易订单，请访问薯片网站PC端进行付款！')
        return
      }
      if (
        this.orderData.isSecuredTrade &&
        this.orderData.isSecuredTrade === 1
      ) {
        this.$xToast.error('该订单为担保交易订单，请访问薯片网站PC端进行付款！')
        return
      }
      if (this.fromPage === 'orderList' || this.fromPage === 'orderDetail') {
        // 同时判断有无关联订单
        if (this.checkHasPayChildOrder()) {
          // 有关联订单时则打开提示弹窗
          this.loading = false
          if (this.$refs.cancleOrderModel) {
            this.$refs.cancleOrderModel.showPop = true
            this.$refs.cancleOrderModel.modalType = 2
          }
          this.$refs.cancleOrderModel.orderList = this.payOrderList
          // 后续操作为关联弹窗点击立即付款后继续查询分批支付列表 走分批支付逻辑判断
        } else {
          // 无关联订单则直接走分批支付逻辑判断
          this.getBatchList()
        }
      } else if (this.checkHasPayChildOrder()) {
        // 有关联订单时打开提示弹窗
        this.loading = false
        if (this.$refs.cancleOrderModel) {
          this.$refs.cancleOrderModel.showPop = true
          this.$refs.cancleOrderModel.modalType = 2
        }
        this.$refs.cancleOrderModel.orderList = this.payOrderList
      } else if (this.payList.length === 1) {
        this.loading = false
        this.$router.push({
          path: '/pay/payType',
          query: {
            orderId: this.orderId,
            cusOrderId: this.cusOrderId,
          },
        })
      } else {
        // 分批支付则打开分批支付弹窗
        this.loading = false
        this.$refs.payModal.showPop = true
      }
    },
    // 获取分批支付信息 订单列表页为点击付款之后进行的查询 详情页为页面加载时查询
    getBatchList() {
      this.loading = true
      orderApi
        .batchPayList(
          { axios: this.$axios },
          {
            page: 1,
            limit: 100,
            cusOrderId: this.cusOrderId || this.orderData.cusOrderId,
          }
        )
        .then((res) => {
          // 客户单的分批支付信息
          this.payList = res
          this.loading = false
          if (
            this.fromPage === 'orderList' ||
            this.fromPage === 'orderDetail'
          ) {
            // 从订单列表页和详情页发起的操作
            this.checkCusBatchPayType()
          } else if (this.fromPage === 'nodeDetail') {
            // 账单明细页面则筛选该订单下的选中商品的支付列表信息
            const nodeList = res.filter((item) => {
              return item.orderSkuId === this.orderId
            })
            // // 计算合计金额
            this.nodeTotalMoney = nodeList.reduce((total, item) => {
              return total + Number(item.money)
            }, 0)
            // 处理合计金额单位
            this.nodeTotalMoney = this.regFenToYuan(this.nodeTotalMoney)
            this.nodeNumber = this.nodeList.length
            // 对支付列表进行排序
            nodeList.forEach((item) => {
              item.batchIndex = Number(item.batchNumber) + 1
              item.money = this.regFenToYuan(item.money)
            })
            this.nodeList = nodeList
          } else {
            // 当前订单的分批支付信息 订单详情页
            // 筛选对应订单的支付列表
            const orderPayList = res.filter((item) => {
              return item.orderId === this.orderData.id
            })
            for (let i = 0, l = orderPayList.length; i < l; i++) {
              this.changePayMoney(orderPayList[i])
            }
            this.orderPayList = orderPayList
            this.paylistLength = this.orderPayList.length
          }
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '获取支付信息失败')
          console.error(err)
        })
    },
    // 纠纷弹窗
    handleShowJiufen() {
      this.$refs.jiufenModal.showJiufenModal = true
    },
    // 判断是分批支付还是全款支付等
    checkCusBatchPayType() {
      if (
        this.payList[0].orderPayType === 'PRO_PRE_PAY_POST_SERVICE' ||
        this.payList[0].orderPayType === 'PRO_PRE_SERVICE_FINISHED_PAY'
      ) {
        // 当支付类型为先付款后服务和服务完结收费且付费节点为全款时（batchNumber=0）进行全款支付
        this.$router.push({
          path: '/pay/payType',
          query: {
            fromPage: this.fromPage,
            cusOrderId: this.orderData.cusOrderId,
          },
        })
      } else {
        let thisTimePayTotal = 0 // 本期应付总额
        let allTimePayTotal = 0 // 剩余未支付所有批次总额
        const idsArr = [] // 应分批支付id
        const remainTotalPayIdsArr = [] // 剩余未支付所有批次总额id
        this.payList.forEach((element) => {
          if (element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1') {
            thisTimePayTotal += Number(element.money)
            idsArr.push(element.id)
          }
          if (
            element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_0' ||
            element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1'
          ) {
            allTimePayTotal += Number(element.money)
            remainTotalPayIdsArr.push(element.id)
          }
        })
        this.thisTimePayTotal = this.regFenToYuan(thisTimePayTotal)
        this.allTimePayTotal = this.regFenToYuan(allTimePayTotal)
        this.batchIds = idsArr.join(',')
        this.remainTotalPayIds = remainTotalPayIdsArr.join(',')
        // 是分批支付则弹起分批支付弹窗 关闭关联订单弹窗
        this.$refs.payModal.showPop = true
        this.$refs.cancleOrderModel.showPop = false
      }
    },
    // 仅用于发起支付时判断
    checkContractIsOver(orderData) {
      const data = orderData || this.orderData
      // 当客户订单状态为已取消时不展示按钮
      if (data.cusOrderStatusNo === ORDERSTATUSCODE[4]) return false
      if (this.fromPage === 'orderList') {
        if (
          !data.contractStatus ||
          (data.contractStatus && data.contractStatus !== 'STRUTS_YWC')
        ) {
          // 此时需先签合同再支付
          return 1
        }
        // 已签完合同
        if (data.contractStatus && data.contractStatus === 'STRUTS_YWC') {
          return 2
        }
        if (!data.contractStatus) {
          // 当无合同信息时显示签署合同 515合同附件版本
          return 1
        } else {
          // 当有合同时显示查看合同 515合同附件版本
          return 2
        }
      } else {
        // 订单详情页面根据合同列表判断
        // 当合同状态为已完成时显示查看合同按钮
        if (
          data.contractVo2s &&
          data.contractVo2s.length &&
          data.contractVo2s[0].contractStatus === 'STRUTS_YWC'
        )
          return 2
        return 1
      }
    },
    // 判断展示合同按钮 false不展示  1签署合同 2查看合同 515 版本 仅用于展示合同按钮判断
    checkContractStatus(orderData) {
      const data = orderData || this.orderData
      // 当客户订单状态为已取消时或是融资生成订单时不展示按钮
      if (data.cusOrderStatusNo === ORDERSTATUSCODE[4] || data.orderApplyInfoId)
        return false
      if (this.fromPage === 'orderList') {
        // if (
        //   (data.contractStatus &&
        //     (data.contractStatus === 'STRUTS_QSZ' ||
        //       data.contractStatus === 'STRUTS_CG')) ||
        //   !data.contractStatus
        // ) {
        //   // 当合同状态为草稿或签署中或无合同信息时显示签署合同按钮 430版本
        //   return 1
        // }
        // 当合同状态为已完成时显示查看合同按钮 430版本
        // if (data.contractStatus && data.contractStatus === 'STRUTS_YWC') {
        //   return 2
        // }
        if (!data.contractStatus) {
          // 当无合同信息时显示签署合同 515合同附件版本
          return 1
        } else {
          // 当有合同时显示查看合同 515合同附件版本
          return 2
        }
      } else {
        // 430版本
        // // 订单详情页面根据合同列表判断
        // // 当合同状态为已完成时显示查看合同按钮
        // if (
        //   data.contractVo2s &&
        //   data.contractVo2s.length &&
        //   data.contractVo2s[0].contractStatus === 'STRUTS_YWC'
        // )
        //   return 2
        // return 1
        // 515版本
        if (data.contractVo2s && data.contractVo2s.length) return 2
        return 1
      }
    },
    // 判断客户单状态类型 1待付款 2进行中 3已完成 4已取消
    checkCusOrderStatus() {
      const cusOrderStatusNo = this.orderData.cusOrderStatusNo
      if (!cusOrderStatusNo) return 0
      for (const key in ORDERSTATUSCODE) {
        if (ORDERSTATUSCODE[key] === cusOrderStatusNo) return Number(key)
      }
    },
    /*
     * @ LastEditors: tang dai bing
     * @ Description:根据不同的订单状态和支付状态判断显示不同的订单操作按钮和支付按钮
     */
    isShowCanCelBtn() {
      // 当且仅当客户订单状态为待付款并且支付状态为未支付时展示取消订单按钮
      return this.orderData.cusOrderStatusNo === ORDERSTATUSCODE[1]
      // && orderData.orderPayStatusNo === PAYSTATUSCODE[1]  暂时修改逻辑放出取消订单按钮
    },
    // 判断是否显示确认订单按钮
    isShowConfirmBtn(data) {
      data = data || this.orderData
      let isShowConfirm
      if (
        data.cusOrderStatusNo === 'ORDER_CUS_STATUS_PROGRESSING' &&
        (data.orderProTypeNo === 'PRO_CLASS_TYPE_TRANSACTION' ||
          data.orderProTypeNo === 'PRO_CLASS_TYPE_SALES ' ||
          data.orderProTypeNo === 'PRO_CLASS_TYPE_SERVICE')
      ) {
        const orderArr = data.orderSkuEsList || data.orderSkuList
        for (let i = 0, l = orderArr.length; i < l; i++) {
          if (
            (orderArr[i].skuStatusNo === 'ORDER_ORDER_SALE_STATUS_HANDLED' ||
              orderArr[i].skuStatusNo === 'ORDER_ORDER_TRADE_STATUS_HANDLED' ||
              orderArr[i].skuStatusNo ===
                'ORDER_ORDER_RESOURCE_STATUS_HANDLED' ||
              orderArr[i].skuStatusNo ===
                'ORDER_ORDER_SERVER_STATUS_HANDLED') &&
            orderArr[i].payStatusNo === 'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          ) {
            if (orderArr[i].userConfirm === 0) {
              isShowConfirm = 1
            }
          }
        }
      }
      return isShowConfirm
    },
    /*
     * @LastEditors: tang dai bing
     * @params:orderData 订单数据
     * @Description:判断是否显示支付按钮，返回数据: false 不显示，1显示立即付款， 2显示支付余款
     */
    isShowPayBtn() {
      const orderData = this.orderData
      if (
        orderData.isNeedPay &&
        orderData.cusOrderPayStatusNo === PAYSTATUSCODE[1] &&
        orderData.cusOrderStatusNo !== ORDERSTATUSCODE[3] &&
        orderData.cusOrderStatusNo !== ORDERSTATUSCODE[4]
      ) {
        // 显示立即付款按钮的条件
        // 1订单可付款
        // 2客户单支付状态为待付款
        // 3订单状态不等于已取消
        // 3订单状态不等于已完成
        return 1
      } else if (
        orderData.isNeedPay &&
        orderData.cusOrderPayStatusNo === PAYSTATUSCODE[2] &&
        orderData.cusOrderStatusNo !== ORDERSTATUSCODE[3] &&
        orderData.cusOrderStatusNo !== ORDERSTATUSCODE[4]
      ) {
        // 显示支付余款的条件
        // 1订单可付款
        // 2客户单支付状态为部分付款
        // 2订单状态不等于已取消
        // 3订单状态不等于已完成
        return 2
      } else {
        return false
      }
    },

    // 判断订单状态 返回数字
    checkOrderStatus(code) {
      const ALLSTATUS = {
        1: 'ORDER_ORDER_TRADE_STATUS_UN_PAID,ORDER_ORDER_SALE_STATUS_UN_PAID,ORDER_ORDER_RESOURCE_STATUS_UN_PAID,ORDER_ORDER_SERVER_STATUS_UN_PAID', // 可取消订单的状态 未付款时
        2: 'ORDER_ORDER_TRADE_STATUS_HANDLING,ORDER_ORDER_TRADE_STATUS_HANDLED,ORDER_ORDER_SALE_STATUS_HANDLING,ORDER_ORDER_SALE_STATUS_HANDLED,ORDER_ORDER_RESOURCE_STATUS_HANDLING,ORDER_ORDER_RESOURCE_STATUS_HANDLED,ORDER_ORDER_SERVER_STATUS_UN_ASSIGN,ORDER_ORDER_SERVER_STATUS_UN_RECEICE_ORDER,ORDER_ORDER_SERVER_STATUS_HANDLING,ORDER_ORDER_SERVER_STATUS_HANDLED', // 进行中
        3: 'ORDER_ORDER_TRADE_STATUS_COMPLETED,ORDER_ORDER_SALE_STATUS_COMPLETED,ORDER_ORDER_RESOURCE_STATUS_COMPLETED,ORDER_ORDER_SERVER_STATUS_COMPLETED', // 已完成
        4: 'ORDER_ORDER_TRADE_STATUS_CANCELLED,ORDER_ORDER_SALE_STATUS_CANCELLED,ORDER_ORDER_RESOURCE_STATUS_CANCELLED,ORDER_ORDER_SERVER_STATUS_CANCELLED', // 已取消
      }
      for (const key in ALLSTATUS) {
        if (ALLSTATUS[key].match(code)) {
          return Number(key)
        }
      }
    },
    // 判断客户单付费类型
    checkPayType() {
      if (!this.orderData.orderPayType) return 0
      for (const key in PAYTYPECODE) {
        if (PAYTYPECODE[key] === this.orderData.orderPayType) return Number(key)
      }
    },
    // 判断订单售后状态 是否展示售后按钮 展示何种售后按钮 0不售后 1退款售后 可售后 2 售后中 3售后完成 4 部分锁定 5已锁定
    checkAfterSaleStatus(orderData) {
      orderData = orderData || this.orderData || this.orderDetail
      // // 售后延期
      // if (orderData) {
      //   return 0
      // }
      // 1.意向单、担保交易订单不展示售后按钮，
      if (
        orderData.orderType === 0 ||
        orderData.payType === 'ORDER_PAY_MODE_SECURED'
      ) {
        return 0
      }
      // 正式单待付款、已完成、已取消不展示售后按钮，只有处理中状态的订单根据订单售后标签、产品是否可售后判断是否可展示售后按钮，
      // 全部产品不可售后，则不展示售后按钮
      // 无售后、部分售后标签，点击跳转到申请售后页面，
      // 售后中，则跳转到订单最新的售后中的售后详情，
      // 已售后则不展示售后按钮
      const orderStatusNum = this.checkOrderStatus(
        orderData.orderStatusNo || ''
      )

      if (
        orderStatusNum === 1 &&
        orderData.orderStatusNo !== 'ORDER_CUS_STATUS_UNPAID' &&
        orderData.orderStatusNo !== 'ORDER_CUS_STATUS_CANCELLED'
      ) {
        return 0
      }
      // afterSaleStatus 售后状态
      // AFTER_SALE_STATUS_0：不可售后;
      // AFTER_SALE_STATUS_1：可售后; 不用
      // AFTER_SALE_STATUS_2：售后中;
      // AFTER_SALE_STATUS_3: 售后完成 ;
      // AFTER_SALE_STATUS_4：部分售后;
      // AFTER_SALE_STATUS_5：已锁定;
      if (
        orderData.afterSaleSwitch &&
        orderData.afterSaleSwitch === 'AFTERSAL_ON'
      ) {
        return 1
      }
      if (
        orderData.afterSaleStatus &&
        orderData.afterSaleStatus === 'AFTER_SALE_STATUS_2'
      ) {
        return 2
      }
      if (
        orderData.afterSaleStatus &&
        orderData.afterSaleStatus === 'AFTER_SALE_STATUS_3'
      ) {
        return 3
      }
      if (
        orderData.afterSaleStatus &&
        orderData.afterSaleStatus === 'AFTER_SALE_STATUS_4'
      ) {
        return 4
      }
      if (
        orderData.afterSaleStatus &&
        orderData.afterSaleStatus === 'AFTER_SALE_STATUS_5'
      ) {
        return 5
      }
    },
    //  跳转售后
    toAfterSale(orderData) {
      orderData = orderData || this.orderDetail || this.orderData
      const statusNum = this.checkAfterSaleStatus(orderData)
      if (statusNum === 1 || statusNum === 4) {
        // 未售后和部分售后跳转至申请页面
        this.$router.push({
          path: '/my/afterSale/refund',
          query: {
            orderId: orderData.id,
          },
        })
      } else if (statusNum === 3) {
        // 未售后和部分售后跳转至申请页面
        this.$router.push({
          path: '/my/afterSale/list',
        })
      } else {
        // 跳转售后详情页面
        this.$router.push({
          path: '/my/afterSale/detail',
          query: {
            orderId: orderData.id,
            orderNo: orderData.orderNo,
            id: orderData.afterSaleId || '',
          },
        })
      }
    },
    // 查询客户单下的关联订单
    getChildOrders(order) {
      order = order || this.orderData
      if (this.fromPage === 'orderList') {
        const orderAgreementIds = order.orderAgreementIds
        if (this.opType === 'payMoney' && !orderAgreementIds) {
          if (!this.addOrderXy || !this.addOrderXy.id) {
            this.$xToast.error('未获取到下单协议，请稍后重试！')
          } else {
            // 无协议则需先同意协议
            this.showMydialog = true
          }
          return
        }
        // if (this.checkContractIsOver(order) === 1) {
        //   // 交易商品付款之前检测有无签署合同
        //   this.$xToast.show({
        //     message: '为满足您的合法权益，请先和卖家签署合同后再付款',
        //     duration: 3000,
        //     icon: 'toast_ic_remind',
        //     forbidClick: true,
        //   })
        //   return
        // }
        if (
          this.opType === 'payMoney' &&
          order.orderSkuEsList[0].skuType === 'PRO_CLASS_TYPE_TRANSACTION'
        ) {
          if (this.checkContractIsOver(order) === 1) {
            // 交易商品付款之前检测有无签署合同
            this.$xToast.show({
              message: '为满足您的合法权益，请先和卖家签署合同后再付款',
              duration: 3000,
              icon: 'toast_ic_remind',
              forbidClick: true,
            })
            return
          }
        }
      }
      if (this.fromPage === 'orderDetail') {
        const orderAgreementIds = this.orderData.orderAgreementIds
        if (this.opType === 'payMoney' && !orderAgreementIds) {
          // 无协议则需先同意协议
          this.showMydialog = true
          return
        }
        if (
          this.opType === 'payMoney' &&
          (order.skuType === 'PRO_CLASS_TYPE_TRANSACTION' ||
            order.skuType === this.skuTypes[1])
        ) {
          if (!orderAgreementIds) {
            this.showMydialog = true
            return
          }
          if (this.checkContractIsOver() === 1) {
            // 交易商品付款之前检测有无签署合同
            this.$xToast.show({
              message: '为满足您的合法权益，请先和卖家签署合同后再付款',
              duration: 3000,
              icon: 'toast_ic_remind',
              forbidClick: true,
            })
            return
          }
        }
      }
      if (!this.orderData.orderList) {
        this.loading = true
        orderApi
          .getChildOrder(
            { axios: this.$axios },
            { cusOrderId: this.orderData.cusOrderId }
          )
          .then((res) => {
            this.loading = false
            this.orderData.orderList = res.list
            this.switchOptionType()
          })
          .catch((err) => {
            this.loading = false
            this.$xToast.error(err.message || '操作失败')
            console.error(err)
          })
      } else {
        this.switchOptionType()
      }
    },
    // 同意协议
    confirmAggret(order) {
      this.loading = true
      if (!this.addOrderXy || !this.addOrderXy.id || !this.tranXy.id) {
        this.$xToast.error('获取协议失败，请刷新重试')
        return
      }
      orderApi
        .aggrement(
          { axios: this.$axios },
          {
            orderCusId: this.orderData.cusOrderId || order.orderCusId,
            orderAgreementIds: this.addOrderXy.id + ',' + this.tranXy.id,
            orderAgreementType: 'AGREEMENT_TYPE_PAY',
          }
        )
        .then((res) => {
          if (this.fromPage === 'orderList') {
            setTimeout(() => {
              this.getOrderList()
              this.$xToast.success('操作成功')
            }, 1000)
          } else {
            this.getDetail()
            this.$xToast.success('操作成功')
          }
        })
        .catch((error) => {
          console.error(error)
          this.$xToast.error('操作失败，请稍后重试')
        })
    },
    // 不同意协议
    cancelAggret() {
      this.showMydialog = false
    },
    // 进入协议页面
    enterAgreement(code) {
      this.$router.push({
        name: 'login-protocol',
        query: {
          categoryCode: code,
          hideHeader: false,
        },
      })
    },
    // 根据操作类型进行不同的任务
    switchOptionType() {
      if (this.$refs.cancleOrderModel) {
        if (this.opType === 'cancelOrder') {
          // 弹出取消订单弹窗
          this.$refs.cancleOrderModel.showPop = true
          if (this.orderData.orderList.length > 1) {
            this.$refs.cancleOrderModel.orderList = this.orderData.orderList
            this.$refs.cancleOrderModel.step = 1
          } else {
            this.$refs.cancleOrderModel.step = 2
          }
        } else if (this.opType === 'payMoney') {
          this.startPay()
        }
      }
    },
    // 确认完成
    confirmOrder(orderSkuIds) {
      if (this.fromPage === 'orderList') {
        const arr1 =
          this.orderData.orderSkuEsList || this.orderData.orderSkuList
        orderSkuIds = arr1.map((item) => {
          return item.id
        })
      } else if (this.fromPage === 'orderDetail' && !orderSkuIds) {
        const ids = []
        const arr1 =
          this.orderData.orderSkuList ||
          this.orderData.orderSkuEsList ||
          this.orderData.orderList
        arr1.forEach((item) => {
          if (
            item.skuStatusNo === 'ORDER_ORDER_SALE_STATUS_HANDLED' ||
            item.skuStatusNo === 'ORDER_ORDER_TRADE_STATUS_HANDLED' ||
            item.skuStatusNo === 'ORDER_ORDER_SERVER_STATUS_HANDLED'
          )
            ids.push(item.id)
        })
        // 订单详情页里的确认完成为单个服务商品的商品id
        orderSkuIds = ids
      } else {
        orderSkuIds = new Array(1).fill(orderSkuIds)
      }
      if (!orderSkuIds.length) {
        return this.$xToast.warning('该订单未到确认完成节点！')
      }
      const params = {
        orderSkuIds,
        operateSourcePlat: 'COMDIC_PLATFORM_CRISPS',
        operateTerminal: 'ORDER_TERMINAL_WAP',
      }
      orderApi
        .confirmOrder({ axios: this.$axios }, params)
        .then(() => {
          this.$xToast.success('操作成功')
          if (this.fromPage === 'orderList') this.getOrderList()
          else this.getDetail()
        })
        .catch((err) => {
          this.$xToast.error(err.message || '操作失败')
          console.error(err)
        })
    },
    // 取消订单
    cancleOrder(orderCancelCode, orderCancelName) {
      this.loading = true
      orderApi
        .cancelOrder(
          { axios: this.axios },
          {
            orderId: this.orderData.orderId,
            cusOrderIds: new Array(1).fill(this.orderData.cusOrderId),
            orderCancelCode,
            orderCancelName,
            orderCancelReason: orderCancelName,
            operateSourcePlat: 'COMDIC_PLATFORM_CRISPS',
            operateTerminal: 'COMDIC_TERMINAL_WAP',
          }
        )
        .then((res) => {
          this.$refs.cancleOrderModel.showPop = false
          this.loading = false
          this.$xToast.success('操作成功')
          if (this.fromPage === 'orderList') this.getOrderList()
          else if (this.fromPage === 'orderDetail') this.getDetail()
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '操作失败')
          console.error(err)
        })
    },
    // 价格处理分转元
    regFenToYuan(fen) {
      let num = Number(fen)
      num = fen * 0.01
      num += ''
      const reg =
        num.indexOf('.') > -1
          ? /(\d{1,3})(?=(?:\d{3})+\.)/g
          : /(\d{1,3})(?=(?:\d{3})+$)/g
      num = num.replace(reg, '$1')
      num = this.toDecimal2(num)
      return num
    },
    toDecimal2(x) {
      let f = parseFloat(x)
      if (isNaN(f)) {
        return false
      }
      f = Math.round(x * 100) / 100
      let s = f.toString()
      let rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    // 订单价格分转元
    changeMoney(orderItem) {
      if (orderItem.orderTotalMoney && orderItem.depositAmount)
        // 尾款
        orderItem.lastAount = this.regFenToYuan(
          Number(orderItem.orderTotalMoney) -
            Number(orderItem.depositAmount) -
            Number(orderItem.orderDiscountMoney)
        )
      else orderItem.lastAount = '0.00'
      if (orderItem.depositAmount)
        // 定金
        orderItem.depositAmount = this.regFenToYuan(orderItem.depositAmount)

      if (orderItem.orderPaidMoney)
        // 已支付金额
        orderItem.orderPaidMoney = this.regFenToYuan(orderItem.orderPaidMoney)

      if (orderItem.orderPayableMoney)
        // 应付金额
        orderItem.orderPayableMoney = this.regFenToYuan(
          orderItem.orderPayableMoney
        )
      // 订单总金额 已减去优惠券的金额
      if (orderItem.orderTotalMoney && orderItem.orderDiscountMoney) {
        orderItem.shouldPayTotalMoney = this.regFenToYuan(
          Number(orderItem.orderTotalMoney) -
            Number(orderItem.orderDiscountMoney)
        )
      }
      if (orderItem.orderDiscountMoney)
        // 优惠金额
        orderItem.orderDiscountMoney = this.regFenToYuan(
          orderItem.orderDiscountMoney
        )
      if (orderItem.discountTotal)
        // 优惠总额
        orderItem.discountTotal = this.regFenToYuan(orderItem.discountTotal)
      if (orderItem.orderTotalMoney)
        // 总金额
        orderItem.orderTotalMoney = this.regFenToYuan(orderItem.orderTotalMoney)
      if (orderItem.orderSurplusMoney)
        // 剩余应付金额
        orderItem.orderSurplusMoney = this.regFenToYuan(
          orderItem.orderSurplusMoney
        )
      const arr2 = orderItem.orderSkuEsList || orderItem.orderSkuList
      if (arr2.length) {
        for (let j = 0, len = arr2.length; j < len; j++) {
          // 商品售价
          if (arr2[j].skuPrice) {
            arr2[j].skuPrice = this.regFenToYuan(arr2[j].skuPrice)
          }
        }
      }
    },
    // 支付列表价格转换
    changePayMoney(payItem) {
      if (payItem.money) {
        payItem.money = this.regFenToYuan(payItem.money)
      }
    },
    // 将订单状态解析成对应分类订单对应状态的name
    getStatusName(code) {
      let statusName
      for (const key in orderStatusObj) {
        if (orderStatusObj[key].code === code) {
          statusName = orderStatusObj[key].cripsName
        }
      }
      return statusName
    },
    changeOrderList(order) {
      const arr = order.orderSkuEsList
      const result = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (j === 0) {
            result.push(arr[i])
          } else if (result[j].skuId === arr[i].skuId) {
            result[j].skuCount++
          }
        }
      }
      return result
    },
    // 产品名称脱敏
    setName(str) {
      return '**' + str.substring(2, str.length)
    },
    // jumpContract 430版本
    // toContract() {
    //   // 合同链接
    //   const contractUrl =
    //     this.orderData.contractVo2s &&
    //     this.orderData.contractVo2s.length &&
    //     (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
    //       this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG')
    //       ? this.orderData.contractVo2s[0].contractUrl
    //       : this.orderData.contractUrl
    //   // 合同ID
    //   const contractId =
    //     this.orderData.contractVo2s &&
    //     this.orderData.contractVo2s.length &&
    //     (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
    //       this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG')
    //       ? this.orderData.contractVo2s[0].contractId
    //       : this.orderData.contractId
    //   // 合同编号
    //   const contractNo =
    //     this.orderData.contractVo2s &&
    //     this.orderData.contractVo2s.length &&
    //     (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
    //       this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG')
    //       ? this.orderData.contractVo2s[0].contractNo
    //       : this.orderData.contractNo
    //   if (
    //     (this.orderData.contractStatus &&
    //       (this.orderData.contractStatus === 'STRUTS_QSZ' ||
    //         this.orderData.contractStatus === 'STRUTS_CG')) ||
    //     (this.orderData.contractVo2s &&
    //       this.orderData.contractVo2s.length &&
    //       (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
    //         this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG'))
    //   ) {
    //     this.$router.push({
    //       path: '/contract/preview',
    //       query: {
    //         orderId: this.orderData.id,
    //         cusOrderId: this.orderData.cusOrderId,
    //         fromPage: this.fromPage,
    //         contractUrl,
    //         type: 'qs',
    //         contractId,
    //         contractNo,
    //       },
    //     })
    //   } else if (
    //     (this.orderData.contractStatus &&
    //       this.orderData.contractStatus === 'STRUTS_YWC') ||
    //     (this.orderData.contractVo2s &&
    //       this.orderData.contractVo2s.length &&
    //       this.orderData.contractVo2s[0].contractStatus === 'STRUTS_YWC')
    //   ) {
    //     this.$router.push({
    //       path: '/contract/preview',
    //       query: {
    //         orderId: this.orderData.id,
    //         cusOrderId: this.orderData.cusOrderId,
    //         fromPage: this.fromPage,
    //         contractUrl,
    //         contractId,
    //         contractNo,
    //         type: 'yl',
    //       },
    //     })
    //   } else {
    //     this.$router.push({
    //       path: '/contract/edit',
    //       query: {
    //         orderId: this.orderData.id,
    //         cusOrderId: this.orderData.cusOrderId,
    //         fromPage: this.fromPage,
    //         contractStatus: this.orderData.contractStatus,
    //       },
    //     })
    //   }
    // },
    // 跳转合同515版本
    toContract() {
      // 合同链接
      const contractUrl =
        this.orderData.contractVo2s &&
        this.orderData.contractVo2s.length &&
        (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
          this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG')
          ? this.orderData.contractVo2s[0].contractUrl
          : this.orderData.contractUrl
      // 合同ID
      const contractId =
        this.orderData.contractVo2s &&
        this.orderData.contractVo2s.length &&
        (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
          this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG')
          ? this.orderData.contractVo2s[0].contractId
          : this.orderData.contractId
      // 合同编号
      const contractNo =
        this.orderData.contractVo2s &&
        this.orderData.contractVo2s.length &&
        (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
          this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG')
          ? this.orderData.contractVo2s[0].contractNo
          : this.orderData.contractNo
      if (
        this.orderData.contractStatus ||
        (this.orderData.contractVo2s && this.orderData.contractVo2s.length)
      ) {
        // 有合同则跳转至合同附件列表页
        this.$router.push({
          path: '/order/OrderContract?orderId=XXXX',
          query: {
            orderId: this.orderData.id,
            cusOrderId: this.orderData.cusOrderId,
            fromPage: this.fromPage,
            contractUrl,
            type: 'qs',
            contractId,
            contractNo,
          },
        })
      } else {
        const afterSaleStatu = this.checkAfterSaleStatus()
        if (
          afterSaleStatu === 2 ||
          afterSaleStatu === 4 ||
          afterSaleStatu === 5
        ) {
          this.$xToast.show({
            message: '抱歉，您的订单不可申请合同',
            duration: 3000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
          return
        }
        this.$router.push({
          path: '/contract/edit',
          query: {
            orderId: this.orderData.id,
            cusOrderId: this.orderData.cusOrderId,
            fromPage: this.fromPage,
            contractStatus: this.orderData.contractStatus,
          },
        })
      }
    },
    // 获取交易协议
    async getProtocol(categoryCode) {
      if (!categoryCode) {
        this.$xToast.warn('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        this.loading = true
        const data = await auth.protocol(params)
        const { rows = [] } = data || {}
        this.article = rows[0] || {}
        this.loading = false
        return rows[0] || {}
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },
    //
    getSkuList(orderItem) {
      const arr = orderItem.orderSkuEsList
      for (let i = 0, l = arr.length; i < l; i++) {
        const skuObj = JSON.parse(arr[i].skuDetailInfo)
        if (skuObj && skuObj.sku) {
          const arr2 = skuObj.sku.fieldList
          if (arr2) {
            const arr3 = []
            for (let j = 0, l2 = arr2.length; j < l2; j++) {
              arr3.push(arr2[j].fieldName)
            }
            arr[i].detailName = arr3.join('|')
            arr[i].skuList = arr2
          }
        }
      }
    },
    getDetailValues(item) {
      if (!item.filterSkuList || !item.filterSkuList.length) {
        return ''
      }
      item.filterSkuList = this.rangeSkus(item.filterSkuList)
      const names = []
      item.filterSkuList.forEach((ele) => {
        if (ele && (ele.fieldValueCn || ele.fieldValue))
          names.push(ele.fieldValueCn || ele.fieldValue)
      })
      return names.join('; ')
    },
    // 对sku信息进行排序
    //   const dataInfo={
    //     // 交易分类
    //     TRADE_PRO_CATE_COM("CATE-JYZY-GS", "公司分类数据字典编码"),
    //     TRADE_PRO_CATE_APTI("CATE-JYZY-ZZ", "资质分类数据字典编码"),
    //     TRADE_PRO_CATE_MARK("CATE-JYZY-SB", "商标分类数据字典编码"),
    //     TRADE_PRO_CATE_PATENT("CATE-JYZY-ZL", "专利分类数据字典编码"),

    //     // 公司
    //     COMPANY_CAPITAL("paid_in_capital", "实缴资本"),
    //     COMPANY_INDUSTRY_CODE("company_industry", "公司行业"),
    //     COMPANY_TAX_TYPE_CODE("taxpayer_type", "纳税类型"),
    //     COMPANY_RE_CAP_CODE("registered_capital", "注册资本"),
    //     COMPANY_RE_TIME_CODE("registration_time", "注册时间"),

    //     // 资质
    //     APTITUDE_RE_AREA_CODE("qualification_registration_area", "资质注册区域CODE"),
    //     APTITUDE_EX_DATE_CODE("qualification_expire_date", "资质到期时间CODE"),
    //     APTITUDE_TAX_TYPE_CODE("tax_type", "资质纳税类型CODE"),
    //     APTITUDE_SA_PRO_LIC_CODE("safety_production_license", "资质安全生产许可证CODE"),
    //     APTITUDE_RE_CAP_CODE("qualification_registered_capital", "资质注册资本CODE"),

    //     // 商标
    //     TRADE_MARK_CATE("trademark_category", "商标类别"),
    //     TRADE_MARK_PORTFOLIO("trademark_portfolio", "商标组合"),
    //     TRADE_MARK_STATUS("trademark_state", "商标状态"),

    //     // 专利
    //     PATENT_TYPE("patent_classification", "专利分类"),
    //     PATENT_INDUSTRY("patent_industry", "专利行业"),
    //     PATENT_STATUS("patent_status", "专利状态"),
    // }
    // 对sku信息排序
    rangeSkus(skuArr) {
      const newArr = new Array(skuArr.length).fill(null)
      const FIRSTCODES = [
        'paid_in_capital',
        'qualification_registration_area',
        'trademark_category',
        'patent_classification',
      ]
      const SCENDCODES = [
        'company_industry',
        'qualification_expire_date',
        'trademark_portfolio',
        'patent_industry',
      ]
      const THRDCODES = [
        // 'taxpayer_type',
        'tax_type',
        'trademark_state',
        'patent_status',
      ]
      const FOUTCODES = ['registered_capital', 'safety_production_license']
      const FIVECODES = [
        'registration_time',
        'qualification_registered_capital',
      ]
      const codsArr = [FIRSTCODES, SCENDCODES, THRDCODES, FOUTCODES, FIVECODES]
      for (let i = 0, l = skuArr.length; i < l; i++) {
        if (skuArr[i].fieldCode === 'qualification_expire_date') {
          skuArr[i].fieldValueCn = this.getYearBuyTimeStamp(
            skuArr[i].fieldValue
          )
        }
        if (skuArr[i].fieldCode === 'qualification_registered_capital') {
          skuArr[i].fieldValueCn = this.getCnName(skuArr[i].fieldValueCn)
        }
        if (skuArr[i].fieldCode === 'safety_production_license') {
          skuArr[i].fieldValueCn =
            skuArr[i].fieldValueCn === '是' ? '有安许证' : '无安许证'
        }
        for (let j = 0, l2 = codsArr.length; j < l2; j++) {
          if (codsArr[j].indexOf(skuArr[i].fieldCode) > 0) {
            newArr[j] = skuArr[i]
          }
        }
      }
      return newArr
    },
    // 转换sku信息
    getSkus(skuStr) {
      return skuStr.replace(/\|/g, ';')
    },
    // 根据时间戳获取年份
    getYearBuyTimeStamp(timeStamp) {
      return new Date(parseInt(timeStamp) * 1000).getFullYear() + '年'
    },
    // 资本显示
    getCnName(num) {
      if (num < 10e6) {
        return '100万以下'
      } else if (num < 5 * 10e6) {
        return '100-500万'
      } else if (num < 10e7) {
        return '500-1000万'
      } else {
        return '1000万以上'
      }
    },
    // 判断电子发票状态 return num 0 无发票 1待开票 2开票中 3开票成功 4开票失败 5审核中 6已驳回
    checkBillStatus(orderData) {
      orderData = orderData || this.orderData || this.orderDetail
      if (this.checkOrderStatus(orderData.orderStatusNo) !== 3) {
        return 0
      }
      const billStatusCode =
        orderData.userInvoiceStatus || orderData.merchantInvoiceStatus
      if (!billStatusCode) {
        return 0
      }
      for (const key in billStatusCodesObj) {
        if (billStatusCodesObj[key].match(billStatusCode)) {
          return Number(key)
        }
      }
    },
    // 发票操作
    toInvoice(orderData) {
      orderData = orderData || this.orderData || this.orderDetail
      // signerSubjectUserId 签单人商户用户ID
      // cusHousekeeperSubjectUserId 主管家商户用户ID
      // orderPersonSubjectUserId 下单人商户用户ID
      // merchantId 申请发票用商户id
      const merchantId =
        orderData.orderPersonSubjectUserId ||
        orderData.signerSubjectUserId ||
        orderData.cusHousekeeperSubjectUserId ||
        ''
      const billStatusNum = this.checkBillStatus(orderData)
      if (billStatusNum === 1) {
        this.$router.push({
          path: '/order/invoice/add',
          query: {
            merchantId,
            orderId: orderData.id,
          },
        })
      } else {
        this.$router.push({
          path: '/order/invoice/detail',
          query: {
            merchantId,
            orderId: orderData.id,
          },
        })
      }
    },
    // 纠纷判断
    checkJjiufen(orderData) {
      // 担保交易订单办理中展示纠纷按钮
      orderData = orderData || this.orderData
      const proceingOrderStatus = [
        'ORDER_ORDER_SALE_STATUS_HANDLING',
        'ORDER_ORDER_SALE_STATUS_HANDLED',
        'ORDER_ORDER_TRADE_STATUS_HANDLING',
        'ORDER_ORDER_TRADE_STATUS_HANDLED',
        'ORDER_ORDER_RESOURCE_STATUS_HANDLING',
        'ORDER_ORDER_RESOURCE_STATUS_HANDLED',
        'ORDER_ORDER_SERVER_STATUS_HANDLING',
        'ORDER_ORDER_SERVER_STATUS_HANDLED',
      ]
      // orderData.disputeStatus =
      //   orderData.disputeStatus || orderData.orderSkuEsList[0].disputeStatus
      if (
        proceingOrderStatus.indexOf(orderData.orderStatusNo) > -1 &&
        orderData.payType &&
        orderData.payType === 'ORDER_PAY_MODE_SECURED'
      ) {
        return 1
      }
    },
  },
}
