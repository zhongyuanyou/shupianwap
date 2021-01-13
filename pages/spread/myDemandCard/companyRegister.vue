<template>
  <div class="regdemand">
    <!-- 头部加banner -->
    <Header @onCity="onCity" />
    <div v-show="curentPage === 1" class="content">
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
        :default-index="3"
        :columns="actionsRegion"
        @confirm="onCancel"
        @cancel="onCancel"
        @change="onChange"
      />
    </sp-popup>
    <div v-show="curentPage === 2" class="two-form">
      <div class="two-form-title">您还有一些额外需求要告知我们？</div>
      <sp-field
        v-model="formData.content['备注']"
        rows="5"
        :autofocus="true"
        type="textarea"
        maxlength="300"
        placeholder="更准确的描述需求，将有助于我们为您更好的服务"
        :show-word-limit="true"
        class="two-form-text"
        @input="changeFont"
      />
      <div class="two-form-read" @click="selectHandle">
        <div class="two-form-read-first">
          <div
            v-if="formData.content['是否允许电话联系'] === '是'"
            class="two-form-read-first-icon"
          >
            <my-icon
              name="pay_ic_success"
              size="0.32rem"
              color="#2E73F5"
              class="icon"
            ></my-icon>
          </div>
          <div v-else class="two-form-read-first-icon">
            <my-icon
              name="shop_ic_radio_n"
              size="0.32rem"
              color="#999999"
              class="icon"
            ></my-icon>
          </div>
          <span>订阅专属服务</span>
        </div>
        <div class="two-form-read-second">
          为您匹配到合适服务时，将在第一时间联系您
        </div>
      </div>
      <button class="two-form-button" @click="consultForm">生成需求卡</button>
    </div>
    <Loading-center v-show="loading" title="提交中..." />
  </div>
</template>
<script>
import { Popup, Field, Picker, Toast, Icon } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import Header from '@/components/spread/myDemandCard/companyRegister/header'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import { planner, dict, userinfoApi, consult } from '@/api'
export default {
  components: {
    Header,
    LoadingCenter,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
  },
  data() {
    return {
      loading: false,
      curentPage: 1,
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
        tel: '', // 电话
        name: '', // 姓名
        web: 'sp', // 归属（原网站类型）
        place: 'all',
        url: '',
        content: {
          yxblqy: '',
          sydz: '是',
          公司信息确认完毕: '是',
          办理时间: '1月内',
          备注: '',
          是否允许电话联系: '是',
        },
      },
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
  },
  mounted() {},
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
      this.curentPage = 2
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
    getUserInfo(userId) {
      return new Promise((resolve) => {
        // 获取用户信息
        this.$axios
          .get(userinfoApi.info, {
            params: { id: userId },
          })
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data)
            } else {
              this.$xToast.error('获取当前登陆用户的信息失败')
            }
          })
      })
    },
    // 提交表单
    async consultForm() {
      if (this.loading) {
        return
      }
      const { decodePhone, fullName } = await this.getUserInfo(this.userId)
      const newFormData = JSON.parse(JSON.stringify(this.formData))
      newFormData.url = window.location.href
      newFormData.tel = decodePhone
      newFormData.name = fullName
      newFormData.content = JSON.stringify(newFormData.content)
      this.loading = true
      // 提交表单
      consult
        .consultAdd(newFormData)
        .then((res) => {
          this.loading = false
          this.$xToast.success('提交成功，请注意接听电话')
          this.formData = {
            type: 'gszc',
            tel: '', // 电话
            name: '', // 姓名
            web: 'sp', // 归属（原网站类型）
            place: 'all',
            url: '',
            content: {
              yxblqy: '',
              sydz: '是',
              公司信息确认完毕: '是',
              办理时间: '1月内',
              备注: '',
              是否允许电话联系: '是',
            },
          }
          this.curentPage = 1
        })
        .catch((res) => {
          this.loading = false
          this.$xToast.show({
            message: res.message,
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        })
    },
    // 输入框文字发生改变
    changeFont(val) {
      const font = document.getElementsByClassName('sp-field__word-num')[0]
      if (val === '') {
        font.style.color = '#999999'
      } else {
        font.style.color = '#222222'
      }
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
