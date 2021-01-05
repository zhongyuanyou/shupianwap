<template>
  <div class="center">
    <div>
      <!--    头部  -->
      <sp-top-nav-bar
        title="轻松找服务"
        background="transparent"
        title-color="#1A1A1A"
        ellipsis
        :fixed="true"
        :placeholder="true"
        z-index="999"
        @on-click-left="back"
      >
        <div slot="left" class="head">
          <my-icon name="nav_ic_back" size="0.4rem" color="#1a1a1a"></my-icon>
          <sp-icon name="cross" size="0.4rem" @click="close" />
        </div>
      </sp-top-nav-bar>
      <div class="banner">
        <!--    城市按钮  -->
        <div class="banner-button" @click="tabCity">
          <div class="banner-button-city">{{ currentCity.name || '成都' }}</div>
          <my-icon
            name="tap_ic_pen_n"
            color="#ffffff"
            size="0.14rem"
            class="icon banner-button-icon"
          ></my-icon>
        </div>
      </div>
    </div>
    <div class="form">
      <div class="form-title">您还有一些额外需求要告知我们？</div>
      <sp-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="更准确的描述需求，将有助于我们为您更好的服务"
        :show-word-limit="true"
        class="form-text"
      />
      <div class="form-read">
        <div class="form-read-first">
          <my-icon
            name="pay_ic_success"
            size="0.32rem"
            color="#2E73F5"
            class="icon"
          ></my-icon>
          <span>订阅专属服务</span>
        </div>
        <div class="form-read-second">
          为您匹配到合适服务时，将在第一时间联系您
        </div>
      </div>
      <button class="form-button" @click="consultForm">生成需求卡</button>
    </div>
  </div>
</template>

<script>
import { Field, Toast, TopNavBar, Icon } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
export default {
  name: 'Index',
  components: {
    [Field.name]: Field,
    [Toast.name]: Toast,
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      message: '',
      data: {},
      city: '成都',
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
    }),
  },
  mounted() {
    this.data = JSON.parse(localStorage.getItem('data'))
    console.log(this.data)
  },
  methods: {
    // 回退
    back() {
      this.$router.go(-1)
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
    // 提交表单
    consultForm() {
      this.data.content['更多需求'] = this.message
      localStorage.setItem('data', '') // 清空数据
      this.data.formId = this.getDate() // 生成表单唯一识别ID，后端用于判断二级表单与一级表单关联性（当前时间+手机号码）
      this.data.name = '匿名客户'
      this.data.url = window.open
      this.data.device = 'wap' // 设备：pc,wap
      this.data.web = 'SP' // 归属渠道：xmt,zytg,wxgzh
      this.data.content = JSON.stringify(this.data.content)
      window.promotion.privat.consultForm(this.data, (res) => {
        if (res.error === 0) {
          // 这里写表单提交成功后的函数，如二级表单弹出，提示提交成功，清空DOM中表单的数据等
          Toast('提交成功，请注意接听电话')
          this.message = ''
        } else {
          Toast(res.msg)
        }
      })
    },
  },
  head() {
    return {
      title: '第二步',
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
  width: 750px;
  margin: 0 auto;
}
.form {
  padding: 64px 40px 24px;
  font-size: 0;
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
.head {
  font-weight: lighter;
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
    &-icon {
      margin-left: 12px;
    }
  }
}
// 头部组件多出线条的修改
/deep/ .sp-hairline--bottom::after {
  border: none;
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
  color: #cccccc;
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
  color: #cccccc;
  line-height: 28px;
}
</style>
