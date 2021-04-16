<template>
  <div class="item-inner">
    <sp-image
      class="img"
      :src="item.skuDetails[0].skuImages || item.skuImages"
    ></sp-image>
    <div class="right">
      <p class="goods-name">
        <span class="name">
          {{
            item.orderSaleName || item.skuDetails[0].spuName || item.spuName
          }}</span
        >
        <span class="money1">
          {{ changeMoney(item.skuDetails[0].skuPrice || item.skuPrice) }}元
        </span>
      </p>
      <div class="sku-info">
        <div class="goods-num">×{{ item.skuCount || 1 }}</div>
        <p>{{ item.skuExtInfo }}</p>
        <!-- <p v-for="(item2, index2) in item.fieldList" :key="index2">
          {{ item2.fieldValue }}
        </p> -->
      </div>
      <div class="item-btn-area">
        <div class="inner">
          <!-- <sp-button @click="handleClickBtn(1)">查看底单</sp-button> -->
          <sp-button
            v-if="
              item.skuDetails[0].skuStatusNo !==
              'ORDER_ORDER_SERVER_STATUS_UN_PAID'
            "
            @click="handleClickBtn(2, item)"
            >办理进度</sp-button
          >
          <!-- 服务产品确认完成显示条件 1产品状态为已处理 2支付状态为完成支付  3用户未点确认-->
          <sp-button
            v-if="
              item.skuDetails[0].skuStatusNo ===
                'ORDER_ORDER_SERVER_STATUS_HANDLED' &&
              cusOrderPayStatusNo === 'ORDER_CUS_PAY_STATUS_COMPLETED_PAID' &&
              item.userConfirm == 0
            "
            type="default"
            class="btn-confirm"
            @click="handleClickBtn(3, item)"
            >确认完成</sp-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 服务商品支付方式分为全款，定金尾款，按节点付费，完结付费
// 定金胃口，按节点付费，完结付费有办理进度
import { Button, Image } from '@chipspc/vant-dgg'
import changeMoney from '@/utils/changeMoney'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
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
  position: relative;
  .img {
    width: 130px;
    height: 130px;
    background: rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    overflow: hidden;
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
