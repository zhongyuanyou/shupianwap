<template>
  <sp-action-sheet v-model="show" title=" ">
    <div class="priceRed">
      <h1 class="priceRed-title">降价提醒</h1>
      <p class="priceRed-desc">
        产品价格变动时，将第一时间提醒您，不再错过降价
      </p>
      <div class="priceRed-content"></div>
      <div class="priceRed-remind">
        <h4>
          <sp-radio-group v-model="radio">
            <sp-radio name="1" />
          </sp-radio-group>
          允许我们将致电为您详细分析
        </h4>
        <p>规划师通过虚拟号码联系您，隐私安全不打扰</p>
      </div>
      <div class="remind-btn">
        <sp-button type="primary" block>确定</sp-button>
      </div>
    </div>
  </sp-action-sheet>
</template>

<script>
import { ActionSheet, Button, RadioGroup, Radio } from '@chipspc/vant-dgg'
export default {
  name: 'PriceReduction',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio: '1',
    }
  },
}
</script>

<style scoped lang="less">
/deep/.sp-popup--bottom.sp-popup--round {
  border-radius: 24px 24px 0px 0px;
}
.priceRed {
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
  &-remind {
    width: 100%;
    padding: 31px 24px 29px 24px;
    background: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 71px;
    margin-top: 32px;
    h4 {
      height: 26px;
      line-height: 30px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      margin-bottom: 15px;
      display: flex;
      & > div {
        margin-right: 16px;
      }
    }
    p {
      height: 27px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 38px;
    }
  }
}
</style>
