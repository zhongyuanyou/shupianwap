<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 09:33:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-24 11:46:59
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/login/forget.vue
-->

<template>
  <div class="forget">
    <div class="head">
      <sp-row>
        <sp-col span="3">
          <my-icon
            class="close-btn"
            name="login_ic_clear"
            size="0.2rem"
            color="#1A1A1A"
          ></my-icon>
        </sp-col>
        <sp-col span="18"><h2 class="page-title">找回密码</h2></sp-col>
      </sp-row>
    </div>
    <div class="body">
      <sp-form validate-first class="form" @submit="onSubmit">
        <sp-field
          v-model="forgetForm.tel"
          type="tel"
          clear-trigger="always"
          class="end-btn-cell"
          name="telephone"
          clearable
          placeholder="请输入手机号"
          max-length="11"
          @input="handleTelInput"
        >
          <template #button>
            <sp-button
              class="code-btn"
              native-type="button"
              :disabled="!isValidTel"
              @click="handleCodeBtnClick"
            >
              获取验证码
            </sp-button>
          </template>
        </sp-field>
        <sp-field
          v-model="forgetForm.authCode"
          type="number"
          clear-trigger="always"
          name="authCode"
          clearable
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
            :disabled="!isValidSubmit"
          >
            重置密码
          </sp-button>
        </div>
      </sp-form>
    </div>
    <div class="footer">
      <div>
        <sp-button class="switch-btn" native-type="button">
          手机快捷登录
        </sp-button>
        <i class="vertical-line"></i>
        <sp-button class="switch-btn" native-type="button">
          忘记密码
        </sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Col, Row, Form, Button, Field, Toast } from '@chipspc/vant-dgg'

import { checkPhone, checkPassword, checkAuthCode } from '@/utils/check.js'

export default {
  name: 'Login',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
  },
  data() {
    return {
      forgetForm: {
        tel: '',
        authCode: '',
        newPassword: '',
        confirmPassword: '',
      },
      isValidTel: false, // 电话号码的有效性
      isValidSubmit: false,
    }
  },
  methods: {
    handleTelInput(value) {
      this.isValidTel = checkPhone(value)
      this.forgetForm.tel = value
      this.checkFormData('tel')
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
    handleCodeBtnClick() {
      // 获取验证码
      console.log('handleCodeBtnClick tel:', this.forgetForm.tel)
      Toast('验证码已发送！')
    },
    checkFormData(excludeItem) {
      const { tel, authCode, newPassword, confirmPassword } = this.forgetForm
      const isValid = Object.keys(this.forgetForm).every((key) => {
        if (key === excludeItem) return true
        switch (key) {
          case 'tel':
            return checkPhone(tel)
          case 'authCode':
            return checkAuthCode(authCode)
          case 'newPassword':
            // 至少6-15个字符，至少1个大写字母，1个小写字母和1个数字
            return checkPassword(newPassword)
          case 'confirmPassword':
            return confirmPassword === newPassword
        }
      })
      this.isValidSubmit = isValid
    },
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.forget {
  /deep/div {
    font-size: 24px;
  }
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
        padding: 32px 0;
        &::after {
          left: 0;
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
