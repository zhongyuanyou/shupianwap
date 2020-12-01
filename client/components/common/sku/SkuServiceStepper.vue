<!--
 * @Author: xiao pu
 * @Date: 2020-11-30 19:13:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-01 15:55:47
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/sku/SkuServiceStepper.vue
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
      @overlimit="onOverLimit"
      @change="onChange"
    />
  </div>
</template>

<script>
import { Stepper } from '@chipspc/vant-dgg'

const LIMIT_TYPE = {
  QUOTA_LIMIT: 0,
  STOCK_LIMIT: 1,
}

const { QUOTA_LIMIT, STOCK_LIMIT } = LIMIT_TYPE

export default {
  name: 'SkuServiceStepper',
  components: {
    [Stepper.name]: Stepper,
  },

  props: {
    sku: {
      type: Object,
      default: () => ({}),
    },
    skuEventBus: {
      type: Object,
      default: () => ({}),
    },
    selectedSkuComb: {
      type: Object,
      default: () => ({}),
    },
    selectedNum: {
      type: Number,
      default: 1,
    },
    disableStepperInput: {
      type: Boolean,
      default: false,
    },
    quota: {
      type: Number,
      default: 0,
    },
    quotaUsed: {
      type: Number,
      default: 0,
    },
    startSaleNum: {
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
    limitType() {
      // 购买限制类型: 限购/库存
      let type = STOCK_LIMIT
      const quotaLimit = this.quota - this.quotaUsed
      if (this.quota > 0 && quotaLimit <= this.stock) {
        type = QUOTA_LIMIT
      }
      return type
    },
    stepperLimit() {
      const quotaLimit = this.quota - this.quotaUsed
      let limit

      // 无限购时直接取库存，有限购时取限购数和库存数中小的那个
      if (this.quota > 0 && quotaLimit <= this.stock) {
        // 修正负的limit
        limit = quotaLimit < 0 ? 0 : quotaLimit
      } else {
        limit = this.stock
      }

      return limit
    },
    stepperMinLimit() {
      return this.startSaleNum < 1 ? 1 : this.startSaleNum
    },

    stock() {
      if (this.selectedSkuComb) {
        return this.selectedSkuComb.stock_num
      }
      return this.sku.stock_num
    },
  },
  watch: {
    currentNum(num) {
      const intValue = parseInt(num, 10)
      if (intValue >= this.stepperMinLimit && intValue <= this.stepperLimit) {
        this.skuEventBus.$emit('sku:numChange', intValue)
      }
    },

    stepperLimit(limit) {
      if (limit < this.currentNum && this.stepperMinLimit <= limit) {
        this.currentNum = limit
      }
      this.checkState(this.stepperMinLimit, limit)
    },

    stepperMinLimit(start) {
      if (start > this.currentNum || start > this.stepperLimit) {
        this.currentNum = start
      }
      this.checkState(start, this.stepperLimit)
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
      this.skuEventBus.$emit('sku:overLimit', {
        action,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum,
      })
    },

    onChange(currentValue) {
      const intValue = parseInt(currentValue, 10)
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

      this.skuEventBus.$emit('sku:stepperState', {
        valid: min <= max,
        min,
        max,
        limitType: this.limitType,
        quota: this.quota,
        quotaUsed: this.quotaUsed,
        startSaleNum: this.startSaleNum,
      })
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
    }
  }
}
</style>
