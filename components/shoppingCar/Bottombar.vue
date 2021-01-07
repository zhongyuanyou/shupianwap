<!--
 * @Author: xiao pu
 * @Date: 2020-11-28 11:00:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-07 16:24:57
 * @Description: file content
 * @FilePath: /chips-wap/components/shoppingCar/Bottombar.vue
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
      <AsyncCheckbox
        v-model="checked"
        icon-size="0.32rem"
        class="bottombar__check"
        @change="handleAsyncCheckboxChange"
        >全选</AsyncCheckbox
      >
    </div>
    <div v-if="status === 'completed'" class="bottombar__middle">
      <div
        v-if="bottomData.totalAmount"
        class="bottombar__price flex-r-s flex-r-a-b"
      >
        <span class="bottombar__price-label">合计:</span>
        <span class="bottombar__price-number">{{
          bottomData.totalAmount
        }}</span>
        <span class="bottombar__price-unit">元</span>
      </div>
      <!-- 一期没有 -->
      <!-- <div class="bottombar__discounts flex-r-s flex-r-a-b">
        <span class="bottombar__discounts-label">优惠减</span>
        <span class="bottombar__discounts-number">{{
          bottomData.discountsAmount
        }}</span>
        <span class="bottombar__discounts-unit">元</span>
      </div> -->
    </div>
    <div class="bottombar__right">
      <sp-button
        v-if="status === 'completed'"
        class="comfirm-btn"
        @click="handleOperation({ type: 'bill' })"
        >去结算<span>({{ bottomData.totalCount }})</span></sp-button
      >
      <!-- 一期没有 -->
      <!-- <sp-button
        v-if="status === 'edit'"
        plain
        hairline
        type="primary"
        class="remove-btn"
        @click="handleOperation({ type: 'attentionAll' })"
        >移入关注</sp-button
      > -->
      <sp-button
        v-if="status === 'edit'"
        plain
        hairline
        type="danger"
        class="detele-btn"
        @click="handleOperation({ type: 'deteleAll' })"
        >删除</sp-button
      >
    </div>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import AsyncCheckbox from '@/components/common/checkbox/AsyncCheckbox'

export default {
  name: 'Bottombar',
  components: {
    [Button.name]: Button,
    AsyncCheckbox,
  },
  props: {
    status: {
      type: String,
      default: 'completed',
    },
    bottomData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    checked() {
      return !!this.bottomData.selectAll
    },
  },
  methods: {
    handleAsyncCheckboxChange(value) {
      console.log('handleChange:', value)
      this.handleOperation({ type: 'selectAll', data: { value } })
    },
    handleOperation(value = {}) {
      const { type, data } = value
      switch (type) {
        case 'bill':
        case 'selectAll':
        case 'attentionAll':
        case 'deteleAll':
          this.$emit('operation', { data, type })
      }
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
      min-width: 191px;
      height: 80px;
      background: #ec5330;
      border-radius: 8px;
      border: none;
      font-size: 28px;
      font-weight: bold;
      color: #ffffff;
      line-height: 32px;
    }
    .remove-btn {
      width: 184px;
      height: 80px;
      background: #ffffff;
      border-radius: 8px;
      color: #4974f5;
    }
    .detele-btn {
      width: 184px;
      height: 80px;
      background: #ffffff;
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
