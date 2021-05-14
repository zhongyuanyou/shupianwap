<template>
  <div v-show="!payHtml" class="pay-page">
    <Header title="选择支付方式" />
    <div class="banner">
      <p class="total-money">{{ responseData.currentPayMoney || '' }}元</p>
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
            >《{{ protocoTitle }}》</span
          >
        </p>
      </template>
    </Checkbox>
    <div class="page-bottom">
      <sp-button size="large" @click="startPay">
        <span class="btn-item"> {{ payName || '支付宝支付' }}：</span>
        <span class="btn-item money">
          {{ responseData.currentPayMoney || '' }}
        </span>
        <span class="btn-item"> 元</span>
      </sp-button>
    </div>
    <!-- <div ref="payForm" class="form" v-html="payHtml"></div> -->
    <sp-dialog
      v-model="showMydialog"
      :show-cancel-button="true"
      :show-confirm-button="true"
      confirm-button-text="好的"
      concel-button-text="取消"
      title="温馨提示"
      @confirm="confirmAggret"
      @cancle="cancelAggret"
    >
      <p class="xy-p">本页面暂不支持在线支付，请下载薯片找人APP进行支付！</p>
    </sp-dialog>
    <!-- S 下载app弹框 -->
    <DownloadApp
      v-if="!closeAppOpen"
      @handleDialogClosed="handleDialogClosed"
    />
    <Iframe
      v-show="payHtml"
      id="mainIframe"
      style="width: 375px; height: 700px"
      :src="payPageUrl"
    ></Iframe>
    <div v-show="loading || resultLoading" class="loading-area">
      <sp-loading size="24px">{{
        resultLoading ? '正在查询支付结果' : '加载中'
      }}</sp-loading>
    </div>
    <!-- E 下载app弹框 -->
  </div>
</template>

