<template>
  <div class="container">
    <div class="left-content">
      <div class="end-time">
        <p>距离结束<sp-count-down :time="time" /></p>
      </div>
    </div>
    <div class="right-content">
      <div class="right-top">
        <span>特卖</span>
        <span>千万补贴</span>
        公司干净，成都某某国际融资租赁有限公司
      </div>
      <div class="right-middle">
        <span>免手续</span>
        <span>1对1服务</span>
        <span>店铺干净</span>
      </div>
      <div class="right-bottom clearfloat">
        <div class="right-bottom-left clearfloat">
          <div class="now-price"><span>98.95</span><span>元</span></div>
          <span class="before-price">原价998元</span>
        </div>
        <div class="right-bottom-right">
          <p>去抢购</p>
          <p>已成交335单</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CountDown } from '@chipspc/vant-dgg'
export default {
  name: 'SpecialCard',
  components: {
    [CountDown.name]: CountDown,
  },
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
      peopelImg:
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg',
    }
  },
}
</script>

<style lang="less" scoped>
.clearfloat:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
.container {
  position: relative;
  left: 0;
  top: 0;
  min-height: 292px;
  margin: 0 20px 40px;
  border-bottom: 1px solid rgba(244, 244, 244, 1);
}
.container::after {
  display: table;
  content: '';
  width: 0;
  height: 0;
  clear: both;
}
.left-content {
  width: 260px;
  height: 260px;
  background: linear-gradient(180deg, #46494d 0%, #797d83 0%, #414347 100%);
  border-radius: 12px;
  position: relative;
  float: left;
  background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3117941574,298505346&fm=26&gp=0.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  .end-time {
    width: 206px;
    height: 40px;
    background: #ec5330;
    border-radius: 12px 0px 98px 0px;
    p {
      height: 22px;
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 22px;
      float: left;
    }
  }

  ::v-deep.sp-count-down {
    height: 22px;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 22px;
    float: right;
  }
}
.right-content {
  float: right;
  .right-top {
    width: 418px;
    height: 84px;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 42px;
    span:nth-of-type(1) {
      width: 56px;
      height: 32px;
      background: #ec5330;
      border-radius: 4px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
    }
    span:nth-of-type(2) {
      width: 96px;
      height: 32px;
      background: #ec5330;
      border-radius: 4px;
      height: 20px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
    }
  }
  .right-middle {
    margin-top: 12px;
    height: 20px;
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #5c7499;
    line-height: 20px;
  }
  .right-bottom {
    .now-price {
      // width: 104px;
      height: 40px;
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ec5330;
      line-height: 40px;
      span:nth-of-type(1) {
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ec5330;
        line-height: 40px;
      }
      span:nth-of-type(2) {
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ec5330;
        line-height: 22px;
      }
    }
    .before-price {
      width: 106px;
      height: 22px;
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 22px;
      margin-top: 8px;
    }
    .right-bottom-left {
      line-height: 0;
      padding-top: 61px;
    }
    .right-bottom-right {
      position: absolute;
      right: 0;
      bottom: 32px;
      width: 176px;
      height: 80px;
      background: linear-gradient(139deg, #fe525d 0%, #fd3543 100%);
      border-radius: 8px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 30px;
      padding-top: 12px;
      p {
        text-align: center;
      }
      p:last-child {
        margin-top: 4px;
        height: 22px;
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
      }
    }
  }
}
</style>
