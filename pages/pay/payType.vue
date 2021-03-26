<template>
  <div class="pay-page">
    <Header title="选择支付方式" />
    <div class="banner">
      <p class="total-money">{{ responseData.enableTotalMoney }}元</p>
      <p v-if="time && time.hour" class="time">
        剩余支付时间 ：<span>{{ time.hour }}</span> ：<span>{{
          time.min
        }}</span>
        ：<span>{{ time.sec }}</span>
      </p>
    </div>
    <sp-radio-group v-model="payPlatform" class="type-list">
      <div v-for="(item, index) in typeList" :key="index" class="item">
        <div class="left">
          <my-icon
            :name="item.icon"
            size="0.5rem"
            :color="item.color"
          ></my-icon>
        </div>
        <sp-cell
          :title="item.name"
          :border="false"
          clickable
          @click="switchPayType(item)"
        >
          <template #left-icon>
            <my-icon
              name="details_ic_Unpaid"
              size="0.4rem"
              color="rgba(255, 255, 255, 1)"
            ></my-icon>
          </template>
          <template #right-icon>
            <sp-radio :name="item.code"></sp-radio>
          </template>
        </sp-cell>
      </div>
    </sp-radio-group>
    <div class="page-bottom">
      <sp-button size="large" @click="startPay">
        <span class="btn-item"> {{ payName || '支付宝支付' }}：</span>
        <span class="btn-item money">
          {{ responseData.enableTotalMoney }}
        </span>
        <span class="btn-item"> 元</span>
      </sp-button>
    </div>
  </div>
</template>

<script>
import { Button, RadioGroup, Radio, Cell } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { pay } from '@/api'
// 支付倒计时定时器
let timer
export default {
  components: {
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    Header,
  },
  data() {
    return {
      responseData: {},
      formData: {
        payCusId: 10000000,
      }, // 请求数据
      orderData: {},
      time: {}, // 倒计时
      diff: 0, // 时间差 s
      typeList: [
        {
          code: 'CRISPS_C_ZFFS_ALI',
          name: '支付宝支付',
          icon: 'pay_ic_alipay',
          color: 'rgba(23, 151, 236, 1)',
        },
        {
          code: 'CRISPS_C_ZFFS_WECHAT',
          name: '微信支付',
          icon: 'pay_ic_wechat',
          color: 'rgba(41, 175, 18, 1)',
        },
        {
          code: 'CRISPS_C_ZFFS_CARD',
          name: '银行卡支付',
          icon: 'pay_ic_bank',
          color: 'rgba(255, 133, 60, 1)',
        },
      ],
      payPlatform: 'CRISPS_C_ZFFS_ALI',
      payName: '支付宝支付',
    }
  },
  beforeDestroy() {
    if (timer) clearInterval(timer)
  },
  mounted() {
    pay
      .enablePayMoney({ axios: this.$axios }, this.formData)
      .then((result) => {
        // console.log('result的值', result)
        this.responseData = result.data.data
        console.log('this.responseData的值', this.responseData)
      })
      .catch((e) => {
        if (e.code !== 200) {
          console.log(e)
        }
      })
    this.countDown(new Date().getTime() + 60 * 60 * 24 * 1000)
  },
  methods: {
    // 支付倒计时
    countDown(endTimeStamp) {
      const that = this
      const nowTimeStamp = new Date().getTime()
      // 计算时间差 秒
      this.diff = (endTimeStamp - nowTimeStamp) / 1000
      timer = setInterval(() => {
        let hour = Math.floor(this.diff / 3600)
        let min = Math.floor((this.diff - hour * 3600) / 60)
        let sec = Math.floor(this.diff % 60)
        if (hour < 10) hour = '0' + hour
        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec
        that.time = {
          hour,
          min,
          sec,
        }
        that.diff--
      }, 1000)
      // 每执行一次定时器就减少一秒
    },
    switchPayType(item) {
      this.payName = item.name
      this.payPlatform = item.code
    },
    startPay() {
      this.$router.replace('/pay/payResult')
    },
  },
}
</script>

<style lang="less" scoped>
.pay-page {
  background: #f4f4f4;
  min-height: 100vh;
  .banner {
    height: 300px;
    font-size: 24px;
    color: #555555;
    padding-top: 80px;
    .total-money {
      font-size: 56px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ec5330;
      text-align: center;
    }
    .time {
      text-align: center;
      margin-top: 20px;
      span {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: #f8f8f8;
        border: 1px solid #cccccc;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  .type-list {
    height: 332px;
    background: white;
    font-weight: bold;
    color: #1a1a1a;
    font-size: 30px;
    font-family: PingFang SC;
    overflow: hidden;
    .item {
      width: 100%;
      display: flex;
      padding: 11px 40px;
      border-bottom: 1px solid #f4f4f4;
    }
    .left {
      width: 50px;
      padding: 14px 0;
    }
    .sp-cell {
      width: 90%;
      flex: 1;
    }
  }
  .page-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 136px;
    background: white;
    padding: 24px 40px;
    .sp-button {
      display: block;
      background: #ec5330;
      border-radius: 8px;
      border: none;
      width: 100%;
      height: 100%;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.7);
      .btn-item {
        display: block;
        float: left;
        line-height: 88px;
      }
      .money {
        font-size: 32px;
        color: white;
        font-weight: 600;
      }
    }
  }
}
</style>
