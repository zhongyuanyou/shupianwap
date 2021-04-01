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
      // 分批支付状态 alreadyPayment
      batchPayStatus: {
        1: 'ORDER_BATCH_PAYMENT_PAY_0', // 未支付
        2: 'ORDER_BATCH_PAYMENT_PAY_1', // 应支付
        3: 'ORDER_BATCH_PAYMENT_PAY_2', // 已支付
      },
      // 分批支付类型 batchType
      batchType: {
        0: '全款',
        1: '首款',
        2: '中期款',
        3: '尾款',
      },
      // 付款类型
      batchNumber: {
        0: '全款',
      },
    }
  },
  methods: {
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
            limit: 50,
            cusOrderId: this.cusOrderId || this.orderData.cusOrderId,
          }
        )
        .then((res) => {
          console.log('分批支付信息', res)
          this.payList = res
          this.loading = false
          if (this.fromPage === 'orderList') {
            // 从订单列表页调用该方法则直接走分批支付流程
            if (this.payList && this.payList.length > 1) {
              if (this.payList.length === this.orderData.orderList.length) {
                // 子订单数量和分批支付数量一样的话实际上不是分批支付订单
                if (this.payList[0].batchType === 0) {
                  // 全款支付
                  this.$router.push({
                    path: '/pay/payType',
                    query: {
                      fromPage: this.fromPage,
                      cusOrderId: this.orderData.cusOrderId,
                    },
                  })
                } else if (this.payList[0].batchType === 1) {
                }
              } else {
                // 否则直接跳转支付页面
                // 有分批支付信息则弹起分批支付弹窗 关闭关联订单弹窗
                this.payList = res
                this.$refs.payModal.showPop = true
                this.$refs.cancleOrderModel.showPop = false
              }
            } else {
              // 否则直接跳转支付页面
              this.$router.push({
                path: '/pay/payType',
                query: {
                  cusOrderId: this.orderData.cusOrderId,
                  fromPage: this.fromPage,
                  batchPayIds: '',
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
            this.orderData.orderList = res.list
            console.log('组装关联订单后的this.orderData', this.orderData)
            this.startPay()
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
