<template>
  <div class="cousulttel">
    <div class="cousulttel-title">
      {{ title }}
    </div>
    <div class="cousulttel-content">
      <div class="cousulttel-content-left">
        <my-icon
          name="notify_ic_tel"
          color="#4974F5"
          size="0.36rem"
          class="icon"
        ></my-icon>
        <span class="cousulttel-content-left-text">服务热线:</span>
        <span class="cousulttel-content-left-number">{{ tel }}</span>
      </div>
      <button
        v-md-map
        v-md:webClick
        class="cousulttel-content-button"
        data-name="对代理记账还有疑问_立即咨询"
      >
        立即咨询
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultTel',
  props: {
    title: {
      type: String,
      required: true,
      default: () => {
        return '对于代理记账还有疑问？企服专家为您免费解答'
      },
    },
    tel: {
      type: String,
      required: true,
      default: () => {
        return '4000-962540'
      },
    },
  },
}
</script>

<style scoped lang="less">
.cousulttel {
  padding: 0 40px 32px;
  &-title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 39px 0 31px 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  &-content {
    width: 670px;
    height: 80px;
    border: 2px solid #4974f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
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
