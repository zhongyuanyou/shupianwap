<template>
  <div class="regdemand">
    <!-- S 头部 -->
    <Header v-if="!isInApp" ref="headerRef" title="轻松找服务" />
    <!-- E 头部 -->
    <!-- 头部加banner -->
    <Banner @onCity="onCity" />
    <div class="content">
      <!-- 公司成立区域 -->
      <div class="company-area">
        <span class="company-area-title">您的公司打算成立在哪个区域？</span>
        <div class="company-area-input" @click="show">
          <input
            v-model="formData.content.yxblqy"
            type="text"
            placeholder="不限"
            readonly="readonly"
          />
          <my-icon
            name="sear_ic_open"
            color="#CCCCCC"
            size="0.183rem"
            class="icon"
          >
          </my-icon>
        </div>
      </div>
      <!-- 是否有公司地址 -->
      <div class="company-address">
        <span class="company-address-title">您的公司是否有地址？</span>
        <div class="company-address-choose">
          <div
            v-for="(item, index) in choose"
            :key="index"
            :class="[chooseActived === index ? 'isActived' : '']"
            @click="isChoose(index)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      <!-- 公司是否确认完毕 -->
      <div class="company-confirm">
        <span class="company-confirm-title">您的公司信息是否已确定完毕？</span>
        <span class="company-confirm-msg"
          >公司名字、法人、股东、注册资金、经营范围等</span
        >
        <div class="company-confirm-choose">
          <div
            v-for="(item, index) in choose"
            :key="index"
            :class="[confirmActived === index ? 'isActived' : '']"
            @click="confirm(index)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      <!-- 什么时候办理 -->
      <div class="transact">
        <span class="transact-title">您打算什么时候办理？</span>
        <div class="transact-time">
          <div
            v-for="(item, index) in times"
            :key="index"
            class="transact-time-choose"
            :class="[transactActived === index ? 'isActived' : '']"
            @click="isTransact(index)"
          >
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      <!-- 占位符 -->
      <div class="box"></div>
      <!-- 底部按钮 -->
      <div class="footer-btn">
        <a href="javascript:;" @click="next()">下一步(1/2)</a>
      </div>
    </div>
    <!-- 底部调起列表 -->
    <sp-popup
      v-model="isShow"
      position="bottom"
      round
      :style="{ height: '55%' }"
    >
      <sp-picker
        title="选择区域"
        show-toolbar
        :default-index="isCityChange"
        :columns="actionsRegion"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </sp-popup>
  </div>
