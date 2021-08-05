<template>
  <div class="download">
    <HeadWrapper
      :fill="true"
      :line="false"
      @onHeightChange="(height) => (headerHeight = height)"
    >
      <Header class="my-header" title="下载APP">
        <template #right>
          <my-icon
            class="search-icon"
            name="nav_ic_more1"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </template>
      </Header>
    </HeadWrapper>
    <div class="tips">若您已安装app,点此打开</div>
    <div class="btn">点击立即下载</div>
  </div>
</template>
<script>
import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import Header from '@/components/common/head/header.vue'
// import { Button, CenterPopup } from '@chipspc/vant-dgg'
// $ossImgSetV2('g6trabnxtg80000.png')
export default {
  name: 'DownLoadArea',
  components: {
    HeadWrapper,
    Header,
  },
  props: {
    iosLink: {
      type: String,
      default: 'cpsccustomer://',
    },
    androdLink: {
      type: String,
      default: 'cpsccustomer://', //  主页'cpsccustomer://{"path":"/main/android/main","parameter":{"selectedIndex":2}}'
    },
  },
  data() {
    return {
      Field: {
        type: 'functional',
        title: '即将离开当页，进入APP',
        confirmButtonText: '立即进入',
        cancelButtonText: '取消',
      },
      showPop: false,
      isIOS: false,
      isAndroid: false,

      headerHeight: 0,
    }
  },
  computed: {
    myIosLink() {
      return this.iosLink || 'cpsccustomer://'
    },
    myAndrodLink() {
      return this.androdLink || 'cpsccustomer://'
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
  },
  mounted() {
    const userAgent = window.navigator.userAgent
    this.isAndroid =
      userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
    this.isIOS = userAgent.match(/iPhone|iPad|iPod/i) // ios终端
  },
  methods: {
    uPGoBack() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {
          if (!res || res.code !== 200) {
            this.$xToast.show({
              message: '返回失败',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        return
      }

      // 在浏览器里 返回, 若没返回记录了，就跳转到首页
      if (window && window.history && window.history.length <= 1) {
        this.$router.replace('/')
        return
      }
      this.$router.back(-1)
    },

    checkOutApp() {
      const ua = window.navigator.userAgent.toLowerCase()
      let isBlur = false
      let url = ''
      let downLoadUrl = ''
      console.log(`output this.myIosLink: ${this.myIosLink}`)
      console.log(`output this.myAndrodLink: ${this.myAndrodLink}`)
      if (this.isIOS) {
        url = this.myIosLink
        downLoadUrl = 'https://apps.apple.com/cn/app/薯片找人/id1535886630'
      } else if (this.isAndroid) {
        url = this.myAndrodLink
        downLoadUrl =
          'http://m.pp.cn/detail.html?appid=8180749&ch_src=pp_dev&ch=default'
      } else {
        this.$xToast.show({
          message: '请使用手机浏览器访问本页面即可打开薯片找人APP',
          duration: 3000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }
      if (ua.indexOf('micromessenger') !== -1) {
        // 是否微信打开
        this.$xToast.show({
          message: '微信内不支持打开外部应用，请更换为其他浏览器打开本页面。',
          duration: 3000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
      } else {
        location.href = url
        setTimeout(function () {
          if (!isBlur) {
            window.location.href = downLoadUrl
          }
        }, 2000)
      }
      window.onblur = function () {
        isBlur = true
      }
      const hiddenProperty =
        'hidden' in document
          ? 'hidden'
          : 'webkitHidden' in document
          ? 'webkitHidden'
          : 'mozHidden' in document
          ? 'mozHidden'
          : null
      const visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        'visibilitychange'
      )
      const onVisibilityChange = function () {
        if (document[hiddenProperty]) {
          isBlur = true
        }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    },
  },
}
</script>
<style lang="less" scoped>
.download {
  font-family: PingFangSC;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .search-icon {
    margin-right: 32px;
  }
  .tips {
    font-size: 30px;
    color: #555555;
    letter-spacing: 1px;
    line-height: 30px;
    margin: 35px 0 48px;
    text-align: center;
  }
  .btn {
    background: #4974f5;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
    margin: 0 89px 12px;
    height: 104px;
    line-height: 104px;
    font-size: 40px;
    color: #ffffff;
    letter-spacing: 1.25px;
  }
}

// .search_container {
//   padding-top: constant(safe-area-inset-top);
//   padding-top: env(safe-area-inset-top);
//   .search {
//     display: flex;
//     align-items: center;
//     padding: 16px 0;

//     background-size: 100% auto;

//     .left-back {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0 32px;
//       .back_icon {
//         width: 40px;
//         height: 40px;
//       }
//     }

//     .search-box {
//       margin-right: 40px;
//       height: 88px;
//       line-height: 88px;
//       // display: flex;
//       // align-items: center;
//       flex: 1;

//       font-size: 36px;
//       color: #1a1a1a;
//       text-align: center;
//       font-weight: bold;
//     }
//     .right {
//       display: flex;
//       align-items: center;
//     }
//   }
// }
</style>
