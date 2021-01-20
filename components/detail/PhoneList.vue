<template>
  <div class="phone-list">
    <sp-radio-group v-model="result">
      <sp-cell-group class="phone-list__cell-group">
        <sp-cell
          v-for="(item, index) in list"
          :key="item.id"
          clickable
          class="phone-list__cell-group-item"
          :title="`${item.name}`"
          :label="`售价: ${item.goodsPrice}`"
          @click="toggle(index)"
        >
          <template #right-icon>
            <sp-radio ref="radioItem" :name="item">
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
import {
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Button,
  Icon,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
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
      // 存储选择的结果
      result: {},
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
      this.$refs.radioItem[index].toggle()
    },
  },
}
</script>
<style lang="less" scoped>
.phone-list {
  &__cell-group {
    &::after {
      content: none;
    }
    &-item {
      padding: 30px 40px;
    }
    /deep/.sp-cell__label {
      color: #ec5330 !important;
    }
  }
}
</style>