<script>
import {
  Button,
  RadioGroup,
  Radio,
  Cell,
  Checkbox,
  Dialog,
  Loading,
} from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import DownloadApp from '@/components/common/app/DownloadApp'
import { pay, auth } from '@/api'
// 支付倒计时定时器
let timer
// 支付结果回调定时器
let payResultTimer
export default {
  components: {
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [Dialog.Component.name]: Dialog.Component,
    [Loading.name]: Loading,
    Header,
    Checkbox,
    DownloadApp,
  },
  data() {
    return {
      payPageUrl: 'https://cdn.shupian.cn/sp-pt/wap/files/ai0o4k85p340000.html',
      closeAppOpen: true,
      showMydialog: false,
      protocoTitle: '', // 协议标题
      number: 0,
      resultLoading: false,
      loadingText: '正在查询支付结果',
      payCallBackData: {
        cusOrderId: 0,
        serialNumber: 0, // dgg流水号
      }, // 回调请求数据
      loading: false, // 加载状态
      agreementData: {}, // 协议数据
      responseData: {},
      radio: '',
      formData: {
        payCusId: '',
        batchIds: [],
      },
      // 请求数据
      getPayParamsFormData: {
        cusOrderId: '',
        payPlatform: 'CRISPS_C_ZFFS_ALI_4_0',
        payTerminal: 'COMDIC_TERMINAL_WAP', // 支付终端 当前为wap
        sourcePlatform: 'COMDIC_PLATFORM_CRISPS', // 操作系统来源
        // userId: this.$cookies.get('userId', { path: '/' }), // 用户ID
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
        // {
        //   code: 'CRISPS_C_ZFFS_WECHAT',
        //   name: '微信支付',
        //   icon: 'pay_ic_wechat',
        //   color: 'rgba(41, 175, 18, 1)',
        // },
        // {
        //   code: 'CRISPS_C_ZFFS_CARD',
        //   name: '银行卡支付',
        //   icon: 'pay_ic_bank',
        //   color: 'rgba(255, 133, 60, 1)',
        // },
      ],
      payPlatform: 'CRISPS_C_ZFFS_ALI_4_0',
      payName: '支付宝支付',
      payHtml: '',
    }
  },
  computed: {},
  beforeDestroy() {
    if (timer) clearInterval(timer)
    if (payResultTimer) clearInterval(payResultTimer)
  },
  mounted() {
    // 获取协议
    this.getProtocol('protocol100008')
    // 如果没有cusOrderId，batchIds 回退
    if (this.$route.query.cusOrderId) {
      this.formData.cusOrderId = this.$route.query.cusOrderId
      this.formData.batchIds = this.$route.query.batchIds
      this.getPayParamsFormData.cusOrderId = this.$route.query.cusOrderId
      this.payCallBackData.cusOrderId = this.$route.query.cusOrderId // cusOrderId获取
      this.enablePayMoney()
    } else {
      this.goBack()
    }
    const startTime = localStorage.getItem('startTime')
    // // 暂时隐藏付款功能
    // if (
    //   localStorage.getItem('cusOrderId') &&
    //   localStorage.getItem('serialNumber')
    // ) {
    //   if (startTime) {
    //     const nowTime = this.getNowTime()
    //     console.log('startTime', startTime)
    //     console.log('nowTime', nowTime)
    //     console.log('diff', nowTime - startTime)
    //     if (nowTime - startTime < 3 * 60 * 1000) {
    //       this.resultLoading = true
    //       payResultTimer = setInterval(() => {
    //         this.number++
    //         this.getPayResult()
    //       }, 2000)
    //     } else {
    //       this.clearLocalStorage()
    //       // this.$router.replace({
    //       //   path: '/pay/payResult',
    //       //   query: {
    //       //     payStatus: 2,
    //       //     orderId: this.$route.query.orderId,
    //       //     cusOrderId: this.formData.cusOrderId,
    //       //     batchIds: this.$route.query.batchIds,
    //       //   },
    //       // })
    //     }
    //   }
    // }
  },

  methods: {
    changeForm(e) {
      console.log('e', e)
    },
    confirmAggret() {
      this.showMydialog = false
      this.closeAppOpen = false
    },
    cancelAggret() {
      this.showMydialog = false
    },
    // 获取当前时间戳
    getNowTime() {
      return new Date().getTime()
    },
    // 进入协议页面
    enterAgreement() {
      this.$router.push({
        name: 'login-protocol',
        query: {
          categoryCode: 'protocol100008',
          hideHeader: false,
        },
      })
    },
    handleDialogClosed() {
      this.closeAppOpen = true
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
        console.log('data++++', data)
        if (data.rows.length > 0) {
          this.protocoTitle = data.rows[0].title
        }
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
      // this.showMydialog = true
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
          const countDownTimeLong = this.responseData.countDownTimeLong
          this.countDown(countDownTimeLong) // 倒计时
          localStorage.setItem('cusOrderId', this.$route.query.cusOrderId)
        })
        .catch((e) => {
          if (e.code !== 200) {
            this.loading = false
            this.$xToast.error(e.message || '请求失败')
            console.log(e)
          }
        })
    },
    // 获取回调信息
    getPayResult() {
      this.payCallBackData.cusOrderId = localStorage.getItem('cusOrderId')
      this.payCallBackData.serialNumber = localStorage.getItem('serialNumber')
      pay
        .getPayResult(this.payCallBackData)
        .then((result) => {
          if (result.data === 1) {
            this.resultLoading = false
            this.$router.replace({
              path: '/pay/payResult',
              query: {
                payStatus: 1,
                orderId: this.$route.query.orderId,
                cusOrderId: this.formData.cusOrderId,
                batchIds: this.$route.query.batchIds,
                payMoney: this.responseData.currentPayMoney,
              },
            })
            clearInterval(payResultTimer)
          } else if (this.number > 5) {
            this.resultLoading = false
            clearInterval(payResultTimer)
            this.clearLocalStorage()
            this.$router.replace({
              path: '/pay/payResult',
              query: {
                payStatus: 2,
                orderId: this.$route.query.orderId,
                cusOrderId: this.formData.cusOrderId,
                batchIds: this.$route.query.batchIds,
                payMoney: this.responseData.currentPayMoney,
              },
            })
          }
        })
        .catch((e) => {
          if (e.code !== 200) {
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
            if (result.formData) {
              console.log('result.formData', result.formData)
              localStorage.setItem('startTime', new Date().getTime())
              this.payCallBackData.serialNumber = result.billNo
              localStorage.setItem('serialNumber', result.billNo)
              this.payHtml = result.formData
              document
                .getElementById('mainIframe')
                .contentWindow.postMessage(this.payHtml, '*')
            }
          })
          .catch((e) => {
            if (e.code !== 200) {
              console.log(e)
              this.$xToast.error(e.data.error || '支付发起失败，请稍后重试。')
            }
          })
      }
    },
    // 清空localStorage
    clearLocalStorage() {
      localStorage.removeItem('cusOrderId')
      localStorage.removeItem('serialNumber')
      localStorage.removeItem('startTime')
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
        width: auto;
        height: 40px;
        padding: 0 4px;
        background: #f8f8f8;
        border: 1px solid #cccccc;
        border-radius: 4px;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  .type-list {
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
        font-weight: bold;
      }
    }
  }
}
.xy-p {
  font-size: 28px;
  font-weight: 400;
  color: #222222;
  line-height: 38px;
  padding: 20px 40px;
  span {
    color: #4f90f6;
  }
}
.loading-area {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /deep/ .sp-loading {
    padding: 2px 16px;
    border-radius: 16px;
    color: #999;
  }
}
</style>
