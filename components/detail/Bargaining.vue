<template>
  <sp-action-sheet v-model="show" title=" ">
    <div class="bargaining">
      <h1 class="bargaining-title">73.9%的卖家会接受议价哦</h1>
      <p class="bargaining-desc">
        规划师将立即与卖家联系，稍后会回复您反馈结果
      </p>
      <div class="bargaining-content">
        <component :is="token ? 'BargPrrice' : 'BargainingFrom'"></component>
      </div>
      <div class="remind-btn">
        <sp-button type="primary" block>确定</sp-button>
      </div>
    </div>
  </sp-action-sheet>
</template>

<script>
import { ActionSheet, Button, RadioGroup, Radio } from '@chipspc/vant-dgg'
import BargPrrice from '~/components/detail/bargaining/BargPrrice'
import BargainingFrom from '~/components/detail/bargaining/BargainingFrom'
export default {
  name: 'Bargaininguction',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    BargPrrice,
    BargainingFrom,
  },
  data() {
    return {
      show: false,
      radio: '1',
      componentName: 'BargPrrice',
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
  },
}
</script>

<style scoped lang="less">
/deep/.sp-popup--bottom.sp-popup--round {
  border-radius: 24px 24px 0px 0px;
}
.bargaining {
  padding: 64px 40px 40px 40px;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-desc {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    height: 34px;
    line-height: 34px;
    margin-top: 12px;
  }
}
</style>
