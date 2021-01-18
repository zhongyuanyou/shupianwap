<template>
  <div>
    <div class="my-component">
      <div class="form-box">
        <div class="form-box-title">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/7ccgcy48cv40000.png"
          />
          <p class="form-box-title-name">办理报价</p>
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/drylv5blkoo0000.png"
          />
        </div>
        <div class="form-inputs">
          <!-- 1、下拉框-->
          <div class="dropdown-menu">
            <a
              v-sensorsTrack:webClick="{
                form_name: '互联网资质表单_下拉表单',
                form_type: '咨询表单',
              }"
              class="dropdown-menu-content"
              @click="showDropdownList"
            >
              <span class="dropdown-menu-content-prefix">我需要</span>
              <span class="dropdown-menu-content-val">{{
                dropdownValue.name
              }}</span>
              <img
                class="dropdown-menu-content-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/4ehy9youej60000.png"
              />
            </a>
            <sp-action-sheet
              v-model="dropdownMenuIsShow"
              :actions="dropList"
              @select="onSelect"
            />
          </div>
          <!-- 2、输入框-手机号码-->
          <div
            v-sensorsTrack:webClick="{
              form_name: '互联网资质表单_手机号',
              form_type: '咨询表单',
            }"
            class="form-input-tel"
          >
            <sp-field
              v-model="telephone"
              label="手机号"
              type="tel"
              maxlength="11"
              :formatter="telTypingVerify"
              placeholder="信息保护中，仅官方可见"
              @focus="() => (smsInputIsShow = true)"
            />
          </div>
          <!-- 3、输入框-验证码-->
          <div
            v-if="smsInputIsShow"
            v-sensorsTrack:webClick="{
              form_name: '互联网资质表单_验证码',
              form_type: '咨询表单',
            }"
            class="form-input-sms"
          >
            <sp-field
              v-model="sms"
              center
              label="验证码"
              type="tel"
              placeholder="请输入验证码"
              maxlength="6"
              :formatter="smsTypingVerify"
            >
              <template #button>
                <sp-button
                  v-sensorsTrack:webClick="{
                    form_name: '互联网资质表单_获取验证码',
                    form_type: '咨询表单',
                  }"
                  size="small"
                  type="primary"
                  @click="sendSms"
                >
                  {{
                    countdown > 0 ? `${countdown}s` : '发送验证码'
                  }}</sp-button
                >
              </template>
            </sp-field>
          </div>
          <!-- 4、提交按钮-->
          <div class="form-submit">
            <sp-button
              v-sensorsTrack:webClick="{
                form_name: '互联网资质表单_提交表单',
                form_type: '咨询表单',
              }"
              v-sensorsTrack:p_formSubmit="{
                event_name: 'p_formSubmit',
                form_name: `互联网资质表单_提交表单`,
                form_type: '咨询表单',
              }"
              type="primary"
              @click="submitForm"
              >免费预约</sp-button
            >
          </div>
        </div>
        <div class="form-note-all">
          <div v-for="item in formNotes" :key="item.id" class="form-note-item">
            <img
              class="form-note-item-img"
              src="https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png"
            />
            <span class="form-note-item-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ActionSheet, Field, Button, CellGroup, Toast } from '@chipspc/vant-dgg'

