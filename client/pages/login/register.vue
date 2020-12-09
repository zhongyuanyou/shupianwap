<!--
 * @Author: xiao pu
 * @Date: 2020-11-23 17:22:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 13:44:41
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
    <div ref="body" class="body">
      <sp-form validate-first class="register-form" @submit="onSubmit">
        <PhoneField
          key="tel"
          v-model="registerForm.tel"
          sms-code-type="register"
          @input="handleTelInput"
          @clicked="handleClickCodeBtn"
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
            :class="{ 'submit-wrap__btn--disabled': !isValidSubmit }"
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
import {
  TopNavBar,
  Form,
  Button,
  Field,
  Checkbox,
  Toast,
} from '@chipspc/vant-dgg'
import PhoneField from '@/components/login/PhoneField'
import ProtocolField from '@/components/login/ProtocolField'

import { auth } from '@/api'
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
    handleClickCodeBtn(isValidTel) {
      if (!isValidTel) {
        this.loginToast('手机号码有误')
        return
      }
      this.loginToast('验证码已发送')
    },
    onSubmit(values) {
      console.log('submit', values)
      const error = this.checkFormData()
      if (error) {
        const { message } = error
        this.loginToast(message)
        return
      }
      this.register()
    },
    handleTelInput(valueObj = {}) {
      console.log('handleTelInput:', valueObj)
      const { value, valid } = valueObj
      this.registerForm.tel = value
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
      this.registerForm.readed = value
      this.checkFormData()
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
    // TODO 注册
    async register() {
      const { tel, authCode, password } = this.registerForm
      const params = {
        phone: tel,
        password,
        smsCode: authCode,
        userType: 'ORDINARY_USER',
        client: 'COMDIC_TERMINAL_WAP',
        platformType: 'COMDIC_PLATFORM_CRISPS',
      }
      try {
        const data = await auth.register({ axios: this.$axios }, params)
      } catch (error) {
        this.loginToast(error && error.message)
      }
    },
    // 数据验证
    checkFormData(excludeItem) {
      const { tel, authCode, password, readed } = this.registerForm

      const keysList = Object.keys(this.registerForm) || []
      let errorObject = null
      for (const key of keysList) {
        switch (key) {
          case 'tel':
            !checkPhone(tel) && (errorObject = { key, message: '手机号码有误' })
            break
          case 'authCode':
            !checkAuthCode(authCode) &&
              (errorObject = { key, message: '验证码有误' })
            break
          case 'password':
            // 至少6-15个字符，至少1个大写字母，1个小写字母和1个数字
            // checkPassword(password) &&
            //   (errorObject = { key, message: '密码格式有误' })
            break
          case 'readed':
            !readed && (errorObject = { key, message: '请勾选同意协议' })
            break
        }
        // 发现一处验证不通过，就调出for 循环
        if (errorObject) {
          break
        }
      }
      const isValid = !errorObject
      this.isValidSubmit = isValid
      return errorObject
    },

    // 自定义提示框
    loginToast(
      message = '',
      className = 'toast',
      icon = 'toast_ic_remind',
      duration = 1000
    ) {
      Toast({
        duration,
        className,
        message,
        icon, // 图标有点烦人
        iconPrefix: 'spiconfont',
        getContainer: () => {
          return this.$refs.body
        },
      })
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
        &__btn--disabled {
          opacity: 0.4;
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
  // 提示框样式
  /deep/.toast {
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    font-size: 32px;
    line-height: 36px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    min-width: 390px;
    max-width: 440px;
    min-height: 92px;
    max-height: 130px;
    box-sizing: border-box;
    .sp-toast__icon {
      font-size: 40px;
    }
    .sp-toast__text {
      margin: 0 0 0 18px;
    }
  }
}
</style>
