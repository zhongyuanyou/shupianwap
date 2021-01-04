<template>
  <div class="install-app">
    <p>保存搜索条件，重建找到心仪服务</p>
    <div class="install-app-btn" @click="openApp($event)">
      <span>安装APP</span>
    </div>
  </div>
</template>

<script>
import openapp from '~/mixins/openapp'
export default {
  name: 'InstallApp',
  mixins: [openapp],
  data() {
    return {
      thisType: 'installapp',
    }
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
.install-app {
  display: flex;
  height: 88px;
  align-items: center;
  background: #f4f4f4;
  > p {
    flex: auto;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    margin-left: 40px;
  }
  .install-app-btn {
    width: 155px;
    height: 56px;
    border: 1px solid #4974f5;
    border-radius: 4px;
    text-align: center;
    line-height: 56px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #4974f5;
    margin-right: 47px;
    a {
      color: #4974f5;
      font-weight: bold;
    }
  }
}
</style>
