<template>
  <div class="container">
    <div class="header">
      <my-icon
        name="nav_ic_back"
        class="back_icon"
        color="#1A1A1A"
        size="0.38rem"
      ></my-icon>
      <div class="title">选择支付方式</div>
    </div>
    <div class="md_body">
      <div class="countdown_money">
        <div class="money">
          <div class="money_value">1400.99</div>
          <div class="money_unit">元</div>
        </div>
        <div class="countdown">
          <div class="leave">剩余支付时间：</div>
          <sp-count-down :time="time">
            <template #default="timeData">
              <span class="block">{{ '0' + timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ '0' + timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ '0' + timeData.seconds }}</span>
            </template>
          </sp-count-down>
        </div>
      </div>
    </div>
    <div class="pay_list">
      <div class="list_item">
        <div class="list_lf">
          <div class="pay_icon"></div>
          <div class="content">支付宝支付</div>
        </div>
        <div class="checkbox">
          <sp-checkbox v-model="zfb_checked" icon-size="16px"></sp-checkbox>
        </div>
      </div>
      <div class="list_item">
        <div class="list_lf">
          <div class="pay_icon"></div>
          <div class="content">微信支付</div>
        </div>
        <div class="checkbox">
          <sp-checkbox v-model="wechat_checked" icon-size="16px"></sp-checkbox>
        </div>
      </div>
      <div class="list_item">
        <div class="list_lf">
          <div class="pay_icon"></div>
          <div class="content">银行卡转账</div>
        </div>
        <div class="checkbox">
          <sp-checkbox v-model="checked" icon-size="16px"></sp-checkbox>
        </div>
      </div>
    </div>
    <div class="pay_bottom">
      <div class="pay_button">
        <div class="b_title">支付宝支付:</div>
        <div class="p_money">1400</div>
        <div class="p_unit">元</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
  .header {
    width: 100%;
    height: 88px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    // align-items: center;
    position: relative;

    .back_icon {
      position: absolute;
      top: 28px;
      left: 32px;
      width: 40px;
      height: 33px;
      //   line-height: 33px;
    }

    .title {
      display: flex;

      align-items: center;
      //   height: 34px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
  .md_body {
    width: 100%;
    height: 332px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    .countdown_money {
      height: 106px;
      .money {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 23px;
        .money_value {
          height: 43px;
          font-size: 56px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          line-height: 44px;
          text-align: center;
        }
        .money_unit {
          height: 25px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ec5330;
          line-height: 44px;
          margin-left: 4px;
          margin-bottom: 1px;
        }
      }
      .countdown {
        display: flex;
        justify-content: space-between;
        height: 40px;
        .leave {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 40px;
        }
        .colon {
          display: inline-block;
          height: 10px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 44px;
        }
        .block {
          height: 40px;
          width: 40px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 44px;
          display: inline-block;
          background: #f8f8f8;
          border: 1px solid #cccccc;
          border-radius: 4px;
          line-height: 0.4rem;
          text-align: center;
        }
      }
    }
  }
  .pay_list {
    height: 332px;
    width: 100%;
    padding: 0 40px;

    background: #ffffff;
    border: 1px solid #f4f4f4;
    div.list_item:nth-last-child(1) {
      border-bottom: none;
    }
    .list_item {
      height: 111px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f4f4f4;

      .list_lf {
        display: flex;
        align-items: center;
        .pay_icon {
          width: 48px;
          height: 48px;
          background: #1797ec;
          margin-right: 31px;
        }
        .content {
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
        }
      }
      .checkbox {
      }
    }
  }
  .pay_bottom {
    position: absolute;
    bottom: 0;
    width: 750px;
    height: 136px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    .pay_button {
      width: 670px;
      height: 88px;
      background: #ec5330;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      .b_title {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
      .p_money {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 44px;
        margin-left: 14px;
      }
      .p_unit {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 44px;
        margin-top: 9px;
        margin-left: 3px;
      }
    }
  }
}
</style>

<script>
import { CountDown, Sticky, Checkbox } from '@chipspc/vant-dgg'
export default {
  name: 'PayType',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      time: '',
      zfb_checked: true,
      wechat_checked: false,
      checked: false,
    }
  },
}
</script>
