<template>
  <div class="form">
    <div class="form_content">
      <div class="form_content_title">
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/62to3cpd7h40000.png"
          alt=""
        />
        <h4>立即预约办证</h4>
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/x5o8jch38cg000.png"
          alt=""
        />
      </div>
      <!-- 表单 我需要 -->
      <div class="form_content_input">
        <sp-field
          v-model="value"
          v-sensorsTrack:webClick="{
            form_name: `许可证表单_下拉表单`,
          }"
          label="我需要"
          class="ineed"
          :readonly="true"
          @click="handleSelectShow"
        />
        <!-- 向下箭头 -->
        <a
          v-sensorsTrack:webClick="{
            form_name: `许可证表单_下拉表单`,
          }"
          href="javascript:void(0)"
          @click="handleSelectShow"
        >
          <div>
            <my-icon
              name="tab_ic_all_n"
              size="0.2rem"
              class="form_content_input_icon"
              color="#cccccc"
            ></my-icon></div
        ></a>

        <!-- 下拉框 -->
        <sp-action-sheet
          v-model="selectShow"
          :actions="actions"
          @select="onSelect"
        />
        <sp-field
          v-model="telephone"
          v-sensorsTrack:webClick="{
            form_name: `许可证表单_手机号`,
          }"
          label="手机号"
          maxlength="11"
          placeholder="信息保护中，仅官方可见"
          :formatter="formatterTel"
          @click="
            () => {
              isCode = true
            }
          "
        />
        <!-- S 获取验证码 -->
        <div v-show="isCode" class="form_content_input_codebox">
          <sp-field
            v-model="code"
            v-sensorsTrack:webClick="{
              form_name: `许可证表单_验证码`,
            }"
            label="验证码"
            placeholder="请输入验证码"
            maxlength="6"
            type="tel"
            :formatter="formatterCode"
          />
          <!-- S 倒计时 -->
          <a
            v-sensorsTrack:webClick="{
              name: `许可证表单_获取验证码`,
            }"
            href="javascript:void(0)"
            @click="requestCode"
            ><span class="seconds"> {{ countDown }}</span></a
          >
          <!-- E 倒计时 -->
        </div>
        <!-- E 按钮 -->
        <button
          v-sensorsTrack:p_formSubmit="{
            event_name: 'p_formSubmit',
            form_type: '咨询表单',
            form_name: `许可证表单_提交`,
          }"
          data-event_name="p_formSubmit"
          class="form_content_input_bottonbox"
          @click="getGuotes"
        >
          <span>免费获取报价</span>
        </button>
        <!-- E 按钮 -->
        <!-- S 注释-->
        <div class="form_content_input_botton">
          <div v-for="(item, index) in iocnName" :key="index">
            <div class="imgbox">
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/2zmax1u6a3y0000.png"
                alt=""
              />
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <!-- E 注释 -->
      </div>
    </div>
  </div>
</template>

