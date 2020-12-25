<template>
  <div class="form">
    <div class="form-box">
      <div class="form-title">
        <img
          src="~/assets/spreadImages/agency/busi_img_dljztitrleft@1,5x.png"
          alt=""
        />
        <h4>定制代账方案</h4>
        <img
          src="~/assets/spreadImages/agency/busi_img_dljztitright@1,5x.png"
          alt=""
        />
      </div>
      <span class="form-content">请输入公司年营业额，我们为您灵活制定方案</span>
      <div class="lines-scope">
        <div
          v-for="(item, index) in LinesScope"
          :key="index"
          :class="[actived == index + 1 ? 'isactive' : '']"
          @click="selected(item.code)"
        >
          {{ item.scope }}
        </div>
      </div>
      <div class="input-box">
        <!-- s行业下拉框 -->
        <sp-field
          v-model="value"
          label="行业"
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
          label="手机号"
          placeholder="信息保护中，仅官方可见"
          maxlength="11"
          @focus="() => (isshow = true)"
        />
        <!-- s 获取验证码 -->
        <div class="verification-box">
          <sp-field
            v-show="isshow"
            v-model="sms"
            label="验证码"
            placeholder="请输入验证码"
          />
          <!-- s 倒计时 -->
          <span class="seconds" @click="sendSms">
            {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</span
          >
          <!-- e 倒计时 -->
        </div>
        <!-- e 获取验证码 -->
      </div>
      <!-- s 按钮 -->
      <button @click="FreeBtn()"><span>免费定制方案</span></button>
      <!-- e 按钮 -->
      <!-- s 处理事件统计 -->
      <div class="statistical">
        <span
          >今日进行 <span>{{ nums.todayNum }}</span
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
    MyIcon,
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
          todayNum: 12528,
          totalNum: 652517,
        }
      },
    },
  },
  data() {
    return {
      LinesScope: [
        { code: 1, scope: '0-100万' },
        { code: 2, scope: '100-500万' },
        { code: 3, scope: '500万以上' },
      ],
      actived: 1,
      read: true,

      value: '科技信息', // 行业信息
      telephone: '', // 电话号码
      sms: '', // 验证码
      isshow: false, // 验证码框是否显示
      selectshow: false, // 下拉选择框是否显示
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null,
      actions: [
        { name: '科技信息', color: '#5a79e8' },
        { name: '广告传媒', color: '#222222' },
        { name: '金融投资', color: '#222222' },
        { name: '电子贸易', color: '#222222' },
        { name: '教育培训', color: '#222222' },
        { name: '物业地产', color: '#222222' },
        { name: '经济中介', color: '#222222' },
        { name: '建筑装饰', color: '#222222' },
        { name: '家居建材', color: '#222222' },
        { name: '通讯网络', color: '#222222' },
        { name: '实业生产', color: '#222222' },
        { name: '珠宝服饰', color: '#222222' },
        { name: '文化初版', color: '#222222' },
        { name: '印刷包装', color: '#222222' },
        { name: '餐饮美容', color: '#222222' },
        { name: '咨询服务', color: '#222222' },
        { name: '食品农业', color: '#222222' },
        { name: '会务展览', color: '#222222' },
        { name: '物流供应链', color: '#222222' },
        { name: '其他行业', color: '#222222' },
      ], // 下拉框内容
    }
  },
  created() {
    this.dropdownValue = this.actions[0]
  },
  methods: {
    selected(code) {
      this.actived = code
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
            }
            console.log(res.msg)
          })
        }
      }
    },
    FreeBtn() {
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
        industry: this.dropdownValue.name,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
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
          Toast('提交成功，请注意接听电话')
        } else {
          console.log(res)
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
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;
      > div {
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
        width: 90px !important;
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
