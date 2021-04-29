<template>
  <div class="bargFrom">
    <sp-field
      v-model="price"
      maxlength="9"
      type="number"
      placeholder="意向价格(元)"
    />
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

::v-deep.sp-cell {
  padding: 25px 0px;
  margin-top: 32px;
  ::v-deep&::after {
    left: 0px;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  ::v-deep.sp-field__value {
    height: 45px;
  }
  ::v-deep&:last-child {
    ::v-deep&::after {
      display: initial;
    }
  }
}
</style>