export default {
  name: 'Form',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      // 下拉
      dropList: [
        { name: 'ICP许可证', color: '#5a79e8' },
        { name: 'EDI许可证', color: '#222222' },
        { name: 'IDC许可证', color: '#222222' },
        { name: 'SP许可证', color: '#222222' },
        { name: 'ISP许可证', color: '#222222' },
        { name: '网络文化经营许可证', color: '#222222' },
        { name: '呼叫中心许可证', color: '#222222' },
        { name: '游戏软件著作权', color: '#222222' },
        { name: '其他许可', color: '#222222' },
      ],
      dropdownValue: '',
      dropdownMenuIsShow: false,
      // 手机号
      telephone: '',
      // 验证码
      smsInputIsShow: false,
      sms: '',
      formNotes: [
        {
          id: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '专业核对',
        },
        {
          id: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '全程代理',
        },
        {
          id: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '省时省力',
        },
      ],
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null,
    }
  },
  created() {
    this.dropdownValue = this.dropList[0]
  },
  methods: {
    // @--下拉
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.dropdownMenuIsShow = false
      this.dropdownValue = item
      this.dropList.forEach((obj) => {
        if (obj.name === item.name) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    showDropdownList() {
      this.dropdownMenuIsShow = true
    },
    // @--表单验证
    // 手机号输入时验证：不能输入格式不符的字符
    telTypingVerify(value) {
      return value.replace(/[^\d]/, '')
    },
    // 验证码输入时验证：不能输入格式不符的字符
    smsTypingVerify(value) {
      // 过滤输入的特殊字符及汉字
      return value.replace(/[^a-z0-9A-Z]/, '')
    },
    // 发送验证码时，验证手机号正确格式
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
    // @--表单按钮
    // 发送验证码
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
              vm.countDownFun()
            }
            Toast(res.msg)
            console.log(res.msg)
          })
        }
      }
    },
    // 验证码倒计时
    countDownFun() {
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
    // 表单提交
    submitForm() {
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
        zzlx: this.dropdownValue.name,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'hlwzz', // 业态编码。固定几个业态编码。
        place: 'cd', // 定位城市。
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr),
      }
      // 3、提交表单
      const vm = this
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 1、提示
          Toast('提交成功，请注意接听电话')
          // 2、表单主动埋点
          vm.formMaiDian()
          // 3、清空表单和清楚倒计时定时器
          const activeColor = vm.dropdownValue.color
          vm.dropdownValue.color = vm.dropList[0].color
          vm.dropList[0].color = activeColor
          vm.dropdownValue = vm.dropList[0]
          vm.telephone = ''
          vm.sms = ''
          vm.countdown = -1
          clearInterval(vm.countdownTimer)
          vm.countdownTimer = null
        } else {
          Toast(res.msg)
          console.log(res)
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
    // 表单提交有结果后，主动埋点
    formMaiDian() {
      window.sensors.track('p_formSubmitResult', {
        even_name: 'p_formSubmitResult',
        form_type: '咨询表单',
        form_name: '互联网资质表单_提交表单',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  padding-bottom: 30px;
  margin-top: -90px;
  position: relative;
  .form-box {
    width: 670px;
    margin: 0 auto;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 47px 40px 32px 40px;
    .form-box-title {
      margin-bottom: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 48px;
        height: 2px;
      }
      .form-box-title-name {
        height: 32px;
        font-size: 32px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 32px;
        margin: 0 15px;
      }
    }

    .form-inputs {
      .dropdown-menu {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        padding: 0 32px;
        .dropdown-menu-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .dropdown-menu-content-prefix {
            flex: none;
            font-size: 28px;
            font-weight: 400;
            color: #1a1a1a;
            margin-right: 33px;
          }
          .dropdown-menu-content-val {
            flex: none;
            font-size: 28px;
            font-weight: bold;
            color: #1a1a1a;
          }
          .dropdown-menu-content-img {
            flex: none;
            width: 20px;
            height: 11px;
            position: absolute;
            right: 0;
          }
        }
        // 穿透-遮罩
        /deep/ .sp-popup--bottom {
          width: @spread-page-width;
          left: 50%;
          right: auto;
          margin-left: calc(-@spread-page-width / 2);
          //transform: translateX(-126px); // 该属性因为组件样式未知bug，导致左侧出来一部分。且距离是一直固定是63px，不能转成rem
        }
        /deep/ .sp-overlay {
          width: @spread-page-width;
          left: 50%;
          right: auto;
          margin-left: calc(-@spread-page-width / 2);
        }
      }
      .form-input-tel {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        margin: 24px 0;
      }
      .form-input-sms {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        // 穿透-发送验证码按钮：固定宽高
        /deep/ .sp-button {
          width: 140px;
          height: 80px;
          background-color: transparent;
          border: none;
          color: #4974f5;
        }
        /deep/ .sp-button--small {
          padding: 0px;
        }
      }
      .form-submit {
        width: 100%;
        height: 80px;
        display: flex;
        margin: 40px 0 34px 0;
      }
    }

    .form-note-all {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .form-note-item {
        display: flex;
        align-items: center;
        .form-note-item-img {
          width: 23px;
          height: 23px;
          margin-right: 13px;
        }
        .form-note-item-name {
          font-size: 24px;
          font-weight: 400;
          color: #555555;
        }
      }
    }
  }

  // 穿透-手机号输入框：输入的字体加粗，默认的placeholder字体不加粗
  /deep/ input {
    font-weight: bold;
  }
  /deep/ input::-webkit-input-placeholder {
    color: #cccccc;
    font-weight: normal;
  }

  // 穿透-手机号输入框：
  /deep/ .sp-cell {
    background: #f8f8f8;
    height: 80px;
    padding-right: 32px;
    // 手机号输入框-左边前缀（手机号）
    .sp-field__label {
      width: auto;
      margin-right: 33px;
      font-size: 28px;
      font-weight: 400;
      color: #1a1a1a;
      flex: none !important;
    }
    // 手机号输入框-右边按钮
    .sp-button__content {
      justify-content: flex-end;
    }
  }
  // 穿透-免费预约按钮：
  /deep/ .sp-button {
    width: 100%;
    height: 80px;
    border-radius: 8px;
  }
}
</style>
