<template>
  <div class="item-inner">
    <div
      v-if="item.skuDealType && afterSaleStatus === 'AFTER_SALE_STATUS_3'"
      class="img-mark"
    >
      <img
        v-if="item.skuDealType === 'SKU_DEAL_TYPE_1'"
        src="https://cdn.shupian.cn/sp-pt/wap/images/7yo84dwgx0k0000.png"
        alt="取消办理"
      />
      <img
        v-else-if="item.skuDealType === 'SKU_DEAL_TYPE_2'"
        src="https://cdn.shupian.cn/sp-pt/wap/images/2qi17702lc00000.png"
        alt="继续办理"
      />
      <span
        v-if="item.skuDealType === 'SKU_DEAL_TYPE_1'"
        class="after-sale-text"
        >取消办理</span
      >
      <span v-else class="after-sale-text">继续办理</span>
    </div>
    <div class="img">
      <sp-image
        :src="$resizeImg(130, 130, item.indexImg)"
        alt=""
        class="sp-image"
        srcset=""
      />
    </div>
    <div
      class="right"
      :class="
        cusOrderStatusType === 1 || cusOrderStatusType === 4
          ? 'item-height1'
          : 'item-height2'
      "
    >
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
        <p class="sku-l">
          {{ item.skuDetailValues || item.skuExtInfo.replace(/\|/g, ';') }}
        </p>
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
          <!-- 不显示周期产品进度 -->
          <sp-button
            v-if="
              cusOrderStatusType !== 4 &&
              cusOrderStatusType !== 1 &&
              item.skuType === 'PRO_CLASS_TYPE_SERVICE' &&
              !isCycleProductType(item)
            "
            @click="openProcess(item)"
            >办理进度</sp-button
          >

          <!-- <sp-button
            v-if="
              cusOrderStatusType !== 4 &&
              cusOrderStatusType !== 1 &&
              item.skuType === 'PRO_CLASS_TYPE_SERVICE'
            "
            @click="checkProductType(item)"
            >办理进度</sp-button
          > -->
          <!-- 服务产品确认完成显示条件 1产品状态为已处理 2支付状态未完成支付  3用户未点确认-->
          <sp-button
            v-if="
              cusOrderStatusType === 2 &&
              (item.skuStatusNo === 'ORDER_ORDER_SERVER_STATUS_HANDLED' ||
                item.skuStatusNo === 'ORDER_ORDER_RESOURCE_STATUS_HANDLED') &&
              item.payStatusNo === 'ORDER_CUS_PAY_STATUS_COMPLETED_PAID' &&
              item.userConfirm == 0
            "
            type="default"
            class="btn-confirm"
            @click="confirmOrder(item.id)"
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
    <Process v-if="showProcess" :info="processInfo" @close="closeProcess">
    </Process>
  </div>
</template>

<script>
// 服务商品支付方式分为全款，定金尾款，按节点付费，完结付费
// 定金胃口，按节点付费，完结付费有办理进度
import { Button, Image } from '@chipspc/vant-dgg'
import Process from './Process.vue'
import changeMoney from '@/utils/changeMoney'

export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    Process,
  },
  props: {
    // 当前商品产品
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    // 售后状态
    afterSaleStatus: {
      type: String,
      default: '',
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
    cusOrderPayType: {
      type: Number,
      default: 1,
    },
    // 意向单类型 0 为意向单
    orderType: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      showProcess: false,
      processInfo: {},
    }
  },
  methods: {
    changeMoney(num) {
      return changeMoney.regFenToYuan(num)
    },
    confirmOrder(id) {
      this.$emit('confirmOrder', id)
    },
    openProcess(item) {
      console.log(item)
      this.processInfo = {
        image: item.indexImg,
        orderId: item.orderId,
        cusOrderId: item.cusOrderId,
        skuId: item.skuId,
        detailId: item.id,
      }
      this.showProcess = true
    },
    closeProcess() {
      this.showProcess = false
    },
    // 判断是否是周期产品
    isCycleProductType(item) {
      const skuDetailInfo = JSON.parse(item.skuDetailInfo)
      const productStyle =
        skuDetailInfo.sku.refConfig && skuDetailInfo.sku.refConfig.productStyle
      if (productStyle && productStyle === 'PRO_CYCLE_PRODUCT') {
        return true
      }
      return false
    },
    // 判断是否是周期产品，并跳转到对应进度
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
            detailId: item.id,
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
            detailId: item.id,
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
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  .img-mark {
    position: absolute;
    z-index: 0;
    right: -40px;
    top: 0;
    height: 140px;
    width: 200px;
    img {
      width: 140px;
      height: 105px;
    }
    .after-sale-text {
      padding-top: 130px;
      font-size: 24px;
      color: #fe8c29;
      letter-spacing: 0;
      text-align: right;
      line-height: 24px;
      position: absolute;
      bottom: 0;
      right: 40px;
    }
  }
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
  .item-height1 {
    height: 156px;
    overflow: hidden;
  }
  .item-height2 {
    min-height: 206px;
    overflow: hidden;
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
      padding-right: 20px;
    }
    .money1 {
      width: auto;
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
    min-height: 104px;
    display: flex !important;
    .sku-l {
      flex: 1;
      height: auto;
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
