<template>
  <div class="center">
    <!-- S 头部 -->
    <Header v-if="!isInApp" ref="headerRef" title="轻松找服务" />
    <!-- E 头部 -->
    <div class="banner">
      <!--    城市按钮  -->
      <div class="banner-button" @click="tabCity">
        <div class="banner-button-city">
          {{ currentCity.name || '成都市' }}
        </div>
        <my-icon
          name="sear_ic_open"
          color="#ffffff"
          size="0.14rem"
          class="icon banner-button-icon"
        ></my-icon>
      </div>
    </div>
    <div class="form">
      <div class="form-title">您还有一些额外需求要告知我们？</div>
      <sp-field
        v-model="formData.content['备注']"
        v-clear-emoij
        rows="5"
        :autofocus="true"
        type="textarea"
        maxlength="200"
        placeholder="更准确的描述需求，将有助于我们为您更好的服务"
        :show-word-limit="true"
        class="form-text"
        @input="changeFont"
      />
      <div class="form-read" @click="select">
        <div class="form-read-first">
          <div
            v-if="formData.content['是否允许电话联系'] === '是'"
            class="form-read-first-icon"
          >
            <my-icon
              name="pay_ic_success"
              size="0.32rem"
              color="#2E73F5"
              class="icon"
            ></my-icon>
          </div>
          <div v-else class="form-read-first-icon">
            <my-icon
              name="shop_ic_radio_n"
              size="0.32rem"
              color="#999999"
              class="icon"
            ></my-icon>
          </div>
          <span>订阅专属服务</span>
        </div>
        <div class="form-read-second">
          为您匹配到合适服务时，将在第一时间联系您
        </div>
      </div>
      <button
        v-md:p_formSubmit
        data-even_name="p_formSubmit"
        :data-track_code="isInApp ? 'SPP001115' : 'SPW000114'"
        :data-form_type="formType"
        class="form-button"
        @click="consultForm"
      >
        生成需求卡
      </button>
    </div>
    <Loading-center v-show="loading" title="提交中..." />
  </div>
</template>

