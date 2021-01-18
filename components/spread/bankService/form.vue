<template>
  <div class="form">
    <div class="form-box">
      <div class="form-title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/62to3cpd7h40000.png"
          alt=""
        />
        <h4>立即预约银行服务</h4>
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/x5o8jch38cg000.png"
          alt=""
        />
      </div>
      <div class="input-box">
        <!-- s行业下拉框 -->
        <sp-field
          v-model="value"
          v-sensorsTrack:webClick="{
            eventName: 'wap元素点击',
            type: '咨询表单',
            name: '银行服务_下拉表单',
          }"
          label="我需要"
          :readonly="read"
          @click="selectshow = true"
        />
        <div
          @click="
            () => {
              selectshow = true
            }
          "
        >
          <my-icon
            name="tab_ic_all_n"
            size="0.2rem"
            class="input-ic-open"
            color="#cccccc"
          ></my-icon>
        </div>
        <!-- e行业下拉框 -->
        <!-- s下拉选项框 -->
        <sp-action-sheet
          v-model="selectshow"
          :actions="actions"
          @select="onSelect"
        />
        <!-- e下拉选项框  -->
        <sp-field
          v-model="telephone"
          v-sensorsTrack:webClick="{
            eventName: 'wap元素点击',
            type: '咨询表单',
            name: '银行服务_手机号',
          }"
          type="tel"
          label="手机号"
          placeholder="信息保护中，仅官方可见"
          maxlength="11"
          :formatter="telephoneTest"
          @focus="() => (isshow = true)"
        />
        <!-- s 获取验证码 -->
        <div
          v-show="isshow"
          v-sensorsTrack:webClick="{
            eventName: 'wap元素点击',
            type: '咨询表单',
            name: '银行服务_验证码',
          }"
          class="verification-box"
        >
          <sp-field
            v-model="sms"
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
              name: '银行服务_获取验证码',
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
        v-sensorsTrack:p_formSubmit="{
          eventName: 'p_formSubmit',
          form_type: '咨询表单',
          name: '银行服务_提交表单',
        }"
        class="free-btn"
        @click="freeBtn()"
      >
        <span>获取报价</span>
      </button>
      <!-- e 按钮 -->
      <div class="bottom-lables">
        <div v-for="(item, index) in lables" :key="index">
          <div class="img-box">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/5q17nyoc9pw0000.png"
              alt=""
            />
          </div>
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, ActionSheet, CountDown, Toast } from '@chipspc/vant-dgg'
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: {
    MyIcon,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [CountDown.name]: CountDown,
    [Toast.name]: Toast,
  },
  data() {
    return {
      read: true,
      value: '银行服务', // 行业信息
      telephone: '', // 电话号码
      sms: '', // 验证码
      number: '',
      isshow: false, // 验证码框是否显示
      selectshow: false, // 下拉选择框是否显示
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null,
      actions: [
        { name: '银行服务', color: '#5a79e8' },
        { name: '一般户开户', color: '#222222' },
        { name: '基本户开户', color: '#222222' },
        { name: '银行销户', color: '#222222' },
        { name: '其它服务', color: '#222222' },
      ],
      lables: ['一站式解决', '资料代审', '全程代办'],
    }
  },
  created() {},
  methods: {
    telephoneTest(value) {
      return value.replace(/[^\d]/, '')
    },
    formatter(value) {
      // 过滤输入的特殊字符及汉字
      return value.replace(/[^a-z0-9A-Z]/, '')
    },
    // 获取验证码
    obtain() {
      this.obtainshow = false
      this.timeshow = true
      if (this.countdown > -1) {
      }
    },
    // 验证码倒计时
    // 验证码倒计时
    countDown() {
      const vm = this
      this.countdown = 59
      clearInterval(vm.countdownTimer)
      vm.countdownTimer = null
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
            }
            Toast(res.msg)
          })
        }
      }
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
    // 底部下拉框
    onSelect(item) {
      this.selectshow = false
      this.value = item.name
      this.actions.forEach((obj) => {
        if (obj.name === item.name) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    freeBtn() {
      // 1、验证表单数据格式
      const _tel = this.telephone
      const _code = this.sms
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
      if (this.select === '选择税务类型') {
        Toast('请选择税务类型')
        return
      }
      // 2、整合表单数据
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      const contentStr = {
        industry: this.value,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'gszc', // 业态编码。
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
          this.value = '银行服务'
          window.sensors.track('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '银行服务表单_提交表单',
          })
          this.actions.forEach((item, index) => {
            item.color = `${index > 0 ? '#222222' : '#5a79e8'}`
          })
          clearInterval(this.countdownTimer)
          this.countdownTimer = null
          Toast('提交成功，请注意接听电话')
        } else {
          Toast(res.msg)
          this.sms = ''
          this.countdown = -1
        }
      })
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
  }
  .input-box {
    margin-top: 47px;
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
          /deep/.sp-field__body {
            width: 100%;
          }
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
        line-height: 27px;
        top: 26px;
        right: 34px;
      }
      .countdown {
        position: absolute;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 27px;
        top: 26px;
        right: 34px;
      }
    }

    /deep/.sp-cell__title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      flex: none;
      width: 85px !important;
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
  .free-btn {
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
  .bottom-lables {
    margin: 32px 0;
    display: flex;
    align-items: center;
    padding: 0 21px 0 18px;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      .img-box {
        width: 24px;
        height: 24px;
        padding-top: 1px;
        position: relative;
        margin-right: 10px;
        display: flex;
        flex-shrink: 0;
        > img {
          position: absolute;
          width: 23px;
          height: 23px;
          flex-shrink: 0;
        }
      }
      > span {
        display: block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
      }
    }
  }
}
</style>
