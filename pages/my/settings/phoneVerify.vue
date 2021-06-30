<template>
  <div class="phone-verify">
    <Header title="手机短信验证" />
    <div>
      <sp-cell-group>
        <template v-if="!isLogin">
          <sp-field
            v-model="userInfo.decodePhone"
            maxlength="11"
            readonly
            :clearable="true"
            placeholder="请输入手机号码"
          />
          <sp-field
            v-model="sms"
            :clearable="true"
            center
            maxlength="6"
            placeholder="请输入验证码"
          >
            <template #button>
              <span :class="{ no_get: isSendSMS }" @click="getSMS">{{
                isSendSMS ? `(${count})重新获取` : '获取验证码'
              }}</span>
            </template>
          </sp-field>
        </template>
        <!-- <sp-field
          v-model="userInfo.decodePhone"
          clearable
          label="手机号"
          maxlength="11"
          readonly
          placeholder="请输入手机号"
        />
        <sp-field
          v-model="smsCode"
          center
          clearable
          label="验证码"
          maxlength="6"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <sp-button size="small" type="primary">获取验证码</sp-button>
          </template>
        </sp-field> -->
      </sp-cell-group>
    </div>
    <div class="submit">
      <button @click="nextStep">下一步</button>
    </div>
  </div>
</template>

<script>
import { Icon, Field } from '@chipspc/vant-dgg'
import { auth, userinfoApi, walletApi } from '@/api'
import { checkAuthCode } from '@/utils/check.js'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  data() {
    return {
      tel: '',
      sms: '',
      isLogin: false, // 是否登录
      smsStr: '获取验证码',
      count: 60,
      isSendSMS: false,
      phone: '',
      newUserInfo: '',
      userInfo: '',
    }
  },
  // computed: {
  //   userInfo() {
  //     return JSON.parse(localStorage.getItem('info'))
  //   },
  // },

  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('info'))
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await this.$axios.get(userinfoApi.info_decrypt, {
        params: {
          id: this.userInfo.id,
        },
      })
      if (res.code === 200) {
        this.newUserInfo = res.data
        this.tel = res.data.mainAccount
      }
    },
    getSMS() {
      if (!this.isSendSMS) {
        this.$xToast.showLoading({ message: '发送中' })
        // 获取验证码
        const params = {
          phone: this.newUserInfo.mainAccount,
          type: 'default',
        }
        auth
          .smsCode({ axios: this.$axios }, params)
          .then((res) => {
            this.isSendSMS = true
            this.$xToast.hideLoading()
          })
          .catch((e) => {
            console.error(e)
            this.$xToast.hideLoading()
            this.$xToast.show({
              message: e.message,
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          })
      }
    },
    nextStep() {
      if (!checkAuthCode(this.sms)) {
        this.$xToast.hideLoading()
        this.$xToast.show({
          message: '请填写正确的验证码',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        return
      }
      auth
        .checkSmsCode(
          { axios: this.$axios },
          {
            phone: this.tel,
            userType: 'ORDINARY_USER',
            smsCode: this.sms,
          }
        )
        .then((res) => {
          this.$router.push('/my/settings/setPwd?status=1')
        })
        .catch((e) => {
          this.$xToast.hideLoading()
          this.$xToast.show({
            message: e.message,
            duration: 1500,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
.no_get {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #cccccc;
}
.phone-verify {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
  ::v-deep .sp-cell {
    margin-top: 20px;
    height: 112px;
    display: flex;
    align-items: center;
  }
  ::v-deep .sp-field__button {
    color: #222;
  }
  .submit {
    padding: 0 40px;
    position: fixed;
    bottom: 32px;
    left: 0;
    width: 100%;

    > button {
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      width: 100%;
      display: block;
      height: 95px;
      background: #4974f5;
      border-radius: 8px;
      font-weight: bold;
    }
  }
}
</style>
