<template>
  <div class="company-register">
    <div class="company-top">
      <sp-top-nav-bar
        background="#4653E0"
        ellipsis
        @on-click-left="onClickLeft"
      >
        <div slot="left" class="nav-back">
          <my-icon name="nav_ic_back" size="0.40rem" color="#ffffff"></my-icon>
        </div>
      </sp-top-nav-bar>
      <span class="location" @click="onMore"
        >{{ cityName }}
        <my-icon name="tap_ic_pen_n" size="0.08rem" color="#ffffff"></my-icon>
      </span>
    </div>
  </div>
</template>
<script>
import {
  TopNavBar,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    // 待删除--
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Image.name]: Image,
  },
  data() {
    return {
      cityName: '成都',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onMore() {
      console.log(123)
    },
  },
}
</script>
<style lang="less" scoped>
.company-register {
  /deep/.company-top {
    height: 378px;
    background-color: #4653e0;
    position: relative;
    .sp-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .nav-back {
      font-weight: 400;
    }
    .location {
      position: absolute;
      left: 48px;
      bottom: 58px;
      width: 113px;
      height: 44px;
      line-height: 44px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 22px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      display: block;
      color: #ffffff;
      text-align: center;
      /deep/.spiconfont-tap_ic_pen_n {
        font-weight: 400;
        display: inline-block;
        transform:translate(0,-3px)
        // transform: scale(0.69);
      }
    }
  }
}
</style>
