<template>
  <div
    :id="showPayBtn ? 'banner1' : ''"
    :class="'banner' + cusOrderStatusType"
    class="banner"
  >
    <my-icon
      class="back-icon"
      name="nav_ic_back"
      size="0.4rem"
      color="#ffffff"
      @click.native="onLeftClick"
    ></my-icon>
    <p class="title">
      <my-icon
        v-if="cusOrderStatusType == 1"
        name="details_ic_Unpaid"
        size="0.40rem"
        color="rgba(255, 255, 255, 1)"
      ></my-icon>
      <my-icon
        v-if="cusOrderStatusType == 2"
        name="shijian"
        size="0.40rem"
        color="rgba(255, 255, 255, 1)"
      ></my-icon>
      <my-icon
        v-if="cusOrderStatusType == 3"
        name="wancheng"
        size="0.40rem"
        color="rgba(255, 255, 255, 1)"
      ></my-icon>
      <my-icon
        v-if="cusOrderStatusType === 4"
        name="tixing"
        size="0.40rem"
        color="rgba(255, 255, 255, 1)"
      ></my-icon>
      <span class="text">{{
        cusOrderStatusType === 1 || showPayBtn ? '等待付款' : statusName
      }}</span>
      <!-- <span v-if="cusOrderStatusType == 1" class="text"> 等待付款 </span>
      <span v-else-if="cusOrderStatusType == 2" class="text"> 办理中 </span>
      <span v-else-if="cusOrderStatusType == 3" class="text"> 已完成 </span>
      <span v-else-if="cusOrderStatusType == 4" class="text"> 已取消 </span> -->
    </p>
    <div v-if="cusOrderStatusType == 1 || showPayBtn" class="msg">
      <section v-if="diff > 0">
        <p class="time">
          请在
          <span>{{ time.hour }}</span>
          时<span>{{ time.min }}</span
          >分<span>{{ time.sec }}</span
          >秒内支付
        </p>
        超时订单将自动关闭<br />
      </section>
      <section v-else-if="orderData.payType==='ORDER_PAY_MODE_OFFLINE'">
        <p>请前往线下银行网点进行支付</p>
      </section>
      <section v-else>
        <p>暂无支付信息</p>
      </section>
    </div>
    <p v-else-if="cusOrderStatusType == 2" class="msg">
      <span v-if="statusName === '待确认'"
        >您的订单已办理完成，请您确认<br />超时未确认将会自动确认完成</span
      >
      <span v-else> 您的订单正在办理中<br />请耐心等待</span>
    </p>
    <p v-else-if="cusOrderStatusType == 3" class="msg">
      您的订单已完成<br />
      <span> 请对本次服务进行评价，谢谢您的支持 </span>
    </p>
    <p v-else-if="cusOrderStatusType == 4" class="msg">
      您的订单已取消<br />
      <span> 取消原因:{{ cusOrderCancelReason || '订单超时未支付' }} </span>
    </p>
  </div>
</template>

<script>
import OrderMixins from '@/mixins/order'
import payApi from '@/api/pay'
import orderApi from '@/api/order'
let timer
export default {
  props: {
    // 客户单id 查支付信息用
    cusOrderId: {
      type: String,
      default: '',
    },
    // 订单状态
    orderStatusCode: {
      type: String,
      default: '',
    },
    cusOrderStatusType: {
      type: [String, Number],
      default: '1',
    },
    // 订单取消原因
    cusOrderCancelReason: {
      type: String,
      default: '',
    },
    // 订单状态
    statusName: {
      type: String,
      default: '',
    },
    showPayBtn: {
      type: Number,
      default: 0,
    },
    orderData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      time: {}, // 倒计时数据
      diff: 0, // 时间差 s
    }
  },
  mounted() {
    if (this.cusOrderStatusType === 1 || this.showPayBtn) {
      const that = this
      if (this.orderData.cusOrderPayType === 'PRO_PRE_SERVICE_FINISHED_PAY') {
        this.getBatchList()
      }
      this.getEnablePayMoney()
    }
  },
  beforeDestroy() {
    if (timer) clearInterval(timer)
  },
  methods: {
    // 获取分批支付信息 订单列表页为点击付款之后进行的查询 详情页为页面加载时查询
    getBatchList() {
      this.loading = true
      orderApi
        .batchPayList(
          { axios: this.$axios },
          {
            page: 1,
            limit: 100,
            cusOrderId: this.cusOrderId || this.orderData.cusOrderId,
          }
        )
        .then((res) => {
          // 客户单的分批支付信息
          console.log('分批支付信息i查询', res)
          const idsArr = []
          res.forEach((element) => {
            if (element.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1') {
              idsArr.push(element.id)
            }
          })
          const batchIds = idsArr.join(',')
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '获取支付信息失败')
          console.error(err)
        })
    },
    onLeftClick() {
      this.$router.go(-1)
    },
    // 支付倒计时
    countDown(endTimeStamp) {
      endTimeStamp = Number(endTimeStamp)
      const that = this
      const nowTimeStamp = new Date().getTime()
      // 计算时间差 秒
      this.diff = (endTimeStamp - nowTimeStamp) / 1000
      if (this.diff < 0) {
        this.$emit('getDetail')
        clearInterval(timer)
      }
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
    // 查询订单应付金额
    getEnablePayMoney() {
      const postData = {
        cusOrderId: this.cusOrderId,
        // batchPayIds: this.batchIds, // 分批支付id集合
        payPlatform: 'COMDIC_PLATFORM_CRISPS', // 支付平台 c端默认值薯片
        // 薯片：COMDIC_PLATFORM_CRISPS
        // 企大顺：COMDIC_PLATFORM_QIDASHUN
        // 企大宝：COMDIC_PLATFORM_QIDABAO
        // 运营后台：COMDIC_PLATFORM_MANAGMENT
        payTerminal: 'COMDIC_TERMINAL_WAP',
      }
      payApi
        .enablePayMoney(postData)
        .then((res) => {
          this.countDown(res.countDownTimeLong || res.data.countDownTimeLong)
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
#banner1 {
  background: linear-gradient(90deg, #fcaa2d, rgba(254, 140, 41, 1));
}
// 待支付背景
.banner1 {
  background: linear-gradient(90deg, #fcaa2d, rgba(254, 140, 41, 1));
}
// 办理中背景
.banner2 {
  background: linear-gradient(90deg, #3b92f5, rgba(59, 105, 245, 1));
}
// 已完成背景
.banner3 {
  background: linear-gradient(90deg, #00cc74, rgba(0, 179, 101, 1));
}
// 已取消背景
.banner4 {
  background: linear-gradient(90deg, #6f7377, rgba(103, 107, 111, 1));
}
.banner {
  height: 260px;
  color: white;
  text-align: center;
  position: relative;
  .back-icon {
    position: absolute;
    left: 40px;
    top: 20px;
    color: white;
  }
  .title {
    height: auto;
    font-size: 40px;
    font-family: PingFang SC;
    color: #ffffff;
    padding: 50px 0 32px 0;
    .text {
      font-weight: bold;
    }
  }
  .msg {
    font-size: 28px;
    line-height: 36px;
    color: rgba(256, 256, 256, 0.8);
    span {
      font-size: 24px;
    }
  }
}
</style>
