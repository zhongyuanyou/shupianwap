<template>
  <div class="download">
    <HeadWrapper
      v-if="!isWeixin"
      :fill="true"
      :line="false"
      @onHeightChange="(height) => (headerHeight = height)"
    >
      <Header class="my-header" title="下载APP">
        <!-- <template #right>
          <my-icon
            class="search-icon"
            name="nav_ic_more1"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </template> -->
      </Header>
    </HeadWrapper>
    <div class="bk_container">
      <img
        class="picture"
        src="https://cdn.shupian.cn/sp-pt/wap/images/y205jebq6kw000.png"
        alt=""
      />
      <img
        class="bk_color"
        src="https://cdn.shupian.cn/sp-pt/wap/images/crih96hhw4o0000.png"
        alt=""
      />
      <img
        class="bk_phone"
        src="https://cdn.shupian.cn/sp-pt/wap/images/44zftgjj3iy0000.png"
        alt=""
      />
    </div>

    <div class="tips">若您已安装app,点此打开</div>
    <div class="btn" @click="download">点击立即下载</div>
  </div>
</template>
<script>
import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import Header from '@/components/common/head/header.vue'
// import { Button, CenterPopup } from '@chipspc/vant-dgg'
// $ossImgSetV2('g6trabnxtg80000.png')
export default {
  name: 'DownLoadApp',
  components: {
    HeadWrapper,
    Header,
  },

  data() {
    return {
      isIOS: false,
      isAndroid: false,
      isWeixin: false,
      packagename: 'com.chips.cpscustomer',
      headerHeight: 0,
    }
  },
  computed: {
    myIosLink() {
      return 'cpsccustomer://'
    },
    myAndrodLink() {
      //  主页'cpsccustomer://{"path":"/main/android/main","parameter":{"selectedIndex":2}}'
      return 'cpsccustomer://'
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
  },
  mounted() {
    const userAgent = window.navigator.userAgent.toLowerCase()
    console.log(userAgent)
    this.isAndroid =
      userAgent.indexOf('android') > -1 ||
      userAgent.indexOf('adr') > -1 ||
      userAgent.indexOf('harmonyos') > -1 // android和鸿蒙终端

    this.isIOS = userAgent.match(/iphone|ipad|ipod/i) // ios终端

    this.isWeixin = userAgent.indexOf('micromessenger') !== -1
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
    download() {
      let downLoadUrl = ''
      if (this.isWeixin) {
        this.$xToast.show({
          message: '微信内不支持打开外部应用，请更换为其他浏览器打开本页面。',
          duration: 3000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }
      if (this.isIOS) {
        downLoadUrl = 'https://apps.apple.com/cn/app/薯片找人/id1535886630'
      } else {
        downLoadUrl =
          'http://m.pp.cn/detail.html?appid=8180749&ch_src=pp_dev&ch=default'
      }
      window.location.href = downLoadUrl
    },

    // 打开app，安卓未安装则打开应用市场或者pp网页，ios打开appstore
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
      } else {
        this.$xToast.show({
          message: '请使用手机浏览器访问本页面即可打开薯片找人APP',
          duration: 3000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        return
      }
      if (this.isWeixin) {
        this.$xToast.show({
          message: '微信内不支持打开外部应用，请更换为其他浏览器打开本页面。',
          duration: 3000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
      } else {
        setTimeout(() => {
          console.log('downLoadUrl isBlur', isBlur)

          if (!isBlur) {
            if (this.isIOS) {
              console.log('downLoadUrl ios', downLoadUrl)
              window.location.href = downLoadUrl
            } else if (this.isAndroid) {
              this.toAndroidStore(this.packagename)
            }
          }
        }, 2000)
        location.href = url
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

    toAndroidStore(AppName) {
      const sUserAgent = navigator.userAgent.toLowerCase()
      console.log(AppName, sUserAgent)
      const isHuawei = sUserAgent.indexOf('huawei') !== -1
      const isHonor = sUserAgent.indexOf('honor') !== -1
      const isOppo = sUserAgent.indexOf('oppo') !== -1
      const isOppoR15 = sUserAgent.indexOf('pacm00') !== -1
      const isVivo = sUserAgent.indexOf('vivo') !== -1
      const isXiaomi = sUserAgent.indexOf('mi') !== -1
      const isXiaomi2s = sUserAgent.indexOf('mix') !== -1
      const isRedmi = sUserAgent.indexOf('redmi') !== -1

      console.log(
        isHuawei,
        isHonor,
        isOppo,
        isOppoR15,
        isVivo,
        isXiaomi,
        isXiaomi2s,
        isRedmi
      )
      if (isHuawei || isHonor) {
        console.log('华为')
        location.href = 'appmarket://details?id=' + AppName
      } else if (isOppo || isOppoR15) {
        location.href = 'oppomarket://details?packagename=' + AppName
      } else if (isVivo) {
        location.href = 'vivomarket://details?id=' + AppName
      } else if (isXiaomi || isRedmi || isXiaomi2s) {
        location.href = 'mimarket://details?id=' + AppName
      } else {
        // 没找到应该直接下载app
        window.location.href =
          'http://m.pp.cn/detail.html?appid=8180749&ch_src=pp_dev&ch=default'
      }
    },
  },
  head() {
    return { title: '下载APP' }
  },
}
</script>
<style lang="less" scoped>
.download {
  font-family: PingFangSC;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background: #f5f5f5;
  min-height: 100vh;
  overflow: hidden;

  .bk_container {
    position: relative;
    .bk_color {
      width: 100%;
    }
    .picture {
      position: absolute;
      height: 100px;
      top: 78px;
      left: 50px;
    }
    .bk_phone {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
    }
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
</style>
