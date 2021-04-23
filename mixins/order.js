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
import { Dialog } from '@chipspc/vant-dgg'
import { auth } from '@/api'
import orderUtils from '@/utils/order'
import orderApi from '@/api/order'
// 客户单状态code
const ORDERSTATUSCODE = {
  1: 'ORDER_CUS_STATUS_UNPAID', // 未付款
  2: 'ORDER_CUS_STATUS_PROGRESSING', // 进行中
  3: 'ORDER_CUS_STATUS_COMPLETED', // 已完成
  4: 'ORDER_CUS_STATUS_CANCELLED', // 已取消
}
const orderProTypeNoS = {
  1: 'PRO_CLASS_TYPE_TRANSACTION', // 交易
  2: 'PRO_CLASS_TYPE_SALES', // 销售
  3: 'PRO_CLASS_TYPE_SERVICE_RESOURCE', // 资源
  4: 'PRO_CLASS_TYPE_SERVICE', // 服务
}
// 根据订单状态判断订单状态名称
const orderStatusObj = {
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
export default {
  data() {
    return {
      xyList: [],
      thisTimePayTotal: 0, // 本期应付批次总额
      allTimePayTotal: 0, // 未支付批次总额
      batchIds: '', // 分批支付id集合
      // 客户单状态CODE对应文字
      CUSORDERSTATUSCODE: {
        ORDER_CUS_STATUS_UNPAID: '待付款', // 未付款
        ORDER_CUS_STATUS_PROGRESSING: '办理中', // 进行中
        ORDER_CUS_STATUS_COMPLETED: '已完成', // 已完成
        ORDER_CUS_STATUS_CANCELLED: '已取消', // 已取消
      },
      // 客户单付款状态CODE对应文字
      PAYSTATUSCODENAME: {
        ORDER_CUS_PAY_STATUS_UN_PAID: '待付款',
        ORDER_CUS_PAY_STATUS_PART_PAID: '部分支付',
        ORDER_CUS_PAY_STATUS_COMPLETED_PAID: '已完成',
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
    // 开始支付时判断
    startPay() {
      if (
        !this.orderData.payType ||
        this.orderData.payType !== 'ORDER_PAY_MODE_ONLINE'
      ) {
        this.$xToast.error('该订单为线下支付，请联系规划师付款')
        return
      }
      if (this.fromPage === 'orderList' || this.fromPage === 'orderDetail') {
        // 同时判断有无关联订单
        if (this.checkHasOtherOrder()) {
          // 有关联订单时则打开提示弹窗
          this.loading = false
          this.$refs.cancleOrderModel.showPop = true
          this.$refs.cancleOrderModel.modalType = 2
          this.childOrderList = this.orderData.orderList
          // 后续操作为关联弹窗点击立即付款后继续查询分批支付列表 走分批支付逻辑判断
        } else {
          // 无关联订单则直接走分批支付逻辑判断
          this.getBatchList()
        }
      } else if (this.checkHasOtherOrder()) {
        // 有关联订单时打开提示弹窗
        this.loading = false
        this.$refs.cancleOrderModel.showPop = true
        this.$refs.cancleOrderModel.modalType = 2
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
            const sortArr = []
            for (let i = 0, l = nodeList.length; i < l; i++) {
              // 处理金额
              nodeList[i].money = this.regFenToYuan(nodeList[i].money)
              // 将本期应付的批次排在前面
              if (nodeList[i].alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1') {
                sortArr.splice(0, 0, nodeList[i])
              } else {
                sortArr.push(nodeList[i])
              }
            }
            this.nodeList = sortArr
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
        })
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
          }
        })
        this.thisTimePayTotal = this.regFenToYuan(thisTimePayTotal)
        this.allTimePayTotal = this.regFenToYuan(allTimePayTotal)
        this.batchIds = idsArr.join(',')
        // 是分批支付则弹起分批支付弹窗 关闭关联订单弹窗
        this.$refs.payModal.showPop = true
        this.$refs.cancleOrderModel.showPop = false
      }
    },
    // 判断展示合同按钮 false不展示  1签署合同 2查看合同
    checkContractStatus(orderData) {
      const data = orderData || this.orderData
      // 当客户订单状态为已取消时不展示按钮
      if (data.cusOrderStatusNo === ORDERSTATUSCODE[4]) return false
      if (this.fromPage === 'orderList') {
        if (
          (data.contractStatus &&
            (data.contractStatus === 'STRUTS_QSZ' ||
              data.contractStatus === 'STRUTS_CG')) ||
          !data.contractStatus
        ) {
          // 当合同状态为草稿或签署中或无合同信息时显示签署合同按钮
          return 1
        }
        // 当合同状态为已完成时显示查看合同按钮
        if (data.contractStatus && data.contractStatus === 'STRUTS_YWC') {
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
    // 判断客户单状态类型 1待付款 2进行中 3已完成 4已取消
    checkCusOrderStatus() {
      return orderUtils.checkCusOrderStatus(this.orderData.cusOrderStatusNo)
    },
    // 判断是否显示取消订单按钮
    isShowCanCelBtn() {
      return orderUtils.isShowCanCelBtn(this.orderData)
    },
    // 判断是否显示确认订单按钮
    isShowConfirmBtn(data) {
      data = data || this.orderData
      let isShowConfirm
      if (
        data.cusOrderStatusNo === 'ORDER_CUS_STATUS_PROGRESSING' &&
        (data.orderProTypeNo === 'PRO_CLASS_TYPE_TRANSACTION' ||
          data.orderProTypeNo === 'PRO_CLASS_TYPE_SALES ')
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
    // 判断是否显示付款按钮
    isShowPayBtn() {
      return orderUtils.isShowPayBtn(this.orderData)
    },
    // 判断订单状态 返回数字
    checkOrderStatus(code) {
      const ALLSTATUS = {
        1: 'ORDER_ORDER_SALE_STATUS_UN_PAID,ORDER_ORDER_TRADE_STATUS_UN_PAID,ORDER_ORDER_RESOURCE_STATUS_UN_PAID,ORDER_ORDER_SERVER_STATUS_UN_PAID', // 可取消订单的状态 未付款时
        2: 'ORDER_ORDER_SALE_STATUS_HANDLING,ORDER_ORDER_SALE_STATUS_HANDLED,ORDER_ORDER_TRADE_STATUS_HANDLING,ORDER_ORDER_RESOURCE_STATUS_HANDLING,ORDER_ORDER_SERVER_STATUS_UN_ASSIGN,ORDER_ORDER_SERVER_STATUS_UN_RECEICE_ORDER,ORDER_ORDER_SERVER_STATUS_HANDLING', // 进行中
        3: 'ORDER_ORDER_SALE_STATUS_COMPLETED,ORDER_ORDER_TRADE_STATUS_COMPLETED,ORDER_ORDER_RESOURCE_STATUS_COMPLETED,ORDER_ORDER_SERVER_STATUS_HANDLED,ORDER_ORDER_SERVER_STATUS_COMPLETED', // 已完成
        4: 'ORDER_ORDER_SALE_STATUS_CANCELLED,ORDER_ORDER_TRADE_STATUS_CANCELLED,ORDER_ORDER_RESOURCE_STATUS_CANCELLED,ORDER_ORDER_SERVER_STATUS_CANCELLED', // 已取消
      }
      for (const key of ALLSTATUS) {
        if (ALLSTATUS[key].match(code)) {
          return Number(key)
        }
      }
    },
    // 判断客户单付费类型
    checkPayType() {
      return orderUtils.checkPayType(this.orderData.cusOrderPayType)
    },
    // 查询客户单下的关联订单
    getChildOrders(order) {
      if (this.fromPage === 'orderList') {
        // if (
        //   this.opType === 'payMoney' &&
        //   order.orderSkuEsList[0].skuType === 'PRO_CLASS_TYPE_TRANSACTION'
        // ) {
        //   Dialog.confirm({
        //     title: '温馨提示',
        //     message: '请仔细阅读并同意',
        //   }).then(() => {})
        // }
        if (
          this.opType === 'payMoney' &&
          order.orderSkuEsList[0].skuType === 'PRO_CLASS_TYPE_TRANSACTION' &&
          this.checkContractStatus(order) === 1
        ) {
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
      if (this.fromPage === 'orderDetail') {
        if (
          this.opType === 'payMoney' &&
          (order.skuType === 'PRO_CLASS_TYPE_TRANSACTION' ||
            order.skuType === this.skuTypes[1]) &&
          this.checkContractStatus(order) === 1
        ) {
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
          })
      } else {
        this.switchOptionType()
      }
    },
    // 根据操作类型进行不同的任务
    switchOptionType() {
      if (this.opType === 'cancelOrder') {
        // 弹出取消订单弹窗
        this.$refs.cancleOrderModel.showPop = true
        if (this.orderData.orderList.length > 1) {
          this.$refs.cancleOrderModel.step = 1
        } else {
          this.$refs.cancleOrderModel.step = 2
        }
      } else if (this.opType === 'payMoney') {
        this.startPay()
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
        this.orderData.orderSkuList.forEach((item) => {
          if (
            item.skuStatusNo === 'ORDER_ORDER_SALE_STATUS_HANDLED' ||
            item.skuStatusNo === 'ORDER_ORDER_TRADE_STATUS_HANDLED'
          )
            ids.push(item.id)
        })
        // 订单详情页里的确认完成为单个服务商品的商品id
        orderSkuIds = ids
      } else {
        orderSkuIds = new Array(1).fill(orderSkuIds)
      }
      const params = {
        orderSkuIds,
        operateSourcePlat: 'COMDIC_PLATFORM_CRISPS',
        operateTerminal: 'ORDER_TERMINAL_WAP',
      }
      orderApi
        .confirmOrder({ axios: this.$axios }, params)
        .then((res) => {
          this.$xToast.success('操作成功')
          if (this.fromPage === 'orderList') this.getOrderList()
          else this.getDetail()
        })
        .catch((err) => {
          this.$xToast.error(err.message || '操作失败')
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
          Number(orderItem.orderTotalMoney) - Number(orderItem.depositAmount)
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
    // jump
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
        (this.orderData.contractStatus &&
          (this.orderData.contractStatus === 'STRUTS_QSZ' ||
            this.orderData.contractStatus === 'STRUTS_CG')) ||
        (this.orderData.contractVo2s &&
          this.orderData.contractVo2s.length &&
          (this.orderData.contractVo2s[0].contractStatus === 'STRUTS_QSZ' ||
            this.orderData.contractVo2s[0].contractStatus === 'STRUTS_CG'))
      ) {
        this.$router.push({
          path: '/contract/preview',
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
      } else if (
        (this.orderData.contractStatus &&
          this.orderData.contractStatus === 'STRUTS_YWC') ||
        (this.orderData.contractVo2s &&
          this.orderData.contractVo2s.length &&
          this.orderData.contractVo2s[0].contractStatus === 'STRUTS_YWC')
      ) {
        this.$router.push({
          path: '/contract/preview',
          query: {
            orderId: this.orderData.id,
            cusOrderId: this.orderData.cusOrderId,
            fromPage: this.fromPage,
            contractUrl,
            contractId,
            contractNo,
            type: 'yl',
          },
        })
      } else {
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
        console.log('data:', data)
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
  },
}
