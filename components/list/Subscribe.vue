<template>
  <div class="subscribe">
    <div class="subscribe-title">
      <client-only>
        <my-icon
          name="per_ic_about"
          size="0.28rem"
          color="rgba(216, 216, 216, 1)"
        ></my-icon>
      </client-only>
      <span>没有找到到相关服务，换个搜索词试试!</span>
    </div>
    <div class="subscribe-content">
      <div class="title">{{ title }}</div>
      <p>{{ desc }}</p>
      <template v-if="!isLogin">
        <sp-field
          v-model="tel"
          type="number"
          maxlength="11"
          :clearable="true"
          placeholder="请输入手机号码"
        />
        <sp-field
          v-model="sms"
          :clearable="true"
          center
          placeholder="请输入验证码"
        >
          <template #button>
            <span :class="{ no_get: isSendSMS }" @click="getSMS">{{
              isSendSMS ? `(${count})重新获取` : '获取验证码'
            }}</span>
          </template>
        </sp-field>
      </template>
      <div v-else class="already-login">
        <span>{{ userPhone }}</span>
      </div>
      <div class="submit" @click="submitSubscribe">
        <span>免费订阅通知</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import { auth, userinfoApi, consult } from '@/api'
import { checkPhone, checkAuthCode } from '@/utils/check.js'

export default {
  name: 'Subscribe',
  components: {
    [Field.name]: Field,
  },
  props: {
    title: {
      type: String,
      default() {
        return '专属服务'
      },
    },
    desc: {
      type: String,
      default() {
        return '留下您的联系方式,专属规划师为您1对1服务'
      },
    },
    content: {
      type: [Object, String, Array],
      default() {
        return null
      },
    },
    searchText: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      tel: '',
      sms: '',
      isLogin: false, // 是否登录
      smsStr: '获取验证码',
      count: 60,
      isSendSMS: false,
      userInfo: {},
      phone: '',
    }
  },
  computed: {
    userPhone() {
      const { userInfo } = this
      if ('decodePhone' in userInfo) return userInfo.decodePhone
      if ('nickName' in userInfo) return userInfo.nickName
      return ''
    },
  },
  mounted() {
    if (this.$store.state.user.userId) {
      this.isLogin = true
      // 获取用户信息
      this.$axios
        .get(userinfoApi.info, {
          params: { id: this.$store.state.user.userId },
        })
        .then((res) => {
          if (res.code === 200 && res.data.id) {
            this.userInfo = res.data
          } else {
            this.isLogin = false
          }
        })
        .catch((err) => {
          console.error(err)
          this.$xToast.show({
            message: '网络错误，请稍后再试',
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        })
    }
  },
  methods: {
    submitSubscribe() {
      // 提交订阅
      const _self = this
      this.$xToast.showLoading({ message: '提交中', forbidClick: false })
      // 登录状态
      if (_self.isLogin) {
        this.cmsAddConsultHandle()
      } else {
        // 未登录状态
        _self.checkSms()
      }
    },
    getSMS() {
      if (!checkPhone(this.tel)) {
        this.$xToast.show({
          message: '请输入正确的手机号',
          duration: 1500,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }
      if (!this.isSendSMS) {
        this.$xToast.showLoading({ message: '发送中' })
        // 获取验证码
        const params = {
          phone: this.tel,
          type: 'default',
        }
        auth
          .smsCode({ axios: this.$axios }, params)
          .then((res) => {
            this.isSendSMS = true
            this.countDown()
            this.$xToast.hideLoading()
          })
          .catch((e) => {
            console.log('---', e)
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
    checkSms() {
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
          console.log(res)
          this.cmsAddConsultHandle()
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
    cmsAddConsultHandle() {
      const _self = this
      const params = {
        consultationContent: _self.resetContent(),
        customerName: _self.userInfo.fullName,
        customerNumber: _self.tel || _self.userInfo.mainAccountFull,
        customerSourceChannel: 'EXPERT_APPOINTMENT_CUSTOMER_CHANNEL',
        msgSourceChannel: 'WAP_MSG_CHANNEL',
        sourceAddr: location.href,
        web: 'crisps',
      }
      this.$axios
        .post(consult.cmsAddConsult, params)
        .then((res) => {
          this.$xToast.hideLoading()
          if (res.code === 200) {
            _self.$xToast.show({
              message: '提交订阅成功',
              duration: 1500,
              icon: 'toast_ic_comp',
              forbidClick: false,
            })
            if (!_self.isLogin) {
              this.tel = ''
              this.sms = ''
            }
          } else {
            _self.$xToast.error(res.message)
          }
        })
        .catch((e) => {
          this.$xToast.hideLoading()
          _self.$xToast.error(e.message)
        })
    },
    // 倒计时
    countDown() {
      if (this.count === 0) {
        this.count = 60
        this.isSendSMS = false
      } else {
        this.count--
        setTimeout(() => {
          this.countDown()
        }, 1000)
      }
    },
    resetContent() {
      // 拼接提交内容
      let str1 = ''
      let str2 = ''
      let str3 = ''
      if (Array.isArray(this.content) && this.content.length > 0) {
        str1 = this.concatStr(this.content)
      } else if (typeof this.content === 'string' && this.content) {
        str1 = this.content
      }
      if (this.searchText !== '') {
        str2 = this.searchText
      }
      str3 = this.$parent.reqType === 'serve' ? '企业服务' : '资产交易'
      if (str2 !== '') {
        str3 = `${str3}:搜索内容-${str2}`
      }
      if (str1 !== '') {
        str3 = `${str3}-${str1}`
      }
      return str3
    },
    concatStr(val) {
      let str1 = ''
      if (!val.length) {
        str1 = '全部服务'
      }
      if (val[1] && val[1].services && val[1].services.length > 1) {
        str1 = '多选'
      } else if (
        val[1] &&
        val[1].services &&
        val[1].services.length === 1 &&
        val[1].services[0]
      ) {
        if (val[0].text === '不限') {
          str1 = '全部服务'
        } else {
          str1 = val[0].text + '-' + val[1].services[0].text
        }
      } else if (
        !val[1] ||
        !val[1].services ||
        !val[1].services.length ||
        (!val[1].services[0] && val[0])
      ) {
        str1 = val[0].text
      }
      return str1
    },
  },
}
</script>

<style lang="less" scoped>
.subscribe {
  .subscribe-title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    line-height: 80px;
    > span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-left: 13px;
    }
  }
  .subscribe-content {
    padding: 33px 40px 40px 40px;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    .title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 52px;
      margin-bottom: 4px;
    }
    > p {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-bottom: 58px;
    }
    /deep/.sp-cell {
      padding: 0 0 19px 0;
      border-bottom: 1px solid #f4f4f4;
      margin-bottom: 44px;
      &::after {
        display: none;
      }
      /deep/.sp-field__button {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4974f5;
      }
    }
    .submit {
      text-align: center;
      margin: 48px 4px 0 4px;
      span {
        display: inherit;
        width: 100%;
        height: 96px;
        line-height: 96px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .already-login {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    span {
      display: inherit;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      margin-bottom: 24px;
    }
  }
  .no_get {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #cccccc;
  }
}
</style>
