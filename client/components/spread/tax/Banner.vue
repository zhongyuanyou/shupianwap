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
          v-for="(item, i) of tabs"
          :key="i"
          v-md-map
          v-md:webClick
          :class="active == i ? bigfont : smallfont"
          style="width: 195px"
          :data-name="`税务筹划表单_表头选择栏_${item}`"
          @click="change(i)"
        >
          {{ item }}
        </div>
      </div>
      <div class="banner-bottom-text">为您定制稅筹方案，可降低成本40%-90%</div>
      <!--      表单-->
      <div class="banner-bottom-form">
        <sp-cell
          v-md-map
          v-md:webClick
          title="请选择"
          :value="selectName"
          arrow-direction="down"
          is-link
          data-name="税务筹划表单_下拉表单"
          :value-class="
            selectName === '税务类型' ? { gray: true } : { black: true }
          "
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
            v-md-map
            v-md:webClick
            class="banner-bottom-form-input"
            placeholder="信息保护中，仅官方可见"
            type="text"
            data-name="税务筹划表单_手机号"
            maxlength="11"
            @focus="focus"
            @input="
              () => {
                tel = tel.replace(/[^\d]/g, '')
              }
            "
          />
        </div>
        <div v-if="isshow" class="banner-bottom-form-div">
          <span>验证码</span>
          <input
            v-model="code"
            v-md-map
            v-md:webClick
            data-name="税务筹划表单_验证码"
            class="banner-bottom-form-input banner-bottom-form-inputspe"
            placeholder="请输入验证码"
            type="text"
            maxlength="6"
            @input="
              () => {
                code = code.replace(/[^0-9A-Za-z]/g, '')
              }
            "
          />
          <a
            v-md-map
            v-md:webClick
            class="banner-bottom-form-div-a"
            href="javascript:;"
            data-name="税务筹划表单_获取验证码"
            @click="testMsg"
            >{{ text }}</a
          >
        </div>
        <button
          v-md:p_formSubmit
          v-md-map
          data-event_name="p_formSubmit"
          data-form_type="咨询表单"
          data-form_name="税务筹划表单_验证码"
          class="banner-bottom-form-button"
          @click="consultForm"
        >
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
import { Swipe, SwipeItem, ActionSheet, Cell, Toast } from '@chipspc/vant-dgg'

export default {
  name: 'BannerVue',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
  },
  data() {
    return {
      // 轮播图片
      images: [
        'https://cdn.shupian.cn/sp-pt/wap/dfzrgpsj6e80000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/1591o9av6ye8000.jpg',
      ],
      // 下弹窗选项栏显示状态
      show: false,
      // 验证码输入框显示状态
      isshow: false,
      // 导航选项内容
      tabs: ['增值稅筹划', '企业所得稅筹划', '个人所得稅筹划'],
      // 导航选项判断状态码
      active: 1,
      // 选中时的样式
      bigfont: { big: true },
      // 未选中时的样式
      smallfont: { small: true },
      // 下弹窗选项内容
      actions: [{ name: '代理类' }, { name: '咨询类' }, { name: '审计类' }],
      // 咨询数量
      count: 126,
      // 验证码按钮内容
      text: '获取验证码',
      // 下弹窗选项内容
      selectName: '税务类型',
      // 电话
      tel: '',
      // 验证码
      code: '',
      // 验证码计时器
      time: '',
    }
  },

  methods: {
    // 下弹窗显示
    showPopup() {
      this.show = true
    },
    // 表头导航选项切换
    change(i) {
      this.active = i
    },
    // 电话号码输入框聚焦显示获取验证码
    focus() {
      this.isshow = true
    },
    // 验证 电话号码
    testMsg() {
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
      this.send(data)
    },
    // 验证后 发送验证码
    send(data) {
      if (this.text === '获取验证码' || this.text === '重新发送') {
        window.promotion.privat.getSmsCode(data, (res) => {
          if (res.error === 0) {
            // 发送成功后的操作
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
    // 下弹窗内容选择后样式改变
    onSelect(e) {
      this.selectName = e.name
      for (const item of this.actions) {
        if (item.name === this.selectName) {
          item.className = 'bold'
        } else {
          item.className = ''
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
    // 提交表单
    consultForm() {
      const _tel = this.tel
      const _code = this.code
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
      if (this.selectName === '税务类型') {
        Toast('请选择税务类型')
        return
      }
      // 没有明确参数名的，全放content中作为备注信息
      const contentStr = {
        shuiwuleixing: this.selectName,
        chouhualeixing: this.tabs[this.active],
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 链接
        type: 'swch', // 业态编码
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
          this.tel = ''
          this.code = ''
          this.text = '发送验证码'
          this.selectName = ''
          window.getTrackRow('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '税务筹划表单_提交',
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
    &-tab {
      width: 670px;
      height: 80px;
      border-radius: 8px 8px 0px 0px;
      font-size: 24px;
      display: flex;
      text-align: center;
      line-height: 80px;
      & > :first-child {
        border-top-left-radius: 8px;
      }
      & > :last-child {
        border-top-right-radius: 8px;
      }
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
  background: #f4f4f4;
}
.bold {
  font-weight: bold;
  color: #5a79e8;
}
/deep/ .sp-action-sheet__name {
  font-size: 31px;
  line-height: 56px;
  height: 56px;
  font-family: PingFang SC;
}
// 处理多余的横线
/deep/ .sp-cell::after {
  display: none;
}
// 表单下拉框的布局
/deep/ .sp-cell__title {
  width: 84px;
  margin-right: 30px;
  flex: none;
}
// 表单下拉框的弹性分布
/deep/ .sp-cell {
  justify-content: space-between;
}
// 表单下拉框的选择内容样式
/deep/ .sp-cell__value {
  text-align: left;
}
.gray {
  color: #cccccc;
  font-weight: 400;
}
.black {
  color: #1a1a1a;
  font-weight: bold;
}
</style>
