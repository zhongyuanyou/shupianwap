<template>
  <div>
    <!--s  查询表单 -->
    <div class="audit-company-name-from">
      <div class="audit-company-name-from__center">
        <!--s 表单标题 -->
        <h1 class="audit-company-name-from__center__title">
          <i>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
              alt="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
            />
          </i>
          <span>输入信息</span> <span>免费查询</span>
          <i>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
              alt="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
            />
          </i>
        </h1>
        <!--e 表单标题 -->
        <div class="audit-company-name-from__center__input">
          <!-- s城市选择 -->
          <a href="javascript:;">
            <div
              v-sensorsTrack:webClick="{
                name: `核名表单_城市下拉表单`,
              }"
              class="audit-company-name-from__center__input__city"
              @click="isShowCity = true"
            >
              <span>城市</span>
              <div>{{ cityName ? cityName : '成都' }}</div>
              <sp-icon name="arrow-down" />
            </div>
          </a>
          <!-- e城市选择 -->
          <sp-cell-group>
            <!-- s公司名称 -->
            <sp-field
              v-model="companyName"
              v-sensorsTrack:webClick="{
                form_name: `核名表单_公司名称`,
              }"
              label="公司名称"
              :maxlength="5"
              :formatter="companyTest"
              placeholder="3-5个"
            />
            <!-- e公司名称 -->
            <!-- s行业选择 -->
            <sp-field
              v-model="industry"
              v-sensorsTrack:webClick="{
                form_name: `核名表单_行业下拉表单`,
              }"
              label="行业"
              placeholder="如技术"
              right-icon="arrow-down"
              :maxlength="4"
              readonly
              @click="isShow = true"
            />
            <!-- s行业选择 -->
          </sp-cell-group>
          <sp-button type="primary" size="large" @click="onInquire"
            >马上查询</sp-button
          >
          <!-- s 核名数据 -->
          <div class="audit-company-name-from__center__input__audit">
            <p>
              今日核名<span>{{ total.auditNameSum }}</span
              >次
            </p>
            <i></i>
            <p>
              累计核名<span>{{ total.addUpAuditNameSum }}</span
              >次
            </p>
          </div>
          <!-- e 核名数据 -->
          <!--s城市弹窗 -->
          <sp-action-sheet
            v-model="isShowCity"
            :actions="city"
            @select="onCitySelect"
          />
          <!--e城市弹窗 -->

          <!-- s行业弹窗 -->
          <sp-action-sheet
            v-model="isShow"
            :actions="actions"
            @select="onSelect"
          />
          <!-- e行业弹窗 -->
        </div>
      </div>
    </div>
    <!--e  查询表单 -->
    <!--s 手机号弹窗 -->
    <div v-show="isOverlay" class="wrapper">
      <div class="wrapper__verify">
        <!--s 手机号弹窗标题 -->
        <h1>
          <i>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
              alt="https://cdn.shupian.cn/sp-pt/wap/2la00918hu00000.png"
            />
          </i>
          <span>注册先核名</span>
          <span>提高成功率</span>
          <i>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
              alt="https://cdn.shupian.cn/sp-pt/wap/f6v01c39c280000.png"
            />
          </i>
        </h1>
        <!-- e 手机号弹窗标题 -->
        <p>千万补贴进行中，公司注册超值优惠</p>
        <!-- s手机号表单 -->
        <sp-cell-group>
          <sp-field
            v-model="tel"
            v-sensorsTrack:webClick="{
              form_name: `核名表单_手机号`,
            }"
            type="tel"
            label="手机号"
            :formatter="telephoneTest"
            :maxlength="11"
            placeholder="信息保护中，请放心填写"
          />
          <sp-field
            v-model="sms"
            v-sensorsTrack:webClick="{
              form_name: `核名表单_验证码`,
            }"
            center
            :maxlength="6"
            label="验证码"
            type="tel"
            placeholder="请输入验证码"
            :formatter="formatter"
          >
            <template #button>
              <sp-button
                v-sensorsTrack:webClick="{
                  form_name: `核名表单_获取验证码`,
                }"
                size="small"
                type="primary"
                @click="onSmsCode"
                >{{ countdown > 0 ? `${countdown}s` : '获取验证码' }}</sp-button
              >
            </template>
          </sp-field>
        </sp-cell-group>
        <!-- e 手机号表单 -->
        <sp-button
          v-sensorsTrack:p_formSubmit="{
            event_name: 'p_formSubmit',
            form_type: '咨询表单',
            form_name: `核名表单_提交表单`,
          }"
          type="primary"
          size="large"
          @click="checkFormData"
          >立即获取核名结果</sp-button
        >
      </div>
    </div>
    <!-- e 手机号弹窗 -->
    <!-- s 遮罩层 -->
    <sp-overlay :show="isOverlay" @click="isOverlay = false"> </sp-overlay>
    <!-- e 遮罩层 -->
  </div>
