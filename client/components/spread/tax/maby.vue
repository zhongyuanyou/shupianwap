<template>
  <div class="maby">
    <div class="maby-title">这些业务您可能也需要</div>
    <div class="maby-banner">
      <div
        v-for="(item, i) of imgs"
        :key="i"
        class="maby-banner-item"
        :style="item.bg"
        @click="openImUrl"
      ></div>
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
      ],
      url: '',
    }
  },
  methods: {
    // 点击该模块判断是否进行跳转，如果不跳转就调用IM
    openImUrl() {
      if (this.url !== '') {
        window.open = this.url
      } else {
        this.$parent.openIm()
      }
    },
  },
}
</script>

<style scoped lang="less">
.maby {
  padding: 31px 40px 0;
  width: 750px;
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
    align-items: center;
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
        font-family: @Bebas;
        font-weight: 400;
        color: #4974f5;
      }
    }
    &-button {
      width: 200px;
      height: 80px;
      background: #4974f5;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      padding: 0;
      border-radius: 0px 8px 8px 0px;
      color: #ffffff;
      margin-right: -1px;
    }
  }
}
</style>
