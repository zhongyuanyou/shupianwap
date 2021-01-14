<template>
  <div class="form">
    <div class="form-box">
      <div class="form-title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/36v8fqlnh5y0000.png"
          alt=""
        />
        <h4>定制代账方案</h4>
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/4nq906nfv760000.png"
          alt=""
        />
      </div>
      <span class="form-content">请输入公司年营业额，我们为您灵活制定方案</span>
      <div class="lines-scope">
        <a
          v-for="(item, index) in LinesScope"
          :key="index"
          v-sensorsTrack:webClick="{
            eventName: 'wap元素点击',
            type: '咨询表单',
            name: `代理记账表单_${item.scope}`,
          }"
          :class="[actived == index + 1 ? 'isactive' : '']"
          @click="selected(item.code)"
        >
          {{ item.scope }}
        </a>
      </div>
      <div class="input-box">
        <!-- s 公司名称 -->
        <sp-field
          v-model="company"
          v-sensorsTrack:webClick="{
            eventName: 'wap元素点击',
            type: '咨询表单',
            name: '代理记账表单_公司名称',
          }"
          label="公司名称"
          placeholder="请输入公司名称"
          maxlength="20"
          :formatter="companyTest"
        />
        <!-- s 手机号输入框 -->
        <sp-field
          v-model="telephone"
          v-sensorsTrack:webClick="{
            eventName: 'wap元素点击',
            type: '咨询表单',
            name: '代理记账表单_手机号',
          }"
          label="手机号"
          placeholder="信息保护中，仅官方可见"
          maxlength="11"
          type="tel"
          :formatter="telephoneTest"
          @focus="() => (isshow = true)"
        />
        <!-- s 获取验证码 -->
        <div v-show="isshow" class="verification-box">
          <sp-field
            v-model="sms"
            v-sensorsTrack:webClick="{
              eventName: 'wap元素点击',
              type: '咨询表单',
              name: '代理记账表单_验证码',
            }"
            label="验证码"
            placeholder="请输入验证码"
            maxlength="6"
            type="tel"
            :formatter="formatter"
          />
          <!-- s 倒计时 -->
          <span
            v-sensorsTrack:webClick="{
              eventName: 'wap元素点击',
              type: '咨询表单',
              name: '代理记账表单_获取验证码',
            }"
            class="seconds"
            @click="sendSms"
          >
            {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</span
          >
          <!-- e 倒计时 -->
        </div>
        <!-- e 获取验证码 -->
      </div>
      <!-- s 按钮 -->
      <button
        v-md-map
        v-md:p_formSubmit
        v-sensorsTrack:p_formSubmit="{
          eventName: 'p_formSubmit',
          type: '咨询表单',
          form_name: '代理记账_提交表单',
        }"
        class="free-btn"
        @click="FreeBtn()"
      >
        <span>免费定制方案</span>
      </button>
      <!-- e 按钮 -->
      <!-- s 处理事件统计 -->
      <div class="statistical">
        <span
          >今日进行<span>{{ nums.todayNum }}</span
          >件</span
        >
        <div class="line"></div>
        <span
          >累计办理<span>{{ nums.totalNum }}</span
          >件</span
        >
      </div>
      <!-- e 处理事件统计 -->
    </div>
  </div>
</template>

