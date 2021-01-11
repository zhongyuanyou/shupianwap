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
    },
    handleGetCode() {
      if (this.phoneReg()) {
        return
      }
      this.codeNum = 60
      this.btnDisable = true
      const timer = setInterval(() => {
        if (this.codeNum <= 1) {
          this.setCodeTitle = '获取验证码'
          this.codeNum = 60
          this.btnDisable = false
          clearInterval(timer)
        } else {
          this.codeNum--
          this.setCodeTitle = `${this.codeNum}S`
        }
      }, 1000)
      this.$axios
        .get(transactionConsApi.get_sms_code, {
          params: {
            tel: this.phone,
            type: 'zc',
          },
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          this.setCodeTitle = '获取验证码'
          this.codeNum = 60
          this.btnDisable = true
          console.log(err)
        })
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
