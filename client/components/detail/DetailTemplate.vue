<template>
  <div class="template">
    <!--S 导航栏-->
    <sp-sticky z-index="5" @scroll="scrollHandle">
      <sp-top-nav-bar
        ellipsis
        :background="`rgba(255,255,255,${opacity})`"
        @on-click-left="onClickLeft"
      >
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
    <Basic :info="{ ...info }">
      <div slot="basic">
        <div class="company_info">
          <div class="item">企业行业：<span>工程类</span></div>
          <div class="item">经营时间：<span>3年以上</span></div>
          <div class="item">注册资本：<span>1000万</span></div>
          <div class="item">企业类型：<span>有限责任公司</span></div>
          <div class="item">注册资本：<span>小规模纳税人</span></div>
        </div>
      </div>
    </Basic>
    <!--E 第二板块 基本信息-->
    <slot name="qualification"></slot>
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
    <!--S 第八板块 成功案例-->
    <Case :info="{ ...info }" />
    <!--E 第八板块 成功案例-->
    <!--S 第九板块 同类推荐-->
    <Recommend :info="{ ...info }" />
    <!--E 第九板块 同类推荐-->
    <!--S 第十板块 猜你需要-->
    <Need :info="{ ...info }" />
    <!--E 第十板块 猜你需要-->
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
import Case from '~/components/detail/Case'
import Recommend from '~/components/detail/Recommend'
import Need from '~/components/detail/Need'
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
    Case,
    Recommend,
    Need,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
    detailType: {
      type: String,
      default: () => {
        return '1'
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
    onClickLeft() {
      // 返回上一页
      this.$router.back()
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
.company {
  &_info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
    .item {
      min-width: 50%;
      max-width: 100%;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-top: 32px;
      span {
        color: #1a1a1a;
      }
    }
  }
}
</style>
