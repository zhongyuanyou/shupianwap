<template>
  <div>
    <div class="my-component">
      <div class="form-box">
        <div class="form-box-title">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/7ccgcy48cv40000.png"
          />
          <p class="form-box-title-name">只需5秒 一键为您适配公司</p>
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/drylv5blkoo0000.png"
          />
        </div>
        <div class="form-inputs">
          <!-- 1、公司类型下拉框-->
          <div class="dropdown-menu">
            <div class="dropdown-menu-content" @click="showDropdownList">
              <span class="dropdown-menu-content-prefix">我需要</span>
              <span v-if="dropdownValue" class="dropdown-menu-content-val">
                {{ dropdownValue }}
              </span>
              <span
                v-if="!dropdownValue"
                class="dropdown-menu-content-placeholder"
              >
                请选择
              </span>
              <img
                class="dropdown-menu-content-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/4ehy9youej60000.png"
              />
            </div>
            <sp-popup v-model="dropdownMenuIsShow" round position="bottom">
              <sp-picker
                title="选择公司类型"
                show-toolbar
                :default-index="Math.floor(dropList.length / 2)"
                :columns="dropList"
                @confirm="onConfirm"
                @cancel="onCancel"
              />
            </sp-popup>
          </div>
          <!-- 1、城市下拉框-->
          <div class="dropdown-menu dropdown-menu-margin">
            <div class="dropdown-menu-content" @click="showCityDropdownList">
              <span class="dropdown-menu-content-prefix">城市</span>
              <span v-if="cityValue" class="dropdown-menu-content-val">{{
                cityValue
              }}</span>
              <span v-if="!cityValue" class="dropdown-menu-content-placeholder">
                请选择
              </span>
              <img
                class="dropdown-menu-content-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/4ehy9youej60000.png"
              />
            </div>
            <sp-popup v-model="cityMenuIsShow" round position="bottom">
              <sp-picker
                title="选择城市"
                show-toolbar
                :default-index="Math.floor(cityList.length / 2)"
                :columns="cityList"
                @confirm="onCityConfirm"
                @cancel="onCancel"
              />
            </sp-popup>
          </div>
          <!-- 2、输入框-手机号码-->
          <div class="form-input-tel">
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
          <div class="form-input-sms">
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
                <sp-button size="small" type="primary" @click="sendSms">
                  {{
                    countdown > 0 ? `${countdown}s` : '发送验证码'
                  }}</sp-button
                >
              </template>
            </sp-field>
          </div>
          <!-- 4、提交按钮-->
          <div class="form-submit">
            <sp-button type="primary" @click="submitForm">立即获取 </sp-button>
          </div>
        </div>
        <div class="form-note-all">
          <div v-for="item in formNotes" :key="item.id" class="form-note-item">
            <div class="form-note-item-div-img">
              <img
                class="form-note-item-img"
                src="https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png"
              />
            </div>
            <span class="form-note-item-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Popup,
  Picker,
  ActionSheet,
  Field,
  Button,
  CellGroup,
  Toast,
} from '@chipspc/vant-dgg'
import { dict } from '~/api'

export default {
  name: 'Form',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      // 公司类型下拉
      dropList: ['有限责任公司', '股份有限公司', '无限公司'],
      dropdownValue: '',
      dropdownMenuIsShow: false,
      // 城市下拉
      cityNameList: [],
      cityList: [
        '全国',
        '重庆',
        '长沙',
        '武汉',
        '上海',
        '北京',
        '深圳',
        '广州',
        '成都',
        '杭州',
        '郑州',
        '佛山',
        '东莞',
        '宜昌',
        '石家庄',
        '其他城市',
      ],
      cityValue: '',
      cityMenuIsShow: false,
      // 手机号
      telephone: '',
      // 验证码
      smsInputIsShow: false,
      sms: '',
      formNotes: [
        {
          id: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '价格透明',
        },
        {
          id: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '信息安全',
        },
        {
          id: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7debdq96t480000.png',
          name: '官方保障',
        },
      ],
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null,
    }
  },
  created() {},
  methods: {
    // @--下拉
    showDropdownList() {
      this.dropdownMenuIsShow = true
    },
    showCityDropdownList() {
      this.cityMenuIsShow = true
    },
    onCancel() {
      this.dropdownMenuIsShow = false
      this.cityMenuIsShow = false
    },
    onConfirm(value, index) {
      this.dropdownMenuIsShow = false
      this.dropdownValue = value
    },
    onCityConfirm(value, index) {
      this.cityMenuIsShow = false
      this.cityValue = value
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
      if (this.dropdownValue === '请选择') {
        Toast('请选择公司类型')
        return
      }
      if (this.cityValue === '请选择') {
        Toast('请选择城市')
        return
      }
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
      // 2、整合表单数据
      const webUrl = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      const contentStr = {
        yeWuLeiXing: this.dropdownValue,
        city: this.cityValue,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'zhgszr', // 业态编码。固定几个业态编码。
        place: 'cd', // 定位城市。地区编码，需传编码
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
          vm.dropdownValue = ''
          vm.cityValue = ''
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
        even_name: 'p_formSubmit',
        form_type: '咨询',
        form_name: '一键适配公司表单提交',
        track_code: 'SPTG000003',
      })
    },
  },
  head() {
    return {
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
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
            width: 86px;
          }
          .dropdown-menu-content-val {
            flex: none;
            font-size: 28px;
            font-weight: bold;
            color: #1a1a1a;
          }
          .dropdown-menu-content-placeholder {
            flex: none;
            font-size: 28px;
            color: #cccccc;
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
      .dropdown-menu-margin {
        margin-top: 24px;
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
          width: 145px;
          height: 80px;
          background-color: transparent;
          border: none;

          font-size: 28px;
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
        .form-note-item-div-img {
          width: 24px;
          height: 24px;
          margin-right: 13px;
          .form-note-item-img {
            display: flex;
            width: 24px;
            height: 24px;
          }
        }
        .form-note-item-name {
          font-size: 26px;
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
    font-size: 28px;
    // 手机号输入框-左边前缀（手机号）
    .sp-field__label {
      width: auto;
      margin-right: 33px;
      color: #1a1a1a;
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
