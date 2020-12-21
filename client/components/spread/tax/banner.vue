<template>
  <div class="banner">
    <!--    第一层-->
    <div class="banner-top">
      <sp-swipe :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(image, index) in images" :key="index">
          <a href="javascript:;">
            <img :src="image" class="banner-top-img" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!--    第二层-->
    <div class="banner-bottom">
      <!--      导航-->
      <div class="banner-bottom-tab">
        <div
          :class="active == 1 ? bigfont : smallfont"
          style="width: 195px"
          @click="change(1)"
        >
          增值税筹划
        </div>
        <div
          :class="active == 2 ? bigfont : smallfont"
          style="width: 232px"
          @click="change(2)"
        >
          企业所得税筹划
        </div>
        <div
          :class="active == 3 ? bigfont : smallfont"
          style="width: 243px"
          @click="change(3)"
        >
          个人所得税筹划
        </div>
      </div>
      <div class="banner-bottom-text">为您定制稅筹方案，可降低成本40%-90%</div>
      <!--      表单-->
      <div class="banner-bottom-form">
        <sp-cell
          is-link
          :title="select"
          arrow-direction="down"
          @click="show = true"
        />
        <sp-action-sheet
          v-model="show"
          :actions="actions"
          close-on-click-action
          @select="onSelect"
        />
        <div class="banner-bottom-form-div">
          <span>手机号</span>
          <input
            v-model="tel"
            type="text"
            class="banner-bottom-form-input"
            placeholder="信息保护中，仅官方可见"
            @focus="focus"
          />
        </div>
        <div v-if="isshow" class="banner-bottom-form-div">
          <span>验证码</span>
          <input
            v-model="code"
            type="text"
            class="banner-bottom-form-input banner-bottom-form-inputspe"
            placeholder="请输入验证码"
          />
          <a
            href="javascript:;"
            class="banner-bottom-form-div-a"
            @click="testMsg"
            >{{ test }}</a
          >
        </div>
        <button class="banner-bottom-form-button" @click="consultForm">
          咨询获取节税方案
        </button>
        <div class="banner-bottom-form-lastdiv">
          今日已提供方案：<span>{{ count }}</span
          >份
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, ActionSheet, Cell } from '@chipspc/vant-dgg'
export default {
  name: 'BannerVue',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
  },
  data() {
    return {
      images: [
        require('~/assets/spreadImages/tax/busi_img_swchbanner1.jpg'),
        require('~/assets/spreadImages/tax/busi_img_swchbanner2.jpg'),
      ],
      show: false,
      isshow: false,
      active: 1,
      bigfont: { big: true },
      smallfont: { small: true },
      actions: [
        { name: '代理类', color: '#5a79e8' },
        { name: '咨询类' },
        { name: '审计类' },
      ],
      selectname: 'ISO45001认证',
      count: 126,
      test: '获取验证码',
      select: '选择税务类型',
      tel: '',
      code: '',
    }
  },

  methods: {
    showPopup() {
      this.show = true
    },
    // 表头切换
    change(i) {
      this.active = i
    },
    // 电话号码输入框聚焦显示获取验证码
    focus() {
      this.isshow = true
    },
    // 验证 验证码
    testMsg() {
      const _tel = this.tel
      const _reg = /^1[3,4,5,6,7,8,9]\d{9}$/
      if (_tel === '') {
        return console.log('请输入手机号码')
      }
      if (!_reg.test(_tel)) {
        return console.log('请输入正确的手机号码')
      }
      const Data = {
        tel: _tel,
        type: 'gs',
      }
      this.send(Data)
    },
    // 验证后 发送验证码
    send(data) {
      if (this.test === '获取验证码' || this.test === '重新发送') {
        window.promotion.privat.getSmsCode(data, (res) => {
          if (res.error === 0) {
            let i = 59
            this.test = i + 's'
            const time = setInterval(() => {
              if (i > 1) {
                i--
                this.test = i + 's'
              } else {
                this.test = '重新发送'
                clearInterval(time)
              }
            }, 1000)
            console.log(res.msg)
            return false
          }
          console.log(res.msg)
        })
      }
    },
    // 内容选择
    onSelect(e) {
      this.selectname = e.name
      this.select = e.name
      for (const item of this.actions) {
        if (item.name === this.selectname) {
          item.color = '#5a79e8'
        } else {
          item.color = '#232124'
        }
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
    consultForm() {
      const _tel = this.tel
      const _code = this.code
      const _telReg = /^1[3,4,5,6,7,8,9]\d{9}$/
      // eslint-disable-next-line camelcase
      const web_url = window.location.href
      const formId = this.getDate() + _tel // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      if (!_tel) {
        console.log('请输入电话号码')
        return
      }
      if (!_telReg.test(_tel)) {
        console.log('请输入正确的电话号码')
        return
      }
      if (!_code) {
        console.log('请输入验证码')
        return
      }
      if (this.select === '选择税务类型') {
        console.log('请选择税务类型')
        return
      }
      const contentStr = {
        swlx: this.select,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: web_url, // 链接
        type: 'swch', // 业态编码
        place: 'cd',
        device: 'wap', // 设备：pc,wap
        web: 'xmt', // 归属渠道：xmt,zytg,wxgzh
        smsCode: _code, // 验证码
        content: JSON.stringify(contentStr),
      }
      window.promotion.privat.consultForm(params, (res) => {
        if (res.error === 0) {
          // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
          console.log(res)
          console.log('提交成功，请注意接听电话')
        } else {
          console.log(res)
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.banner {
  &-top {
    width: 750px;
    height: 392px;
    margin-bottom: -81px;
    &-img {
      width: 750px;
      height: 392px;
    }
  }
  &-bottom {
    background: #fff;
    width: 670px;
    margin: 0 40px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    font-size: 0;
    position: relative;
    z-index: 999;
    &-tab {
      width: 670px;
      height: 80px;
      border-radius: 8px 4px 0px 0px;
      font-size: 24px;
      display: flex;
      text-align: center;
      line-height: 80px;
    }
    &-text {
      height: 87px;
      font-size: 24px;
      line-height: 87px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      text-align: center;
    }
    &-form {
      padding: 0 40px;
      &-div {
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
        > span {
          display: inline-block;
          margin-right: 30px;
          width: 84px;
        }
        &-a {
          position: absolute;
          right: 0;
          margin: 0 33px;
        }
      }
      &-input {
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
      &-inputspe {
        width: 237px;
      }
      &-button {
        width: 100%;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        margin-top: 40px;
        color: #ffffff;
        font-size: 32px;
        padding: 0;
      }
      &-lastdiv {
        font-size: 26px;
        height: 81px;
        line-height: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        padding: 24px 0 31px;
        display: flex;
        justify-content: center;
        > span {
          display: inline-block;
          color: #4974f5;
          font-weight: bold;
        }
      }
    }
  }
}
/deep/ .sp-cell {
  width: 590px;
  height: 80px;
  background: #f8f8f8;
  border-radius: 2px;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1a1a1a;
}
a {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #4974f5;
}
.big {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1a1a1a;
  background: white;
}
.small {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  background: #f8f8f8;
}
/deep/ .sp-action-sheet__name {
  font-size: 31px;
  line-height: 56px;
  height: 56px;
  font-family: PingFang SC;
  font-weight: 400;
}
/deep/ .sp-cell::after {
  display: none;
}
</style>
