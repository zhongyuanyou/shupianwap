<template>
  <div class="item-inner">
    <div class="img">
      <sp-image class="sp-image" :src="item.indexImg"></sp-image>
    </div>
    <div class="right">
      <p class="goods-name">
        <span
          v-if="
            item.payStatusNo === 'ORDER_CUS_PAY_STATUS_UN_PAID' &&
            item.classifyOneName.match('公司')
          "
          class="name"
        >
          {{ item.spuHideName || item.spuName }}</span
        >
        <span v-else class="name"> {{ item.spuName }}</span>
        <span class="money1">
          {{ changeMoney(item.skuPrice || item.skuPrice) }}元
        </span>
      </p>
      <div class="sku-info">
        <div class="goods-num">×{{ item.skuCount || 1 }}</div>
        <p>{{ item.skuDetailValues || item.skuExtInfo.replace(/\|/g, ';') }}</p>
        <!-- <p v-for="(item2, index2) in item.fieldList" :key="index2">
          {{ item2.fieldValue }}
        </p> -->
      </div>
    </div>
  </div>
</template>

<script>
// 服务商品支付方式分为全款，定金尾款，按节点付费，完结付费
// 定金胃口，按节点付费，完结付费有办理进度
import { Button, Image } from '@chipspc/vant-dgg'
import changeMoney from '@/utils/changeMoney'
import OrderMixins from '@/mixins/order'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
  },
  mixins: [OrderMixins],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      fromPage: 'orderDetail',
    }
  },
  methods: {
    toNav() {},
    changeMoney(num) {
      return changeMoney.regFenToYuan(num)
    },
  },
}
</script>

<style lang="less" scoped>
.item-inner {
  width: 100%;
  height: auto;
  display: flex;
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
  }
  .goods-name {
    display: flex;
    font-size: 28px;
    font-family: PingFang SC;
    line-height: 36px;
    color: #222222;
    margin-bottom: 20px;
    .name {
      font-weight: bold;
      flex: 1;
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
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    height: auto;
    position: relative;
    .goods-num {
      position: absolute;
      right: 0;
      top: 0;
    }
    p {
      padding-right: 40px;
    }
  }
}
</style>
