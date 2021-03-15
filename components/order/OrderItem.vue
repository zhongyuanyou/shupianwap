<template>
  <div class="item">
    <div @click="toDetail">
      <p class="order-no-area">
        <span class="orderNo"> 订单编号: {{ data.orderNo }} </span>
        <span class="order-status">{{ data.orderStatusName }}</span>
      </p>
      <div
        v-for="(item, index) in data.productVo"
        :key="index"
        class="order-infos"
        :class="index !== 0 ? 'border-top' : ''"
      >
        <div class="img">
          <img
            src="https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/lcci_bg.7bfafcf36.png"
            alt=""
            srcset=""
          />
        </div>
        <div class="right">
          <p class="goods-name">
            <span class="name"> {{ item.name }}</span>
            <span class="money1"> {{ item.price }}元 </span>
          </p>
          <p class="sku-info">
            <span
              v-for="(item2, index2) in item.fieldList"
              :key="index2"
              class="sku-item"
              >{{ item2.fieldValue }};</span
            >
            <span class="goods-num">×{{ item.goodsNumber }}</span>
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
      <p class="inner">
        <span class="price1"> 总价 {{ data.orderTotalMoney }}元，</span>
        <span class="price2"> 优惠 {{ data.orderDiscountMoney }}元，</span>
        <span class="price3"> 合计 {{ data.orderPayableMoney }}元</span>
      </p>
    </div>
    <div class="btn-area">
      <div class="inner">
        <sp-button
          v-if="orderType == 1"
          type="primary"
          @click="handleClickItem(1)"
          >取消订单</sp-button
        >
        <sp-button
          v-if="orderType !== 4 && !data.contracUrl"
          type="info"
          @click="handleClickItem(2)"
          >签署合同</sp-button
        >
        <sp-button
          v-if="orderType !== 4 && data.contracUrl"
          type="info"
          @click="handleClickItem(2)"
          >查看合同</sp-button
        >
        <sp-button type="default" @click="handleClickItem(3)"
          >立即付款</sp-button
        >
        <sp-button
          v-if="orderType === 2"
          type="default"
          @click="handleClickItem(4)"
          >确认完成</sp-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Button.name]: Button,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    orderId: {
      type: String,
      default: '',
    },
    orderType: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleClickItem(type) {
      this.$emit('handleClickItem', type, this.data)
    },
    toDetail() {
      this.$router.push({
        path: '/order/detail',
        query: { id: this.data.orderId || this.data.id || '13131' },
      })
      this.$store.dispatch('order/setOrderData', this.data)
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
    .order-status {
      color: #fe8c29;
    }
  }
  .order-infos {
    height: auto;
    display: flex;
    padding: 40px 0;
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
        .textOverflow(1);
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
      margin: 10px 0 20px 0;
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
      margin-top: 10px;
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
        height: 64px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 32px;
        padding: 0 25px;
        color: #999999;
        line-height: 1;
        margin: 0;
      }
    }
  }
}
</style>
