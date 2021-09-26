<template>
  <div class="item">
    <div @click="toDetail">
      <p class="order-no-area">
        <span class="orderNo"> 订单编号: {{ orderData.orderNo }} </span>

        <span>
          <!-- 待确认 -->
          <span
            v-if="
              orderData.orderStatusNo === 'ORDER_ORDER_RESOURCE_STATUS_HANDLED'
            "
            class="order-status status3"
            >{{ orderData.statusName }}</span
          >
          <span
            v-else-if="orderData.orderStatusNo === 'ORDER_CUS_STATUS_UNPAID'"
            class="order-status status2"
            >待支付</span
          >
          <span
            v-else
            class="order-status"
            :class="getStatusClass(orderData.cusOrderStatusNo)"
            >{{ orderData.statusName }}</span
          >
        </span>
      </p>
      <div
        v-for="(item, index) in orderData.orderSkuEsList ||
        orderData.orderSkuList"
        :key="index"
        class="order-infos"
        :class="index !== 0 ? 'border-top' : ''"
      >
        <div class="img">
          <sp-image
            :src="$resizeImg(130, 130, item.indexImg)"
            alt="薯片科技"
            class="sp-image"
            srcset=""
          />
        </div>
        <div class="right">
          <p class="goods-name">
            <span
              v-if="
                (item.payStatusNo === 'ORDER_CUS_PAY_STATUS_UN_PAID' &&
                  item.classifyOneName.match('公司')) ||
                isUnSubmit(orderData)
              "
              class="name"
              >{{ item.spuHideName || item.spuName }}</span
            >
            <span v-else class="name">{{ item.spuName }}</span>
            <span class="goods-num">×{{ item.skuCount }}</span>
            <!-- <span
              v-if="
                checkPayType() !== 2 && checkPayType() !== 4 && !item.orderType
              "
              class="money1"
            >
              {{ item.skuPrice }}元
            </span> -->
            <!-- 2021-09-28版本改动去掉价格显示判断条件 -->
          </p>
          <!-- 交易和资源取skuDetailInfo -->
          <!-- 销售和服务取skuExtInfo -->
          <p class="sku-info">
            <span
              v-if="
                item.skuType === skuTypes[1] || item.skuType === skuTypes[3]
              "
              class="sku-item"
              >{{ item.skuDetailValues }}</span
            >
            <span v-else class="sku-item">{{
              item.skuDetailValues || getSkus(item.skuExtInfo)
            }}</span>
          </p>
          <p class="goods_price">
            <span v-if="orderData.orderType === 0"> 预计</span>
            <span class="money1"> {{ item.skuPrice }}</span
            >元
          </p>
          <!-- 增值服务产品中心2期已去掉 2021.03.10 -->
          <!-- <div class="sku-sercice">
            <div
              v-if="item.serviceResourceList && item.serviceResourceList.length"
              class="title"
            >
              增值服务
            </div>
            <div class="sku-r">
              <p
                v-for="(item3, index3) in item.serviceResourceList"
                :key="index3"
              >
                <span class="serve-name">
                  {{ item3.serviceItemValName }}
                </span>
                <span class="serve-price"> {{ item3.price }}元 </span>
                <span clss="serve-num"> ×{{ item3.num }} </span>
              </p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="!isUnSubmit(orderData)" class="total-price-area">
      <div v-if="checkCusOrderStatus() === 4">
        <p class="inner">
          <span>
            合计
            <span class="price1 price"> {{ orderData.orderTotalMoney }} </span
            >元
          </span>
        </p>
      </div>
      <section v-else>
        <!-- 定金尾款付费 -->
        <p v-if="checkPayType() === 2" class="inner">
          <!-- 意向单显示预计 -->
          <!-- <span class="price2"> 优惠 {{ orderData.orderDiscountMoney }}元，</span> -->
          <!-- 已支付定金未支付尾款,客户单付款状态为部分支付时显示已付定金 -->
          <span
            v-if="
              orderData.cusOrderPayStatusNo === 'ORDER_CUS_PAY_STATUS_PART_PAID'
            "
            class="allready_pay"
          >
            定金
            <span class="price3 price"> {{ orderData.depositAmount }} </span>元,
          </span>
          <!-- 支付状态为完成支付时显示合计，不显示定金尾款等 -->
          <span
            v-if="
              orderData.cusOrderPayStatusNo ===
                'ORDER_CUS_PAY_STATUS_COMPLETED_PAID' ||
              checkCusOrderStatus() === 4
            "
            class="should-pay"
          >
            合计
            <span class="price3 price"> {{ orderData.orderTotalMoney }} </span
            >元
          </span>
          <!-- 支付状态为未支付完成且客户单状态不等于已取消时显示预计尾款待支付 -->
          <span
            v-if="
              orderData.cusOrderPayStatusNo !==
                'ORDER_CUS_PAY_STATUS_COMPLETED_PAID' &&
              checkCusOrderStatus() !== 4
            "
            class="should-pay"
          >
            <span v-if="orderData.orderType === 0">预计</span>尾款待支付
            <span class="price2 price"> {{ orderData.lastAount }}元,</span>
          </span>
          <span
            v-if="isShowPayBtn() === 1 && checkCusOrderStatus() !== 4"
            class="should-pay"
          >
            定金待支付
            <span class="price3 price">{{ orderData.depositAmount }}</span
            >元
          </span>
        </p>
        <!-- 服务完结收费的意向单 -->
        <p
          v-else-if="checkPayType() === 4 && orderData.orderType === 0"
          class="inner"
        >
          <span class="should-pay">
            <span>预计</span>
            <!-- <span v-else>总价</span> -->
            <span class="price3 price"> {{ orderData.orderTotalMoney }}</span>元
          </span>
        </p>
        <!-- 其他付费方式展示效果一样 -->
        <p v-else class="inner">
          <!-- <span class="price1"> 总价 {{ orderData.orderTotalMoney }}元，</span>
        <span class="price2"> 优惠 {{ orderData.orderDiscountMoney }}元，</span> -->
          <span v-if="isShowPayBtn() == 1" class="should-pay">
            应付款
            <span class="price3"> {{ orderData.orderPayableMoney }}</span
            >元
          </span>
          <span v-else class="should-pay">
            合计
            <span class="price3">{{ orderData.orderPayableMoney }}</span
            >元
          </span>
        </p>
      </section>
    </div>
    <div class="btn-area">
      <div v-if="!isUnSubmit(orderData)" class="inner">
        <!-- <sp-button
          v-if="checkBillStatus() === 1"
          class="btn-look"
          @click="handleClickItem(8)"
          >申请发票</sp-button
        >
        <sp-button
          v-if="checkBillStatus() === 3"
          class="btn-look"
          @click="handleClickItem(8)"
          >查看发票</sp-button
        > -->
        <!-- 未支付订单可取消订单 根据订单状态判断-->
        <sp-button
          v-if="
            checkJjiufen() === 1 &&
            selectedOrderStatus === 'ORDER_CUS_STATUS_PROGRESSING'
          "
          class="btn-look"
          @click="handleClickItem(10)"
          >纠纷/售后</sp-button
        >
        <sp-button
          v-if="
            checkAfterSaleStatus() === 1 &&
            orderData.cusOrderStatusNo !== 'ORDER_CUS_STATUS_UNPAID' &&
            orderData.cusOrderStatusNo !== 'ORDER_CUS_STATUS_CANCELLED'
          "
          class="btn-look"
          @click="handleClickItem(7)"
          >退款/售后</sp-button
        >
        <sp-button
          v-if="checkAfterSaleStatus() === 2 || checkAfterSaleStatus() === 5"
          class="btn-look"
          @click="handleClickItem(7)"
          >售后中</sp-button
        >
        <sp-button
          v-if="checkAfterSaleStatus() === 3"
          class="btn-look"
          @click="handleClickItem(7)"
          >已售后</sp-button
        >
        <!-- <sp-button
          v-if="checkAfterSaleStatus() === 4"
          type="primary"
          class="btn-look"
          @click="handleClickItem(7)"
          >部分售后</sp-button
        > -->
        <!-- 未支付订单可取消订单 根据订单状态判断-->
        <sp-button v-if="isShowCanCelBtn()" @click="handleClickItem(1)"
          >取消订单</sp-button
        >
        <!-- 客户订单状态 -->
        <sp-button
          v-if="checkContractStatus(orderData) === 2"
          type="info"
          class="btn-look"
          @click="handleClickItem(3)"
          >查看合同</sp-button
        >
        <sp-button
          v-if="checkContractStatus(orderData) === 1"
          type="info"
          class="btn-look"
          @click="handleClickItem(2)"
          >签署合同</sp-button
        >
        <!-- isShowPayBtn==1 支付定金或全款 -->
        <sp-button
          v-if="isShowPayBtn() == 1"
          type="default"
          class="btn-confirm"
          @click="handleClickItem(4)"
          >立即付款</sp-button
        >
        <!-- isShowPayBtn==2 支付余款或尾款 -->
        <sp-button
          v-if="isShowPayBtn() == 2"
          type="default"
          class="btn-confirm"
          @click="handleClickItem(5)"
          >立即付款</sp-button
        >
        <sp-button
          v-if="isShowConfirmBtn(orderData)"
          type="default"
          class="btn-confirm"
          @click="handleClickItem(6)"
          >确认完成</sp-button
        >
      </div>
      <div v-if="isUnSubmit(orderData)" class="inner noSubmit">
        <sp-button type="default" class="btn-look" @click="handleClickItem(9)"
          >提交订单</sp-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Image } from '@chipspc/vant-dgg'
