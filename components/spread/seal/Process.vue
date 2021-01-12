<template>
  <div class="seal-process">
    <div class="seal-process-title">服务流程</div>
    <div class="seal-process-img"></div>
  </div>
</template>

<script>
export default {
  name: 'Process',
}
</script>

<style scoped lang="less">
.seal-process {
  margin: 23px 40px 31px;
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-img {
    height: 386px;
    width: 606px;
    margin: 31px 32px 64px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/17eb3m3ep9i8000.png');
    background-size: 100% 100%;
    background-position: center center;
  }
}
</style>
