<template>
  <div class="chaxun">
    <div class="all-form">
      <div class="title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/7ccgcy48cv40000.png"
        />
        <p class="title-name">快速查询</p>
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/drylv5blkoo0000.png"
        />
      </div>
      <div class="form">
        <div class="dropdown-menu">
          <div
            v-md-map
            v-md:webClick
            data-name="工商聚合页_表单_我需要"
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
          </div>
          <sp-action-sheet
            v-model="dropdownMenuIsShow"
            :actions="dropList"
            @select="onSelect"
          />
        </div>
        <div class="input-all">
          <sp-field
            v-model="telephone"
            v-md-map
            v-md:webClick
            data-name="工商聚合页_表单_手机号"
            label="手机号"
            type="tel"
            maxlength="11"
            :formatter="telTypingVerify"
            placeholder="信息保护中，仅官方可见"
            @focus="() => (smsInputIsShow = true)"
          />
        </div>
        <div v-if="smsInputIsShow" class="input-all1">
          <sp-field
            v-model="sms"
            v-md-map
            v-md:webClick
            data-name="工商聚合页_表单_验证码"
            center
            label="验证码"
            type="tel"
            placeholder="请输入验证码"
            maxlength="6"
            :formatter="smsTypingVerify"
          >
            <template #button>
              <sp-button
                v-md-map
                v-md:webClick
                data-name="工商聚合页_表单_获取验证码"
                size="small"
                type="primary"
                @click="sendSms"
              >
                {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</sp-button
              >
            </template>
          </sp-field>
        </div>
        <div class="submit">
          <sp-button
            v-md-map
            v-md:p_formSubmit
            data-event_name="p_formSubmit"
            data-form_type="咨询表单"
            data-form_name="工商聚合页_表单"
            type="primary"
            @click="submitForm"
            >免费预约</sp-button
          >
        </div>
      </div>
      <div class="notes">
        <div v-for="item in formNotes" :key="item.id" class="note-item">
          <img
            class="note-item-img"
            src="https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png"
          />
          <span class="note-item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ActionSheet, Field, Button, CellGroup, Toast } from '@chipspc/vant-dgg'

export default {
  name: 'KuaiSuChaXun',
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
        { id: 1, name: '公司注册', color: '#5a79e8' },
        { id: 2, name: '工商变更', color: '#222222' },
        { id: 3, name: '代理记账', color: '#222222' },
        { id: 4, name: '印章刻制', color: '#222222' },
        { id: 5, name: '银行服务', color: '#222222' },
        { id: 6, name: '许可证办理', color: '#222222' },
        { id: 7, name: '其他服务', color: '#222222' },
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
          name: '资金担保',
        },
        {
          id: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '信息安全',
        },
        {
          id: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '平台服务',
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
            console.log(res.msg)
          })
        }
      }
    },
    // 验证码倒计时
    countDownFun() {
      const vm = this
      this.countdown = 59
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
        yeWuLeiXing: this.dropdownValue.name,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'gszc', // 业态编码。固定几个业态编码。
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
      window.getTrackRow('p_formSubmitResult', {
        even_name: 'p_formSubmitResult',
        form_type: '咨询表单',
        form_name: '工商聚合页_表单',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.chaxun {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  .all-form {
    width: 670px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 47px 40px 32px 40px;
    .title {
      margin-bottom: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 48px;
        height: 2px;
      }
      .title-name {
        height: 32px;
        font-size: 32px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 32px;
        margin: 0 15px;
      }
    }

    .form {
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
        /deep/ .sp-popup--bottom {
          width: @spread-page-width;
          left: 50%;
          right: auto;
          //transform: translateX(-126px); // 该属性因为组件样式未知bug，导致左侧出来一部分。且距离是一直固定是63px，不能转成rem
          margin-left: calc(-@spread-page-width / 2);
        }
        /deep/ .sp-overlay {
          width: @spread-page-width;
          left: 50%;
          right: auto;
          margin-left: calc(-@spread-page-width / 2);
        }
      }
      .input-all {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        margin: 24px 0;
      }
      .input-all1 {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        /deep/ .sp-button {
          width: 140px;
          height: 80px;
          border-radius: 8px;
          background-color: transparent;
          border: none;
          color: #4974f5;
        }
        /deep/ .sp-button--small {
          padding: 0px;
        }
      }
      /deep/ input {
        font-weight: bold;
      }
      /deep/ input::-webkit-input-placeholder {
        color: #cccccc;
        font-weight: normal;
      }
      .submit {
        width: 100%;
        height: 80px;
        display: flex;
        margin: 40px 0 34px 0;
      }
      /deep/ .sp-cell {
        background: #f8f8f8;
        height: 80px;
        padding-right: 32px;
        .sp-field__label {
          width: auto;
          margin-right: 33px;
        }
        .sp-button__content {
          justify-content: flex-end;
        }
      }
      /deep/ .sp-hairline--top-bottom::after {
        display: none;
      }
      /deep/ .sp-button {
        width: 100%;
        height: 80px;
        border-radius: 8px;
      }
      /deep/ .sp-button::before {
        background: transparent;
      }
    }

    .notes {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .note-item {
        display: flex;
        align-items: center;
        .note-item-img {
          width: 23px;
          height: 23px;
          margin-right: 13px;
        }
        .note-item-name {
          font-size: 24px;
          font-weight: 400;
          color: #555555;
        }
      }
    }
  }
}
</style>
