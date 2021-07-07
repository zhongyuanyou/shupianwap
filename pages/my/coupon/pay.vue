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
      <sp-radio-group v-model="radio">
        <sp-cell-group>
          <sp-cell
            v-for="item of typeList"
            :key="item.code"
            size="large"
            title="支付宝"
            clickable
            @click="radio = item.code"
          >
            <template #icon>
              <my-icon
                class="myicon"
                :name="item.icon"
                size="0.48rem"
                :color="item.color"
              ></my-icon>
            </template>

            <template #right-icon>
              <sp-radio :name="item.code" />
            </template>
          </sp-cell>
        </sp-cell-group>
      </sp-radio-group>
    </main>
    <sp-bottombar ref="FooterNav" safe-area-inset-bottom class="submit_btns">
      <sp-bottombar-button type="primary" text="" @click="submit">
        <span class="text">立即购买：</span>
        <span class="price">4200.55</span>
        <span class="unit">元</span>
      </sp-bottombar-button>
    </sp-bottombar>
  </div>
</template>
<script>
import {
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'

import Header from '@/components/common/head/header.vue'
import { secondToTime } from '@/utils/common'
export default {
  layout: 'keepAlive',
  name: 'Pay',
  components: {
    Header,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,

    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
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
        // {
        //   code: 'CRISPS_C_ZFFS_CARD',
        //   name: '银行卡支付',
        //   icon: 'pay_ic_bank',
        //   color: 'rgba(255, 133, 60, 1)',
        // },
      ],

      radio: '',
    }
  },
  mounted() {
    this.start()
  },
  destroyed() {
    clearInterval(this.timeer)
  },
  methods: {
    submit() {},
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
  border-radius: 24px 24px 0px 0px;
  margin-top: -24px;
  padding-top: 24px;
  overflow: hidden;
  .myicon {
    margin-right: 30px;
  }
  ::v-deep .sp-cell {
    padding: 36px 40px;
  }
}
</style>
