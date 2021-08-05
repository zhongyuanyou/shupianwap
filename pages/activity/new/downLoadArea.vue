<template>
  <div>
    <HeadWrapper :fill="false" :line="false" @onHeightChange="onHeightChange">
      <div class="search_container">
        <div class="search">
          <!-- @click="uPGoBack" -->
          <div class="left-back" @click="uPGoBack">
            <my-icon
              name="nav_ic_back"
              class="back_icon"
              size="0.4rem"
              color="#FFFFFF"
            ></my-icon>
          </div>
          <div class="search-box">下载app</div>
          <div class="right">
            <my-icon
              class="search-icon"
              name="nav_ic_more1"
              size="0.4rem"
              color="#FFFFFF"
              @click.native="clickInputHandle"
            ></my-icon>
          </div>
        </div>
      </div>
    </HeadWrapper>
  </div>
  <!-- <div v-if="!isInApp" class="download-area">
    <img :src="$ossImgSetV2('g6trabnxtg80000.png')" class="logo" />
    <div class="desc">
      <div class="desc-name">薯片APP</div>
      <div class="desc-desc">企业服务大平台</div>
    </div>
    <sp-button class="button" @click="checkOutApp">立刻打开</sp-button>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="openAppConfirm"
      @cancel="cancel"
    />
  </div> -->
</template>
<script>
import { Button, CenterPopup } from '@chipspc/vant-dgg'
// $ossImgSetV2('g6trabnxtg80000.png')
export default {
  name: 'DownLoadArea',
  components: { [Button.name]: Button, [CenterPopup.name]: CenterPopup },
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
    // 直接调用打开方法,不加dialog
    confirm() {
      this.checkOutApp()
    },
    // 调用dialog打开方法
    openApp() {
      this.showPop = true
    },
    openAppConfirm() {
      this.showPop = false
      this.checkOutApp()
    },
    cancel() {
      this.showPop = false
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
.search_container {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  .search {
    display: flex;
    align-items: center;
    padding: 16px 0;

    background-size: 100% auto;

    .left-back {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 32px;
      .back_icon {
        width: 40px;
        height: 40px;
      }
    }

    .search-box {
      margin-right: 40px;
      height: 88px;

      display: flex;
      align-items: center;
      flex: 1;
    }
    .right {
      display: flex;
      align-items: center;

      .rule {
        height: 28px;

        font-weight: bold;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: right;
        line-height: 28px;
        margin: 0 32px;
      }
    }
  }
}
</style>
