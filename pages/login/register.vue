<!--
 * @Author: xiao pu
 * @Date: 2020-11-23 17:22:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 15:11:24
 * @Description: file content
 * @FilePath: /chips-wap/pages/login/register.vue
-->
<template>
  <div class="register">
    <div class="head">
      <sp-top-nav-bar ellipsis title="注册账号" @on-click-left="onClickLeft">
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
          icon-prefix="spiconfont"
          clear-icon="login_ic_clear"
          placeholder="请输入验证码"
          maxlength="6"
          @input="handleAuthCodeInput"
        />
        <sp-field
          v-model="registerForm.password"
          v-forbid-copy-paste
          :type="passwordFieldType"
          class="end-btn-cell"
          name="password"
          clearable
          icon-prefix="spiconfont"
          clear-icon="login_ic_clear"
          placeholder="请输入新密码(6-15位数字/字母/标点符号)"
          autocomplete="off"
          maxlength="15"
          @input="handlePasswordInput"
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
    <LoadingCenter v-show="loading" title="注册中" />
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
import PhoneField from '@/components/login/PhoneField'
import ProtocolField from '@/components/login/ProtocolField'
import LoadingCenter from '@/components/common/loading/LoadingCenter'

import formHandle from '@/mixins/formHandle'
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
    [Icon.name]: Icon,
    PhoneField,
    ProtocolField,
    LoadingCenter,
  },
  mixins: [formHandle],
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
      loading: false,
      redirect: this.$route.query.redirect || '/', // 登录后需要跳转的地址
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'user/SET_USER',
    }),
    onClickLeft() {
      console.log('close')
      this.$router.replace(this.redirect)
    },
    handleClickCodeBtn(isValidTel) {
      if (!isValidTel) {
        this.$xToast.warning('手机号码有误')
        return
      }
      this.$xToast.success('验证码已发送')
    },
    onSubmit(values) {
      console.log('submit', values)
      const error = this.checkFormData()
      if (error) {
        const { message } = error
        this.$xToast.warning(message)
        return
      }
      this.register().then(() => {
        // 登录后 从哪里来到哪里去
        this.$router.push(this.redirect)
      })
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
          this.$router.replace({
            name: 'login',
            query: { redirect: this.redirect },
          })
          break
        case 'forget':
          this.$router.replace({
            name: 'login-forget',
            query: { redirect: this.redirect },
          })
          break
      }
    },
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
        this.loading = true
        const data = await auth.register({ axios: this.$axios }, params)
        this.loading = false
        if (data != null) this.setUserInfo(data) // 注册成功后，返回的也是登录信息，所以也存
        return data
      } catch (error) {
        this.loading = false
        this.$xToast.warning(error && error.message)
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

.register {
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
