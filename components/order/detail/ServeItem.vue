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
            item.skuDetails[0].orderSaleName ||
            item.skuDetails[0].spuName ||
            item.spuName
          }}</span
        >
        <span class="money1">
          {{ changeMoney(item.skuDetails[0].skuPrice || item.skuPrice) }}元
        </span>
      </p>
      <div class="sku-info">
        <p class="sku-l">{{ item.skuExtInfo }}</p>
        <!-- <p class="sku-l">
          <span class="btn-more" @click="showMoSku">
            <my-icon
              v-if="getValue(item.fieldList).length > 40"
              name="input_ic_open"
              size="0.28rem"
              color="rgba(0,0,0,0.6)"
            ></my-icon>
          </span>
          <span
            v-for="(item2, index2) in item.fieldList"
            :key="index2"
            class="sku-item"
            >{{ item2.fieldValue }};</span
          >
        </p> -->
        <span class="goods-num">×{{ item.skuCount || 1 }}</span>
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
      <!-- <div
          v-if="item.serviceResourceList && item.serviceResourceList.length"
          class="sku-sercice"
        >
          <div class="title">服务明细</div>
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
      <!-- 增值服务-产品中心已删除 -->
      <!-- <div
          v-if="item.serviceResourceList && item.serviceResourceList.length"
          class="sku-sercice"
        >
          <div class="title">增值服务</div>
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
</template>

<script>
// 服务商品支付方式分为全款，定金尾款，按节点付费，完结付费
// 定金胃口，按节点付费，完结付费有办理进度
import { Button, Image } from '@chipspc/vant-dgg'
import OrderMixins from '@/mixins/order'
import changeMoney from '@/utils/changeMoney'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
  },
  mixins: [OrderMixins],
  props: {
    // 当前商品产品
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    // 订单状态
    cusOrderStatusType: {
      type: Number,
      default: 2,
    },
    // 订单支付状态
    cusOrderPayStatusNo: {
      type: String,
      default: '',
    },
  },
  methods: {
    changeMoney(num) {
      return changeMoney.regFenToYuan(num)
    },
    handleClickBtn(type, item) {
      console.log('item', item)
      switch (type) {
        // 办理进度
        case 2:
          this.checkProductType(item)
          break
        case 3:
          // 确认完成
          this.$emit('confirmOrder', item.skuId)
          break
      }
    },
    // 判断是否是周期产品
    checkProductType(item) {
      const skuDetailInfo = JSON.parse(item.skuDetailInfo)
      const productStyle =
        skuDetailInfo.sku.refConfig && skuDetailInfo.sku.refConfig.productStyle
      if (productStyle && productStyle === 'PRO_CYCLE_PRODUCT') {
        // 周期产品
        this.$router.push({
          path: '/order/process',
          query: {
            orderId: item.orderId,
            cusOrderId: item.cusOrderId,
            skuId: item.skuId,
            detailId: item.skuDetails[0].id,
          },
        })
      } else {
        // 普通产品
        this.$router.push({
          path: '/order/nomalProces',
          query: {
            orderId: item.orderId,
            cusOrderId: item.cusOrderId,
            skuId: item.skuId,
            detailId: item.skuDetails[0].id,
          },
        })
      }
    },
    // 解析属性信息
    getValue(arr) {
      let str = ''
      for (let i = 0; i < arr.length; i++) {
        str += arr[i].fieldValue
      }
      return str
    },
    showMoSku() {
      this.$emit('showSkuModal', this.item)
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
    margin: 10px 0 10px 0;
    height: auto;
    display: flex !important;
    .sku-l {
      flex: 1;
      height: 60px;
      .textOverflow(2);
      position: relative;
      .btn-more {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 28px;
        height: 28px;
      }
      padding-right: 40px;
    }
    .sku-item {
      margin-right: 10px;
    }
    .goods-num {
      display: block;
    }
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
      padding-right: 20px;
    }
    .sku-r {
      flex: 1;
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
}

.item-btn-area {
  width: 100%;
  height: 60px;
  .inner {
    float: right;
    width: auto;
    height: 100%;
    .sp-button {
      width: auto;
      height: auto;
      padding: 10px 20px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      border-radius: 24px;
      display: block;
      float: left;
      font-size: 24px;
      color: #222;
      margin-left: 20px;
    }
    .btn-confirm {
      background: #ffffff;
      border: 1px solid #e5654c;
      color: #e5654c;
    }
  }
}
</style>