<script>
import { Field, ActionSheet, CountDown, Toast } from '@chipspc/vant-dgg'
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: {
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
  },
  props: {
    nums: {
      type: Object,
      default: () => {
        return {
          totalNum: 640116,
          todayNum: 123,
        }
      },
    },
  },
  data() {
    return {
      LinesScope: [
        { code: 1, scope: '小规模纳税人' },
        { code: 2, scope: '一般纳税人' },
      ],
      actived: 1,
      read: true,
      scope: '小规模纳税人',
      telephone: '', // 电话号码
      sms: '', // 验证码
      isshow: false, // 验证码框是否显示
      selectshow: false, // 下拉选择框是否显示
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null,
      company: '',
    }
  },
  created() {
    this.nums.totalNum = this.nums.totalNum.toLocaleString()
    this.nums.todayNum = this.nums.todayNum.toLocaleString()
  },
  methods: {
    companyTest(value) {
      return value.replace(/[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/, '')
    },
    telephoneTest(value) {
      return value.replace(/[^\d]/, '')
    },
    formatter(value) {
      // 过滤输入的特殊字符及汉字
      return value.replace(/[^a-z0-9A-Z]/, '')
    },
    selected(index) {
      this.actived = index
      return (this.scope = this.LinesScope[index - 1].scope)
    },
    // 验证码倒计时
    countDown() {
      const vm = this
      this.countdown = 60
      this.countdownTimer = setInterval(function () {
        if (vm.countdown === 0) {
          vm.countdown = -1
          clearInterval(vm.countdownTimer)
          vm.countdownTimer = null
        } else {
          vm.countdown > 0 && vm.countdown--
        }
      }, 1000)
    },
    sendSms() {
      const vm = this
      if (this.countdown > -1) {
      } else {
        // 1、验证手机号
        const verifyTelResult = this.verifyTel()
        // 2、验证手机号成功发送验证码
        // 2.1 发送验证码成功，倒计时开始。2.2发送验证码失败，提示并倒计时不开始
        if (verifyTelResult) {
          const _data = {
            tel: this.telephone,
            type: 'gs',
          }
          window.promotion.privat.getSmsCode(_data, (res) => {
            // 发送成功，倒计时开始
            if (res.error === 0) {
              vm.countDown()
            } else {
              Toast(res.msg)
            }
          })
        }
      }
    },
    FreeBtn() {
      // 1、验证表单数据格式
      const _tel = this.telephone
      const _code = this.sms
      const _company = this.company
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (!_tel) {
        Toast('请输入电话号码')
        return
      }
      if (!_telReg.test(_tel)) {
        Toast('请输入正确的电话号码')
        return
      }
      if (!_code) {
        Toast('请输入验证码')
        return
      }
      if (!_company) {
        Toast('请输入公司名称')
        return
      }
      // 2、整合表单数据
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      const contentStr = {
        LinesScope: this.scope,
        公司名称: this.company,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名用户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'kjdl', // 业态编码。
        place: 'cd', // 定位城市。
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr),
      }
      // 3、提交表单
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
          console.log(res)
          this.telephone = ''
          this.sms = ''
          this.countdown = -1
          this.company = ''
          this.actived = 1
          window.sensors.track('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '代理记账表单_提交表单',
          })
          console.log(params)
          Toast('提交成功，请注意接听电话')
        } else {
          Toast(res.msg)
          this.sms = ''
          this.countdown = -1
        }
      })
    },

    // 验证手机号
    verifyTel() {
      const _tel = this.telephone
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码') && false
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确的手机号码') && false
      }
      return true
    },
    getDate() {
      const timeStamp = new Date()
      // 获取当前年
      const currentYear = JSON.stringify(timeStamp.getFullYear())
      // 获取当前月
      const currentMonth = JSON.stringify(timeStamp.getMonth() + 1)
      // 获取当前日
      const currentDate = JSON.stringify(timeStamp.getDate())
      const currentHour = JSON.stringify(timeStamp.getHours()) // 获取当前小时数(0-23)
      const currentMin = JSON.stringify(timeStamp.getMinutes()) // 获取当前分钟数(0-59)
      const currentSeconds = JSON.stringify(timeStamp.getSeconds())
      // 获取当前时间
      const nowTimeString =
        currentYear +
        currentMonth +
        currentDate +
        currentHour +
        currentMin +
        currentSeconds
      return nowTimeString
    },
  },
}
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  margin-top: -80px;
  padding: 0 40px;
  position: relative;
  .form-box {
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 0 40px;
    .form-title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 47px;
      > img {
        width: 48px;
        height: 2px;
        &:first-child {
          margin-right: 17px;
        }
        &:last-child {
          margin-left: 17px;
        }
      }
      > h4 {
        display: block;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 31px;
      }
    }
    .form-content {
      display: block;
      margin-top: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      text-align: center;
    }
    .lines-scope {
      display: flex;
      align-items: center;
      margin-top: 40px;
      > a {
        display: block;
        flex: 1;
        width: 186px;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #555555;
        text-align: center;
        line-height: 80px;
        &:first-child {
          margin-right: 16px;
        }
      }
      .isactive {
        background: #ecf1fe;
        border: 1px solid #4974f5;
        border-radius: 8px;
        color: #4974f5;
      }
    }
    .input-box {
      margin-top: 24px;
      position: relative;
      /deep/.sp-cell {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        justify-content: space-between;
        align-items: center;
        &::after {
          display: none;
        }
        &:not(:first-child) {
          margin-top: 24px;
          /deep/.sp-field__control {
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #1a1a1a;
            flex: 1;
            &::-webkit-input-placeholder {
              color: #cccccc;
              font-weight: normal;
            }
          }
        }
        &:nth-of-type(3) {
          /deep/.sp-field__body {
            width: 80%;
          }
        }
      }
      .verification-box {
        position: relative;
        margin-top: 24px;
        > span {
          display: block;
          position: absolute;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4974f5;
          top: 26px;
          right: 34px;
        }
        .countdown {
          position: absolute;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4974f5;
          top: 26px;
          right: 34px;
        }
      }

      /deep/.sp-cell__title {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        width: 115px !important;
      }
      /deep/.sp-field__control {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        flex: 1;
        &::-webkit-input-placeholder {
          color: #cccccc;
          font-weight: normal;
        }
      }
      /deep/.sp-field__body {
        width: 80%;
      }
      .input-ic-open {
        position: absolute;
        top: 30px;
        right: 32px;
      }
    }
    > button {
      width: 100%;
      height: 88px;
      background: #4974f5;
      border-radius: 8px;
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        display: block;
      }
    }
  }
  .statistical {
    margin: 32px 0 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    .line {
      width: 1px;
      height: 20px;
      background: #cdcdcd;
    }
    > span {
      display: block;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      margin-top: -10px;
      color: #555555;
      line-height: 24px;
      margin-top: 1px;
      > span {
        color: #ec5330;
      }
      &:first-child {
        padding-right: 25px;
      }
      &:last-child {
        padding-left: 26px;
      }
    }
  }
}
</style>
