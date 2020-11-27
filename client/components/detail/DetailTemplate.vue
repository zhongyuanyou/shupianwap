<template>
  <div class="template">
    <!--S 导航栏-->
    <sp-top-nav-bar ellipsis background="rgba(0,0,0,0)" fixed>
      <template #left>
        <div>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
        </div>
      </template>
      <template #right></template>
    </sp-top-nav-bar>
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
  </div>
</template>

<script>
import { TopNavBar, Sticky } from '@chipspc/vant-dgg'
import Banner from '~/components/detail/Banner'
import Title from '~/components/detail/Title'
import Basic from '~/components/detail/Basic'
import Report from '~/components/detail/Report'
import Commitment from '~/components/detail/Commitment'
import Planners from '~/components/detail/Planners'
export default {
  name: 'DetailTemplate',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    Banner,
    Title,
    Basic,
    Report,
    Commitment,
    Planners,
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.template {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/ .sp-hairline--bottom::after {
    border-bottom: none;
  }
}
</style>
