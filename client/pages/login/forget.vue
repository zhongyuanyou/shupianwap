<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 09:33:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-09 15:39:23
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/login/forget.vue
-->

<template>
  <div class="forget">
    <div class="head">
      <sp-top-nav-bar ellipsis title="找回密码" @on-click-left="onClickLeft">
        <template #left>
          <my-icon name="login_ic_clear" size="0.4rem" color="#1A1A1A" />
        </template>
      </sp-top-nav-bar>
    </div>
    <div ref="body" class="body">
      <sp-form validate-first class="form" @submit="onSubmit">
        <PhoneField
          key="tel"
          v-model="forgetForm.tel"
          sms-code-type="reset"
          @input="handleTelInput"
          @clicked="handleCodeBtnClick"
        />
        <sp-field
          v-model="forgetForm.authCode"
          type="number"
          clearable
          clear-trigger="always"
          name="authCode"
          placeholder="请输入验证码"
          max-length="6"
          @input="handleCodeInput"
        />
        <sp-field
          v-model="forgetForm.newPassword"
          type="password"
          clear-trigger="always"
          name="newPassword"
          clearable
          placeholder="请输入新密码(6-15位数字/字母/标点符号)"
          @input="handleNewPasswordInput"
        >
        </sp-field>
        <sp-field
          v-model="forgetForm.confirmPassword"
          type="password"
          clear-trigger="always"
          name="confirmPassword"
          clearable
          placeholder="确认新密码"
          @input="handleConfirmPasswordInput"
        >
        </sp-field>
        <div class="submit-wrap">
          <sp-button
            block
            type="info"
            class="submit-wrap__btn"
            native-type="submit"
            :class="{ 'submit-wrap__btn--disabled': !isValidSubmit }"
          >
            重置密码
          </sp-button>
        </div>
      </sp-form>
    </div>
    <div class="footer">
      <div>
        <sp-button class="switch-btn" @click="handleClick('telLogin')">
          手机快捷登录
        </sp-button>
        <i class="vertical-line"></i>
        <sp-button class="switch-btn" @click="handleClick('accountLogin')">
          账号快捷登录
        </sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { TopNavBar, Form, Button, Field, Toast } from '@chipspc/vant-dgg'
import PhoneField from '@/components/login/PhoneField'

import { auth } from '@/api'
import { checkPhone, checkPassword, checkAuthCode } from '@/utils/check.js'

export default {
  name: 'Forget',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    PhoneField,
  },
  data() {
    return {
      forgetForm: {
        tel: '',
        authCode: '',
        newPassword: '',
        confirmPassword: '',
      },
      isValidSubmit: false,
      redirect: this.$route.query.redirect || '/', // 登录后需要跳转的地址
    }
  },
  methods: {
    onClickLeft() {
      console.log('close')
      this.$router.replace(this.redirect)
    },
    handleTelInput(valueObj = {}) {
      const { value, valid } = valueObj
      this.forgetForm.tel = value
      this.checkFormData()
    },
    handleCodeInput(value) {
      this.forgetForm.authCode = value
      this.checkFormData()
    },
    handleNewPasswordInput(value) {
      this.forgetForm.newPassword = value
      this.checkFormData()
    },
    handleConfirmPasswordInput(value) {
      this.forgetForm.confirmPassword = value
      this.checkFormData()
    },
    handleCodeBtnClick(isValidTel) {
      console.log(isValidTel)
      if (!isValidTel) {
        this.loginToast('手机号码有误')
        return
      }
      this.loginToast('验证码已发送')
    },
    checkFormData() {
      const { tel, authCode, newPassword, confirmPassword } = this.forgetForm
      const keysList = Object.keys(this.forgetForm) || []

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
          case 'newPassword':
            // 至少6-15个字符，至少1个大写字母，1个小写字母和1个数字
            // checkPassword(newPassword) &&
            //   (errorObject = { key, message: '密码格式有误' })
            break
          case 'confirmPassword':
            confirmPassword !== newPassword &&
              (errorObject = { key, message: '两次输入的密码不一致' })
            break
        }
        if (errorObject) {
          break
        }
      }
      const isValid = !errorObject
      this.isValidSubmit = isValid
      return errorObject
    },
    onSubmit(values) {
      console.log('submit', values)
      const error = this.checkFormData()
      if (error) {
        const { message } = error
        this.loginToast(message)
        return
      }
      this.reset().then(() => {
        this.$router.replace({
          name: 'login',
          query: { redirect: this.redirect },
        })
      })
    },
    handleClick(type) {
      switch (type) {
        case 'telLogin':
          this.$router.replace({
            name: 'login',
            query: { redirect: this.redirect },
          })
          break
        case 'accountLogin':
          this.$router.replace({
            name: 'login',
            query: {
              loginType: 'account',
              redirect: this.redirect,
            },
          })
          break
      }
    },

    async reset() {
      try {
        const { tel, authCode, newPassword } = this.forgetForm
        const params = {
          phone: tel,
          smsCode: authCode,
          newPassword,
          userType: 'ORDINARY_USER',
        }
        const data = await auth.reset({ axios: this.$axios }, params)
        return data
      } catch (error) {
        this.loginToast(error.message)
      }
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

.forget {
  .head {
    padding: 0 30px;
    width: 100%;
    height: 88px;
    padding: 24px 30px;
    .close-btn {
      line-height: 40px;
    }
    .page-title {
      font-size: 36px;
      font-weight: bold;
      color: @title-text-color;
      line-height: 40px;
      text-align: center;
    }
  }
  .body {
    padding: 48px 60px 0;
    .form {
      .code-btn {
        border: none;
        font-weight: 400;
        color: #999999;
        .sp-button__text {
          font-size: 32px;
        }
      }

      /deep/.sp-cell {
        display: flex;
        align-items: center;
        height: 100px;
        padding: 0;
        &::after {
          left: 0;
          right: 0;
        }
        &.end-btn-cell {
          padding: 6px 0;
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
