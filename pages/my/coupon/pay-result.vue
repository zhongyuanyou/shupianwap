<template>
  <div class="pay">
    <div class="header">
      <Header class="my-header"></Header>
    </div>
    <main class="main">
      <div v-if="payStatus === 2" class="card">
        <my-icon
          name="pay_ic_fail"
          size="1.4rem"
          color="rgba(241, 82, 78, 1)"
        ></my-icon>
        <div class="card_title">支付失败</div>
        <div class="card_des">
          如已支付，可稍后返回我的卡包中查看，无需重新支付
        </div>
      </div>

      <div v-else-if="payStatus === 1" class="card">
        <my-icon
          name="pay_ic_success"
          size="1.4rem"
          color="rgba(73, 116, 245, 1)"
        ></my-icon>
        <div class="card_title">支付成功</div>
        <div class="card_des">感谢你的支持</div>
      </div>

      <div v-if="payStatus" class="btns">
        <sp-button v-if="payStatus == 1" block class="btn1">
          查看活动卡
        </sp-button>
        <sp-button v-if="payStatus == 1" block class="btn2">
          返回首页
        </sp-button>

        <sp-button v-if="payStatus == 2" block class="btn3">
          重新支付
        </sp-button>
      </div>
    </main>
  </div>
</template>
<script>
import {
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Button,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'

import Header from '@/components/common/head/header.vue'

export default {
  layout: 'keepAlive',
  name: 'PayResult',
  components: {
    Header,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,

    [Button.name]: Button,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
  },
  data() {
    return {
      payStatus: 1,
    }
  },
  mounted() {},
  destroyed() {},
  methods: {
    submit() {},
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

  ::v-deep .my-head {
    background: none;
    .title {
      color: white;
    }
  }
}
.main {
  background: #ffffff;

  .card {
    text-align: center;
    padding-top: 92px;
    margin: 0 auto 0 auto;
    width: 480px;

    .card_title {
      font-weight: bold;
      text-align: center;

      font-family: PingFangSC-Medium;
      font-size: 44px;
      color: #1a1a1a;
      padding: 23px 17px;
    }
    .card_des {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
    }
  }

  .btns {
    margin: 164px auto 0 auto;
    width: 480px;

    ::v-deep .sp-button {
      height: 72px;
      border-radius: 8px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      height: 96px;
    }
    .btn1 {
      color: #fff;
      border: 0;
      background: #4974f5;
    }
    .btn2 {
      border: 0;
      color: #222222;
      background: #f5f5f5;
      margin: 48px 0;
    }
    .btn3 {
      background: #fa5741;

      color: #ffffff;
      border: none;
    }
  }
}
</style>
