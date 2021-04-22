<template>
  <div class="item">
    <div @click="toDetail">
      <p class="order-no-area">
        <span class="orderNo"> 订单编号: {{ orderData.orderNo }} </span>
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
          :class="
            orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_CANCELLED' ||
            orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_COMPLETED'
              ? 'status1'
              : orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_UNPAID'
              ? 'status2'
              : 'status3'
          "
          >{{ orderData.statusName }}</span
        >
      </p>
      <div
        v-for="(item, index) in orderData.orderSkuEsList ||
        orderData.orderSkuList"
        :key="index"
        class="order-infos"
        :class="index !== 0 ? 'border-top' : ''"
      >
        <sp-image :src="item.skuImages" alt="" class="img" srcset="" />
        <div class="right">
          <p class="goods-name">
            <!-- <span
              v-if="
                orderData.payStatusNo === 'ORDER_CUS_PAY_STATUS_UN_PAID' &&
                orderData.skuType !== skuTypes[1]
              "
              class="name"
            >
              {{ item.spuName || item.orderSaleName }}</span
            > -->
            <span class="name"> {{ item.orderSaleName || item.spuName }}</span>
            <span
              v-if="
                checkPayType() !== 2 && checkPayType() !== 4 && !item.orderType
              "
              class="money1"
            >
              {{ item.skuPrice }}元
            </span>
          </p>
          <!-- 交易和资源取skuDetailInfo -->
          <!-- 销售和服务取skuExtInfo -->
          <p class="sku-info">
            <span
              v-if="
                item.skuType === skuTypes[1] || item.skuType === skuTypes[3]
              "
              class="sku-item"
              >{{ item.detailName || getSkus(item.skuExtInfo) }}</span
            >
            <span v-else class="sku-item">{{ getSkus(item.skuExtInfo) }}</span>
            <span class="goods-num">×{{ item.skuCount }}</span>
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
    <div class="total-price-area">
      <!-- 定金尾款付费 -->
      <p v-if="checkPayType() === 2" class="inner">
        总价
        <span v-if="orderData.orderType === 0" class="price1 price">
          面议，</span
        >
        <span v-else class="price1">{{ orderData.orderTotalMoney }}元，</span>
        尾款
        <span v-if="orderData.orderType === 0" class="price2 price">
          面议，</span
        >
        <span v-else class="price2 price"> {{ orderData.lastAount }}元，</span>
        定金
        <span class="price3 price"> {{ orderData.depositAmount }} </span>元
      </p>
      <!-- 服务完结收费的意向单 -->
      <p
        v-else-if="checkPayType() === 4 && orderData.orderType === 0"
        class="inner"
      >
        <span class="price1"> 总价：面议</span>
      </p>
      <!-- 其他付费方式展示效果一样 -->
      <p v-else class="inner">
        <span class="price1"> 总价 {{ orderData.orderTotalMoney }}元，</span>
        <span class="price2"> 优惠 {{ orderData.orderDiscountMoney }}元，</span>
        应付款
        <span v-if="isShowPayBtn() == 1">
          <span class="price3"> {{ orderData.orderPayableMoney }}</span
          >元
        </span>
        <span v-else>
          合计
          <span class="price3">{{ orderData.orderPayableMoney }}</span
          >元
        </span>
      </p>
    </div>
    <div class="btn-area">
      <div class="inner">
        <!-- 未支付订单可取消订单 根据订单状态判断-->
        <sp-button
          v-if="isShowCanCelBtn()"
          type="primary"
          class="btn-cancel"
          @click="handleClickItem(1)"
          >取消订单</sp-button
        >
        <!-- 客户订单状态 -->
        <sp-button
          v-if="checkContractStatus(orderData) == 2"
          type="info"
          class="btn-look"
          @click="handleClickItem(3)"
          >查看合同</sp-button
        >
        <sp-button
          v-if="checkContractStatus(orderData) == 1"
          type="info"
          class="btn-look"
          @click="handleClickItem(2)"
          >签署合同</sp-button
        >
        <sp-button
          v-if="isShowPayBtn() == 1"
          type="default"
          class="btn-confirm"
          @click="handleClickItem(4)"
          >立即付款</sp-button
        >
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
    handleClickItem(type) {
      this.$emit('handleClickItem', type, this.orderData)
    },
    toDetail() {
      // const { href } = this.$router.resolve({
      //   path: '/order/detail',
      //   query: { id: this.orderData.id, cusOrderId: this.orderData.cusOrderId },
      // })
      // window.open(href, '_blank')
      this.$router.push({
        path: '/order/detail',
        query: { id: this.orderData.id, cusOrderId: this.orderData.cusOrderId },
      })
    },
    setName(str) {
      return '**' + str.substring(2, str.length)
    },
  },
}
</script>

<style lang="less" scoped>
.price3 {
  color: #666;
  font-size: 28px;
  font-weight: 600;
}
.item {
  width: auto;
  padding: 20px 40px;
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
      background: rgba(0, 0, 0, 0.16);
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
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
      .money1 {
        font-weight: normal;
      }
    }
    .sku-info {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin: 10px 0 10px 0;
      min-height: 64px;
      .textOverflow(2);
      .sku-item {
        margin-right: 10px;
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
      height: 34px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      float: right;
    }
  }
  .btn-area {
    height: auto;
    overflow: hidden;
    .inner {
      float: right;
      margin-bottom: 10px;
      height: 110px;
      margin-top: -20px;
      .sp-button {
        font-size: 26px;
        height: 64px;
        border-radius: 32px;
        padding: 0 25px;
        color: #999999;
        line-height: 1;
        margin: 0;
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
  }
}
</style>
