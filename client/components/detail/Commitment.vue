<template>
  <div class="commitment">
    <sp-cell title="交易服务保障承诺" is-link to="" />
  </div>
</template>

<script>
import { Cell } from '@chipspc/vant-dgg'
export default {
  name: 'Commitment',
  components: {
    [Cell.name]: Cell,
  },
}
</script>

<style lang="less" scoped>
.commitment {
  /deep/ .sp-cell {
    height: 110px;
    line-height: 110px;
    padding: 0 40px;
    /deep/ .sp-cell__title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1a1a1a;
    }
  }
  /deep/ .sp-icon {
    height: 110px;
  }
  /deep/ .sp-icon {
    line-height: 110px;
  }
}
</style>
