<template>
  <div v-if="$store.state.app.isShowOpenApp" class="open-app">
    <div class="closeApp" @click="closeOpenApp">
      <client-only>
        <my-icon
          name="notify_ic_close1"
          size="0.56rem"
          color="rgba(0, 0, 0, 0.4)"
        ></my-icon>
      </client-only>
    </div>
    <img class="sp-icon-img" src="" alt="" />
    <div class="desc">
      <p>薯片找人APP</p>
      <p>找人服务，尽在薯片找人</p>
    </div>
    <div class="open-app-btn" @click="openApp($event)">
      <span v-if="!isIOS">立即打开</span>
      <a
        v-else
        href='dggcustomerapp://{"androidRoute":"/dgg/android/MainActivity","androidParams":{},"iosRoute":"DGGCustomer:DGGCustomer/MainActivity///push/animation/","iosParams":{},"isLogin":"0"}'
        >立即打开</a
      >
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import openapp from '@/mixins/openapp'
export default {
  name: 'OpenApp',
  components: {
    [Icon.name]: Icon,
  },
  mixins: [openapp],
  data() {
    return {
      isShow: false,
      isIOS: false,
      thisType: 'openapp',
      noRoute: [
        '/order/confirmOrder',
        '/order/payFail',
        '/order/submitOrder',
        '/order/paySuccess',
        '/activity/20200825/writeOff',
        '/order/previewContractApp',
        '/number',
      ],
    }
  },
  mounted() {
    this.isIOS =
      !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ||
      !!navigator.userAgent.match(/UCBrowser/g)
  },
  methods: {
    closeOpenApp() {
      // this.isShow = false
      this.$store.commit('app/SET_IS_SHOW_OPEN_APP', false)
    },
    checkRoute(path) {
      // 如果当前的router是不显示该顶部栏的，则隐藏顶部栏
      const _index = this.noRoute.findIndex((str) => {
        return path === str
      })
      if (_index === -1 && this.$store.state.isShowOpenApp) {
        // this.isShow = true
        this.$store.commit('SET_IS_SHOW_OPEN_APP', true)
      } else {
        // this.isShow = false
        this.$store.commit('SET_IS_SHOW_OPEN_APP', false)
      }
    },
  },
}
</script>

<style lang="less" scoped>
/*@import '@/assets/styles/vant.var.less';*/
.open-app {
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  .closeApp {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    height: 56px;
    width: 56px;
    /*background-color: rgba(0, 0, 0, 0.4);*/
    align-items: normal;
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
    background-color: #fff;
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
        margin-top: 8px;
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
