<template>
  <section>
    <div class="banner">
      <my-icon
        class="back-icon"
        name="nav_ic_back"
        size="0.4rem"
        color="rgba(26, 26, 26, 1)"
        @click.native="onLeftClick"
      ></my-icon>
      <p v-if="payStatus" class="title title1">
        <my-icon
          name="pay_ic_success"
          size="0.4rem"
          color="rgba(73, 116, 245, 1)"
        ></my-icon>
        支付成功
      </p>
      <p v-else class="title title1">
        <my-icon
          name="pay_ic_fail"
          size="0.4rem"
          color="rgba(241, 82, 78, 1)"
        ></my-icon>
        支付失败
      </p>
      <p v-if="payStatus" class="toast">
        本次支付已完成，付款5000元，<br />
        详细信息请点击查看订单
      </p>
      <p v-else class="toast">
        请尽快完成付款，超过订单付款期限，<br />
        系统将自动取消订单
      </p>
      <div class="btn-area">
        <sp-button class="btn1">查看订单</sp-button>
        <sp-button v-if="payStatus" class="btn2">返回首页</sp-button>
        <sp-button v-else class="btn3" @click="againPay">重新支付</sp-button>
      </div>
    </div>
    <div class="list"></div>
  </section>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      payStatus: false,
    }
  },
  mounted() {
    this.payStatus = Math.floor(Math.random() * 2)
  },
  methods: {
    onLeftClick() {
      this.$router.go(-1)
    },
    againPay() {
      this.$router.replace('/pay/payType')
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  background: #f4f4f4;
  position: relative;
  padding-top: 88px;
  .back-icon {
    position: absolute;
    left: 40px;
    top: 20px;
    color: white;
  }
  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 44px;
    text-align: center;
    margin-bottom: 20px;
  }
  .toast {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 36px;
    text-align: center;
  }
  .btn-area {
    display: flex;
    justify-content: space-between;
    margin: 40px auto 80px auto;
    width: 60%;
    height: 120px;
    .sp-button {
      width: 210px;
      height: 72px;
      border-radius: 4px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      background: none;
    }
    .btn1 {
      color: #555555;
      border: 1px solid #cdcdcd;
    }
    .btn2 {
      border: 1px solid #4974f5;
      border-radius: 4px;
      color: #4974f5;
    }
    .btn3 {
      background: #fa5741;
      border-radius: 4px;
      color: #ffffff;
      border: none;
    }
  }
}
</style>
