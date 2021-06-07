<template>
  <div class="m-known-share appdown">
    <img :src="$ossImgSetV2('g6trabnxtg80000.png')" class="logo" />
    <div class="desc">
      <div class="desc-name">薯片APP</div>
      <div class="desc-desc">企业服务大平台</div>
    </div>
    <sp-button class="button" @click="openApp">立刻打开</sp-button>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import { Button, CenterPopup } from '@chipspc/vant-dgg'
export default {
  name: 'KnownAppLink',
  components: { [Button.name]: Button, [CenterPopup.name]: CenterPopup },
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
      iosLink: 'cpsccustomer://',
      androdLink: 'cpsccustomer://',
    }
  },
  mounted() {
    const userAgent = window.navigator.userAgent
    this.isAndroid =
      userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1 // android终端
    this.isIOS = userAgent.match(/iPhone|iPad|iPod/i) // ios终端
  },
  methods: {
    confirm() {
      this.showPop = false
      this.checkOutApp()
    },
    openApp() {
      this.showPop = true
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
        location.href = url
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
          isBlur = true
        }
      }
      document.addEventListener(visibilityChangeEvent, onVisibilityChange)
    },
  },
}
</script>
<style lang="less" scoped>
.m-known-share.appdown {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 0 28px;
  background: #fff;
  .logo {
    height: 80px;
    width: 80px;
  }
  .desc {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    &-name {
      font: bold 32px @fontf-pfsc-med;
      color: #222;
    }
    &-desc {
      font: 24px @fontf-pfsc-reg;
      color: #999;
    }
  }
  .button {
    position: absolute;
    right: 28px;
    font: bold 26px @fontf-pfsc-med;
    background: #4974f5;
    width: 160px;
    height: 64px;
    border: none;
    border-radius: 8px;
    color: #ffffff;
  }
  ::v-deep .sp-center-popup {
    width: 540px;
  }
  ::v-deep .sp-center-popup__containerConfirm {
    width: 540px;
  }
  ::v-deep .sp-center-popup__title {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    height: 130px;
    font: bold 36px/130px @fontf-pfsc-med;
    color: #1a1a1a;
    text-align: center;
    box-sizing: border-box;
  }
  ::v-deep .sp-center-popup__cancel {
    line-height: 96px;
    height: 96px;
    font-size: 32px;
    color: #222222;
  }
  ::v-deep .sp-center-popup__confirm {
    line-height: 96px;
    height: 96px;
    font-size: 32px;
    font-weight: bold;
    color: #4974f5;
  }
}
</style>
