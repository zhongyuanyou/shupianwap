<template>
  <div class="seal-banner">
    <!--    第一层-->
    <div class="seal-banner-swipe">
      <sp-swipe :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(image, index) in sealImages" :key="index">
          <a href="javascript:;">
            <img :src="image" class="seal-banner-swipe-img" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!--    第二层-->
    <div class="seal-banner-form">
      <div class="seal-banner-form-title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/77m52vjaz9s0000.png"
          alt=""
        />
        <span>立即预约刻章</span>
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/366mn8vq3pc0000.png"
          alt=""
        />
      </div>
      <!--      表单-->
      <div class="seal-banner-form-content">
        <div class="seal-banner-form-content-block">
          <div
            v-for="(item, i) of sealTypes"
            :key="i"
            :class="isSelect === i ? blue : gray"
            @click="changeBlock(i)"
          >
            <a
              v-sensorsTrack:webClick="{
                name: `印章服务表单_${item}`,
              }"
              href="javascript:;"
            >
              {{ item }}
            </a>
          </div>
        </div>
        <div class="seal-banner-form-content-input">
          <span>手机号</span>
          <input
            v-model="tel"
            v-sensorsTrack:webClick="{
              form_name: `印章服务表单_手机号`,
            }"
            class="seal-banner-form-content-input-tel"
            placeholder="信息保护中，仅官方可见"
            type="tel"
            maxlength="11"
            @focus="telFocus"
            @input="
              () => {
                tel = tel.replace(/[^\d]/g, '')
              }
            "
          />
        </div>
        <div v-if="isshow" class="seal-banner-form-content-input">
          <span>验证码</span>
          <input
            v-model="code"
            v-sensorsTrack:webClick="{
              form_name: `印章服务表单_验证码`,
            }"
            class="seal-banner-form-content-input-tel seal-banner-form-content-input-code"
            placeholder="请输入验证码"
            type="tel"
            maxlength="6"
            @input="
              () => {
                code = code.replace(/[^0-9A-Za-z]/g, '')
              }
            "
          />
          <a
            v-sensorsTrack:webClick="{
              form_name: `印章服务表单_获取验证码`,
            }"
            class="seal-banner-form-content-input-a"
            href="javascript:;"
            @click="testTel"
            >{{ text }}</a
          >
        </div>
        <button
          v-sensorsTrack:p_formSubmit="{
            event_name: 'p_formSubmit',
            form_type: '咨询表单',
            form_name: `印章服务表单_提交`,
          }"
          class="seal-banner-form-content-button"
          @click="consultForm"
        >
          立即提交
        </button>
      </div>
      <div class="seal-banner-form-tabs">
        <div v-for="(item, index) of tabs" :key="index">
          <i
            :style="{ backgroundImage: 'url(' + tabsBg + ')' }"
            class="seal-banner-form-tabs-i"
          ></i>
          <span class="seal-banner-form-tabs-text">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Toast } from '@chipspc/vant-dgg'

