<!--
 * @Author: xiao pu
 * @Date: 2020-12-02 11:43:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-02 14:00:56
 * @Description: file content
 * @FilePath: /chips-wap/client/components/login/ProtocolField.vue
-->

<template>
  <div class="protocol-field">
    <sp-field name="readed" class="protocol-field__content">
      <template #input>
        <sp-checkbox v-model="readed" shape="round" @change="handleChange">
        </sp-checkbox>
      </template>
      <template #extra>
        <span class="protocol">
          {{ descript }}
          <a class="text-decor--underline">《薯片用户服务协议》</a>和
          <a class="text-decor--underline">《薯片隐私协议》</a></span
        >
      </template>
    </sp-field>
  </div>
</template>

<script>
import { Field, Checkbox } from '@chipspc/vant-dgg'

export default {
  name: 'ProtocolField',
  components: {
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
  },
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    descript: {
      type: String,
      default: '我已阅读并同意',
    },
  },

  data() {
    return {}
  },
  computed: {
    readed: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('update', newVal)
      },
    },
  },
  methods: {
    handleChange(value) {
      console.log('handleChange:', value)
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.protocol-field {
  &__content {
    display: flex;
    align-items: flex-start !important;
    height: auto !important;
  }
  &::after {
    display: none;
  }
  /deep/.sp-field__control--custom {
    min-height: auto;
  }
  .protocol {
    padding-left: 16px;
    font-size: 26px;
    font-weight: 400;
    color: @subtitle-text-color;
    line-height: 30px;
  }
  .text-decor--underline {
    text-decoration: underline;
  }
}
</style>
