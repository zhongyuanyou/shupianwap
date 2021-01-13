<!--
 * @Author: xiao pu
 * @Date: 2020-11-30 19:13:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-13 14:42:04
 * @Description: file content
 * @FilePath: /chips-wap/components/common/sku/SkuServiceStepper.vue
-->

<template>
  <div class="sku-service-stepper">
    <span class="sku-service-stepper__title">购买数量</span>
    <sp-stepper
      v-model="currentNum"
      integer
      step="1"
      class="sku-service-stepper__main"
      button-size="0.64rem"
      :min="stepperMinLimit"
      :max="stepperLimit"
      :disable-input="disableStepperInput"
      :disabled="disabled"
      @overlimit="onOverLimit"
      @change="onChange"
    >
      <template #minus-icon="{ disabled: iconDisabled }">
        <sp-icon
          class-prefix="spiconfont"
          name="shop_ic_reduce"
          size="0.28rem"
          :color="iconDisabled ? '#cccccc' : '#1a1a1a'"
        />
      </template>
      <template #plus-icon="{ disabled: iconDisabled }">
        <sp-icon
          class-prefix="spiconfont"
          name="shop_ic_add"
          size="0.28rem"
          :color="iconDisabled ? '#cccccc' : '#1a1a1a'"
        />
      </template>
    </sp-stepper>
  </div>
</template>

<script>
import { Stepper, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'SkuServiceStepper',
  components: {
    [Stepper.name]: Stepper,
    [Icon.name]: Icon,
  },

  props: {
    selectedNum: {
      type: Number,
      default: 1,
    },
    disableStepperInput: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxNum: {
      type: Number,
      default: 99,
    },
    minNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentNum: this.selectedNum,
    }
  },
  computed: {
    stepperMinLimit() {
      return this.minNum || 1
    },
    stepperLimit() {
      return this.maxNum || 99
    },
  },
  watch: {
    selectedNum(newVal, oldVal) {
      if (newVal === oldVal) return
      this.currentNum = newVal
    },
  },
  created() {
    this.checkState(this.stepperMinLimit, this.stepperLimit)
  },
  methods: {
    setCurrentNum(num) {
      this.currentNum = num
      this.checkState(this.stepperMinLimit, this.stepperLimit)
    },

    onOverLimit(action) {
      console.log(action)
      const message = action === 'minus' ? '超过过最小购买数量' : ''
      this.$emit('overLimit', { type: action, message })
    },

    onChange(currentValue) {
      const intValue = parseInt(currentValue, 10)
      if (isNaN(intValue)) return
      this.$emit('change', intValue)
    },

    checkState(min, max) {
      // 如果选择小于起售，则强制变为起售
      if (this.currentNum < min || min > max) {
        this.currentNum = min
      } else if (this.currentNum > max) {
        // 当前选择数量大于最大可选时，需要重置已选数量
        this.currentNum = max
      }
    },
  },
}
</script>

<style lang="less" scoped>
.sku-service-stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    line-height: 46px;
  }
  &__main {
    /deep/.sp-stepper__input {
      font-size: 30px;
      font-weight: bold;
      color: #222222;
      line-height: 34px;
      background: #f4f4f4;
    }
  }
}
</style>
