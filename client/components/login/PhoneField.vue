<!--
 * @Author: xiao pu
 * @Date: 2020-12-02 14:23:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-04 13:28:55
 * @Description: file content
 * @FilePath: /chips-wap/client/components/login/PhoneField.vue
-->

<template>
  <sp-field
    key="tel"
    clearable
    type="tel"
    name="telephone"
    placeholder="请输入手机号"
    class="phone-field"
    maxlength="13"
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
    }
  },
  computed: {
    tel: {
      get() {
        const formatValue = ('' + this.value)
          .replace(/\s/g, '')
          .replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
            let result = p1
            result += p2 ? ' ' + p2 : ''
            result += p3 ? ' ' + p3 : ''
            return result
          })
        console.log('formatValue:', formatValue, formatValue.length)
        return formatValue
      },
      set(newVal) {
        this.$emit('update', newVal)
      },
    },
  },

  methods: {
    handleTelInput(value) {
      value = value.replace(/\s/g, '')
      this.isValidTel = checkPhone(value)
      this.tel = value
      this.$emit('input', { value, valid: this.isValidTel })
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
      this.codeBtnText = `${this.duration}s后`
      this.timer = setInterval(() => {
        if (this.duration <= 0) {
          this.closeInterval()
          return
        }

        this.duration--
        this.codeBtnText = `${this.duration}s后`
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
  .code-btn {
    border: none;
    font-weight: 400;
    color: #999999;
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
/deep/.sp-cell {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0;
  &::after {
    content: ' ';
    left: 0;
    right: 0;
  }
  .sp-field__control {
    line-height: 36px;
    font-size: 32px;
    font-weight: 400;
  }
  .sp-field__clear {
    width: 24px;
    height: 24px;
    line-height: 24px;
    box-sizing: content-box;
    color: @hint-text-color;
    font-family: 'iconfont' !important;
    font-size: 0.16rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    &::before {
      content: '\e65b'; // 此处直接找的login_ic_clear:before iconfont css 替换的
      width: 24px;
      height: 24px;
    }
  }
}
</style>
