<template>
  <div class="loading-content" @touchmove="noEvent($event)">
    <div class="mantle">
      <sp-loading size="0.39rem" color="#ffffff" text-size="0.32rem">{{
        title
      }}</sp-loading>
    </div>
  </div>
</template>

<script>
import { Loading } from '@chipspc/vant-dgg'
export default {
  name: 'LoadingCenter',
  components: {
    [Loading.name]: Loading,
  },
  props: {
    title: {
      type: String,
      default: '加载中',
    },
  },
  methods: {
    noEvent(e) {
      e.preventDefault()
    },
  },
}
</script>
<style lang="less" scoped>
.loading-content {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .mantle {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 92px;
    background: #000000;
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.3);
    opacity: 0.9;
    border-radius: 8px;
    /deep/ .sp-loading__text {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
