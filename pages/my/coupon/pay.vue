<template>
  <div class="pay">
    <div class="header">
      <Header
        class="my-header"
        title="支付收银台"
        back-icon-color="#fff"
      ></Header>
      <div class="price">4200.55<span class="unit">元</span></div>
      <div class="time">
        支付剩余时间：<span>23</span> : <span>59</span> : <span>59</span>
      </div>
    </div>
    <main class="main">
      <my-icon
        name="pay_ic_alipay"
        size="0.5rem"
        color="rgba(23, 151, 236, 1)"
      ></my-icon>
      <div>支付宝</div>
      <div>微信</div>
    </main>
  </div>
</template>
<script>
import Header from '@/components/common/head/header.vue'
export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    Header,
  },
}
</script>
<style lang="less" scoped>
.pay {
  min-height: 100vh;
  background-color: white;
}
.header {
  // height: 428px;
  overflow: hidden;
  background: #4974f5;

  ::v-deep .my-head {
    background: none;
    .title {
      color: white;
    }
  }
  .price {
    font-family: PingFangSC-Medium;
    font-size: 56px;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    margin: 68px 0 24px;
    .unit {
      font-size: 28px;
    }
  }
  .time {
    text-align: center;
    font-size: 24px;
    color: #ffffff;
    letter-spacing: 0;
    margin-bottom: 90px;
    span {
      display: inline-block;

      // height: 40px;
      padding: 8px 5px;
      border: 1px solid #dddddd;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 24px;
    }
  }
}
.main {
  background: #ffffff;
  border-radius: 24px;
  border-radius: 24px;
}
</style>
