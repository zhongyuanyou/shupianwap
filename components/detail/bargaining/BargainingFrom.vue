<template>
  <div class="bargFrom">
    <sp-field
      v-model="price"
      type="number"
      maxlength="6"
      placeholder="意向价格(元)"
    />
    <sp-field
      v-model="phone"
      maxlength="11"
      type="number"
      placeholder="请输入手机号"
    >
      <template #button>
        <span
          :class="{
            getCodeBtn: true,
            btnDisable: btnDisable,
          }"
          size="small"
          type="primary"
          @click="handleGetCode"
          >{{ setCodeTitle }}</span
        >
      </template>
    </sp-field>
    <sp-field
      v-model="code"
      type="number"
      maxlength="6"
      placeholder="请输入短信验证码"
    />
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import { userinfoApi } from '~/api'
import { transactionConsApi } from '~/api/transactionConsultation'
export default {
  name: 'BargFrom',
  components: {
    [Field.name]: Field,
  },
  data() {
    return {
      price: null,
      phone: null,
      code: null,
      setCodeTitle: '获取验证码',
      btnDisable: false,
      codeNum: 60,
    }
  },
  methods: {
    // 价格
    priceReg() {
      if (this.price <= 0) {
        this.$xToast.show({
          message: '请输入正确的价格',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        return false
      }
      return true
    },
    // 手机号验证
    phoneReg() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.$xToast.show({
          message: '请输入正确的手机号',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        return false
      }
      return true
    },
    // 手机号验证
    codeReg() {
      if (!/^\d{6}$/.test(this.code)) {
        this.$xToast.show({
          message: '请输入正确的验证码',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        return false
      }
      return true
    },
    regFun() {
      if (this.priceReg() && this.phoneReg() && this.codeReg()) {
        return true
      }
      return false
    },

    handleGetCode() {
      if (!this.phoneReg()) {
        return
      }
      this.codeNum = 60
      this.btnDisable = true
      this.timer = setInterval(() => {
        if (this.codeNum <= 1) {
          this.clearTiemer()
        } else {
          this.codeNum--
          this.setCodeTitle = `${this.codeNum}S`
        }
      }, 1000)
      this.$axios
        .post(
          transactionConsApi.get_sms_code,
          {
            tel: this.phone,
          },
          {
            headers: {
              platformCode: 'COMDIC_PLATFORM_CRISPS',
              terminalCode: 'COMDIC_TERMINAL_WAP',
            },
          }
        )
        .then((res) => {
          if (res.code === 200) {
            this.$xToast.show({
              message: res.data,
              duration: 1000,
              icon: 'toast_ic_comp',
              forbidClick: true,
            })
          } else {
            this.$xToast.show({
              message: res.data,
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        .catch((err) => {
          this.setCodeTitle = '获取验证码'
          this.codeNum = 60
          this.btnDisable = true
          console.log(err)
        })
    },
    //   清除定时器
    clearTiemer() {
      this.setCodeTitle = '获取验证码'
      this.codeNum = 60
      this.btnDisable = false
      clearInterval(this.timer)
    },
  },
}
</script>

<style scoped lang="less">
.bargFrom {
  margin-top: 62px;
  margin-bottom: 70px;
  .btnDisable {
    pointer-events: none;
    color: #999999;
  }
}
/deep/.sp-cell {
  padding: 25px 0px;
  margin-top: 32px;
  /deep/input {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #cccccc;
    height: 38px;
    line-height: 38px;
    &::-webkit-input-placeholder {
      color: #ccc;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #ccc;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #ccc;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #ccc;
    }
  }
  /deep/&::after {
    left: 0px;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  /deep/.sp-field__value {
    height: 45px;
  }
  /deep/&:last-child {
    /deep/&::after {
      display: initial;
    }
  }
}
.getCodeBtn {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #555555;
  line-height: 38px;
}
</style>
