<template>
  <div class="apply">
    <Header title="提交成功" />
    <div class="apply-box">
      <sp-icon
        class-prefix="spiconfont"
        size="0.96rem"
        color="#00B365"
        name="popup_img_success"
      />
      <p>售后单申请成功</p>
      <div class="countdown">
        预计<span class="num">47</span><span class="time-unit">时</span
        ><span class="num">59</span
        ><span class="time-unit">分钟</span
        >内为您处理请您保持手机畅通，耐心等待！
      </div>
      <div class="btns">
        <button
          @click="$router.replace(`/my/afterSale/detail?id=${$route.query.id}`)"
        >
          查看售后
        </button>
        <button @click="$router.replace('/order')">返回订单</button>
      </div>
      <div class="desc">
        <p>
          <sp-icon
            class-prefix="spiconfont"
            size="0.32rem"
            color="#ccc"
            name="toast_ic_remind"
          ></sp-icon
          ><span @click="afterSaleProtocol('protocol100040')">售后说明</span>
        </p>
        <div class="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    SpIcon: Icon,
  },
  data() {
    return {
      // 倒计时
      hour: '47',
      min: '59',
      cancelPayTime: '2021-6-9 10:30',
    }
  },
  created() {
    // this.countTime()
  },
  methods: {
    // 倒计时
    countTime() {
      // 获取当前时间
      const date = new Date()
      const now = date.getTime()
      // 设置截止时间
      const endDate = new Date(this.cancelPayTime) // this.curStartTime需要倒计时的日期
      const end = endDate.getTime()
      // 时间差
      const leftTime = end - now
      // 定义变量 d,h,m,s保存倒计时的时间
      if (leftTime >= 0) {
        // 天
        // this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        // 时
        const h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        this.hour = h < 10 ? '0' + h : h
        // 分
        const m = Math.floor((leftTime / 1000 / 60) % 60)
        this.min = m < 10 ? '0' + m : m
        // 秒
        const s = Math.floor((leftTime / 1000) % 60)
        this.second = s < 10 ? '0' + s : s
      } else {
        // this.day = 0
        this.hour = '00'
        this.min = '00'
        this.second = '00'
      }
      // 等于0的时候不调用
      if (
        Number(this.hour) === 0 &&
        // Number(this.day) === 0 &&
        Number(this.min) === 0 &&
        Number(this.second) === 0
      ) {
        return false
      } else {
        // 递归每秒调用countTime方法，显示动态时间效果,
        setTimeout(this.countTime, 1000)
      }
    },
    // 售后说明
    afterSaleProtocol(code) {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode: code },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.apply {
  padding: 0 40px;
  padding-top: 76px;
  min-height: 100vh;
  background: #f5f5f5;
  .apply-box {
    text-align: center;
    p {
      font-size: 40px;
      margin-top: 24px;
      font-family: PingFangSC-Medium;
      color: #000000;
      font-weight: bold;
    }
    .countdown {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #555555;
      line-height: 60px;
      margin-top: 22px;
      span {
        color: #ff3b30;
        margin: 0 6px;
      }
      .num {
        padding: 10px 12px;
        border: 1px solid #ff3b30;
        border-radius: 4px;
      }
    }
    .btns {
      display: flex;
      justify-content: center;
      margin-top: 46px;
      button {
        width: 160px;
        height: 64px;
        border-radius: 8px;
        font-size: 26px;
        margin-right: 20px;
        &:first-child {
          border: 1px solid #dddddd;
          color: #555555;
        }
        &:last-child {
          border: 1px solid #4974f5;
          color: #4974f5;
        }
      }
    }
    .desc {
      margin-top: 128px;
      text-align: left;
      p {
        span {
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #222222;
          font-weight: bold;
          margin-left: 8px;
        }
      }
      .content {
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #999999;
        line-height: 36px;
        margin-top: 20px;
      }
    }
  }
}
</style>
