<template>
  <div class="pay">
    <div class="header">
      <Header class="my-header"></Header>
    </div>
    <main class="main">
      <div v-if="payStatus === 0" class="loading">
        <p class="title">查询中</p>
        <p class="toast">正在查询本次付款信息，请稍后</p>
      </div>
      <div v-if="payStatus === 3" class="loading">
        <p class="title">没有订单</p>
        <p class="toast">当前没有订单支付</p>
      </div>

      <div v-else-if="payStatus === 2" class="card">
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
        <sp-button
          v-if="payStatus == 1 && cusOrderIdType == 'orderList'"
          block
          class="btn1"
          @click="toOrder"
        >
          查看订单
        </sp-button>
        <sp-button
          v-if="payStatus == 1 && cusOrderIdType == 'act_card'"
          block
          class="btn1"
          @click="toCard"
        >
          查看活动卡
        </sp-button>
        <sp-button
          v-if="payStatus == 1 || payStatus == 3"
          block
          class="btn2"
          @click="toHome"
        >
          返回首页
        </sp-button>

        <sp-button v-if="payStatus == 2" block class="btn3" @click="againPay">
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
import { pay, recommendApi } from '@/api'

// 支付结果回调定时器
let payResultTimer

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
      payStatus: 0, // 0 查询中，1成功，2失败,3没有订单
      loading: true,

      payCallBackData: {},
      number: 0,

      cusOrderIdType: '', //   'act_card'活动卡,'orderList'订单
    }
  },
  mounted() {
    this.payCallBackData.cusOrderId = localStorage.getItem('cusOrderId')
    this.payCallBackData.serialNumber = localStorage.getItem('serialNumber')

    this.cusOrderIdType = localStorage.getItem(
      'cusOrderIdType:' + this.payCallBackData.cusOrderId
    )
    this.init()
  },
  destroyed() {
    clearInterval(payResultTimer)
  },
  methods: {
    submit() {},
    init() {
      const startTime = localStorage.getItem('startTime')
      if (
        localStorage.getItem('cusOrderId') &&
        localStorage.getItem('serialNumber')
      ) {
        this.resultLoading = true
        payResultTimer = setInterval(() => {
          this.number++
          this.getPayResult()
        }, 2000)
      } else {
        this.payStatus = 3
        console.log('没有订单信息')
        this.$xToast.error('没有订单信息')
      }
    },
    // 获取回调信息
    getPayResult() {
      this.payCallBackData.cusOrderId = localStorage.getItem('cusOrderId')
      this.payCallBackData.serialNumber = localStorage.getItem('serialNumber')
      pay
        .getPayResult(this.payCallBackData)
        .then((result) => {
          console.log(result)
          if (result === 1 || result === '1') {
            this.resultLoading = false
            this.payStatus = 1
            clearInterval(payResultTimer)
            this.clearLocalStorage()
          } else if (this.number > 20) {
            this.resultLoading = false
            this.payStatus = 2
            clearInterval(payResultTimer)
            this.clearLocalStorage()
          }
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
    },

    againPay() {
      this.$router.replace({
        path: '/pay/payType',
        query: {
          // orderId: this.$route.query.orderId,
          cusOrderId: localStorage.getItem('cusOrderId'),
          // batchIds: this.$route.query.batchIds,
        },
      })
    },
    // 获取当前时间戳
    getNowTime() {
      return new Date().getTime()
    },
    toOrder() {
      this.$router.replace({
        path: '/order/detail',
        query: {
          id: this.$route.query.orderId,
          cusOrderId: this.$route.query.cusOrderId,
          batchIds: this.$route.query.batchIds,
        },
      })
    },
    toCard() {
      this.$router.replace('my/coupon?tabActive=1')
    },
    toHome() {
      this.$router.replace('/')
    },
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

  .loading {
    margin-top: 100px;
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
  }

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
