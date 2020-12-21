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
        <my-icon
          name="tab_ic_all_n"
          size="0.2rem"
          class="input-ic-open"
          color="#cccccc"
        ></my-icon>
        <!-- e行业下拉框 -->
        <!-- s下拉选项框 -->
        <sp-action-sheet
          v-model="selectshow"
          :actions="actions"
          @select="onSelect"
        />
        <!-- e下拉选项框  -->
        <sp-field
          v-model="phonenumber"
          label="手机号"
          placeholder="信息保护中，仅官方可见"
          onkeyup="value=value.replace(/[^\d]/g,'')"
          maxlength="11"
          @click="verificationshow()"
        />
        <!-- s 获取验证码 -->
        <div class="verification-box">
          <sp-field
            v-show="isshow"
            v-model="verification"
            label="验证码"
            placeholder="请输入验证码"
          />
          <span v-show="obtainshow" @click="obtain()">获取验证码</span>
          <!-- s 倒计时 -->
          <sp-count-down
            v-show="false"
            ref="CountDown"
            :time="time"
            format="ss s"
            class="countdown"
            :auto-start="open"
            @change="end"
          />
          <span v-show="timeshow" class="seconds">{{ second }}s</span>
          <!-- e 倒计时 -->
        </div>
        <!-- e 获取验证码 -->
      </div>
      <!-- s 按钮 -->
      <button @click="FreeBtn()"><span>免费定制方案</span></button>
      <!-- e 按钮 -->
      <!-- s 处理事件统计 -->
      <div class="statistical">
        <span>今日进行 <span>126</span>件</span>
        <div class="line"></div>
        <span>累计办理<span>640,934</span>件</span>
      </div>
      <!-- e 处理事件统计 -->
    </div>
  </div>
</template>

<script>
import { Field, ActionSheet, CountDown } from '@chipspc/vant-dgg'
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: {
    MyIcon,
    [Field.name]: Field,
    [ActionSheet.name]: ActionSheet,
    [CountDown.name]: CountDown,
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
      second: '', // 倒计时秒数
      value: '科技信息', // 行业信息
      phonenumber: '', // 电话号码
      verification: '', // 验证码
      open: false, // 倒计时是否自动开启
      isshow: false, // 验证码框是否显示
      obtainshow: true, // 验证码按钮是否显示
      timeshow: false, // 倒计时
      time: 60 * 1000, // 倒计时时间
      selectshow: false, // 下拉选择框是否显示
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
  methods: {
    selected(code) {
      this.actived = code
    },
    FreeBtn() {
      console.log('免费定制方案')
    },
    // 显示验证码框
    verificationshow() {
      this.isshow = true
    },
    // 获取验证码
    obtain() {
      this.obtainshow = false
      this.timeshow = true
      this.$refs.CountDown.start()
    },
    // 倒计时结束
    end(TimeData) {
      this.second = TimeData.seconds
      if (this.second < 1) {
        this.obtainshow = true
        this.timeshow = false
        this.$refs.CountDown.reset()
      }
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
            width: 50%;
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
