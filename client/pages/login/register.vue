<!--
 * @Author: xiao pu
 * @Date: 2020-11-23 17:22:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-02 19:41:38
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/login/register.vue
-->
<template>
  <div class="register">
    <div class="head">
      <sp-top-nav-bar ellipsis title="注册账号" @on-click-left="onClickLeft">
        <template #left>
          <my-icon name="login_ic_clear" size="0.4rem" color="#1A1A1A" />
        </template>
      </sp-top-nav-bar>
    </div>
    <div class="body">
      <sp-form validate-first class="register-form" @submit="onSubmit">
        <PhoneField
          key="tel"
          v-model="registerForm.tel"
          @input="handleTelInput"
        />
        <sp-field
          v-model="registerForm.authCode"
          type="number"
          name="authCode"
          clearable
          placeholder="请输入验证码"
          @input="handleAuthCodeInput"
        />
        <sp-field
          v-model="registerForm.password"
          :type="passwordFieldType"
          class="end-btn-cell"
          name="password"
          clearable
          placeholder="请输入新密码(6-15位数字/字母/标点符号)"
          @input="handlePasswordInput"
        >
          <template #button>
            <sp-button
              class="see-password-btn"
              native-type="button"
              @click="handleSwitchLookPassword"
            >
              <my-icon
                v-if="passwordFieldType === 'password'"
                name="login_ic_dislook"
                size="0.24rem"
                color="#CCCCCC"
              />
              <my-icon
                v-if="passwordFieldType === 'text'"
                name="login_ic_look"
                size="0.24rem"
                color="#CCCCCC"
              />
            </sp-button>
          </template>
        </sp-field>

        <ProtocolField
          v-model="registerForm.readed"
          class="protocol-field"
          descript="为保障您的个人隐私权益，请点击同意按钮前认真阅读下方协议："
          @change="handleProtocolChange"
        />
        <div class="submit-wrap">
          <sp-button
            block
            type="info"
            class="submit-wrap__btn"
            native-type="submit"
            :disabled="!isValidSubmit"
          >
            注册
          </sp-button>
        </div>
      </sp-form>
    </div>
    <div class="footer">
      <div>
        <sp-button
          class="switch-btn"
          native-type="button"
          @click="handleClick('telLogin')"
        >
          手机快捷登录
        </sp-button>
        <i class="vertical-line"></i>
        <sp-button
          class="switch-btn"
          native-type="button"
          @click="handleClick('forget')"
        >
          忘记密码
        </sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { TopNavBar, Form, Button, Field, Checkbox } from '@chipspc/vant-dgg'
import PhoneField from '@/components/login/PhoneField'
import ProtocolField from '@/components/login/ProtocolField'

import { checkPhone, checkAuthCode, checkPassword } from '@/utils/check.js'

export default {
  name: 'Register',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    PhoneField,
    ProtocolField,
  },
  data() {
    return {
      registerForm: {
        tel: '',
        authCode: '',
        password: '',
        readed: false,
      },
      passwordFieldType: 'password', // text
      isValidSubmit: false,
    }
  },
  methods: {
    onClickLeft() {
      console.log('close')
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    handleTelInput(valueObj = {}) {
      console.log('handleTelInput:', valueObj)
      const { value, valid } = valueObj
      this.registerForm.tel = value
      // !valid && this.loginToast('手机号码有误')
      this.checkFormData()
    },
    handleAuthCodeInput(value) {
      this.registerForm.authCode = value
      this.checkFormData()
    },
    handlePasswordInput(value) {
      this.registerForm.password = value
      this.checkFormData()
    },
    handleProtocolChange(value) {
      console.log('handleProtocolChange:', value)
    },
    handleSwitchLookPassword() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    handleClick(type) {
      switch (type) {
        case 'telLogin':
          this.$router.push({ name: 'login' })
          break
        case 'forget':
          this.$router.push({ name: 'login-forget' })
          break
      }
    },
    // 数据验证
    checkFormData(excludeItem) {
      const { tel, authCode, password } = this.registerForm
      const isValid = Object.keys(this.registerForm).every((key) => {
        if (key === excludeItem) return true
        switch (key) {
          case 'tel':
            return checkPhone(tel)
          case 'authCode':
            return checkAuthCode(authCode)
          case 'password':
            // 至少6-15个字符，至少1个大写字母，1个小写字母和1个数字
            return checkPassword(password)
        }
      })
      this.isValidSubmit = isValid
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.register {
  .head {
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .body {
    padding: 58px 60px 0;
    .title {
      font-size: 48px;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 52px;
      color: @title-text-color;
    }
    .subtitle {
      font-size: 26px;
      font-weight: 400;
      color: @subtitle-text-color;
      line-height: 30px;
      margin-top: 28px;
    }
    .register-form {
      margin-top: 48px;
      .code-btn {
        border: none;
        font-weight: 400;
        color: #999999;
        .sp-button__text {
          font-size: 32px;
        }
      }
      .see-password-btn {
        border: none;
      }
      /deep/.sp-cell {
        display: flex;
        align-items: center;
        height: 100px;
        padding: 0;
        &::after {
          left: 0;
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
          // background-color: transparent;
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
      .submit-wrap {
        margin-top: 68px;
        /deep/.sp-button--disabled {
          opacity: 0.4;
        }
        &__btn {
          width: 630px;
          height: 96px;
          background: #4974f5;
          border-radius: 12px;
          font-weight: bold;
          color: #ffffff;
          /deep/.sp-button__text {
            font-size: 32px;
          }
        }
      }
      .protocol-field {
        padding: 68px 0 0;
        height: auto;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
    & > div {
      font-size: 12px;
    }
    .switch-btn {
      border: none;
      height: 25px;
      font-weight: 400;
      color: @subtitle-text-color;
      /deep/.sp-button__text {
        font-size: 26px;
        line-height: 1em;
      }
    }
    .vertical-line {
      display: inline-block;
      width: 1px;
      height: 27px;
      background-color: #f4f4f4;
      vertical-align: middle;
    }
  }
}
</style>
