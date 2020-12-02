<!--
 * @Author: xiao pu
 * @Date: 2020-11-23 10:18:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-02 19:11:55
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/login/commodityConsultation.vue
-->
<template>
  <div class="login">
    <div class="head">
      <sp-top-nav-bar
        ellipsis
        @on-click-left="onClickLeft"
        @on-click-right="handleClick('register')"
      >
        <template #left>
          <my-icon name="login_ic_clear" size="0.4rem" color="#1A1A1A" />
        </template>
        <template #right>
          <span>注册</span>
        </template>
      </sp-top-nav-bar>
    </div>
    <div ref="loginBody" class="body">
      <div class="title">
        {{ loginType === 'account' ? '账号密码登录' : '手机快捷登录' }}
      </div>
      <div v-if="loginType === 'telephone'" class="subtitle">
        未注册过的手机号将自动创建薯片账号
      </div>
      <sp-form validate-first class="login-form" @submit="onSubmit">
        <!-- 手机登录 -->
        <template v-if="loginType === 'telephone'">
          <PhoneField
            key="tel"
            v-model="loginForm.tel"
            @input="handleTelInput"
          />
          <sp-field
            key="authCode"
            v-model="loginForm.authCode"
            type="number"
            name="authCode"
            clearable
            placeholder="请输入验证码"
            @input="handleAuthCodeInput"
          />
        </template>

        <!-- 账户登录 -->
        <template v-else-if="loginType === 'account'" class="login-type">
          <PhoneField
            key="account"
            v-model="loginForm.account"
            type="account"
            @input="handleAccountInput"
          />
          <sp-field
            key="password"
            v-model="loginForm.password"
            name="password"
            clearable
            placeholder="请输入密码"
            :type="passwordFieldType"
            @input="handlePasswordInput"
          >
            >
            <template #button>
              <sp-button
                class="see-password-btn"
                native-type="button"
                @click="handleSwitchLookPassword"
              >
                <my-icon
                  size="0.24rem"
                  color="#CCCCCC"
                  :name="
                    passwordFieldType === 'password'
                      ? 'login_ic_dislook'
                      : 'login_ic_look'
                  "
                />
              </sp-button>
            </template>
          </sp-field>
        </template>
        <ProtocolField
          v-model="loginForm.readed"
          class="protocol-field"
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
            立即登录
          </sp-button>
        </div>
      </sp-form>
    </div>
    <div class="footer">
      <div v-if="loginType === 'telephone'">
        <sp-button
          class="switch-btn"
          native-type="button"
          @click="handleClick('accountLogin')"
        >
          账号密码登录
        </sp-button>
      </div>
      <div v-else>
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

import ProtocolField from '@/components/login/ProtocolField'
import PhoneField from '@/components/login/PhoneField'

import { checkPhone, checkAuthCode, checkPassword } from '@/utils/check.js'

export default {
  name: 'Login',
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
      loginForm: {
        tel: '',
        authCode: '',
        account: '',
        password: '',
        readed: false,
      },
      isValidSubmit: false,
      passwordFieldType: 'password', // text：明文
      loginType: this.$route.query.loginType || 'telephone', // account: 账户登录； telephone：手机快捷登录
    }
  },
  computed: {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    handleSwitchLookPassword() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    onClickLeft() {
      console.log('关闭')
    },
    handleProtocolChange(value) {
      console.log('handleProtocolChange:', value)
    },
    handleTelInput(valueObj = {}) {
      console.log('handleTelInput:', valueObj)
      const { value, valid } = valueObj
      this.loginForm.tel = value
      !valid && this.loginToast('手机号码有误')
    },
    handleAuthCodeInput(value) {
      this.loginForm.authCode = value
      this.checkFormData()
    },
    handleAccountInput(valueObj = {}) {
      const { value, valid } = valueObj
      this.loginForm.account = value
      this.checkFormData()
    },
    handlePasswordInput(value) {
      this.loginForm.password = value
      this.checkFormData()
    },

    handleClick(type) {
      switch (type) {
        case 'accountLogin':
          this.loginType = 'account'
          break
        case 'telLogin':
          this.loginType = 'telephone'
          break
        case 'forget':
          this.$router.push({ name: 'login-forget' })
          break
        case 'register':
          this.$router.push({ name: 'login-register' })
          break
      }
      this.loginForm = {
        tel: '',
        authCode: '',
        account: '',
        password: '',
        readed: false,
      }
    },

    // 数据验证
    checkFormData(excludeItem) {
      const { tel, authCode, account, password } = this.loginForm
      const keysList =
        this.loginType === 'telephone'
          ? ['tel', 'authCode']
          : ['account', 'password']
      const isValid = keysList.every((key) => {
        if (key === excludeItem) return true
        switch (key) {
          case 'tel':
            return checkPhone(tel)
          case 'authCode':
            return checkAuthCode(authCode)
          case 'account':
            return checkPhone(account)
          case 'password':
            // 至少6-15个字符，至少1个大写字母，1个小写字母和1个数字
            return checkPassword(password)
        }
      })
      this.isValidSubmit = isValid
    },

    // 自定义提示框
    loginToast(
      message = '',
      className = 'toast',
      icon = 'like-o',
      duration = 1000
    ) {
      Toast({
        duration,
        className,
        message,
        icon, // 图标有点烦人
        iconPrefix: 'iconfont',
        getContainer: () => {
          return this.$refs.loginBody
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

.login {
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
    .login-form {
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
    min-width: 390px;
    max-width: 440px;
    min-height: 92px;
    max-height: 130px;
    box-sizing: border-box;
  }
}
</style>
