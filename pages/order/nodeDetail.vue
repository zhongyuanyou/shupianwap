<template>
  <div class="page">
    <Header title="节点明细" @leftClickFuc="onClickLeft" />
    <div class="banner">
      <p class="goods-name">商标注册</p>
      <p class="goods-skus">
        武侯区；无注册地址；认缴申请武侯区；武侯区；无注册地址；
        认缴申请武侯区；武
      </p>
      <div class="banner-node">
        <div class="left">
          <p class="p1">2</p>
          <p>支付节点</p>
        </div>
        <div class="right">
          <p class="p1">388</p>
          <p>合计金额</p>
        </div>
      </div>
    </div>
    <div class="list">
      <div v-for="(item, index) in nodeList" :key="index" class="item">
        <span class="node-icon">节点{{ ++index }}</span>
        <p class="money-area">
          <span class="span1"> 金额：</span>
          <span class="span2">
            {{ item.money }}
          </span>
          元
          <span v-if="item.payTime" class="span3">
            已于 {{ item.payTime }} 支付
          </span>
          <span v-else class="span3">待支付</span>
        </p>
        <p
          v-for="(item2, index2) in item.serveList"
          :key="index2"
          class="serve-list"
        >
          {{ item2 }}
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
export default {
  components: {
    Header,
    LoadingCenter,
  },
  data() {
    return {
      orderId: '',
      cusOrderId: '',
      skuId: '',
      loading: true,
      nodeList: [
        {
          money: 200,
          payTime: '2021.03.10',
          serveList: ['加急处理1', '加急处理2'],
        },
        {
          money: 300,
          payTime: null,
        },
        {
          money: 400,
          payTime: null,
          serveList: [
            'vip贵宾服务vip贵宾服务vip贵宾服务vip贵宾服务vip贵宾服务vip贵宾服务vip贵宾服务vip贵宾服务vip贵宾服务',
          ],
        },
      ],
    }
  },
  mounted() {
    if (this.$route.query.orderId) {
      this.cusOrderId = this.$route.query.cusOrderId
      this.orderId = this.$route.query.orderId
      this.skuId = this.$route.query.skuId
      this.getNodeDetail()
    } else {
      this.$xToast.error('缺少参数')
      this.$router.back(-1)
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    toDetail() {
      this.$router.go('/order/nodeDetail')
    },
    // 获取节点明细
    getNodeDetail() {},
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
