<template>
  <div v-if="hasData" class="pay-page">
    <Banner
      :order-status-code="orderData.orderSplitAndCusVo.cusOrderStatusNo"
      :cus-order-status-type="cusOrderStatusType"
      :cus-order-id="orderData.cusOrderId"
      :cus-order-cancel-reason="canCelReasonName"
      @getDetail="getDetail"
    />
    <div class="order-area">
      <!-- 服务 -->
      <ServeList
        v-if="orderData.orderProTypeNo.match('PRO_CLASS_TYPE_SERVICE')"
        :order-data="orderData"
        :cus-order-status-type="cusOrderStatusType"
        :cus-order-pay-status-no="orderData.cusOrderPayStatusNo"
        @confirmOrder="confirmOrder"
      />
      <!-- 交易/销售/资源 -->
      <TradeList v-else class="goods-info" :order-data="orderData" />
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
          PAYSTATUSCODENAME[orderData.orderSplitAndCusVo.cusOrderPayStatusNo]
        }}</span>
      </p>
      <!-- 支付状态为部分付款时才显示这部分         v-if="
          orderData.orderSplitAndCusVo.cusOrderPayStatusNo ===
          'ORDER_CUS_PAY_STATUS_PART_PAID'
        " -->
      <div v-if="cusOrderStatusType !== 4" class="pay-detail-area">
        <p
          v-for="(item, index) in orderPayList"
          :key="index"
          :class="
            item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_2'
              ? 'has-pay'
              : 'no-pay'
          "
        >
          <span v-if="paylistLength === 1" class="span1">全款:</span>
          <span
            v-else-if="
              paylistLength === 2 &&
              item.orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS' &&
              index === 0
            "
            class="span1"
            >定金:</span
          >
          <span
            v-else-if="
              paylistLength === 2 &&
              item.orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS' &&
              index === 1
            "
            class="span1"
            >尾款:</span
          >
          <span
            v-else-if="
              item.orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE' &&
              index === 0
            "
            class="span1"
            >首款:</span
          >
          <span
            v-else-if="
              item.orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE' &&
              index === paylistLength
            "
            class="span1"
            >尾款:</span
          >
          <span v-else class="span1">第{{ item.batchNumber }}批:</span>
          <span class="span2">{{ item.money }}</span>
          <span class="span4">元</span>
          <span
            v-if="item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_2'"
            class="span3"
            >已于{{ item.realPaymentDate }}支付</span
          >
          <span v-else-if="item.expireDate" class="span3"
            >请于{{ item.expireDate }}前支付</span
          >
          <span v-else class="span3">待支付</span>
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
          orderData.mark || orderData.orderSplitAndCusVo.mark || '-'
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
    <div v-if="cusOrderStatusType !== 4" class="btn-area">
      <div class="inner">
        <!--   v-if="
            orderData.orderSplitAndCusVo[0].cusOrderPayStatusNo ===
            orderStatusCode[1]
          " -->
        <sp-button v-if="isShowCanCelBtn()" @click="handleClickItem(1)">
          取消订单
        </sp-button>
        <sp-button
          v-if="checkContractStatus() == 1"
          @click="handleClickItem(2)"
        >
          签署合同
        </sp-button>
        <sp-button
          v-if="checkContractStatus() == 2"
          @click="handleClickItem(3)"
        >
          查看合同
        </sp-button>
        <sp-button
          v-if="
            showPayBtn &&
            orderData.isNeedPay == 1 &&
            orderData.orderSplitAndCusVo.cusOrderPayStatusNo ===
              'ORDER_CUS_PAY_STATUS_UN_PAID'
          "
          class="btn-pay"
          @click="handleClickItem(4)"
        >
          立即支付
        </sp-button>
        <sp-button
          v-if="
            showPayBtn &&
            orderData.isNeedPay == 1 &&
            orderData.orderSplitAndCusVo.cusOrderPayStatusNo ===
              'ORDER_CUS_PAY_STATUS_PART_PAID'
          "
          class="btn-pay"
          @click="handleClickItem(5)"
        >
          支付余款
        </sp-button>
        <sp-button
          v-if="isShowConfirmBtn()"
          type="default"
          @click="handleClickItem(6)"
        >
          确认完成
        </sp-button>
      </div>
    </div>
    <CancelOrder
      ref="cancleOrderModel"
      :order-id="orderData.orderId"
      :cus-order-id="orderData.cusOrderId"
      :order-sku-list="orderData.orderList"
      :cus-order-cancel-reason="orderData.cusOrderCancelReason"
      @setCancelOrderName="setCancelOrderName"
      @cancleOrder="cancleOrder"
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
import ServeList from '@/components/order/detail/ServeList'
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
    ServeList,
    TradeList,
    CancelOrder,
    PayModal,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      canCelReasonName: '',
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
      orderPayList: [],
      paylistLength: 0,
      opType: '',
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
          // 订单价格处理 分转元
          this.changeMoney(res.data)
          const cusDetail = res.data.orderSplitAndCusVo
          this.orderData = Object.assign(cusDetail, res.data)
          this.hasData = true
          this.cusOrderStatusType = orderUtils.checkCusOrderStatus(
            this.orderData.cusOrderStatusNo
          )
          if (
            this.orderData.orderSplitAndCusVo.cusOrderStatusNo !==
              'ORDER_CUS_STATUS_CANCELLED' &&
            this.orderData.orderSplitAndCusVo.cusOrderPayStatusNo !==
              'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          ) {
            // 当订单状态不为已取消且支付状态不为已完成时展示付款入口
            this.showPayBtn = true
          }
          console.log('orderData', this.orderData)
          this.getBatchList()
          // if (
          //   this.orderData.cusOrderPayStatusNo !==
          //   'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          // ) {
          //   // 当客户单支付状态不等于已完成时调用分批支付列表
          //   this.getBatchList()
          // }
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
      switch (type) {
        case 1:
          // 取消订单 首先判断是否有关联订单
          this.opType = 'cancelOrder'
          this.getChildOrders()
          break
        case 2:
          // 签署合同
          this.$router.push({
            path: '/contract/edit',
            query: {
              orderId: this.orderData.id,
              cusOrderId: this.orderData.cusOrderId,
              fromPage: this.fromPage,
              contractStatus: this.orderData.contractStatus,
            },
          })
          break
        case 3:
          // 查看合同
          this.$router.push({
            path: '/contract/edit',
            query: {
              orderId: this.orderData.id,
              cusOrderId: this.orderData.cusOrderId,
              fromPage: this.fromPage,
              contractStatus: this.orderData.contractStatus,
            },
          })
          break
        case 4:
          // 立即付款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders()
          break
        case 5:
          // 支付余款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders()
          break
        case 6:
          console.log('确认完成33')
          // 确认完成
          this.opType = 'confirmComplete'
          this.confirmOrder()
          break
      }
    },
    // 设置取消订单原因name 中文
    setCancelOrderName(val) {
      this.canCelReasonName = val
    },
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
    padding: 10px 20px;
    margin-bottom: 20px;
    p {
      font-size: 24px;
      margin: 10px 0;
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
        width: 120px;
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
      .span1 {
        color: rgba(34, 34, 34, 1);
        width: 120px;
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
