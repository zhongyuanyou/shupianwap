<template>
  <div class="download-area">
    <div class="download_left">
      <div class="download_left_icon">
        <my-icon name="logo_mian" size="0.40rem" color="#4974F7" />
      </div>
      <div class="download_left_des">
        <div class="download_left_des_title">薯片找人APP</div>
        <div class="download_left_des_word">找人服务，尽在薯片找人</div>
      </div>
    </div>
    <div class="download_right" @click="openApp">立即打开</div>
  </div>
</template>

<script>
export default {
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
      url: '',
      showConfirm: false,
      downLoadUrl: '',
    }
  },
  mounted() {
    const userAgent = window.navigator.userAgent
    console.log('userAgent', userAgent)
    this.isAndroid =
      userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
    this.isIOS = userAgent.match(/iPhone|iPad|iPod/i) ? 1 : 0 // ios终端
    // this.showDownLoadArea = this.isAndroid || this.isIOS
  },
  methods: {
    openApp() {
      this.checkOutApp()
    },
    checkOutApp() {
      const ua = window.navigator.userAgent
      let isBlur = false
      let url = ''
      let downLoadUrl = ''
      if (this.isIOS) {
        url = this.iosLink
        downLoadUrl = 'https://apps.apple.com/cn/app/薯片找人/id1535886630'
      } else if (this.isAndroid) {
        url = this.androdLink
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
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        // 是否微信打开
        this.$xToast.show({
          message: '微信内不支持打开外部应用，请更换为其他浏览器打开本页面。',
          duration: 3000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
      } else {
        location.href = url // app的 url scheme
        setTimeout(function () {
          if (!isBlur) {
            window.location.href = downLoadUrl
          }
        }, 1000)
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
          console.log('失去焦點')
          isBlur = true
        }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    },
  },
}
</script>

<style lang="less" scoped>
@font-medium: pingfangsc-medium;
@font-regular: pingfangsc-regular;
.mixin-flex {
  display: flex;
  align-items: center;
}

.download-area {
  font-size: 24px;
  padding: 14px 40px 0 40px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  color: #222;
  .icon {
    width: 40px;
  }
  .download_left {
    width: 320px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .download_left_icon {
      width: 40px;
      height: 40px;
      margin-top: 10px;
      font-size: 36px;
      overflow: hidden;
    }
  }
  .download_right {
    font-size: 24px;
    width: 120px;
    text-align: center;
    height: 50px;
    margin-top: 10px;
    line-height: 50px;
    color: #4974f7;
    border: 1px solid #4974f7;
    border-radius: 12px;
  }
}
</style>
