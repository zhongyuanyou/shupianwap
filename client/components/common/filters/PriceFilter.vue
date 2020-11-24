<template>
  <div class="price-filter">
    <p>价格区间(万)</p>
    <div class="input-box">
      <sp-field
        v-model="minPrice"
        class="number-field"
        placeholder="最小"
        type="number"
        maxlength="9"
        input-align="center"
        :formatter="formatter"
        @input="minInput"
      />
      <span>至</span>
      <sp-field
        v-model="maxPrice"
        class="number-field"
        placeholder="最大"
        type="number"
        input-align="center"
        maxlength="9"
        :formatter="formatter"
        @input="maxInput"
      />
    </div>
    <SelectCheckBox
      ref="selectCheckBox"
      :select-list="priceList"
      :gutter="12"
      :is-select-more="false"
      @cancelItem="cancelItem"
      @selectItems="selectItems"
      @selectAllItems="selectAllItems"
    />
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import SelectCheckBox from './SelectCheckBox'
export default {
  name: 'PriceFilter',
  components: {
    [Field.name]: Field,
    SelectCheckBox,
  },
  props: {
    priceList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      minPrice: '', // 最小价格
      maxPrice: '', // 最大价格
    }
  },
  methods: {
    clearInput() {
      // 对外函数
      // 清空输入框和筛选项
      this.minPrice = ''
      this.maxPrice = ''
      this.$refs.selectCheckBox.clearSelect()
    },
    minInput(val) {
      this.$emit('minInput', val)
    },
    maxInput(val) {
      this.$emit('maxInput', val)
    },
    formatter(value) {
      // 格式化价格，只允许输入整数
      return value ? parseInt(value) : ''
    },
    cancelItem(item, items) {
      console.log(item, items)
      this.$emit('cancelItem', item, items)
    },
    selectItems(item, items) {
      console.log(item, items)
      this.$emit('selectItems', item, items)
    },
    selectAllItems(item) {
      console.log(item)
      this.$emit('selectAllItems', item)
    },
  },
}
</script>

<style lang="less" scoped>
.price-filter {
  > p {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 40px;
    margin-bottom: 40px;
  }
  .input-box {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    > span {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
    }
    .sp-cell::after {
      display: none;
    }
    .number-field {
      border-bottom: 3px solid rgba(240, 240, 240, 1);
      padding: 26px 0;
      /deep/input {
        font-size: 38px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        &::-webkit-input-placeholder {
          font-size: 38px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ccc;
        }
      }
    }
  }
}
</style>