import OrderMixins from '@/mixins/order'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
  },
  mixins: [OrderMixins],
  props: {
    orderData: {
      type: Object,
      default() {
        return {}
      },
    },
    orderProTypeNo: {
      type: String,
      default: '',
    },
    orderId: {
      type: String,
      default: '',
    },
    selectedOrderStatus: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fromPage: 'orderList',
    }
  },
  methods: {
    isUnSubmit(orderData) {
      return orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_UNSUBMITE'
    },
    getStatusClass(status) {
      if (
        status === 'ORDER_CUS_STATUS_CANCELLED' ||
        status === 'ORDER_CUS_STATUS_COMPLETED'
      ) {
        return 'status1' // 已取消,已完成
      } else if (
        status === 'ORDER_CUS_STATUS_UNPAID' ||
        status === 'ORDER_CUS_STATUS_UNSUBMITE'
      ) {
        return 'status2' //   未付款
      } else {
        return 'status3'
      }
    },
    confirmorder() {},
    handleClickItem(type) {
      this.$emit('handleClickItem', type, this.orderData)
    },
    toDetail() {
      // 未提交订单转到提交页
      if (this.isUnSubmit(this.orderData)) {
        return this.toSubmitOrder(this.orderData)
      }
      this.$router.push({
        path: '/order/detail',
        query: { id: this.orderData.id, cusOrderId: this.orderData.cusOrderId },
      })
    },
    toSubmitOrder(order) {
      this.$router.push({
        path: '/order/confirmUnSubmitOrder',
        query: {
          orderIds: order.id,
          cusOrderId: order.cusOrderId,
        },
      })
    },
    setName(str) {
      return '**' + str.substring(2, str.length)
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  width: auto;
  padding: 32px 40px;
  height: auto;
  background: white;
  margin-top: 20px;
  .order-no-area {
    height: 48px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 48px;
    span {
      display: block;
    }
    .orderNo {
      color: #999999;
    }
    .status1 {
      color: #999999;
    }
    .status2 {
      color: #fe8c29;
    }
    .status3 {
      color: #3b69f5;
    }
  }
  .order-infos {
    height: auto;
    display: flex;
    padding: 30px 0 24px 0;
    .img {
      width: 130px;
      height: 130px;
      .sp-image {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        border-radius: 8px;
        overflow: hidden;
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
      .goods_price {
        font-size: 24px;
        .money1 {
          font-size: 28px;
        }
      }
    }
    .goods-name {
      display: flex;
      font-size: 28px;
      font-family: PingFang SC;
      line-height: 36px;
      color: #222222;
      .name {
        font-weight: bold;
        flex: 1;
        .textOverflow(2);
        padding-right: 20px;
      }
    }
    .sku-info {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin: 10px 0 10px 0;
      height: 40px;
      .textOverflow(1);
      .sku-item {
        margin-right: 10px;
        .textOverflow(1);
      }
      .goods-num {
        display: block;
        float: right;
      }
    }
  }
  .border-top {
    border-top: 1px solid #f4f4f4;
  }
  .sku-sercice {
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    .title {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 36px;
    }
    .sku-r {
      p {
        display: flex;
        font-size: 22px;
        line-height: 36px;
        font-family: PingFang SC;
        color: #222222;
        font-weight: 400;
        .serve-name {
          .textOverflow(1);
          padding-right: 40px;
          padding-right: 20px;
          flex: 1;
          text-align: left;
        }
      }
    }
  }
  .total-price-area {
    height: auto;
    overflow: hidden;
    width: 100%;
    .inner {
      width: auto;
      height: auto;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      float: right;
      .should-pay {
        color: #222;
        font-size: 28px;
        .price3 {
          color: #222;
          font-size: 28px;
          font-weight: 600;
        }
      }
    }
  }
  .btn-area {
    height: auto;
    overflow: hidden;
    .inner {
      float: right;
      margin-bottom: 10px;
      height: auto;
      margin-top: 30px;
      overflow: hidden;
      .sp-button {
        font-size: 26px;
        height: 64px;
        border-radius: 32px;
        padding: 0 20px;
        color: #999999;
        line-height: 1;
        margin: 0;
        float: left;
        margin-left: 14px;
        border: 1px solid #cdcdcd;
      }
      .sp-button:first-child {
        margin-left: 0;
      }
      .btn-cancel {
        color: #999999;
        background: #ffffff;
        border: 1px solid #cdcdcd;
      }
      .btn-look {
        border: 1px solid #cdcdcd;
        background: #ffffff;
        color: #222222;
      }
      .btn-confirm {
        background: #ffffff;
        border: 1px solid #e5654c;
        color: #e5654c;
      }
    }
    .noSubmit {
      margin-top: 18px;
    }
  }
}
</style>
