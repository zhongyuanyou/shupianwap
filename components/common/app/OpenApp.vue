<template>
  <div
    v-if="$store.state.app.isShowOpenApp && isShow"
    class="open-app"
    :style="{
      position: noFixed ? 'relative' : 'fixed',
      bottom: `${bottom}px`,
    }"
  >
    <div class="closeApp" @click="closeOpenApp">
      <client-only>
        <my-icon
          name="notify_ic_close1"
          size="0.54rem"
          color="rgba(0, 0, 0, 0.4)"
        ></my-icon>
        <my-icon
          name="login_ic_clear"
          size="0.20rem"
          color="rgba(255, 255, 255, 0.1)"
        ></my-icon>
      </client-only>
    </div>
    <!--<img-->
    <!--class="sp-icon-img"-->
    <!--:src="$ossImgSet(200, 200, 'g6trabnxtg80000.png')"-->
    <!--alt=""-->
    <!--/>-->
    <svg
      t="1610676931620"
      class="icon sp-icon-img"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5169"
      width="200"
      height="200"
    >
      <path
        d="M0 0m136.533333 0l750.933334 0q136.533333 0 136.533333 136.533333l0 750.933334q0 136.533333-136.533333 136.533333l-750.933334 0q-136.533333 0-136.533333-136.533333l0-750.933334q0-136.533333 136.533333-136.533333Z"
        fill="#4974F5"
        p-id="5170"
      ></path>
      <path
        d="M811.178667 644.778667v148.650666a21.640533 21.640533 0 0 1-21.845334 21.162667h-151.893333c-2.730667 1.194667-5.632 2.218667-8.362667 3.413333v-124.928a115.387733 115.387733 0 0 0-230.741333 0V819.2a326.7584 326.7584 0 0 1-115.712-72.874667 312.644267 312.644267 0 0 1 0-448.682666 329.762133 329.762133 0 0 1 458.752 0 312.7808 312.7808 0 0 1 69.802667 347.136z m-299.349334-312.32a106.0864 106.0864 0 1 0 108.032 106.154666 107.1104 107.1104 0 0 0-108.032-106.154666z"
        fill="#FFFFFF"
        p-id="5171"
      ></path>
    </svg>
    <div class="desc">
      <p>薯片找人APP</p>
      <p>找人服务，尽在薯片找人</p>
    </div>
    <div class="open-app-btn" @click="clickBtn">
      <!--<span v-if="!isIOS">立即打开</span>-->
      <span>立即打开</span>
      <!--<a
        v-else
        href='dggcustomerapp://{"androidRoute":"/dgg/android/MainActivity","androidParams":{},"iosRoute":"DGGCustomer:DGGCustomer/MainActivity///push/animation/","iosParams":{},"isLogin":"0"}'
        >立即打开</a
      >-->
    </div>
  </div>
</template>

<script>
import h5Openapp from 'h5-openapp'
import openapp from '@/mixins/openapp'
export default {
  name: 'OpenApp',
  mixins: [openapp],
  props: {
    noFixed: {
      type: Boolean,
      default() {
        return false
      },
    },
    bottom: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      isShow: true,
      isIOS: false,
      thisType: 'openapp',
      noRoute: ['/my'],
    }
  },
  watch: {
    $route(to, from) {
      this.checkRoute(to.path)
    },
  },
  mounted() {
    this.checkRoute(this.$route.fullPath)
    this.isIOS =
      !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
      !!navigator.userAgent.match(/UCBrowser/g)
  },
  methods: {
    clickBtn() {
      h5Openapp({
        scheme:
          'dggcustomerapp://{"androidRoute":"/dgg/android/MainActivity","androidParams":{},"iosRoute":"DGGCustomer:DGGCustomer/MainActivity///push/animation/","iosParams":{},"isLogin":"0"}', // eg: myapp:///mypath?key1=value1&key2=value2
        download: {
          // 默认 scheme 跳转无效，便前往下载, 设置 onTimeout 回调时, 不执行下载逻辑
          ios: 'https://itunes.apple.com/app/apple-store/id1462879855?mt=8', // ios 下载链接
          android: 'https://a.app.qq.com/o/simple.jsp?pkgname=net.dgg.fitax', // android 下载链接
          other: 'https://a.app.qq.com/o/simple.jsp?pkgname=net.dgg.fitax', // 其他渠道 下载链接
        },
        delay: 3000, // 等待时间, 超时后执行 onTimeout,  default: 3000
        disabledScheme: [], // scheme 被禁用的 APP, eg: ['MicroMessenger', 'DingTalk', '...'] (iOS 9+ 深链接不会被禁)
        onDisabled(appTag) {
          // 当打开网页的 APP 为 disabledApp 中的任一个，并且未设置深链接时
          if (appTag === 'MicroMessenger') {
            console.log('微信不支持 scheme 跳转')
            // 如果是微信打开的页面，则跳应用宝
            window.location.href =
              'https://a.app.qq.com/o/simple.jsp?pkgname=net.dgg.fitax'
          } else if (appTag === 'DingTalk') {
            console.log('钉钉不支持 scheme 跳转')
          } else {
            console.log(appTag)
          }
        },
        onBeforeOpen() {
          // 在执行打开 app 逻辑前触发
        },
      })
    },
    closeOpenApp() {
      // this.isShow = false
      this.$store.commit('app/SET_IS_SHOW_OPEN_APP', false)
    },
    checkRoute(path) {
      // 如果当前的router是不显示该顶部栏的，则隐藏顶部栏
      const _index = this.noRoute.indexOf(path)
      if (_index === -1 && this.$store.state.app.isShowOpenApp) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
/*@import '@/assets/styles/vant.var.less';*/
.open-app {
  position: fixed;
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  left: 0;
  bottom: 0;
  z-index: 20;
  .closeApp {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    height: 56px;
    width: 56px;
    /*background-color: rgba(0, 0, 0, 0.4);*/
    align-items: normal;
    i {
      display: block;
    }
    .spiconfont-login_ic_clear {
      position: absolute;
      top: 8px;
      left: 6px;
    }
  }
  .sp-iconfont {
    position: absolute;
    margin-top: 8px;
    margin-left: 6px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.1);
    transform: scale(0.7);
  }
  .sp-icon-img {
    width: 60px;
    height: 60px;
    margin-left: 40px;
  }
  .desc {
    flex: auto;
    margin-left: 15px;
    p {
      &:nth-child(1) {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 33px;
      }
      &:nth-child(2) {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.4);
        line-height: 27px;
        margin-top: 6px;
      }
    }
  }
  .open-app-btn {
    height: 100%;
    width: 220px;
    background-color: @dgg-blue;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 100px;
    a {
      font-size: 32px;
      color: #ffffff;
      font-family: PingFang SC;
    }
  }
}
</style>