<script>
import { Field, ActionSheet, Toast } from '@chipspc/vant-dgg'
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: {
    MyIcon,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
  },
  props: {},
  data() {
    return {
      telephone: '', // 手机号码
      isCode: false, // 是否显示验证码
      code: '', // 验证码
      countDown: '获取验证码', // 验证码
      totalTime: 59, // 倒计时
      timer: null, // 验证码定时器
      value: '食品行业许可证',
      selectShow: false,
      actions: [
        { name: '食品行业许可证', color: '#5a79e8' },
        { name: '互联网行业许可证', color: '#222222' },
        { name: '人力资源行业许可证', color: '#222222' },
        { name: '影视制作行业许可证', color: '#222222' },
        { name: '医疗药品行业许可证', color: '#222222' },
        { name: '交通运输行业许可证', color: '#222222' },
        { name: '建筑行业许可证', color: '#222222' },
        { name: '其他行业许可证', color: '#222222' },
      ],
      iocnName: ['加急办理', '各行各业', '专业代办'],
    }
  },
  methods: {
    // 唤起下拉弹框
    handleSelectShow() {
      this.selectShow = true
    },
    //  过滤手机号
    formatterTel(value) {
      return value.replace(/[^\d]/, '')
    },
    //  过滤验证码
    formatterCode(value) {
      return value.replace(/[^a-z0-9A-Z]/, '')
    },
    // 下拉数据选择时改变颜色
    onSelect(item) {
      this.selectShow = false
      this.value = item.name
      this.actions.forEach((obj) => {
        if (obj.name === item.name) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },

    // 手机号码验证
    verification() {
      const res = /^1[3,4,5,6,7,8,9]\d{9}$/
      const _tel = this.telephone
      if (_tel === '') {
        return Toast('请输入手机号码') && false
      }
      if (!res.test(_tel)) {
        return Toast('请输入正确的手机号码') && false
      }
      return true
    },
    // 获取验证码
    requestCode() {
      const requestCode = this.verification()
      if (requestCode) {
        const data = {
          _tel: this.telephone,
          type: 'gs',
        }
        if (this.countDown === '获取验证码') {
          window.promotion.privat.getSmsCode(data, (res) => {
            // 发送成功，倒计时开始
            if (res.error === 0) {
              this.getCode()
            }
            Toast(res.msg)
          })
        } else {
          Toast('请稍后再试')
        }
      }
    },
    // 获取验证码
    getCode() {
      if (this.timer) clearInterval(this.timer)
      this.countDown = this.totalTime + 's'
      this.timer = setInterval(() => {
        this.totalTime--
        this.countDown = this.totalTime + 's'
        if (this.totalTime < 1) {
          this.countDown = '获取验证码'
          this.totalTime = 59
          clearInterval(this.timer)
        }
      }, 1000)
    },
    // 免费获取报价
    getGuotes() {
      // 1.验证表单
      const sms = this.code
      const telRes = /^1[3,4,5,6,7,8,9]\d{9}$/
      const _tel = this.telephone
      if (!_tel) {
        Toast('请输入手机号码')
        return
      }
      if (!telRes.test(_tel)) {
        Toast('请输入正确的手机号码')
        return
      }
      if (!sms) {
        Toast('请输入验证码')
        return
      }
      // 2.获取表单
      const webUrl = window.location.href
      const formId = this.getDate() + _tel
      const contentArr = {
        industry: this.value,
      }
      const params = {
        formId, // formId,唯一ID提交资源中心
        name: '匿名客户',
        tel: _tel, // 电话
        url: webUrl, // 当前页面地址。用于后台判断ip发送验证码次数
        type: 'gsbg', // 业态编码。
        place: 'cd', // 定位城市。
        device: 'wap', // 设备：pc,wap。
        web: 'SP', // 归属渠道：xmt,zytg,wxgzh。
        smsCode: sms, // 验证码
        content: JSON.stringify(contentArr),
      }
      // 2.提交表单
      window.promotion.privat.consultForm(params, (res) => {
        for (let i = 0; i < this.actions.length; i++) {
          if (i === 0) {
            this.actions[i].color = '#5a79e8'
          } else {
            this.actions[i].color = '#222222'
          }
        }
        if (res.error === 0) {
          // 提交完成后更新表单
          this.telephone = ''
          this.code = ''
          this.value = '食品行业许可证'
          this.countDown = '获取验证码'
          this.totalTime = 59
          if (this.timer) clearInterval(this.timer)
          window.sensors.track('p_formSubmitResult', {
            even_name: 'p_formSubmitResult',
            form_type: '咨询表单',
            form_name: '许可证表单_提交',
          })
          Toast('提交成功，请注意接听电话')
        } else {
          Toast(res.msg)
          if (this.timer) clearInterval(this.timer)
          this.countDown = '获取验证码'
          this.totalTime = 59
          this.sms = ''
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
  padding: 0 40px;
  position: relative;
  margin-top: -80px;
  font-family: PingFang SC;
  &_content {
    background: #ffffff;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/340830mgxns0000.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    width: 100%;
    padding: 0 40px;
    &_title {
      margin: 47px 0 48px 0;
      display: flex;
      justify-content: center;
      align-items: center;
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
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
      }
    }
    &_input {
      position: relative;
      &_icon {
        width: 20px;
        height: 10px;
        position: absolute;
        top: 30px;
        right: 32px;
      }
      &_codebox {
        position: relative;
        span {
          display: block;
          position: absolute;
          top: 20px;
          right: 26px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4974f5;
          line-height: 44px;
        }
      }
      &_bottonbox {
        width: 100%;
        height: 80px;
        background: #4974f5;
        border-radius: 8px;
        margin: 48px 0 24px 0;
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
      &_botton {
        display: flex;
        justify-content: space-evenly;
        .imgbox {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          height: 23px;
          margin-bottom: 24px;
          img {
            display: block;
            width: 24px;
            height: 23px;
            margin-right: 12px;
          }
          span {
            display: block;
            // height: 24px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
          }
        }
      }
    }
  }
}
/deep/ .sp-cell {
  background: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 24px;
  &::after {
    display: none;
  }
}
/deep/ .sp-field__label {
  width: 85px;
  font-size: 28px;
  color: #1a1a1a;
}
/deep/ .sp-field__control {
  margin-left: 5px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 44px;
  /deep/.sp-field__body {
    width: 100%;
  }
  &::-webkit-input-placeholder {
    color: #cccccc;
    font-weight: normal;
  }
}
/deep/ .sp-cell__title {
  flex: none;
}
/deep/ .sp-popup--round {
  width: @spread-page-width;
  max-height: 80%;
  left: 50%;
  margin-left: -3.75rem;
}
/deep/ .sp-overlay {
  width: @spread-page-width;
  max-height: 80%;
  left: 50%;
  margin-left: -3.75rem;
}
</style>
