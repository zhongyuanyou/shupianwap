<template>
  <div class="commitment">
    <sp-cell title="交易服务保障承诺" is-link to="/spread/servicePromise">
      <template #title>
        <div class="commitment-content">
          <my-icon
            name="trading_ic_trading"
            color="#4974F5"
            size="0.48rem"
            class="icon"
          />
          <span class="custom-title">交易服务保障承诺</span>
        </div>
      </template>
    </sp-cell>
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
    padding: 0 40px;
    font-weight: 500;
    color: #1a1a1a;
    font-size: 28px;
    /deep/ .sp-cell__title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1a1a1a;
    }
  }
  /deep/ .sp-icon {
    height: 110px;
    line-height: 110px;
  }
  .custom-title {
    padding-left: 17px;
    display: inline-block;
  }
  &-content {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
