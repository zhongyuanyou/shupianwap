<!--
 * @Author: xiao pu
 * @Date: 2020-11-28 11:00:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-28 14:23:19
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/Bottombar.vue
-->
<!--
 * @Author: xiao pu
 * @Date: 2020-11-26 14:45:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-28 10:07:24
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/GoodsItem.vue
-->
<template>
  <div class="bottombar">
    <div class="bottombar__left">
      <sp-checkbox
        v-model="checked"
        icon-size="0.32rem"
        class="bottombar__check"
        @change="handleChange"
        >全选</sp-checkbox
      >
    </div>
    <div v-if="status === 'completed'" class="bottombar__middle">
      <div class="bottombar__price flex-r-s flex-r-a-b">
        <span class="bottombar__price-label">合计:</span>
        <span class="bottombar__price-number">200.5</span>
        <span class="bottombar__price-unit">元</span>
      </div>
      <div class="bottombar__discounts flex-r-s flex-r-a-b">
        <span class="bottombar__discounts-label">优惠减</span>
        <span class="bottombar__discounts-number">400.5</span>
        <span class="bottombar__discounts-unit">元</span>
      </div>
    </div>
    <div class="bottombar__right">
      <sp-button v-if="status === 'completed'" class="comfirm-btn"
        >去结算<span>(2)</span></sp-button
      >
      <sp-button
        v-if="status === 'edit'"
        plain
        hairline
        type="primary"
        class="remove-btn"
        >移入关注</sp-button
      >
      <sp-button
        v-if="status === 'edit'"
        plain
        hairline
        type="danger"
        class="detele-btn"
        >删除</sp-button
      >
    </div>
  </div>
</template>

<script>
import { Button, Checkbox } from '@chipspc/vant-dgg'

export default {
  name: 'Bottombar',
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
  },
  props: {
    status: {
      type: String,
      default: 'completed',
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value)
    },
  },
}
</script>

<style lang="less" scoped>
.flex-r-s {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.flex-r-a-b {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.bottombar {
  width: 100%;
  height: 100%;
  padding: 24px 40px 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__left {
  }
  &__middle {
    flex: 1;
    margin-left: 20px;
  }
  &__right {
    line-height: 1.2em;
    font-size: 0;
    button {
      margin-right: 24px;
      &:last-child {
        margin-right: 0;
      }
    }
    .comfirm-btn {
      width: 191px;
      height: 80px;
      background: #ec5330;
      border-radius: 8px;
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
      line-height: 32px;
    }
    .remove-btn {
      width: 184px;
      height: 80px;
      background: #ffffff;
      // border: 1px solid #4974f5;
      border-radius: 8px;
      color: #4974f5;
    }
    .detele-btn {
      width: 184px;
      height: 80px;
      background: #ffffff;
      // border: 1px solid #f1524e;
      border-radius: 8px;
      color: #f1524e;
    }
  }
  &__check {
    /deep/.sp-checkbox__label {
      font-size: 24px;
      font-weight: 400;
      color: #222222;
      line-height: 30px;
    }
  }
  &__price {
    color: #222222;
    &-label {
      font-size: 32px;
      font-weight: 400;
      line-height: 36px;
    }
    &-number {
      font-size: 36px;
      font-weight: bold;
      color: #ec5330;
      line-height: 40px;
    }
    &-unit {
      font-size: 24px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 28px;
    }
  }
  &__discounts {
    color: #999999;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    &-label {
    }
    &-number {
      font-size: 24px;
      font-weight: bold;
      color: #ec5330;
      line-height: 40px;
    }
    &-unit {
    }
  }
}
</style>