<script>
import { Field, Toast, TopNavBar, Icon } from '@chipspc/vant-dgg'
import { mapState, mapMutations } from 'vuex'
import { userinfoApi, consult } from '@/api'
import { transactionConsApi } from '@/api/transactionConsultation'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'Second',
  components: {
    [Field.name]: Field,
    [Toast.name]: Toast,
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    LoadingCenter,
    Header,
  },
  data() {
    return {
      loading: false,
      formData: {
        type: 'gszc',
        tel: '', // 电话
        name: '', // 姓名
        web: 'sp', // 归属（原网站类型）
        place: 'all',
        url: '',
        content: {
          备注: '',
          是否允许电话联系: '是',
        },
      },
      formType: '',
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
      userId: (state) => state.user.userId,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    const val = localStorage.getItem('needContent')
    this.formType = localStorage.getItem('needName')
    if (val) {
      this.formData.content.备注 = val
    }
    // 进入页面回显数据
    const sessionStorageFormData = JSON.parse(
      sessionStorage.getItem('formData')
    )
    if (sessionStorageFormData) {
      sessionStorageFormData.content = Object.assign(
        this.formData.content,
        sessionStorageFormData.content
      )
      this.formData = Object.assign(this.formData, sessionStorageFormData)
    }
    this.city = this.currentCity
  },
  destroyed() {
    // 缓存表单填写的数据
    let data = JSON.parse(sessionStorage.getItem('formData'))
    if (data) {
      data.content = Object.assign(data.content, this.formData.content)
      data = JSON.stringify(data)
      sessionStorage.setItem('formData', data)
    }
  },
  methods: {
    getCookie(name) {
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)', 'g')
      return document.cookie.match(reg)
    },
    // 选中
    select() {
      this.formData.content['是否允许电话联系'] =
        this.formData.content['是否允许电话联系'] === '是' ? '否' : '是'
    },
    // 选择城市
    tabCity() {
      this.$router.push({ path: '/city/choiceCity' })
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
          .get(userinfoApi.info_decrypt, {
            params: {
              id: userId || this.$cookies.get('userId', { path: '/' }),
            },
          })
          .then((res) => {
            if (res && res.code === 200) {
              resolve(res.data)
            } else {
              this.loading = false
            }
          })
          .catch((error) => {
            console.log('error', error)
          })
      })
    },
    async consultForm() {
      const str1 = this.replaceStr(this.formData.content.备注)
      this.loading = true
      localStorage.setItem('needContent', this.formData.content.备注)
      const userInfo = await this.getUserInfo(this.userId)
      if (!userInfo) return
      const params = {
        bizAreaCode: this.city.code,
        bizAreaName: this.city.name,
        comment: str1,
        customerAttribute: JSON.stringify(this.formData.content),
        customerName: userInfo.fullName,
        customerPhone: userInfo.mainAccount,
        customerSex: userInfo.sex || 2,
        sourceUrl: location.href,
        sourceSyscode: 'crisps-app', // 来源系统
        firstSourceChannel: 'crisps-app-one-home-page', // 一级来源渠道
        secondSourceChannel: 'crisps-app-two-look-service', // 二级来源渠道
        requireCode: localStorage.getItem('needCode') || 'FL20210425163722', // 需求编码
        requireName: localStorage.getItem('needName') || '工商变更', // 需求名称
        // "bizAreaCode": "string",
        // "bizAreaName": "string",
        // "comment": "string",
        // "customerAttribute": "string",
        // "customerName": "string",
        // "customerPhone": "string",
        // "customerSex": "string",
        // "ext1": "string",
        // "ext2": "string",
        // "ext3": "string",
        // "ext4": "string",
        // "extJson": "string",
        // "firstSourceChannel": "string",
        // "intentionLevel": 0,
        // "keyword": "string",
        // "productTypeCode": "string",
        // "requireCode": "string",
        // "requireName": "string",
        // "requireParentCode": "string",
        // "requireParentName": "string",
        // "secondSourceChannel": "string",
        // "sourceSyscode": "string",
        // "sourceUrl": "string"
      }
      this.$axios
        .post(transactionConsApi.resouse_form, params)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            localStorage.removeItem('needContent')
            this.$xToast.success('提交成功，请注意接听电话')
            sessionStorage.removeItem('formData')
            // start: 添加埋点接口
            window.spptMd.spptTrackRow('p_formSubmitResult', {
              form_type: this.formType,
              track_code: this.isInApp ? 'SPP001116' : 'SPW000115',
            })
            // end: 添加埋点接口
            this.formData = {
              type: 'gszc',
              tel: '', // 电话
              name: '', // 姓名
              web: 'sp', // 归属（原网站类型）
              place: 'all',
              url: '',
              content: {
                备注: '',
                是否允许电话联系: '是',
              },
            }
            this.$router.go(-2)
          } else {
            this.$xToast.show({
              message: res.message || '提交失败，请稍后再试！',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        .catch((error) => {
          this.loading = false
          this.$xToast.show({
            message: error.message || '提交失败，请稍后再试！',
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        })
    },
    // 提交表单
    // async consultForm() {
    //   if (this.loading) {
    //     return
    //   }
    //   this.loading = true
    //   const { mainAccountFull, fullName } = await this.getUserInfo(this.userId)
    //   this.formData.name = fullName
    //   this.formData.tel = mainAccountFull
    //   const newFormData = JSON.parse(JSON.stringify(this.formData))
    //   newFormData.content = JSON.stringify(newFormData.content)
    //   // 提交表单
    //   consult
    //     .consultAdd(newFormData)
    //     .then((res) => {
    //       this.loading = false
    //       this.$xToast.success('提交成功，请注意接听电话')
    //       sessionStorage.removeItem('formData')
    //       this.formData = {
    //         type: 'gszc',
    //         tel: '', // 电话
    //         name: '', // 姓名
    //         web: 'sp', // 归属（原网站类型）
    //         place: 'all',
    //         url: '',
    //         content: {
    //           备注: '',
    //           是否允许电话联系: '是',
    //         },
    //       }
    //       this.$router.go(-2)
    //     })
    //     .catch((res) => {
    //       this.loading = false
    //       this.$xToast.show({
    //         message: res.message,
    //         duration: 1000,
    //         icon: 'toast_ic_error',
    //         forbidClick: true,
    //       })
    //     })
    // },
    // 输入框文字发生改变
    changeFont(val) {
      const font = document.getElementsByClassName('sp-field__word-num')[0]
      if (val === '') {
        font.style.color = '#999999'
      } else {
        font.style.color = '#222222'
      }
    },
    replaceStr(str) {
      // https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
      // string sanitizes the given str by replacing invalid UTF-16 code unit
      // sequences with the unicode replacement character. Returns a new string.
      // 用 \ufffd 取代无效的增补字节的，无效的高位或者低位
      return str.replace(
        /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|([^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
        ''
      )
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

<style scoped lang="less">
.center {
  width: @spread-page-width;
  margin: 0 auto;
  background-color: #fff;
}
.margin {
  margin-right: 38px;
}
.form {
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
}
.banner {
  height: 320px;
  font-size: 0;
  position: relative;
  background-position: center center;
  background-size: 100% 100%;
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/13zjhce6649s000.jpg');
  &-button {
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 22px;
    position: absolute;
    left: 48px;
    bottom: 58px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    line-height: 24px;
    height: 44px;
    &-icon {
      margin-left: 12px;
    }
  }
}
//// 顶部导航左侧箭头字重
///deep/ .sp-top-nav-bar__left {
//  font-weight: lighter;
//}
//// 顶部组件居中
///deep/ .sp-top-nav-bar--fixed {
//  width: @spread-page-width;
//  margin-left: 50%;
//  transform: translateX(-375px);
//}
//// 头部组件多出线条的修改
///deep/ .sp-hairline--bottom::after {
//  border: none;
//}
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
</style>
