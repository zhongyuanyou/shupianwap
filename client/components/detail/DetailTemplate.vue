<template>
  <div class="template">
    <!--S 导航栏-->
    <sp-sticky z-index="5" @scroll="scrollHandle">
      <sp-top-nav-bar ellipsis :background="`rgba(255,255,255,${opacity})`">
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
        <template #right></template>
      </sp-top-nav-bar>
    </sp-sticky>
    <!--E 导航栏-->
    <!--S banner-->
    <Banner :images="info.images" />
    <!--S banner-->
    <!--S 第一板块-->
    <Title :info="{ ...info }" />
    <!--E 第一板块-->
    <!--S 第二板块 基本信息-->
    <Basic :info="{ ...info }" />
    <!--E 第二板块 基本信息-->
    <!--S 第三板块 评估报告-->
    <Report :info="{ ...info }" />
    <!--E 第三板块 评估报告-->
    <!--S 第四板块 交易服务保障承诺-->
    <Commitment :info="{ ...info }" />
    <!--E 第四板块 交易服务保障承诺-->
    <!--S 第五板块 推荐规划师-->
    <Planners :info="{ ...info }" />
    <!--E 第五板块 推荐规划师-->
    <!--S 第六板块 商品动态-->
    <Dynamic :info="{ ...info }" />
    <!--E 第六板块 商品动态-->
    <!--S 第七板块 常见问题-->
    <Question :info="{ ...info }" />
    <!--E 第七板块 常见问题-->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button type="info" :text="text1"> </sp-bottombar-button>
      <sp-bottombar-button type="primary" :text="text2"> </sp-bottombar-button>
    </sp-bottombar>
  </div>
</template>

<script>
import {
  TopNavBar,
  Sticky,
  Bottombar,
  BottombarButton,
  BottombarIcon,
  BottombarInfo,
} from '@chipspc/vant-dgg'
import Banner from '~/components/detail/Banner'
import Title from '~/components/detail/Title'
import Basic from '~/components/detail/Basic'
import Report from '~/components/detail/Report'
import Commitment from '~/components/detail/Commitment'
import Planners from '~/components/detail/Planners'
import Dynamic from '~/components/detail/Dynamic'
import Question from '~/components/detail/Question'
export default {
  name: 'DetailTemplate',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
    [BottombarInfo.name]: BottombarInfo,
    Banner,
    Title,
    Basic,
    Report,
    Commitment,
    Planners,
    Dynamic,
    Question,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      opacity: 0,
      card: {
        imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
        cardName: '王深林',
        cardSign: '金牌规划师',
        icon: 'coupon-o',
        round: true,
        avatarSize: 40,
      },
      text1: '在线咨询',
      text2: '电话咨询',
    }
  },
  methods: {
    scrollHandle({ scrollTop }) {
      // 滚动事件
      this.opacity = scrollTop / 120
    },
  },
}
</script>

<style lang="less" scoped>
.template {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  padding-bottom: 144px;
  /deep/ .sp-hairline--bottom::after {
    border-bottom: none;
  }
}
</style>
