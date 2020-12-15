<template>
  <div class="maby">
    <div class="maby-title">这些业务您可能也需要</div>
    <div class="maby-banner">
      <div
        v-for="(index, i) of imgs"
        :key="i"
        class="maby-banner-item"
        :style="index.bg"
      ></div>
    </div>
    <div class="maby-bottom">对于代理记账还有疑问？企服专家为您免费解答</div>
    <div class="maby-last">
      <div class="maby-last-content">
        <my-icon
          name="notify_ic_tel"
          color="#4974F5"
          size="0.36rem"
          class="icon"
        ></my-icon>
        <span class="maby-last-content-text">服务热线:</span>
        <span class="maby-last-content-number">4000-535800</span>
      </div>
      <button class="maby-last-button">立即咨询</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maby',
  data() {
    return {
      imgs: [
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchad1.png') +
              ')',
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchad2.png'),
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchad3.png') +
              ')',
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchad4.png') +
              ')',
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchad5.png') +
              ')',
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchad6.png') +
              ')',
          },
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.maby {
  padding: 31px 40px;
  width: 750px;
  height: 735px;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
    line-height: 40px;
  }
  &-banner {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    &-item {
      width: 207px;
      height: 187px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      padding: 24px 0 0 24px;
      background-size: 100% 100%;
      margin-bottom: 24px;
    }
  }
  &-bottom {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 39px 0 31px 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  &-last {
    width: 670px;
    height: 80px;
    border: 2px solid #4974f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    &-content {
      margin-left: 26px;
      display: flex;
      align-items: center;
      &-text {
        font-size: 24px;
        line-height: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        margin: 0 14px;
      }
      &-number {
        font-size: 40px;
        line-height: 40px;
        font-family: Impact;
        font-weight: 400;
        color: #4974f5;
      }
    }
    &-button {
      width: 200px;
      height: 80px;
      background: #4974f5;
      border-radius: 0px 8px 8px 0px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      padding: 0;
    }
  }
}
</style>
