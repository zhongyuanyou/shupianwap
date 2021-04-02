<template>
  <div v-if="hasData" class="pay-page">
    <Banner
      :order-status-code="orderData.cusOrderDetail.cusOrderStatusNo"
      :cus-order-status-type="cusOrderStatusType"
    />
    <div class="order-area">
      <!-- 服务商品、 -->
      <!-- <ServeList
        v-if="orderData.orderProTypeNo.match('PRO_CLASS_TYPE_SERVICE')"
        :order-data="orderData"
      /> -->
      <!-- 交易销售资源商品 -->
      <TradeList class="goods-info" :order-data="orderData" />
      <div class="price-area">
        <p>
          <span> 商品总额 </span>
          <span class="money">
            {{ orderData.orderTotalMoney || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 优惠金额 </span>
          <span class="money">
            {{ orderData.orderDiscountMoney || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 活动优惠 </span>
          <span class="money">
            {{ orderData.discount2 || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 优惠券 </span>
          <span class="money">
            {{ orderData.discount3 || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 其他优惠 </span>
          <span class="money">
            {{ orderData.orther || 0 }}
            元
          </span>
        </p>
      </div>
      <p class="last-money">
        应付金额:
        <span class="pay-money">
          {{ orderData.orderPayableMoney || 0 }}
          元
        </span>
      </p>
      <p class="last-money">
        已付金额:
        <span class="pay-money">
          {{ orderData.orderPaidMoney || 0 }}
          元
        </span>
      </p>
    </div>

    <div class="order-info">
      <p class="order-item">
        <span class="label">订单编号</span>
        <span class="text">{{ orderData.orderNo }}</span>
        <span class="btn" @click="copy">复制</span>
      </p>
      <p class="order-item">
        <span class="label">下单时间</span>
        <span class="text">{{ orderData.createTime }}</span>
      </p>
      <p class="order-item">
        <span class="label">支付状态</span>
        <span class="text">{{
          PAYSTATUSCODENAME[orderData.cusOrderDetail.cusOrderPayStatusNo]
        }}</span>
      </p>
      <!-- 支付状态为部分付款时才显示这部分 -->
      <div
        v-if="
          orderData.cusOrderDetail.cusOrderPayStatusNo ===
          'ORDER_CUS_PAY_STATUS_PART_PAID'
        "
        class="pay-detail-area"
      >
        <p class="has-pay">
          <span class="span1">首款：</span>
          <span class="span2">3000</span>
          <span class="span4">元</span>
          <span class="span3">已于2021-04-23支付</span>
        </p>
        <p class="no-pay">
          <span class="span1">尾款：</span>
          <span class="span2">5000</span>
          <span class="span4">元</span>
          <span class="span3">请于2021-05-23前支付</span>
        </p>
      </div>
      <!-- <p class="order-item">
        <span class="label">合同</span>
        <span class="text">{{ orderData.contractName || '暂无' }}</span>
      </p> -->
      <!-- <p class="order-item">
        <span class="label">发票</span>
        <span class="text">暂无</span>
      </p> -->
      <p class="order-item last-p">
        <span class="label">备注</span>
        <span class="text">{{
          orderData.mark || orderData.cusOrderDetail.mark || '暂无'
        }}</span>
      </p>
    </div>
    <div class="serve-time">
      <p>服务时间：9:00-24:00 周一至周日</p>
      <p class="btn">
        <a href="tel://962540">
          <my-icon
            name="per_ic_customer"
            size="0.28rem"
            color="#222222"
          ></my-icon>
          在线客服
        </a>
      </p>
    </div>
    <!-- 当订单状态为已取消时隐藏顶部按钮区域 -->
    <div v-if="cusOrderStatusType != 4" class="btn-area">
      <div class="inner">
        <!--   v-if="
            orderData.orderSplitAndCusVo[0].cusOrderPayStatusNo ===
            orderStatusCode[1]
          " -->
        <sp-button v-if="isShowCanCelBtn()" @click="handleClickItem(1)"
          >取消订单</sp-button
        >
        <sp-button v-if="checkContractStatus() == 1" @click="handleClickItem(2)"
          >签署合同</sp-button
        >
        <sp-button v-if="checkContractStatus() == 2" @click="handleClickItem(3)"
          >查看合同</sp-button
        >
        <sp-button
          v-if="
            showPayBtn &&
            orderData.cusOrderDetail.cusOrderPayStatusNo ===
              'ORDER_CUS_PAY_STATUS_UN_PAID'
          "
          class="btn-pay"
          @click="handleClickItem(4)"
          >立即支付</sp-button
        >
        <sp-button
          v-if="
            showPayBtn &&
            orderData.cusOrderDetail.cusOrderPayStatusNo ===
              'ORDER_CUS_PAY_STATUS_PART_PAID'
          "
          class="btn-pay"
          @click="handleClickItem(5)"
          >支付余款</sp-button
        >
      </div>
    </div>
    <CancelOrder
      v-if="
        orderData.cusOrderDetail.cusOrderStatusNo ===
          'ORDER_CUS_STATUS_UNPAID' &&
        orderData.cusOrderDetail.cusOrderStatusNo !==
          'ORDER_CUS_STATUS_CANCELLED'
      "
      ref="cancleOrderModel"
      :order-id="orderData.orderId"
      :cus-order-id="orderData.cusOrderId"
      :order-sku-list="orderData.orderList"
    />
    <PayModal
      v-if="showPayBtn"
      ref="payModal"
      :order-data="orderData"
      :pay-list="payList"
      :batch-pay-status="batchPayStatus"
      :this-time-pay-total="thisTimePayTotal"
    />
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import Banner from '@/components/order/detail/Banner'
// 服务订单
// import ServeList from '@/components/order/detail/ServeList'
// 交易订单
import TradeList from '@/components/order/detail/TradeList'
import CancelOrder from '@/components/order/CancelOrder' // 取消订单弹窗
import PayModal from '@/components/order/PayModal' // 支付弹窗
import orderUtils from '@/utils/order'
import orderApi from '@/api/order'
import OrderMixins from '@/mixins/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  components: {
    [Button.name]: Button,
    Banner,
    // ServeList,
    TradeList,
    CancelOrder,
    PayModal,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      loading: true,
      hasData: false,
      orderId: '',
      cusOrderId: '',
      cusOrderStatusType: 1, // 1为未付款 2进行中3已完成4已取消
      orderData: {
        orderStatus: '',
        orderList: [],
        orderSplitAndCusVo: [],
      },
      showPayBtn: false,
      payList: [], // 支付列表
      fromPage: 'orderDetail',
    }
  },
  computed: {
    orderStatusCode() {
      return this.$store.state.order.orderStatusCode
    },
  },
  mounted() {
    if (this.$route.query.id) {
      this.orderId = this.$route.query.id
      this.cusOrderId = this.$route.query.cusOrderId
      console.log('this.$orderData', this.orderData)
      this.getDetail()
    } else {
      this.$xToast.error('缺少参数')
      this.$router.back(-1)
    }
  },
  methods: {
    onLeftClick() {
      this.$router.back(-1)
    },
    getDetail() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderId, cusOrderId: this.cusOrderId }
        )
        .then((res) => {
          this.loading = false
          console.log('res')
          const cusDetail = res.data.cusOrderDetail
          this.orderData = Object.assign(cusDetail, res.data)
          console.log('this.orderData', this.orderData)
          console.log(
            '订单类型this.orderData.orderProTypeNo',
            this.orderData.orderProTypeNo
          )
          this.hasData = true
          this.cusOrderStatusType = orderUtils.checkCusOrderStatus(
            this.orderData.cusOrderStatusNo
          )
          if (
            this.orderData.cusOrderDetail.cusOrderStatusNo !==
              'ORDER_CUS_STATUS_CANCELLED' &&
            this.orderData.cusOrderDetail.cusOrderPayStatusNo !==
              'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          ) {
            // 当订单状态不为已取消且支付状态不为已完成时展示付款入口
            this.showPayBtn = true
          }
          if (
            this.orderData.cusOrderPayStatusNo !==
            'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          ) {
            // 当客户单支付状态不等于已完成时调用分批支付列表
            this.getBatchList()
          }
        })
        .catch((err) => {
          this.loading = false
          console.log('错误信息err', err)
          this.$xToast.show(err.message)
          this.$router.back(-1)
        })
    },
    // 按钮操作
    handleClickItem(type) {
      console.log('type', type)
      switch (type) {
        case 1:
          // 取消订单 无关联订单直接取消
          if (!this.checkHasOtherOrder()) {
            this.$xToast.success('订单取消成功')
          } else {
            // 有关联订单则弹起弹窗
            this.$refs.cancleOrderModel.showPop = true
            this.$refs.cancleOrderModel.modalType = 1
          }
          break
        case 2:
          console.log('2')
          // 签署合同
          this.$router.push({
            path: '/contract/edit',
            query: {
              orderId: this.orderId,
              cusOrderId: this.cusOrderId,
              fromPage: 'orderDetail',
            },
          })
          break
        case 3:
          console.log('3')
          // 查看合同
          this.$router.push({
            path: '/contract/edit',
            query: {
              orderId: this.orderId,
              cusOrderId: this.cusOrderId,
              fromPage: 'orderDetail',
            },
          })
          break
        case 4:
          this.checkHasOtherOrder()
          // 立即付款
          // this.getBatchList()
          // if (order.payType) {
          //   // 服务商品
          //   if (order.payType === 1) {
          //     // 全款时直接跳转支付页面
          //     this.$router.push('/order/pay')
          //   } else if (order.payType === 2) {
          //     // 节点付费
          //     // 弹起节点付款提示弹窗
          //     this.$refs.payModal.showPop = true
          //   } else if (order.payType === 3) {
          //     // 定金尾款
          //     // 弹起定金尾款付费提示弹窗
          //     this.$refs.payModal.showPop = true
          //   } else {
          //     // 服务完结
          //     // 全款时直接跳转支付页面
          //     this.$router.push('/order/pay')
          //   }
          //   return
          // }
          // // 非服务商品
          // if (!this.checkHasOtherOrder()) {
          //   // 立即支付 无关联订单直接支付
          //   this.$router.push('/order/pay')
          // } else {
          //   // 有关联订单则弹起弹窗
          //   this.$refs.cancleOrderModel.showPop = true
          //   this.$refs.cancleOrderModel.modalType = 2
          // }
          break
        case 5:
          this.checkHasOtherOrder()
          console.log('支付余款')
          break
        case 6:
          console.log('确认完成')
          this.confirmOrder()
          break
      }
    },
    // // 判断是否有关联订单  0 无 1有
    // checkHasOtherOrder() {
    //   // 订单列表大于1则有关联订单
    //   return this.orderData.orderList.length.length > 1
    // },
    // // 开始支付时判断
    // startPay() {
    //   // 先判断是否有关联订单
    //   if (this.checkHasOtherOrder) {
    //     // 有关联订单时打开提示弹窗
    //     this.$refs.CancelOrder.showPop = true
    //   } else if (this.payList.length === 1) {
    //     // 无关联订单时判断是否是分批支付
    //     // 支付列表为1则为全款支付直接跳转支付页面
    //     this.$router.push({
    //       path: '/pay/payType',
    //       query: {
    //         orderId: this.orderId,
    //         cusOrderId: this.cusOrderId,
    //       },
    //     })
    //   } else {
    //     // 分批支付则打开分批支付提示弹窗
    //     this.$refs.payModal.showPop = true
    //   }
    // },
    // // 获取分批支付信息
    // getBatchList() {
    //   orderApi
    //     .batchPayList(
    //       { axios: this.$axios },
    //       {
    //         page: this.page,
    //         limit: this.limit,
    //         cusOrderId: this.cusOrderId,
    //       }
    //     )
    //     .then((res) => {
    //       console.log('分批支付信息', res)
    //       this.payList = res
    //       // if (res && res.length > 1) {
    //       //   // 有分批支付信息则弹起分批支付弹窗
    //       //   this.payList = res
    //       //   this.$refs.payModal.showPop = true
    //       // } else {
    //       // 否则直接跳转支付页面
    //       // this.$router.push({
    //       //   path: '/pay/payType',
    //       //   query: {
    //       //     orderId: this.selectedOrder.id,
    //       //     cusOrderId: this.selectedOrder.cusOrderId,
    //       //     batchIds: res[0].id,
    //       //   },
    //       // })
    //       // }
    //     })
    //     .catch((err) => {
    //       console.log('分批支付信息err', err)
    //     })
    // },
    // // 取消订单
    // cancleOrder() {
    //   orderApi.cancelOrder(
    //     { axios: this.axios },
    //     {
    //       orderId: this.orderId,
    //       cancelReasonCode: this.cancelReasonCode,
    //       cancelReasonName: this.cancelReasonName,
    //     }
    //   )
    // },
    // // 判断展示合同按钮 false不展示  1签署合同 2查看合同
    // checkContractStatus() {
    //   return orderUtils.checkContractStatus(this.orderData)
    // },
    // // 判断客户单状态类型 1待付款 2进行中 3已完成 4已取消
    // checkCusOrderStatus() {
    //   return orderUtils.checkCusOrderStatus(this.orderData.cusOrderStatusNo)
    // },
    // // 判断是否显示取消订单按钮
    // isShowCanCelBtn() {
    //   return orderUtils.isShowCanCelBtn(this.orderData)
    // },
    // // 判断是否显示确认订单按钮
    // isShowConfirmBtn() {
    //   return orderUtils.isShowConfirmBtn(this.orderData)
    // },
    // // 判断是否显示付款按钮
    // isShowPayBtn() {
    //   return orderUtils.isShowPayBtn(this.orderData)
    // },
    // 复制功能
    copy() {
      const oInput = document.createElement('input')
      oInput.value = this.orderData.orderNo
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.remove()
      this.$xToast.success('复制成功')
    },
  },
}
</script>

<style lang="less" scoped>
.pay-page {
  background: #f5f5f5;
  min-height: 100vh;
}
.order-area {
  background: white;
  margin-bottom: 20px;
  padding: 20px 40px 0 40px;
}
.price-area {
  margin-top: 40px;
  p {
    margin-bottom: 20px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .money {
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
.last-money {
  border-top: 1px solid #f4f4f4;
  font-size: 28px;
  text-align: right;
  padding: 40px 0;
  .pay-money {
    font-weight: bold;
    color: #ec5330;
    font-size: 36px;
  }
}
.order-info {
  background: white;
  padding: 40px;
  font-size: 26px;
  .order-item {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    overflow: hidden;
    margin-bottom: 20px;
    span {
      display: block;
      float: left;
    }
    .label {
      width: 140px;
    }
    .text {
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      width: auto;
    }
    .btn {
      margin-left: 40px;
      background: #f4f4f4;
      border-radius: 16px;
      padding: 2px 6px;
      color: #222222;
      font-size: 22px;
    }
  }
  .last-p {
    margin-bottom: 0;
    display: flex;
    .text {
      flex: 1;
      line-height: 36px;
    }
  }
  .pay-detail-area {
    width: 100%;
    height: auto;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    p {
      font-size: 24px;
      span {
        display: block;
        float: left;
      }
      height: 32px;
      .span4 {
        transform: scale(0.8);
        transform-origin: 20% 100%;
        line-height: 32px;
        width: 24px;
        height: 100%;
      }
    }
    .has-pay {
      color: rgba(153, 153, 153, 1);
      font-size: 24px;
      .span1 {
        width: 140px;
      }
      .span2 {
        font-size: 28px;
      }
      .span3 {
        display: block;
        float: right;
      }
      .span4 {
        transform: scale(0.8);
        transform-origin: 20% 100%;
      }
    }
    .no-pay {
      font-size: 24px;
      font-family: PingFang SC;
      color: #ec5330;
      margin-top: 20px;
      .span1 {
        color: rgba(34, 34, 34, 1);
        width: 140px;
      }
      .span2 {
        font-size: 28px;
        font-weight: bold;
      }
      .span3 {
        display: block;
        float: right;
        color: #222222;
      }
    }
  }
}
.serve-time {
  margin-top: 20px;
  width: 100%;
  height: auto;
  background: #ffffff;
  font-size: 28px;
  color: #999999;
  text-align: center;
  line-height: 90px;
  padding: 0 40px;
  .btn {
    border-top: 1px solid #f4f4f4;
    font-weight: bold;
    a {
      color: #222222;
    }
  }
}
.btn-area {
  margin-top: 20px;
  width: 100%;
  height: 128px;
  background: #ffffff;
  line-height: 0;
  padding: 24px 0;
  .inner {
    float: right;
    width: auto;
    margin-right: 40px;
    .sp-button {
      display: inline-block;
      height: 80px;
      margin-right: -10px;
      border-radius: 8px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .btn-pay {
      background: rgba(236, 83, 48, 1);
      color: white;
      border: none;
    }
  }
}
</style>
