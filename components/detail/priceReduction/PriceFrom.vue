<template>
  <div class="priceFrom">
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
      v-model="value2"
      type="number"
      maxlength="6"
      placeholder="请输入短信验证码"
    />
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import { transactionConsApi } from '@/api/transactionConsultation'
export default {
  name: 'PriceFrom',
  components: {
    [Field.name]: Field,
  },
  data() {
    return {
      phone: null,
      value2: null,
      setCodeTitle: '获取验证码',
      codeNum: 60,
      btnDisable: false,
      timer: null,
    }
  },
  methods: {
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
      if (!/^\d{6}$/.test(this.value2)) {
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
    regFun() {
      if (this.phoneReg() && this.codeReg()) {
        return true
      }
      return false
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
.priceFrom {
  margin-top: 62px;
  .btnDisable {
    pointer-events: none;
    color: #999999;
  }
}
::v-deep.sp-cell {
  padding: 25px 0px;
  margin-top: 32px;
  ::v-deep&::after {
    left: 0px;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  ::v-deep.sp-field__value {
    height: 45px;
  }
  ::v-deep&:last-child {
    ::v-deep&::after {
      display: initial;
    }
  }
}
.getCodeBtn {
  display: inline-block;
  width: 150px;
  text-align: center;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #555555;
  line-height: 38px;
}
</style>
