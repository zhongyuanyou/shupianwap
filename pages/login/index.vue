<!--
 * @Author: xiao pu
 * @Date: 2020-11-23 10:18:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 15:04:11
 * @Description: file content
 * @FilePath: /chips-wap/pages/login/index.vue
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
          <sp-icon
            class-prefix="spiconfont"
            size="0.4rem"
            name="nav_ic_close"
          />
        </template>
        <template #right>
          <span>注册</span>
        </template>
      </sp-top-nav-bar>
    </div>
    <div class="body">
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
            @clicked="handleClickCodeBtn"
          />
          <sp-field
            key="authCode"
            v-model="loginForm.authCode"
            type="number"
            name="authCode"
            clearable
            icon-prefix="spiconfont"
            clear-icon="login_ic_clear"
            placeholder="请输入验证码"
            maxlength="6"
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
            v-forbid-copy-paste
            name="password"
            placeholder="请输入密码"
            autocomplete="off"
            clearable
            icon-prefix="spiconfont"
            clear-icon="login_ic_clear"
            maxlength="15"
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
                <sp-icon
                  class-prefix="spiconfont"
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
            :class="{ 'submit-wrap__btn--disabled': !isValidSubmit }"
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
    <LoadingCenter v-show="loading" title="登录中" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import {
  TopNavBar,
  Form,
  Button,
  Field,
  Checkbox,
  Icon,
} from '@chipspc/vant-dgg'
import ProtocolField from '@/components/login/ProtocolField'
import PhoneField from '@/components/login/PhoneField'
import LoadingCenter from '@/components/common/loading/LoadingCenter'

import formHandle from '@/mixins/formHandle'
import { auth } from '@/api'
import { checkPhone, checkAuthCode, checkPassword } from '@/utils/check.js'
import { openLink } from '@/utils/common.js'
import ImgAuthDialog from '@/components/common/imgAuth'

// 第三方登录需要回传的参数
const SOURCE_PLATFROM_PARAMS = { IM: ['token', 'userId'] }

export default {
  name: 'Login',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
    [Icon.name]: Icon,
    PhoneField,
    ProtocolField,
    LoadingCenter,
  },
  mixins: [formHandle],
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
      loading: false,
      passwordFieldType: 'password', // text：明文
      sourcePlatform: this.$route.query.sourcePlatform || '', // 第三方 需要携带的参数   IM: token, userId
      loginType: this.$route.query.loginType || 'telephone', // account: 账户登录； telephone：手机快捷登录
      redirect: this.$route.query.redirect || '/', // 登录后需要跳转的地址
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      setUserInfo: 'user/SET_USER',
    }),
    onSubmit() {
      const error = this.checkFormData()
      if (error) {
        const { message } = error
        this.$xToast.warning(message)
        return
      }
      this.login().then((data) => {
        // 跳转外连接
        if (this.sourcePlatform) {
          const keyList = SOURCE_PLATFROM_PARAMS[this.sourcePlatform]
          const query = Array.isArray(keyList)
            ? keyList.reduce((accumulator, key) => {
                data = data || {}
                if (data[key]) {
                  accumulator[key] = data[key]
                }
                return accumulator
              }, {})
            : {}
          openLink(this.redirect, query)
          return
        }

        this.$router.replace(this.redirect)
      })
    },
    handleSwitchLookPassword() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
    },
    onClickLeft() {
      // this.$router.push(this.redirect)
      // this.$router.back()
      if (window.history.length <= 1) {
        this.$router.replace('/')
      } else {
        this.$router.back()
      }
    },
    handleClickCodeBtn(isValidTel) {
      if (!isValidTel) {
        this.$xToast.warning('手机号码有误')
        return
      }
      this.$xToast.success('验证码已发送')
    },
    handleProtocolChange(value) {
      console.log('handleProtocolChange:', value)
      this.loginForm.readed = value
      this.checkFormData()
    },
    handleTelInput(valueObj = {}) {
      console.log('handleTelInput:', valueObj)
      const { value, valid } = valueObj
      this.loginForm.tel = value
      this.checkFormData()
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
          this.$router.replace({
            name: 'login-forget',
            query: { redirect: this.redirect },
          })
          break
        case 'register':
          this.$router.replace({
            name: 'login-register',
            query: { redirect: this.redirect },
          })
          break
      }
      this.loginForm = {
        tel: '',
        authCode: '',
        account: '',
        password: '',
        readed: false,
        imgCaptcha: '', // 图形验证码
      }
    },

    async login() {
      const isPhoneVerify = this.loginType === 'telephone'
      const { tel, authCode, account, password, imgCaptcha } = this.loginForm
      const dataJson = {
        phone: isPhoneVerify ? this.loginForm.tel : this.loginForm.account,
      }
      if (isPhoneVerify) {
        Object.assign(dataJson, { smsCode: authCode })
      } else {
        Object.assign(dataJson, { password })
      }

      const params = {
        accountChannel: isPhoneVerify ? 'AUTH_PHONE_VERIFY' : 'AUTH_PHONE_PWD',
        userType: 'ORDINARY_USER',
        client: 'COMDIC_TERMINAL_WAP',
        platformType: 'COMDIC_PLATFORM_CRISPS',
        dataJson,
        imgCaptcha,
      }
      try {
        this.loading = true
        const data = await auth.login({ axios: this.$axios }, params)
        this.loading = false
        // 缓存用户信息
        if (data != null) {
          this.setUserInfo(data)
        }
        return data
      } catch (error) {
        this.loading = false
        const { code } = error
        // 需要验证码
        if (code === 10408) {
          ImgAuthDialog()
            .then((result) => {
              // 获取验证码后，再调用一次登录
              const { data } = result
              this.loginForm.imgCaptcha = data
              this.onSubmit()
            })
            .catch(() => {
              this.loginForm.imgCaptcha = ''
            })
          return Promise.reject(new Error('需要验证'))
        }
        this.loginForm.imgCaptcha = ''
        this.$xToast.warning(error.message)
        return Promise.reject(error)
      }
    },

    // 数据验证
    checkFormData() {
      const { tel, authCode, account, password, readed } = this.loginForm
      const keysList =
        this.loginType === 'telephone'
          ? ['tel', 'authCode', 'readed']
          : ['account', 'password', 'readed']

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
          case 'account':
            !checkPhone(account) &&
              (errorObject = { key, message: '手机号码有误' })
            break
          case 'password':
            // 至少6-15个字符
            !checkPassword(password) &&
              (errorObject = { key, message: '密码格式有误' })
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
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.login {
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
