<!--
 * @Author: xiao pu
 * @Date: 2020-12-02 11:43:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 15:02:53
 * @Description: file content
 * @FilePath: /chips-wap/components/login/ProtocolField.vue
-->

<template>
  <div class="protocol-field">
    <sp-field name="readed" class="protocol-field__content">
      <template #input>
        <sp-checkbox v-model="readed" shape="round" @change="handleChange">
          <template #icon="{ checked }">
            <sp-icon
              class-prefix="spiconfont"
              size="0.28rem"
              :name="checked ? 'login_ic_radio_s' : 'login_ic_radio_n'"
              :color="checked ? '#4974F5' : '#CCCCCC'"
            />
          </template>
        </sp-checkbox>
      </template>
      <template #extra>
        <span class="protocol">
          {{ descript }}
          《<a
            class="text-decor--underline"
            @click="handleProtocol('protocol100122')"
            >薯片用户服务协议</a
          >》和 《<a
            class="text-decor--underline"
            @click="handleProtocol('protocol100121')"
            >薯片隐私协议</a
          >》</span
        >
      </template>
    </sp-field>
  </div>
</template>

<script>
import { Field, Checkbox, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'ProtocolField',
  components: {
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    [Icon.name]: Icon,
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
    handleProtocol(categoryCode) {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode },
      })
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
  /deep/.sp-cell__value {
    flex: 30px 0 0;
    .sp-field__control--custom {
      min-height: auto;
      .sp-checkbox__icon {
        font-size: 30px;
      }
    }
  }
  .protocol {
    flex: 1;
    padding-left: 16px;
    font-size: 26px;
    font-weight: 400;
    color: @subtitle-text-color;
    line-height: 34px;
  }
  .text-decor--underline {
    text-decoration: underline;
  }
}
</style>
