<template>
  <div class="page">
    <Header title="节点明细" @leftClickFuc="onClickLeft" />
    <div class="banner">
      <p class="goods-name">{{ skuInfo.spuName }}</p>
      <p class="goods-skus">
        {{ skuInfo.skuDetailValues || skuInfo.skuExtInfo }}
      </p>
      <div class="banner-node">
        <div class="left">
          <p class="p1">{{ nodeList.length }}</p>
          <p>支付节点</p>
        </div>
        <div class="right">
          <p class="p1">{{ nodeTotalMoney }}</p>
          <p>合计金额</p>
        </div>
      </div>
    </div>
    <div class="list">
      <div v-for="(item, index) in nodeList" :key="index" class="item">
        <span class="node-icon">节点{{ item.batchIndex }}</span>
        <p class="money-area">
          <span class="span1">金额:</span>
          <span class="span2">{{ item.money }}</span>
          <span class="span4">元</span>
          <span
            v-if="item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_0'"
            class="span3"
            >无需支付</span
          >
          <span
            v-else-if="item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1'"
            class="span3"
            >本期应付</span
          >
          <span v-else class="span3">已支付</span>
        </p>
      </div>
    </div>
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
// 服务商品节点明细
import Header from '@/components/common/head/header'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import OrderMixins from '@/mixins/order'
export default {
  components: {
    Header,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      loading: true,
      orderId: '',
      cusOrderId: '',
      orderData: {},
      orderSkuId: '',
      skuInfo: {},
      fromPage: 'nodeDetail',
      nodeList: [],
      nodeTotalMoney: '', // 该产品所有节点金额总额
    }
  },
  mounted() {
    if (this.$route.query.cusOrderId && this.$route.query.skuId) {
      this.cusOrderId = this.$route.query.cusOrderId
      this.orderSkuId = this.$route.query.skuId
      this.orderId = this.$route.query.orderId
      this.getBatchList()
      this.getDetail()
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    getDetail() {
      const list = JSON.parse(localStorage.getItem('nodeList'))

      this.skuInfo = list.filter((item) => {
        return item.id === this.orderSkuId
      })[0]
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background: #f4f4f4;
  .banner {
    background: white;
    padding: 40px;
    .goods-name {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 48px;
      margin-bottom: 20px;
    }
    .goods-skus {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 34px;
    }
    .banner-node {
      margin-top: 40px;
      padding: 25px 0 0 0;
      display: flex;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 48px;
      text-align: center;
      border-top: 1px solid #f4f4f4;
      .left {
        width: 50%;
      }
      .right {
        width: 50%;
      }
      .p1 {
        color: #222222;
        font-size: 32px;
      }
    }
  }
  .list {
    background: white;
    padding: 10px 40px 0 40px;
    margin-top: 30px;
    .item {
      padding: 80px 0 20px 0;
      font-size: 28px;
      position: relative;
      .node-icon {
        position: absolute;
        left: -40px;
        top: 30px;
        width: 106px;
        height: 32px;
        background: #4974f5;
        border-radius: 0px 16px 16px 0px;
        text-align: center;
        line-height: 32px;
        font-size: 24px;
        color: white;
      }
      .money-area {
        font-size: 24px;
        color: rgba(34, 34, 34, 0.9);
        margin-bottom: 10px;
        width: 100%;
        .span1 {
          font-size: 24px;
          color: rgba(34, 34, 34, 0.8);
        }
        .span2 {
          font-size: 28px;
          color: rgba(34, 34, 34, 1);
          font-weight: 500;
        }
        .span3 {
          display: block;
          float: right;
          font-size: 24px;
          font-family: PingFang SC;
          color: #999999;
        }
      }
      .serve-list {
        width: 100%;
        line-height: 36px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>
