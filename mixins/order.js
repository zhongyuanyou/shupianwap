/**
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
import orderUtils from '@/utils/order'
import orderApi from '@/api/order'
export default {
  data() {
    return {
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
      if (this.fromPage === 'orderList') {
        // 同时判断有无关联订单
        if (this.checkHasOtherOrder()) {
          // 有关联订单时则打开提示弹窗
          this.loading = false
          this.$refs.cancleOrderModel.showPop = true
          this.$refs.cancleOrderModel.modalType = 2
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
          console.log('分批支付信息', res)
          console.log('this.fromPage', this.fromPage)
          // 客户单的分批支付信息
          this.payList = res
          this.loading = false
          if (this.fromPage === 'orderList') {
            this.checkCusBatchPayType()
          } else if (this.fromPage === 'nodeDetail') {
            // 节点明细页面则筛选该订单下的选中商品的支付列表信息
            const nodeList = res.filter((item) => {
              return item.orderSkuId === this.orderSkuId
            })
            this.nodeNumber = this.nodeList.length
            const sortArr = []
            // 将本期应付的批次排在前面
            for (let i = 0, l = nodeList.length; i < l; i++) {
              if (nodeList[i].alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1') {
                sortArr.splice(0, 0, nodeList[i])
              } else {
                sortArr.push(nodeList[i])
              }
            }
            console.log('sortArr', sortArr)
            this.nodeList = sortArr
            // 计算合计金额
            this.nodeTotalMoney = this.nodeList.reduce((total, item) => {
              return total + Number(item.money)
            }, 0)
          } else {
            // 当前订单的分批支付信息
            // 筛选对应订单的支付列表
            this.orderPayList = res.filter((item) => {
              return item.orderId === this.orderData.id
            })
            console.log('orderPayList', this.orderPayList)
            this.paylistLength = this.orderPayList.length
          }
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '获取支付信息失败')
        })
    },
    // // 判断是分批支付还是全款支付等
    checkCusBatchPay1() {
      this.$refs.payModal.showPop = true
      if (
        this.payList.length === this.orderData.orderList.length ||
        this.payList.length === 1
      ) {
        // 此时一个订单只有一个支付信息则为全款支付
        console.log('分批支付数量和订单数量一致')
        console.log('this.payList', this.payList)
        this.$router.push({
          path: '/pay/payType',
          query: {
            fromPage: this.fromPage,
            cusOrderId: this.orderData.cusOrderId,
            batchIds: this.batchIds,
          },
        })
      } else {
        // 是分批支付则弹起分批支付弹窗 关闭关联订单弹窗
        this.$refs.payModal.showPop = true
        this.$refs.cancleOrderModel.showPop = false
        let thisTimePayTotal = 0 // 本期应付总额
        let allTimePayTotal = 0 // 剩余未支付所有批次总额
        const idsArr = [] // 应分批支付id
        this.payList.forEach((element) => {
          if (element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1') {
            thisTimePayTotal += element.money
            idsArr.push(element.id)
          }
          if (
            element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_0' ||
            element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1'
          ) {
            allTimePayTotal += element.money
          }
        })
        this.thisTimePayTotal = thisTimePayTotal
        this.allTimePayTotal = allTimePayTotal
        this.batchIds = idsArr.join(',')
        console.log('本期应付总额:thisTimePayTotal:', thisTimePayTotal)
        console.log('全款支付剩余应付总额thisTimePayTotal:', thisTimePayTotal)
      }
    },
    // 判断是分批支付还是全款支付等
    checkCusBatchPayType() {
      this.getBillDetail()
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
        // 是分批支付则弹起分批支付弹窗 关闭关联订单弹窗
        this.$refs.payModal.showPop = true
        this.$refs.cancleOrderModel.showPop = false
        let thisTimePayTotal = 0 // 本期应付总额
        let allTimePayTotal = 0 // 剩余未支付所有批次总额
        const idsArr = [] // 应分批支付id
        this.payList.forEach((element) => {
          if (element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1') {
            thisTimePayTotal += element.money
            idsArr.push(element.id)
          }
          if (
            element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_0' ||
            element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1'
          ) {
            allTimePayTotal += element.money
          }
        })
        this.thisTimePayTotal = thisTimePayTotal
        this.allTimePayTotal = allTimePayTotal
        this.batchIds = idsArr.join(',')
        console.log('本期应付总额:thisTimePayTotal:', thisTimePayTotal)
        console.log('全款支付剩余应付总额thisTimePayTotal:', thisTimePayTotal)
      }
    },
    // 判断展示合同按钮 false不展示  1签署合同 2查看合同
    checkContractStatus() {
      return orderUtils.checkContractStatus(this.orderData)
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
      console.log('data', data)
      return orderUtils.isShowConfirmBtn(this.orderData || data)
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
    getChildOrders() {
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
            console.log('组装关联订单后的this.orderData', this.orderData)
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
    confirmOrder() {
      const arr1 = this.orderData.orderSkuEsList || this.orderData.orderSkuList
      const orderSkuIds = arr1.map((item) => {
        return item.id
      })
      const params = {
        orderId: this.orderData.orderId,
        cusOrderId: this.orderData.cusOrderId,
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
    // 账单明细
    getBillDetail() {
      orderApi
        .getBillDetail(
          { axios: this.$axios },
          { cusOrderId: this.orderData.cusOrderId }
        )
        .then((res) => {
          console.log('账单明细', res)
        })
    },
  },
}
