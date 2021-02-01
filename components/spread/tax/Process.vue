<template>
  <div class="process">
    <div class="process-title">服务流程</div>
    <img :src="img" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Process',
  data() {
    return {
      img: 'https://cdn.shupian.cn/sp-pt/wap/f0ud5mka9ag0000.jpg',
    }
  },
}
</script>

<style scoped lang="less">
.process {
  width: @spread-page-width;
  height: 255px;
  padding: 30px 0 0;
  &-title {
    margin: 0 0 15px 40px;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  img {
    width: @spread-page-width;
    height: 170px;
  }
}
</style>
