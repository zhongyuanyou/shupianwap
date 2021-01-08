<template>
  <div class="seal-sealServe">
    <div class="seal-sealServe-title">专业刻章服务</div>
    <div
      v-for="(item, index) of contentBgs"
      :key="index"
      class="seal-sealServe-content"
      :style="{ backgroundImage: item.backgroundImage }"
    >
      <div class="seal-sealServe-content-left">{{ item.left }}</div>
      <div class="seal-sealServe-content-right">{{ item.right }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SealServe',
  data() {
    return {
      contentBgs: [
        {
          backgroundImage:
            'url(https://cdn.shupian.cn/sp-pt/wap/images/7nfr1ieut4g0000.png)',
          left: '快速',
          right: '快至两小时取章',
        },
        {
          backgroundImage:
            'url(https://cdn.shupian.cn/sp-pt/wap/images/8izy6m80mdg0000.png)',
          left: '安全',
          right: '隐私加密保护',
        },
        {
          backgroundImage:
            'url(https://cdn.shupian.cn/sp-pt/wap/images/bzzwdqc4sm80000.png)',
          left: '方便',
          right: '全程代办，一次性刻四章',
        },
        {
          backgroundImage:
            'url(https://cdn.shupian.cn/sp-pt/wap/images/10cy3c979uio000.png)',
          left: '保障',
          right: '30天内免费更换，终身免费售后',
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.seal-sealServe {
  margin: 0 40px -36px;
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 31px;
  }
  &-content {
    width: 670px;
    height: 64px;
    background: #f4f4f4;
    border-radius: 8px;
    background-position: center center;
    background-size: 100% 100%;
    margin-bottom: 24px;
    display: flex;
    font-size: 28px;
    align-items: center;
    &-left {
      font-weight: bold;
      color: #4974f5;
      margin-left: 73px;
    }
    &-right {
      font-weight: 400;
      color: #555555;
      margin-left: 68px;
    }
  }
}
</style>
