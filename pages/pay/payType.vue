<template>
  <div class="pay-page">
    <Header title="选择支付方式" />
    <div class="banner">
      <p class="total-money">{{ ChangeMoney }}元</p>
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
    <Checkbox v-model="radio">
      <template>
        <p class="tit">
          我已阅读过并知晓<span @click="enterAgreement"
            >《薯片平台订单协议》</span
          >
        </p>
      </template>
    </Checkbox>
    <div class="page-bottom">
      <sp-button size="large" @click="startPay">
        <span class="btn-item"> {{ payName || '支付宝支付' }}：</span>
        <span class="btn-item money">
          {{ ChangeMoney }}
        </span>
        <span class="btn-item"> 元</span>
      </sp-button>
    </div>
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
import { Button, RadioGroup, Radio, Cell, Checkbox } from '@chipspc/vant-dgg'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import Header from '@/components/common/head/header'
import { pay, auth } from '@/api'
import changeMoney from '@/utils/changeMoney'
// 支付倒计时定时器
let timer
export default {
  components: {
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    Header,
    Checkbox,
    LoadingCenter,
  },
  data() {
    return {
      loading: false, // 加载状态
      agreementData: {}, // 协议数据
      responseData: {},
      radio: '',
      formData: {
        payCusId: '',
        batchIds: [],
      }, // 请求数据
      getPayParamsFormData: {
        cusOrderId: '',
        payPlatform: 'CRISPS_C_ZFFS_ALI',
        payTerminal: 'COMDIC_TERMINAL_WAP', // 支付终端 当前为wap
        sourcePlatform: 'COMDIC_PLATFORM_CRISPS', // 操作系统来源
        // userId: this.$cookies.get('userId'), // 用户ID
        // userName: this.$cookies.get('userName'), // 用户姓名
        orderAgreementIds: '',
      },
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
  computed: {
    ChangeMoney() {
      return changeMoney.regFenToYuan(this.responseData.enableTotalMoney)
    },
  },
  beforeDestroy() {
    if (timer) clearInterval(timer)
  },
  mounted() {
    // 获取协议
    this.getProtocol('protocol100008')

    // 如果没有cusOrderId，batchIds 回退
    if (this.$route.query.cusOrderId) {
      this.formData.cusOrderId = this.$route.query.cusOrderId
      this.formData.batchIds = this.$route.query.batchIds
      this.getPayParamsFormData.cusOrderId = this.$route.query.cusOrderId
      this.enablePayMoney()
    } else {
      this.goBack()
    }
  },

  methods: {
    // 进入协议页面
    enterAgreement() {
      // console.log('this.agreementData', this.agreementData)

      this.$router.push({
        name: 'login-protocol',
        query: {
          categoryCode: 'protocol100008',
          hideHeader: false,
        },
      })
    },
    // 获取支付协议
    async getProtocol(categoryCode) {
      if (!categoryCode) {
        this.$xToast.warn('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        this.loading = true
        const data = await auth.protocol(params)
        console.log('data:', data)
        // this.agreementData = data.rows || {}
        const { rows = [] } = data || {}
        this.agreementData = rows[0] || {}

        this.loading = false
        return rows[0] || {}
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },
    // 回退
    goBack() {
      this.$router.go(-1)
    },
    // 支付倒计时
    countDown(endTimeStamp) {
      const that = this
      const nowTimeStamp = new Date().getTime()
      // 计算时间差 秒
      this.diff = (endTimeStamp - nowTimeStamp) / 1000
      let hour = 0
      let min = 0
      let sec = 0
      if (this.diff < 0) {
        that.time = {
          hour: '0' + hour,
          min: '0' + min,
          sec: '0' + sec,
        }
      } else {
        timer = setInterval(() => {
          hour = Math.floor(this.diff / 3600)
          min = Math.floor((this.diff - hour * 3600) / 60)
          sec = Math.floor(this.diff % 60)
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
      }

      // 每执行一次定时器就减少一秒
    },
    switchPayType(item) {
      this.payName = item.name
      this.getPayParamsFormData.payPlatform = item.code
    },
    startPay() {
      // this.$router.replace('/pay/payResult')
      this.getPayParams()
    },
    // 查询订单应付金额
    enablePayMoney() {
      this.loading = true
      pay
        .enablePayMoney(this.formData)
        .then((result) => {
          // console.log('result的值', result)
          this.loading = false
          this.responseData = result
          this.countDown(this.responseData.countDownTimeLong) // 倒计时
        })
        .catch((e) => {
          if (e.code !== 200) {
            this.loading = false
            console.log(e)
          }
        })
    },
    // 客户单付款
    getPayParams() {
      if (!this.radio) {
        this.$xToast.show({
          message: '请先阅读薯片平台订单协议',
          duration: 1000,
          forbidClick: true,
        })
      } else {
        this.getPayParamsFormData.orderAgreementIds = this.agreementData.id
        pay
          .getPayParams(this.getPayParamsFormData)
          .then((result) => {
            this.responseData = result
            console.log(this.responseData.payParam)
            if (this.responseData.code === '0') {
              const payUrl = this.responseData.payParam
              window.location.href = payUrl
            } else {
            }
          })
          .catch((e) => {
            if (e.code !== 200) {
              console.log(e)
            }
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.pay-page {
  background: #f4f4f4;
  min-height: 100vh;
  .sp-checkbox {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  .tit {
    font-size: 28px;
    font-weight: 400;
    color: #222222;
    > span {
      color: #4974f5;
    }
  }
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
