<template>
  <div class="address-list">
    <sp-radio-group v-model="result">
      <sp-cell-group class="address-list__cell-group">
        <sp-cell
          v-for="(item, index) in list"
          :key="index"
          clickable
          class="address-list__cell-group-item"
          @click="toggle(index)"
        >
          <div class="address-list__item">
            <div class="address-list__item-name">{{ item.name }}</div>
            <div class="address-list__item-field">
              <span v-for="field of item.fieldList" :key="field.fieldCode">{{
                `${field.fieldName}:${field.fieldValueCn}`
              }}</span>
            </div>
            <div class="address-list__item-price">
              销售价：<span v-text="item.goodsPrice"></span>
            </div>
          </div>
          <template #right-icon>
            <sp-radio ref="checkboxes" :name="item">
              <template #icon="{ checked }">
                <sp-icon
                  class-prefix="spiconfont"
                  size="0.30rem"
                  :name="checked ? 'login_ic_radio_s' : 'login_ic_radio_n'"
                  :color="checked ? '#4974F5' : '#CCCCCC'"
                />
              </template>
            </sp-radio>
          </template>
        </sp-cell>
      </sp-cell-group>
    </sp-radio-group>
  </div>
</template>
<script>
import { RadioGroup, Radio, Cell, CellGroup, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'AddressList',
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      result: null,
    }
  },
  watch: {
    result(newVal) {
      console.log('newVal:', newVal)
      this.$emit('operation', {
        type: 'selected',
        data: this.result,
      })
    },
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onSubmit() {
      //  提交选择信息
      console.log(this.result)
      this.$emit('operation', {
        type: 'confirm',
        data: this.result,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.address-list {
  &__cell-group {
    &::after {
      content: none;
    }
    &-item {
      padding: 30px 40px;
    }
  }
  &__item {
    &-name {
      color: #1a1a1a;
      font-size: 30px;
      line-height: 38px;
      .textOverflow(2);
    }
    &-field {
      color: #222222;
      font-size: 22px;
      line-height: 44px;
      span:not(:last-child):after {
        content: ' | ';
      }
    }
    &-price {
      color: #ec5330;
      font-size: 26px;
      line-height: 44px;
    }
  }
}
</style>
