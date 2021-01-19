<template>
  <div class="loading-content" :style="{ backgroundColor: bgColor }">
    <sp-loading
      v-show="loading"
      size="0.24rem"
      color="#999999"
      text-size="0.24rem"
      >加载中...</sp-loading
    >
    <p v-show="noData" class="no-data">没有更多了</p>
  </div>
</template>

<script>
import { Loading } from '@chipspc/vant-dgg'
export default {
  name: 'Loading',
  components: {
    [Loading.name]: Loading,
  },
  props: {
    loading: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    noData: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    bgColor: {
      type: String,
      default: () => {
        return '#f4f4f4'
      },
    },
  },
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  line-height: 100px;
  .no-data {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #969799;
  }
}
</style>
