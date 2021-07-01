<template>
  <div class="set-pwd">
    <Header title="密码设置" />
    <!-- <div class="title">
      <p class="tips">请输入支付密码</p>
      <p v-show="valid" class="valid-text">密码错误请重新输入</p>
    </div> -->
    <div v-if="step === 0" class="set-pwd_input">
      <p>为了提高支付安全性</p>
      <p>请设置6位数字提现密码</p>
      <sp-password-input
        :value="password"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <sp-number-keyboard
        :show="showKeyboard"
        theme="custom"
        extra-key="."
        close-button-text="确定"
        @blur="showKeyboard = false"
        @input="onInput"
        @delete="onDelete"
        @close="onClose"
      />
    </div>
    <div v-else class="set-pwd_input">
      <p></p>
      <p>请再次确认支付密码</p>
      <sp-password-input
        :value="confirmPassword"
        :focused="showKeyboardConfirm"
        @focus="showKeyboardConfirm = true"
      />
      <!-- 数字键盘 -->
      <sp-number-keyboard
        :show="showKeyboardConfirm"
        theme="custom"
        extra-key="."
        close-button-text="确定"
        @blur="showKeyboardConfirm = false"
        @input="onInputConfirm"
        @delete="onDeleteConfirm"
        @close="onCloseConfirm"
      />
    </div>
  </div>
</template>

<script>
import { PasswordInput, NumberKeyboard, Dialog } from '@chipspc/vant-dgg'
import { walletApi, userinfoApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      showKeyboard: true,
      valid: false,
      showKeyboardConfirm: true,
      validConfirm: false,
      step: 0,
      certificateInfo: '', // 认证信息
      newUserInfo: '',
      userInfo: '',
      accountInfo: '',
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('info'))
    this.accountInfo = JSON.parse(localStorage.getItem('accountInfo'))
    this.getUserInfo()
    this.getAuthInfo()
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
      }
    },
    onInput(key) {
      this.password = (this.password + key).slice(0, 6)
      // if (this.password.length === 6) {
      //   this.errorInfo = '密码错误'
      // } else {
      //   this.errorInfo = ''
      // }
    },
    onDelete() {
      this.password = this.password.slice(0, this.password.length - 1)
    },
    onClose() {
      if (this.password.length !== 6) {
        this.$xToast.show({
          message: '请输入6位提现密码',
          duration: 1000,
        })
        return false
      }
      console.log('完成时触发', this.password)
      this.step = 1
    },
    onInputConfirm(key) {
      this.confirmPassword = (this.confirmPassword + key).slice(0, 6)
    },
    onDeleteConfirm() {
      this.confirmPassword = this.confirmPassword.slice(
        0,
        this.confirmPassword.length - 1
      )
    },
    onCloseConfirm() {
      if (this.confirmPassword.length !== 6) {
        this.$xToast.show({
          message: '请输入6位提现密码',
          duration: 1000,
        })
        return false
      }
      if (this.password !== this.confirmPassword) {
        this.$xToast.show({
          message: '密码与确认密码不一致',
          duration: 1000,
        })
        return false
      }
      if (this.$route.query.status === '0') {
        console.log(this.$route.query.status)
        this.openAndActivation()
      } else {
        this.updatePwd()
      }
    },
    // ①获取认证信息
    async getAuthInfo() {
      const res = await this.$axios.get(walletApi.authentication_info, {
        params: {
          userId: this.userInfo.id,
          isWriting: true,
        },
      })
      if (res.code === 200) {
        this.certificateInfo = res.data
      }
    },

    // 修改密码
    async updatePwd() {
      const res = await this.$axios.post(walletApi.reset_password, {
        accountId: this.accountInfo.id,
        password: this.password,
        phone: this.newUserInfo.mainAccount,
        operateId: this.userInfo.id,
        operateName: this.userInfo.fullName,
      })
      if (res.code === 200) {
        this.$xToast.show({ message: '设置成功' })
        setTimeout(() => {
          this.$router.push('/my/settings')
        }, 1500)
      }
    },
    async openAndActivation() {
      const res = await this.$axios.post(walletApi.open_and_activation, {
        mainInfoRelationId: this.userInfo.id,
        mainPhone: this.newUserInfo.mainAccount,
        payPassword: this.confirmPassword,
        sysCode: 'chips-app',
        operateId: this.userInfo.id,
        operateName: this.userInfo.fullName,
        mainType: '1',
        accType: 'BANK_ACCOUNT_TYPE_2',
        mainInfoName: this.userInfo.fullName,
        certificateInfo: {
          cardNumber: this.certificateInfo.idCard,
          cardName: this.certificateInfo.realName,
          validityType: '1',
        },
      })
      if (res.code === 200) {
        this.$xToast.show({ message: '您的账户余额开通成功' })
        setTimeout(() => {
          this.$router.push('/my/wallet')
        }, 1500)
      } else {
        Dialog.alert({
          title: '提示',
          message: '激活失败，请重试',
          cancelButtonText: '',
          confirmButtonText: '重试',
        }).then(() => {
          this.$router.push('/my/wallet')
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.set-pwd {
  .title {
    line-height: 50px;
    margin-top: 85px;
    margin-bottom: 145px;
    text-align: center;
    .tips {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      font-weight: bold;
    }
    .valid-text {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #ff3b30;
      text-align: center;
      line-height: 44px;
      margin-top: 16px;
    }
  }
  .set-pwd_input {
    text-align: center;
    > p:nth-child(1) {
      font-size: 36px;
      color: #999999;
      margin-top: 83px;
      height: 50px;
      line-height: 50px;
    }
    > p:nth-child(2) {
      margin-top: 12px;
      height: 50px;
      line-height: 50px;
      color: #222;
      font-size: 36px;
      margin-bottom: 84px;
      font-weight: bold;
    }
    ::v-deep .sp-password-input__security {
      border: 2px solid #4974f5;
      border-radius: 12px;
      overflow: hidden;
    }
    ::v-deep .sp-hairline--left::after {
      border-color: #bbbbbb;
    }
  }
}
</style>
