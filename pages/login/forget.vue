<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 09:33:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:02:24
 * @Description: file content
 * @FilePath: /chips-wap/pages/login/forget.vue
-->

<template>
  <div class="forget">
    <div class="head">
      <sp-top-nav-bar ellipsis title="找回密码" @on-click-left="onClickLeft">
        <template #left>
          <sp-icon
            class-prefix="spiconfont"
            size="0.4rem"
            name="nav_ic_close"
          />
        </template>
      </sp-top-nav-bar>
    </div>
    <div class="body">
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
          icon-prefix="spiconfont"
          clear-icon="login_ic_clear"
          name="authCode"
          placeholder="请输入验证码"
          maxlength="6"
          @input="handleCodeInput"
        />
        <sp-field
          v-model="forgetForm.newPassword"
          v-forbid-copy-paste
          type="password"
          clearable
          icon-prefix="spiconfont"
          clear-icon="login_ic_clear"
          name="newPassword"
          placeholder="请输入新密码(6-15位数字/字母/标点符号)"
          autocomplete="off"
          maxlength="15"
          @input="handleNewPasswordInput"
        >
        </sp-field>
        <sp-field
          v-model="forgetForm.confirmPassword"
          v-forbid-copy-paste
          type="password"
          name="confirmPassword"
          clearable
          icon-prefix="spiconfont"
          clear-icon="login_ic_clear"
          placeholder="确认新密码"
          autocomplete="off"
          maxlength="15"
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
    <LoadingCenter v-show="loading" title="请求中" />
  </div>
</template>

<script>
import { TopNavBar, Form, Button, Field, Icon } from '@chipspc/vant-dgg'
import PhoneField from '@/components/login/PhoneField'
import LoadingCenter from '@/components/common/loading/LoadingCenter'

import formHandle from '@/mixins/formHandle'
import { auth } from '@/api'
import { checkPhone, checkPassword, checkAuthCode } from '@/utils/check.js'

export default {
  name: 'Forget',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Icon.name]: Icon,
    PhoneField,
    LoadingCenter,
  },
  mixins: [formHandle],
  data() {
    return {
      forgetForm: {
        tel: '',
        authCode: '',
        newPassword: '',
        confirmPassword: '',
      },
      isValidSubmit: false,
      loading: false,
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
        this.$xToast.warning('手机号码有误')
        return
      }
      this.$xToast.success('验证码已发送')
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
            // 至少6-15个字符
            !checkPassword(newPassword) &&
              (errorObject = { key, message: '密码格式有误' })
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
        this.$xToast.warning(message)
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
        this.loading = true
        const data = await auth.reset({ axios: this.$axios }, params)
        this.loading = false
        return data
      } catch (error) {
        this.loading = false
        this.$xToast.warning(error.message)
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.forget {
  height: 100%;
  .head {
    /deep/.sp-top-nav-bar {
      &__left,
      &__right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 400;
      }
      &::after {
        content: none;
      }
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
          margin-right: -16px;
          padding: 0 16px;
          line-height: inherit;
          font-size: 24px;
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
      &:active::before {
        opacity: 1;
        background-color: transparent;
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
