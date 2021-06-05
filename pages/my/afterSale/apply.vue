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
        <button>查看订单</button>
        <button>返回订单</button>
      </div>
      <div class="desc">
        <p>
          <sp-icon
            class-prefix="spiconfont"
            size="0.32rem"
            color="#ccc"
            name="toast_ic_remind"
          ></sp-icon
          ><span>售后说明</span>
        </p>
        <div class="content">
          盼望着，盼望着，东风来了，春天的脚步近了。一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土地里钻出来你
        </div>
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
    return {}
  },
  methods: {},
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
