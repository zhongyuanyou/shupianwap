<template>
  <div class="set-pwd">
    <Header title="密码设置" />
    <div class="title">
      <p class="tips">请输入支付密码</p>
      <p v-show="valid" class="valid-text">密码错误请重新输入</p>
    </div>
    <div class="set-pwd_input">
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
    <div></div>
  </div>
</template>

<script>
import { PasswordInput, NumberKeyboard } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [PasswordInput.name]: PasswordInput,
    [NumberKeyboard.name]: NumberKeyboard,
  },
  data() {
    return {
      password: '',
      showKeyboard: true,
      valid: false,
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('info'))
    },
  },
  methods: {
    onInput(key) {
      this.password = (this.password + key).slice(0, 6)
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
      this.untie()
    },
    async untie() {
      const res = await this.$axios.post(walletApi.unbundle, {
        cardInfoId: this.$route.query.id,
        password: this.password,
        operateId: this.userInfo.id,
        operateName: this.userInfo.fullName,
      })
      if (res.code === 200) {
        this.$router.push('/my/wallet/bankCards/untieSuccess')
      } else {
        this.$xToast.warning('解绑失败,请确认信息是否有误')
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
