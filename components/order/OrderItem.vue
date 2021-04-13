<template>
  <div class="item">
    <div @click="toDetail">
      <p class="order-no-area">
        <span class="orderNo"> 订单编号: {{ orderData.orderNo }} </span>
        <span
          class="order-status"
          :class="
            orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_CANCELLED'
              ? 'status1'
              : orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_UNPAID'
              ? 'status2'
              : 'status3'
          "
          >{{ CUSORDERSTATUSCODE[orderData.cusOrderStatusNo] }}</span
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
            <span class="name"> {{ item.spuName || item.orderSaleName }}</span>
            <span class="money1"> {{ item.skuPrice }}元 </span>
          </p>
          <p class="sku-info">
            <span class="sku-item">{{ item.skuExtInfo }}</span>
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
        <span class="price1">
          总价 {{ orderData.orderTotalMoney || '面议' }}元，</span
        >
        <span class="price2">
          尾款
          {{ orderData.lastAount || '面议' }}元，</span
        >
        <span class="price3">
          定金 {{ orderData.depositAmount || '面议' }}元</span
        >
      </p>
      <!-- 服务完结收费的意向单 -->
      <p v-else-if="orderData.orderType === 0" class="inner">
        <span class="price1"> 总价面议</span>
      </p>
      <!-- 其他付费方式展示效果一样 -->
      <p v-else class="inner">
        <span class="price1"> 总价 {{ orderData.orderTotalMoney }}元，</span>
        <span class="price2"> 优惠 {{ orderData.orderDiscountMoney }}元，</span>
        <span v-if="isShowPayBtn() == 1" class="price3">
          应付款 {{ orderData.orderPayableMoney }}元</span
        >
        <span v-else class="price3"
          >合计 {{ orderData.orderPayableMoney }}元</span
        >
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
          v-if="checkContractStatus() == 2"
          type="info"
          class="btn-look"
          @click="handleClickItem(3)"
          >查看合同</sp-button
        >
        <sp-button
          v-if="checkContractStatus() == 1"
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
          >支付余款</sp-button
        >
        <sp-button
          v-if="isShowConfirmBtn()"
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
    orderId: {
      type: String,
      default: '',
    },
    selectedOrderStatus: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClickItem(type) {
      this.$emit('handleClickItem', type, this.orderData)
    },
    toDetail() {
      this.$router.push({
        path: '/order/detail',
        query: { id: this.orderData.id, cusOrderId: this.orderData.cusOrderId },
      })
    },
  },
}
</script>

<style lang="less" scoped>
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
      span {
        display: block;
        float: left;
      }
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
