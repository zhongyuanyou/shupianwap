/*
 * @Author: majinghe
 * @Date: 2021-06-07 5:51:23 PM
 * @Description: 判断是否安装app,安装打开;没有安装则进入下载页
 */
import { CenterPopup } from '@chipspc/vant-dgg'

export default {
  components: {
    [CenterPopup.name]: CenterPopup,
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
      myIosLink: 'cpsccustomer://',
      myAndrodLink: 'cpsccustomer://',
    }
  },
  mounted() {
    const userAgent = window.navigator.userAgent
    this.isAndroid =
      userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
    this.isIOS = userAgent.match(/iPhone|iPad|iPod/i) // ios终端
  },
  methods: {
    // 直接调用打开方法,不加dialog
    confirm(event, iosLink = '', androdLink = '') {
      // 优化传链接的2种方式,一种直接通过方法调用,一种通过组件
      if (iosLink !== '') {
        this.myIosLink = iosLink
      }
      if (androdLink !== '') {
        this.myAndrodLink = androdLink
      }
      this.checkOutApp()
    },
    // 调用dialog打开方法
    openApp(event, iosLink = '', androdLink = '') {
      this.showPop = true
      // 优化传链接的2种方式,一种直接通过方法调用,一种通过组件
      if (iosLink !== '') {
        this.myIosLink = iosLink
      }
      if (androdLink !== '') {
        this.myAndrodLink = androdLink
      }
    },
    openAppConfirm() {
      this.showPop = false
      this.checkOutApp()
    },
    cancel() {
      this.showPop = false
    },
    checkOutApp() {
      const ua = window.navigator.userAgent
      let isBlur = false
      let url = ''
      let downLoadUrl = ''
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
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
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
