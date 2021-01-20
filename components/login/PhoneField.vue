<!--
 * @Author: xiao pu
 * @Date: 2020-12-02 14:23:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 13:39:58
 * @Description: file content
 * @FilePath: /chips-wap/components/login/PhoneField.vue
-->

<template>
  <div class="phone-field">
    <sp-field
      key="tel"
      clearable
      type="tel"
      name="telephone"
      placeholder="请输入手机号"
      maxlength="13"
      icon-prefix="spiconfont"
      clear-icon="login_ic_clear"
      :value="tel"
      @input="handleTelInput"
    >
      <template v-if="type === 'codeBtn'" #button>
        <sp-button
          class="code-btn"
          native-type="button"
          :class="{ 'code-btn--disabled': !isValidTel }"
          @click="handleCodeBtnClick"
        >
          {{ codeBtnText }}
        </sp-button>
      </template>
    </sp-field>
  </div>
</template>

<script>
import { Field, Button } from '@chipspc/vant-dgg'

import { auth } from '@/api'
import { checkPhone } from '@/utils/check.js'

const DURATION = 60

export default {
  name: 'PhoneField',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
  },
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'codeBtn', //
    },
    smsCodeType: {
      type: String,
      default: 'login', // login：登录； register: 注册， reset: 重置
    },
    // duration: {
    //   type: Number,
    //   default: 60,
    // },
  },

  data() {
    return {
      isValidTel: false,
      codeBtnText: '获取验证码',
      duration: DURATION,
      timer: null,
      tel: '',
    }
  },
  computed: {},
  watch: {
    value: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.tel = this.formatTel(newVal)
      },
      immediate: true,
    },
  },

  methods: {
    handleTelInput(value) {
      this.tel = this.formatTel(value)
      this.$forceUpdate() // 不调用只能在失焦更新，会让测试不满意的
      value = this.tel.replace(/\s/g, '')
      this.isValidTel = checkPhone(value)
      this.$emit('update', value)
      this.$emit('input', { value, valid: this.isValidTel })
    },

    formatTel(value) {
      const valueStr = '' + value
      const regex = /^1/
      if (!regex.test(valueStr)) return '' // 检测电话号码的首位非就清空
      const formatValue = valueStr
        .replace(/\s|\D/g, '')
        .replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
          let result = p1
          result += p2 ? ' ' + p2 : ''
          result += p3 ? ' ' + p3 : ''
          return result
        })
      console.log('formatValue:', formatValue, formatValue.length)
      return formatValue
    },

    handleCodeBtnClick() {
      this.$emit('clicked', this.isValidTel)
      if (!this.isValidTel) {
        return
      }
      // 获取验证码
      this.startInterval() && this.sendSmsCode()
    },

    startInterval() {
      // 说明计时器没有结束
      if (this.codeBtnText !== '获取验证码') return false
      this.codeBtnText = `(${this.duration})重新获取`
      this.timer = setInterval(() => {
        if (this.duration <= 0) {
          this.closeInterval()
          return
        }

        this.duration--
        this.codeBtnText = `(${this.duration})重新获取`
      }, 1000)

      this.$once('hook:beforeDestroy', () => {
        this.closeInterval()
      })
      return true
    },

    closeInterval() {
      clearInterval(this.timer)
      this.timer = null
      this.codeBtnText = '获取验证码'
      this.duration = DURATION
    },

    async sendSmsCode() {
      if (!this.smsCodeType) return console.error('smsCode发送失败,缺少type!')
      const phone = this.tel.replace(/\s/g, '')
      const params = {
        phone,
        type: this.smsCodeType,
      }
      try {
        const data = await auth.smsCode({ axios: this.$axios }, params)
        return data
      } catch (error) {
        console.log('验证码发送失败：', error)
        this.$xToast.error((error && error.message) || '验证码发送失败')
        this.closeInterval()
      }
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.phone-field {
  position: relative;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .code-btn {
    border: none;
    font-weight: 400;
    color: #999999;
    white-space: nowrap;
    min-width: 220px;
    .sp-button__text {
      font-size: 32px;
    }
    &:active::before {
      opacity: 1;
      background-color: transparent;
    }
  }
  .code-btn--disabled {
    opacity: 0.4;
  }
}

/deep/.sp-field__clear {
  padding: 0 16px !important;
  margin-right: 0 !important;
  line-height: inherit;
  font-size: 24px;
}
</style>
