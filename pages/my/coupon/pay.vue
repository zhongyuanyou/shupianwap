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
        支付剩余时间：<span>{{ TimeInfo.hh }}</span> :
        <span>{{ TimeInfo.mm }}</span> : <span>{{ TimeInfo.ss }}</span>
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
import { secondToTime } from '@/utils/common'
export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    Header,
  },
  data() {
    return {
      timeer: null, // 定时器

      endTime: Date.now() + 2222222222,

      TimeInfo: {
        hh: '00',
        mm: '00',
        ss: '00',
      },
    }
  },
  mounted() {
    this.start()
  },
  destroyed() {
    clearInterval(this.timeer)
  },
  methods: {
    /**
     * info 00:00:00
     */
    setTime(info) {
      console.log(info)
      const timeArr = info.split(':')
      if (timeArr && timeArr.length === 3) {
        this.TimeInfo = {
          hh: timeArr[0],
          mm: timeArr[1],
          ss: timeArr[2],
        }
      } else {
        this.TimeInfo = {
          hh: '00',
          mm: '00',
          ss: '00',
        }
      }
    },
    start() {
      let second = 0
      this.timeer = setInterval(() => {
        second = parseInt((this.endTime - Date.now()) / 1000)
        if (second > 0) {
          const time = secondToTime(second)

          this.setTime(time)
        } else {
          this.end()
        }
      }, 1000)
    },
    end() {
      this.setTime('00:00:00')
      clearInterval(this.timeer)
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
