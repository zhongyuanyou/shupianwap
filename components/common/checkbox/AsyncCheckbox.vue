<!--
 * @Author: xiao pu
 * @Date: 2020-12-12 15:34:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-18 14:49:57
 * @Description: file content
 * @FilePath: /chips-wap/components/common/checkbox/AsyncCheckbox.vue
-->

<template>
  <sp-checkbox
    class="async-checkbox"
    :value="checkedVal"
    :disabled="disabled"
    v-bind="$attrs"
    @change="handleChange"
    @click="handleClick"
  >
    <template #default>
      <slot name="default"> </slot>
    </template>
    <template #icon="{ checked }">
      <slot name="icon" :checked="checked">
        <sp-icon
          class-prefix="spiconfont"
          size="0.32rem"
          class="async-checkbox__icon"
          :name="checked ? 'login_ic_radio_s' : 'login_ic_radio_n'"
        />
      </slot>
    </template>
  </sp-checkbox>
</template>

<script>
import { Checkbox, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'AsyncCheckbox',
  components: {
    [Checkbox.name]: Checkbox,
    [Icon.name]: Icon,
  },
  model: {
    prop: 'isCheck',
    event: 'update',
  },
  props: {
    asyncChange: {
      type: Boolean,
      default: true,
    },
    isCheck: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkedVal: false,
    }
  },
  computed: {},
  watch: {
    isCheck: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if (newVal === oldVal) return
        this.checkedVal = newVal
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value)
    },

    handleClick(event) {
      if (this.disabled) return
      const lastValue = this.checkedVal
      if (!this.asyncChange) {
        this.checkedVal = !lastValue
        this.$emit('update', !lastValue)
      }
      this.$emit('change', !lastValue)
    },
  },
}
</script>

<style lang="less" scoped>
.async-checkbox {
  /deep/.sp-checkbox__icon--disabled {
    .async-checkbox__icon {
      background-color: rgba(204, 204, 204, 0.32);
      color: #c8c9cc !important;
    }
  }
  /deep/.sp-checkbox__icon--checked {
    .async-checkbox__icon {
      color: #4974f5;
    }
  }
  &__icon {
    color: #cccccc;
    background-color: #ffffff;
    border-radius: 100%;
    overflow: hidden;
  }
}
</style>
