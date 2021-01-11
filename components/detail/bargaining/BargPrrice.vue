<template>
  <div class="bargFrom">
    <sp-field v-model="price" type="number" placeholder="意向价格(元)" />
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
export default {
  name: 'BargPrrice',
  components: {
    [Field.name]: Field,
  },
  data() {
    return {
      price: null,
    }
  },
}
</script>

<style scoped lang="less">
.bargFrom {
  margin-top: 62px;
  margin-bottom: 70px;
}

/deep/.sp-cell {
  padding: 25px 0px;
  margin-top: 32px;
  /deep/input {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #cccccc;
    height: 38px;
    line-height: 38px;
    &::-webkit-input-placeholder {
      color: #ccc;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #ccc;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #ccc;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #ccc;
    }
  }
  /deep/&::after {
    left: 0px;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  /deep/.sp-field__value {
    height: 45px;
  }
  /deep/&:last-child {
    /deep/&::after {
      display: initial;
    }
  }
}
</style>
