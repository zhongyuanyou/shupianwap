<template>
  <div class="banner" :class="'banner' + cusOrderStatusType">
    <my-icon
      class="back-icon"
      name="nav_ic_back"
      size="0.4rem"
      color="#ffffff"
      @click.native="onLeftClick"
    ></my-icon>
    <p class="title">
      <my-icon
        name="details_ic_Unpaid"
        size="0.40rem"
        color="rgba(255, 255, 255, 1)"
      ></my-icon>
      <span v-if="cusOrderStatusType == 1" class="text"> 等待付款 </span>
      <span v-else-if="cusOrderStatusType == 2" class="text"> 办理中 </span>
      <span v-else-if="cusOrderStatusType == 3" class="text"> 已完成 </span>
      <span v-else-if="cusOrderStatusType == 4" class="text"> 已取消 </span>
    </p>
    <div v-if="cusOrderStatusType == 1" class="msg">
      请在24小时内支付，超时订单将自动关闭<br />
      <p class="time">
        <span>{{ time.hour }}</span>
        时<span>{{ time.min }}</span
        >分<span>{{ time.sec }}</span
        >秒后自动关闭
      </p>
    </div>
    <p v-else-if="cusOrderStatusType == 2" class="msg">
      您的订单正在办理中<br />
      <span> 请耐心等待</span>
    </p>
    <p v-else-if="cusOrderStatusType == 3" class="msg">
      您的订单已完成<br />
      <span> 请对本次服务进行评价，谢谢您的支持 </span>
    </p>
    <p v-else-if="cusOrderStatusType == 4" class="msg">
      您的订单已取消<br />
      <span> 取消原因:{{ cusOrderCancelReason }} </span>
    </p>
  </div>
</template>

<script>
import orderUtils from '@/utils/order'
let timer
export default {
  props: {
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
  },
  data() {
    return {
      time: {}, // 倒计时数据
      diff: 0, // 时间差 s
    }
  },
  mounted() {
    if (this.cusOrderStatusType === 1) {
      const that = this
      this.countDown(new Date().getTime() + 67890000)
    }
  },
  beforeDestroy() {
    clearInterval(timer)
  },
  methods: {
    onLeftClick() {
      this.$router.go(-1)
    },
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
    // 判断客户单状态
    checkCusOrderStatus() {
      return orderUtils.checkCusOrderStatus(this.orderStatusCode)
    },
  },
}
</script>

<style lang="less" scoped>
// 待支付背景
.banner1 {
  background: linear-gradient(
    90deg,
    rgba(254, 140, 41, 0.7),
    rgba(254, 140, 41, 1)
  );
}
// 办理中背景
.banner2 {
  background: linear-gradient(
    90deg,
    rgba(59, 105, 245, 0.7),
    rgba(59, 105, 245, 1)
  );
}
// 已完成背景
.banner3 {
  background: linear-gradient(
    90deg,
    rgba(0, 179, 101, 0.7),
    rgba(0, 179, 101, 1)
  );
}
// 已取消背景
.banner4 {
  background: linear-gradient(
    90deg,
    rgba(103, 107, 111, 0.7),
    rgba(103, 107, 111, 1)
  );
}
.banner {
  height: 250px;
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
    padding: 50px 0 40px 0;
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
