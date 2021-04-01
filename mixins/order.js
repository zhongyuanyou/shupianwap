/**
 * @author tangdaibing
 * @since 2021/04/01
 */
import orderUtils from '@/utils/order'
import orderApi from '@/api/order'
export default {
  data() {
    return {
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
    }
  },
  methods: {
    // 判断是否有关联订单  0 无 1有
    checkHasOtherOrder() {
      return this.orderData.orderList.length.length > 1
    },
    // 开始支付时判断
    startPay() {
      // 先判断是否有关联订单
      if (this.checkHasOtherOrder) {
        // 有关联订单时打开提示弹窗
        this.$refs.cancleOrderModel.showPop = true
        this.$refs.cancleOrderModel.modalType = 1
      } else if (this.fromPage === 'orderList') {
        // 从订单列表页发起操作需先更新当前订单的分批支付列表
        this.getBatchList(this.fromPage)
      } else if (this.fromPage === 'orderDetail' && this.payList.length === 1) {
        // 无关联订单时判断是否是分批支付
        // 支付列表长度为1则为全款支付直接跳转支付页面
        this.$router.push({
          path: '/pay/payType',
          query: {
            orderId: this.orderId,
            cusOrderId: this.cusOrderId,
          },
        })
      } else {
        // 分批支付则打开分批支付弹窗
        this.$refs.payModal.showPop = true
      }
    },
    // 获取分批支付信息
    getBatchList() {
      this.loading = true
      orderApi
        .batchPayList(
          { axios: this.$axios },
          {
            page: 1,
            limit: 50,
            cusOrderId: this.cusOrderId || this.orderData.cusOrderId,
          }
        )
        .then((res) => {
          console.log('分批支付信息', res)
          this.payList = res
          this.loading = false
          if (this.fromPage === 'orderList') {
            // 从订单列表页调用该方法则直接走流程
            if (res && res.length > 1) {
              // 有分批支付信息则弹起分批支付弹窗
              this.payList = res
              this.$refs.payModal.showPop = true
            } else {
              // 否则直接跳转支付页面
              this.$router.push({
                path: '/pay/payType',
                query: {
                  orderId: this.selectedOrder.id,
                  cusOrderId: this.selectedOrder.cusOrderId,
                },
              })
            }
          }
        })
        .catch((err) => {
          this.loading = false
          console.log('分批支付信息err', err)
          this.$xToast.show({
            message: '获取分批支付信息失败',
            duration: 1000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
        })
    },
    // 取消订单
    cancleOrder() {
      orderApi.cancelOrder(
        { axios: this.axios },
        {
          orderId: this.orderId,
          cancelReasonCode: this.cancelReasonCode,
          cancelReasonName: this.cancelReasonName,
        }
      )
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
    isShowConfirmBtn() {
      return orderUtils.isShowConfirmBtn(this.orderData)
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
            console.log('子订单返回', res)
            this.orderData.orderList = res
            this.checkHasOtherOrder()
          })
          .catch((err) => {
            this.loading = false
            this.$xToast.show({
              message: '查询关联订单失败,' + err.data.error,
              duration: 1000,
              icon: 'toast_ic_remind',
              forbidClick: true,
            })
          })
      } else {
        this.startPay()
      }
    },
  },
}
