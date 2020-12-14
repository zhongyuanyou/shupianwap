<!--
 * @Author: xiao pu
 * @Date: 2020-12-12 15:34:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-12 16:37:13
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/checkbox/AsyncCheckbox.vue
-->

<template>
  <sp-checkbox
    class="async-checkbox"
    :value="checked"
    v-bind="$attrs"
    v-on="$listeners"
    @change="handleChange"
    @click="handleClick"
  >
    <template #default>
      <slot name="default"> </slot>
    </template>
    <template #icon="{ checked }">
      <slot name="icon" :checked="checked"></slot>
    </template>
  </sp-checkbox>
</template>

<script>
import { Checkbox } from '@chipspc/vant-dgg'

export default {
  name: 'AsyncCheckbox',
  components: {
    [Checkbox.name]: Checkbox,
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
  },
  data() {
    return {
      checked: false,
    }
  },
  computed: {},
  watch: {
    isCheck: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if (newVal === oldVal) return
        this.checked = newVal
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value)
    },

    handleClick(event) {
      //   console.log('handleClick:', event)
      const lastValue = this.checked
      if (!this.asyncChange) {
        this.checked = !lastValue
        this.$emit('update', !lastValue)
      }
      this.$emit('change', !lastValue)
    },
  },
}
</script>

<style lang="less" scoped>
.async-checkbox {
}
</style>
