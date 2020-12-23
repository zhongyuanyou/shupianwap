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
          placeholder="请输入手机号码"
        />
        <sp-field v-model="sms" center placeholder="请输入验证码">
          <template #button>
            <span :class="{ no_get: isSendSMS }" @click="getSMS">{{
              isSendSMS ? `(${count})重新获取` : '获取验证码'
            }}</span>
          </template>
        </sp-field>
      </template>
      <div v-else class="already-login">
        <span>186****2232</span>
      </div>
      <div class="submit" @click="submitSubscribe">
        <span>免费订阅通知</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
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
  },
  data() {
    return {
      tel: '',
      sms: '',
      isLogin: false, // 是否登录
      smsStr: '获取验证码',
      count: 60,
      isSendSMS: false,
    }
  },
  mounted() {
    this.isLogin = false
  },
  methods: {
    submitSubscribe() {
      // 提交订阅
    },
    getSMS() {
      if (!this.isSendSMS) {
        // 获取验证码
        this.isSendSMS = true
        this.countDown()
      }
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
