<!--
 * @Author: xiao pu
 * @Date: 2020-11-23 10:18:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 17:07:23
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/login/index.vue
-->
<template>
  <div class="login">
    <div class="head">
      <my-icon name="login_ic_clear" size="0.2rem" color="#1A1A1A"></my-icon>
      <sp-button class="register">注册</sp-button>
    </div>
    <div class="body">
      <div class="title">手机快捷登录</div>
      <div class="subtitle">未注册过的手机号将自动创建薯片账号</div>
      <sp-form validate-first class="login-form" @submit="onSubmit">
        <!-- 手机登录 -->
        <sp-field
          v-model="loginForm.tel"
          type="tel"
          class="end-btn-cell"
          name="telephone"
          clearable
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        >
          <template #button>
            <sp-button class="code-btn" native-type="button">
              获取验证码
            </sp-button>
          </template>
        </sp-field>
        <sp-field
          v-model="loginForm.authCode"
          type="number"
          name="authCode"
          clearable
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <!-- 账户登录 -->
        <sp-field
          v-model="loginForm.account"
          type="tel"
          name="account"
          clearable
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <sp-field
          v-model="loginForm.password"
          :type="passwordFieldType"
          class="end-btn-cell"
          name="password"
          clearable
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
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
                size=""
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

        <sp-field name="checkbox" class="protocol-field">
          <template #input>
            <sp-checkbox v-model="loginForm.readed" shape="round" />
          </template>
          <template #extra>
            <span class="protocol"
              >我已阅读并同意 <a>《薯片用户服务协议》</a>和
              <a>《薯片隐 私协议》</a></span
            >
          </template>
        </sp-field>
        <div class="submit-wrap">
          <sp-button
            block
            type="info"
            class="submit-wrap__btn"
            native-type="submit"
          >
            立即登录
          </sp-button>
        </div>
      </sp-form>
    </div>
    <div class="footer">
      <div v-if="loginType === 'telephone'">
        <sp-button class="switch-btn" native-type="button">
          账号密码登录
        </sp-button>
      </div>
      <div v-else>
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
import { Form, Button, Field, Checkbox } from '@chipspc/vant-dgg'

export default {
  name: 'Login',
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox,
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
      passwordFieldType: 'password', // text
      loginType: 'telephone', // account
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    handleSwitchLookPassword() {
      this.passwordFieldType =
        this.passwordFieldType === 'password' ? 'text' : 'password'
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    width: 100%;
    height: 88px;
    .register {
      color: #1a1a1a;
      font-weight: 400;
      line-height: 36px;
      border: 0;
      /deep/.sp-button__text {
        font-size: 32px;
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
        padding: 32px 0;
        &::after {
          left: 0;
        }
        &.end-btn-cell {
          padding: 6px 0;
        }
        &.protocol-field {
          padding: 68px 0 0;
          &::after {
            display: none;
          }
          .sp-field__control--custom {
            min-height: auto;
          }
          .protocol {
            padding-left: 16px;
            font-size: 26px;
            font-weight: 400;
            color: @subtitle-text-color;
            line-height: 30px;
          }
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