</template>
<script>
import { Popup, Field, Picker, Toast, Icon } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import Banner from '@/components/spread/myDemandCard/companyRegister/header'
import Header from '@/components/common/head/header'
import { planner, dict } from '@/api'
export default {
  layout: 'keepAlive',
  name: 'CompanyRegister',
  components: {
    Banner,
    Header,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
  },
  data() {
    return {
      times: ['1个月内', '2个月内', '半年内', '1年内'],
      choose: ['是', '否'],
      chooseActived: 0,
      confirmActived: 0,
      transactActived: 0,
      isShow: false,
      actionsRegion: [],
      cityVal: {
        code: '510100',
        name: '成都市',
      },
      formData: {
        type: 'gszc',
        url: '',
        content: {
          yxblqy: '',
          sydz: '是',
          公司信息确认完毕: '是',
          办理时间: '1月内',
        },
      },
    }
  },
  computed: {
    isCityChange() {
      let num = 0
      let isHave = false
      const { content } = this.formData
      const regionLength = this.actionsRegion.length
      if (content.yxblqy && regionLength) {
        for (let i = 0; i < this.actionsRegion.length; i++) {
          if (this.actionsRegion[i] === content.yxblqy) {
            num = i
            isHave = true
            break
          }
        }
        // 若之前选择的区域在当前区域列表中未找到，清空数据，取消回显
        if (!isHave) {
          content.yxblqy = ''
        }
      }
      return num
    },
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    // 数据回显
    const sessionStorageFormData = JSON.parse(
      sessionStorage.getItem('formData')
    )
    if (sessionStorageFormData) {
      this.$nextTick(() => {
        this.formData.content.yxblqy =
          sessionStorageFormData.content.yxblqy || this.formData.content.yxblqy
        this.formData.content.sydz =
          sessionStorageFormData.content.sydz || this.formData.content.sydz
        this.formData.content['公司信息确认完毕'] =
          sessionStorageFormData.content['公司信息确认完毕'] ||
          this.formData.content['公司信息确认完毕']
        this.formData.content['办理时间'] =
          sessionStorageFormData.content['办理时间'] ||
          this.formData.content['办理时间']
        this.choose.forEach((item, index) => {
          if (item === this.formData.content.sydz) {
            this.chooseActived = index
          }
          if (item === this.formData.content['公司信息确认完毕']) {
            this.confirmActived = index
          }
        })
        this.times.forEach((item, index) => {
          if (item === this.formData.content['办理时间']) {
            this.transactActived = index
          }
        })
      })
    }
  },
  methods: {
    // 获取地区
    onCity(val) {
      if (val.code !== undefined) this.cityVal = val
      this.getRegionList(this.cityVal.code)
    },
    // 显示下拉框
    show() {
      this.isShow = true
    },
    onChange(picker, value, index) {
      this.formData.content.yxblqy = value
    },
    onCancel() {
      this.isShow = false
    },
    // 点确定回显城市
    onConfirm(value) {
      this.formData.content.yxblqy = value
      this.isShow = false
    },
    // 获取公司是否有地址的选择
    isChoose(index) {
      this.chooseActived = index
      this.formData.content.sydz = this.choose[index]
    },

    // 获取公司信息是否完成的选择
    confirm(index) {
      this.confirmActived = index
      this.formData.content['公司信息确认完毕'] = this.choose[index]
    },
    // 获取打算办理时间的选择
    isTransact(index) {
      this.transactActived = index
      this.formData.content['办理时间'] = this.times[index]
    },
    // 跳转到下一页,存储当前页面信息
    next() {
      this.formData.url = window.location.href
      const sessionStorageFormData = JSON.parse(
        sessionStorage.getItem('formData')
      )
      // 合并两个页面之间缓存的数据
      if (sessionStorageFormData) {
        this.formData.content = Object.assign(
          sessionStorageFormData.content,
          this.formData.content
        )
      }
      const newFormData = JSON.stringify(this.formData)
      // 将数据存储
      sessionStorage.setItem('formData', newFormData)
      this.$router.push({ path: '/spread/myDemandCard/second' })
    },
    // 获取区域信息列表
    async getRegionList(code) {
      try {
        const data = await dict.findCmsTier({ axios: this.$axios }, { code })
        if (Array.isArray(data) && data.length) {
          const cityData = []
          data.forEach((resultArray) => {
            cityData.push(resultArray.name)
          })
          this.actionsRegion = cityData
        }
        return
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 选中
    selectHandle() {
      this.formData.content['是否允许电话联系'] =
        this.formData.content['是否允许电话联系'] === '是' ? '否' : '是'
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
  },
  head() {
    return {
      title: '公司注册需求卡',
    }
  },
}
</script>
<style lang="less" scoped>
.regdemand {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  .content {
    padding: 0 40px;
    .company-area {
      .company-area-title {
        display: block;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-top: 64px;
      }
      .company-area-input {
        margin-top: 32px;
        position: relative;
        input {
          display: block;
          width: 100%;
          height: 72px;
          background: #ffffff;
          border: 1px solid rgba(205, 205, 205, 0.5);
          border-radius: 4px;
          padding: 25px 24px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          &::-webkit-input-placeholder {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #222222;
          }
        }
        .icon {
          position: absolute;
          right: 24px;
          top: 30px;
        }
      }
    }
    .company-address {
      margin-top: 64px;
      .company-address-title {
        display: block;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
      .company-address-choose {
        display: flex;
        align-items: center;
        margin-top: 32px;
        div {
          width: 207px;
          height: 72px;
          background: #f8f8f8;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            display: block;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            text-align: center;
          }
          &:last-child {
            margin-left: 24px;
          }
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .company-confirm {
      margin-top: 64px;
      .company-confirm-title {
        font-size: 36px;
        display: block;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 35px;
      }
      .company-confirm-msg {
        margin-top: 15px;
        display: block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 23px;
      }
      .company-confirm-choose {
        display: flex;
        align-items: center;
        margin-top: 32px;
        div {
          width: 207px;
          height: 72px;
          background: #f8f8f8;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            display: block;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            text-align: center;
          }
          &:last-child {
            margin-left: 24px;
          }
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .transact {
      margin-top: 64px;
      .transact-title {
        display: block;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
      .transact-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .transact-time-choose {
          margin-top: 32px;
          width: 149px;
          height: 72px;
          background: #f8f8f8;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          > span {
            display: block;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            text-align: center;
          }
        }
        .isActived {
          background: #ffffff;
          border: 3px solid #000000;
        }
      }
    }
    .footer-btn {
      width: 670px;
      height: 136px;
      padding: 24px 0;
      background: #ffffff;
      margin: 0 auto;
      margin-top: 32px;
      > a {
        display: block;
        width: 100%;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 88px;
      }
    }
  }
  /deep/.sp-popup {
    width: @spread-page-width;
    position: absolute;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }
  /deep/.sp-overlay {
    width: @spread-page-width;
    position: absolute;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }
}
.two-form {
  padding: 64px 40px 24px;
  font-size: 0;
  &-text::placeholder {
    color: red;
  }
  &-title {
    font-size: 36px;
    line-height: 36px;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-read {
    width: 670px;
    height: 140px;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 32px 0 0 24px;
    margin-bottom: 212px;
    &-first {
      font-size: 0;
      margin: 0 0 16px 0;
      text-align: left;
      display: flex;
      align-items: center;
      height: 34px;
      & > span {
        margin-left: 17px;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
      }
    }
    &-second {
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      margin: 0 0 31px 49px;
    }
  }
  &-button {
    background: #4974f5;
    border-radius: 8px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    padding: 0;
    width: 100%;
    height: 88px;
  }
  // 纯文本输入框容器
  /deep/ .sp-field {
    padding: 20px 24px 24px;
    margin: 32px 0;
    height: 290px;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 4px;
  }
  //文本框字体
  /deep/ .sp-cell {
    font-size: 28px;
    font-weight: 400;
    line-height: 36px;
  }
  // 纯文本输入框布局
  /deep/ .sp-cell__value {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  /deep/ .sp-field__body {
    flex: 1;
    display: block;
    overflow: scroll;
  }
  /deep/ .sp-field__body::-webkit-scrollbar {
    display: none;
  }
  //统计字数
  /deep/ .sp-field__word-limit {
    font-size: 28px;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
  }
  //输入框下面的多余线条
  /deep/ .sp-cell::after {
    border-bottom: 0;
  }
  //输入字体颜色
  /deep/ .sp-field__control {
    color: #222222;
  }
  //占位字的颜色
  /deep/ .sp-field__control::placeholder {
    color: #999999;
  }
  //动态计数字体
  /deep/ .sp-field__word-num {
    color: #999999;
  }
}
</style>