export default {
  name: 'BannerVue',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Toast.name]: Toast,
  },
  data() {
    return {
      // 轮播图片
      sealImages: [
        'https://cdn.shupian.cn/sp-pt/wap/images/eb6ko3c8ql40000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/9xkzckscv6o0000.jpg',
      ],
      // 验证码输入框显示状态
      isshow: false,
      // 验证码按钮内容
      text: '获取验证码',
      // 电话
      tel: '',
      // 验证码
      code: '',
      // 印章类型
      sealType: '法人章',
      // 验证码计时器
      time: '',
      // 表单选项内容
      sealTypes: [
        '法人章',
        '公章',
        '财务章',
        '合同章',
        '发票章',
        '报关章',
        '其他',
      ],
      // 选中状态
      isSelect: 0,
      // 选中和未选中时状态
      blue: { blue: true },
      gray: { gray: true },
      // 表单tabs的选项内容
      tabs: ['2小时速取', '30天免费更换', '隐私加密保护'],
      tabsBg: 'https://cdn.shupian.cn/sp-pt/wap/images/2uyqf9b0j880000.png',
    }
  },
  methods: {
    // 改变表单选中状态
    changeBlock(i) {
      this.isSelect = i
      this.sealType = this.sealTypes[i]
    },
    // 电话号码输入框聚焦显示获取验证码
    telFocus() {
      this.isshow = true
    },
    // 验证 电话号码
    testTel() {
      const _tel = this.tel
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return Toast('请输入手机号码')
      }
      if (!_reg.test(_tel)) {
        return Toast('请输入正确的手机号码')
      }
      const data = {
        tel: _tel,
        type: 'gs',
      }
      this.sendCode(data)
    },
    // 验证后 发送验证码
    sendCode(data) {
      if (this.text === '获取验证码' || this.text === '重新发送') {
        window.promotion.privat.getSmsCode(data, (res) => {
          if (res.error === 0) {
            // 发送成功后的操作
            clearInterval(this.time)
            let i = 59
            this.text = i + 's'
            this.time = setInterval(() => {
              if (i > 1) {
                i--
                this.text = i + 's'
              } else {
                this.text = '重新发送'
                clearInterval(this.time)
              }
            }, 1000)
            return false
          }
          // 没成功的时候调用
          Toast(res.msg)
        })
      }
    },
    // 获取当前时间作为 后台判断唯一标识
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
    // 提交表单
    consultForm() {
      const _tel = this.tel
      const _code = this.code
      const sealType = this.sealType
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      const webUrl = window.open
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
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
      // 没有明确参数名的，全放content中作为备注信息
      const contentStr = {
        sealType,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 链接
        type: 'gszc', // 业态编码
        place: 'cd',
        device: 'wap', // 设备：pc,wap
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr), // 把const备注信息json化
      }
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
          Toast('提交成功，请注意接听电话')
          clearInterval(this.time)
          this.isSelect = 0
          this.sealType = this.sealTypes[this.isSelect]
          this.tel = ''
          this.code = ''
          this.text = '获取验证码'
          window.sensors.track('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '印章服务表单_提交',
          })
        } else {
          Toast(res.msg)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: inherit;
}
.seal-banner {
  margin-bottom: 63px;
  &-swipe {
    width: @spread-page-width;
    height: 392px;
    margin-bottom: -81px;
    &-img {
      width: @spread-page-width;
      height: 392px;
    }
  }
  &-form {
    background: #fff;
    width: 670px;
    margin: 0 40px;
    padding: 47px 40px 31px;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    font-size: 0;
    position: relative;
    &-title {
      margin: 0 17px 47px;
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 32px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        width: 48px;
        height: 2px;
      }
      > span {
        margin: 0 17px;
      }
    }
    &-content {
      &-block {
        overflow: scroll;
        white-space: nowrap;
        &::-webkit-scrollbar {
          display: none;
        }
        > div {
          display: inline-block;
          border-radius: 8px;
          font-size: 28px;
          font-weight: bold;
          margin-right: 16px;
          text-align: center;
        }
        .blue {
          color: #4974f5;
          background: #ecf1fe;
          border: 1px solid #4974f5;
          width: 148px;
          height: 78px;
          line-height: 78px;
        }
        .gray {
          color: #555555;
          background: #f8f8f8;
          width: 148px;
          height: 80px;
          line-height: 80px;
        }
      }
      &-input {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        width: 590px;
        height: 80px;
        background: #f8f8f8;
        border-radius: 2px;
        margin-top: 24px;
        border: none;
        line-height: 80px;
        padding: 0 0 0 33px;
        position: relative;
        display: flex;
        &-tel {
          display: inline-block;
          border: none;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          background: #f8f8f8;
          padding: 0;
          width: 443px;
          &::placeholder {
            color: #cccccc;
            font-weight: 400;
          }
        }
        &-code {
          width: 237px;
        }
        > span {
          display: inline-block;
          margin-right: 30px;
          width: 84px;
        }
        &-a {
          position: absolute;
          right: 0;
          margin: 0 34px;
        }
        a {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4974f5;
        }
      }
      &-button {
        width: 590px;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        padding: 0;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        line-height: 44px;
        margin: 40px 0 34px;
      }
    }
    &-tabs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-i {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 9px;
        background-position: center center;
        background-size: 100% 100%;
      }
      &-text {
        font-size: 24px;
        font-weight: 400;
        color: #555555;
        line-height: 44px;
      }
    }
  }
}
/deep/ .sp-swipe__indicators {
  bottom: 102px;
}
</style>