</template>

<script>
import {
  CellGroup,
  Field,
  Icon,
  Button,
  ActionSheet,
  Overlay,
  Toast,
  Form,
  CountDown,
} from '@chipspc/vant-dgg'
import { checkPhone } from '~/utils/check'
export default {
  name: 'AuditCompanyNameFrom',
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [ActionSheet.name]: ActionSheet,
    [Overlay.name]: Overlay,
    [Toast.name]: Toast,
    [Form.name]: Form,
    [CountDown.name]: CountDown,
  },
  props: {
    total: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // 城市
      city: [
        {
          id: 1,
          name: '成都',
          color: '#5a79e8',
        },
        {
          id: 2,
          name: '重庆',
          color: '#222222',
        },
        {
          id: 3,
          name: '长沙',
          color: '#222222',
        },
        {
          id: 4,
          name: '武汉',
          color: '#222222',
        },
        {
          id: 5,
          name: '上海',
          color: '#222222',
        },
        {
          id: 6,
          name: '北京',
          color: '#222222',
        },
        {
          id: 7,
          name: '深圳',
          color: '#222222',
        },
        {
          id: 8,
          name: '广州',
          color: '#222222',
        },
        {
          id: 9,
          name: '杭州',
          color: '#222222',
        },
        {
          id: 10,
          name: '郑州',
          color: '#222222',
        },
        {
          id: 11,
          name: '佛山',
          color: '#222222',
        },
        {
          id: 12,
          name: '东莞',
          color: '#222222',
        },
        {
          id: 13,
          name: '宜昌',
          color: '#222222',
        },
        {
          id: 14,
          name: '石家庄',
          color: '#222222',
        },
      ],
      // 公司名
      companyName: '',
      // 选择的行业
      industry: '',
      // 是否打开行业弹窗
      isShow: false,
      // 是否打开手机号弹窗
      isOverlay: false,
      // 是否打开城市弹窗
      isShowCity: false,
      // 验证码
      sms: '',
      // 手机号
      tel: '',
      // 选择的城市
      cityName: '成都',
      // 发送验证码倒计时60秒
      countdown: -1,
      // 验证码定时器
      countdownTimer: null,
      // 行业
      actions: [
        { name: '科技信息', color: '#222222' },
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
        { name: '商标资质', color: '#222222' },
        { name: '其他', color: '#222222' },
      ],
      // 默认核名数据
      addUpAuditNameSum: '9,280',
      auditNameSum: 82, // 每日默认
    }
  },
  watch: {},
  created() {},

  methods: {
    // 选择城市
    onCitySelect(item) {
      this.cityName = item.name
      this.isShowCity = false
      this.onStyle(this.city, item.name)
    },
    //  行业选择
    onSelect(item) {
      this.industry = item.name
      this.isShow = false
      this.onStyle(this.actions, item.name)
    },
    // 选中样式
    onStyle(data, value) {
      data.forEach((obj) => {
        if (obj.name === value) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    //  手机号弹窗提交
    onInquire() {
      const inputValue = this.companyName.split('')
      if (this.companyName === '') {
        Toast('请填写公司名')
      } else if (inputValue.length < 3) {
        Toast('公司名格式不正确')
      } else if (this.industry === '') {
        Toast('请选择行业')
      } else {
        this.isOverlay = true
      }
    },
    // 表单提交
    checkFormData() {
      if (this.tel === '') {
        Toast('手机号不能为空')
      } else if (!checkPhone(this.tel)) {
        Toast('手机号格式有误')
      } else if (this.sms === '') {
        Toast('验证码不能为空')
      } else {
        // 整合未登录时表单数据
        const webUrl = window.location.href
        const fromId = this.getDate() + this.tel // 生成表单唯一识别id 当前时间 +手机号
        const contentStr = {
          industry: this.industry,
          公司名称: this.companyName,
        }
        const params = {
          name: '匿名客户',
          fromId, // 唯一ID提交资源中心
          tel: this.tel, // 手机号
          url: webUrl, // 页面url
          type: 'gshm', // 业态编码
          place: this.cityName, // 城市
          device: 'wap', // 设备：pc,wap
          web: 'SP', // 归属渠道：xmt,zytg,wxgzh
          smsCode: this.sms, // 验证码
          content: JSON.stringify(contentStr), // 公司名 行业
        }
        window.promotion.privat.consultForm(params, (res) => {
          if (res.error === 0) {
            // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
            Toast('提交成功，请注意接听电话')
            this.tel = ''
            this.industry = ''
            this.companyName = ''
            this.countdown = -1
            clearInterval(this.countdownTimer)
            this.countdownTimer = null
            this.sms = ''
            this.cityName = '成都'
            this.onStyle(this.actions, this.industry)
            this.onStyle(this.city, this.cityName)
            this.isOverlay = false
            window.sensors.track('p_fromSubmitResult', {
              even_name: 'p_fromSubmitResult',
              from_type: '咨询表单',
              from_name: '核名表单_提交表单',
            })
          } else {
            this.countdown = -1
            Toast(res.msg)
            if (res.error === 1) {
              this.sms = ''
            }
          }
        })
      }
    },
    // 发送验证码
    onSmsCode() {
      if (!checkPhone(this.tel)) {
        Toast('手机号格式错误')
      } else if (this.countdown > -1) {
        Toast('验证码已发送')
      } else {
        const _data = {
          tel: this.tel,
          type: 'gs',
        }
        window.promotion.privat.getSmsCode(_data, (res) => {
          // 发送成功，倒计时开始
          if (res.error === 0) {
            this.countDown()
          }
          Toast(res.msg)
        })
      }
    },
    // 倒计时
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

    // 输入框过滤
    companyTest(value) {
      return value.replace(/[^\dA-Za-z\u3007\u4E00-\u9FCB\uE815-\uE864]/, '')
    },
    // 手机号过滤
    telephoneTest(value) {
      return value.replace(/[^\d]/, '')
    },
    // 验证码过滤
    formatter(value) {
      // 过滤输入的特殊字符及汉字
      return value.replace(/[^a-z0-9A-Z]/, '')
    },
    // 获取当前时间
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
/deep/input {
  font-weight: bold;
}
/deep/input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-weight: 400;
}
/deep/input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-weight: 400;
  opacity: 1 !important;
}
/deep/input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-weight: 400;
  opacity: 1 !important;
}
/deep/input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-weight: 400;
}
a {
  text-decoration: none;
  color: inherit;
}
.sp-popup--bottom {
  max-width: 750px;
  margin: 0 auto;
  right: 0;
}
.audit-company-name-from {
  position: absolute;
  top: 315px;
  left: 40px;
  margin: 0 auto;
  text-align: center;
  font-size: 28px;
  color: rgba(26, 26, 26, 1);
  background-color: rgba(255, 255, 255, 1);
  width: 670px;
  height: 527px;
  margin: auto;
  border: 1px solid rgba(205, 205, 205, 0.3);
  border-radius: 8px;

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
  &__center {
    &__title {
      font-size: 32px;
      color: rgba(26, 26, 26, 1);
      margin: 48px auto;
      i {
        margin: 0 16px;
        img {
          height: 2px;
          width: 48px;
        }
      }
    }
    &__input {
      padding: 0 40px;
      color: rgba(26, 26, 26, 1);
      border-radius: 2px;
      &__city {
        position: relative;
        height: 80px;
        background-color: rgba(248, 248, 248, 1);
        display: flex;
        align-items: center;
        span {
          margin-left: 32px;
          font-weight: 400;
        }
        div {
          margin-left: 31px;
          font-size: 28px;
          font-weight: bold;
        }
        .sp-icon {
          font-size: 30px;
          color: rgba(204, 204, 204, 1);
          position: absolute;
          top: 28px;
          right: 24px;
        }
      }
      .sp-cell-group {
        display: flex;
        margin-top: 24px;
        width: 100%;
        justify-content: space-between;
        &::after {
          border: 0px solid transparent;
        }
        .sp-cell {
          position: relative;
          width: 283px;
          height: 80px;
          padding: 0;
          align-content: center;
          background-color: rgba(248, 248, 248, 1);
          /deep/.sp-cell__title {
            flex: none;
          }
          /deep/.sp-field__label {
            width: auto;
            margin-left: 33px;
            margin-right: 22px;
            display: flex;
            align-items: center;
            span {
              color: rgba(26, 26, 26, 1);
              font-weight: 400;
            }
          }
          &::after {
            border: 0px solid transparent;
          }

          /deep/.sp-cell__value {
            display: flex;
            align-items: center;
            // .sp-field__body {
            //   .sp-field__control {
            //     font-weight: bold;
            //   }
            // }
            .sp-field__right-icon {
              padding: 0;
              .sp-icon {
                display: inline-block;
                min-width: 0;
                line-height: normal;
                font-size: 30px;
                color: rgba(204, 204, 204, 1);
                position: absolute;
                top: 31%;
                right: 23px;
              }
            }
          }
        }
      }
      &__audit {
        margin-top: 16px;
        display: flex;
        color: #555;
        font-size: 24px;
        position: relative;
        text-align: center;
        align-content: center;
        justify-content: space-evenly;
        padding: 0 25px 0 53px;
        i {
          margin-top: 6px;
          width: 1px;
          height: 20px;
          background-color: #f4f4f4;
        }
        span {
          color: rgba(236, 83, 48, 1);
        }
      }
    }
    .sp-button {
      margin-top: 40px;
      height: 88px;
      border-radius: 8px;
      .sp-button__text {
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 28px;
  text-align: center;
  &__verify {
    background-color: #ffffff;
    width: 670px;
    height: 542px;
    border-radius: 4px;
    padding: 0 40px;
    position: fixed;
    top: 396px;
    z-index: 100;
    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      margin-top: 48px;
      i {
        margin: 0 16px;
        img {
          height: 2px;
          width: 48px;
        }
      }
    }
    p {
      color: #555;
      font-size: 24px;
      font-weight: 400;
      margin-top: 19px;
    }
    .sp-cell-group {
      margin-top: 48px;
      .sp-cell {
        height: 80px;
        background-color: #f8f8f8;
        /deep/.sp-field__label {
          width: auto;
        }
        &::after {
          border: 0 solid transparent;
        }
      }
      .sp-cell::after {
        border: 0 solid transparent !important;
      }
      .sp-cell--center {
        margin-top: 24px;
        /deep/.sp-button--primary {
          background-color: transparent;
          border: 0;
          color: #4974f5;
          font-size: 28px;
          font-weight: 400;
          margin: 0;
        }
      }
      &::after {
        border: 0px solid transparent;
      }
    }
    .sp-button--primary {
      margin-top: 40px;
      height: 88px;
      border-right: 8px;
      font-size: 32px;
      font-weight: bold;
    }
  }
}
</style>
