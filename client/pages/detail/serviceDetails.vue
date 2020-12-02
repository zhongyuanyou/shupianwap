<template>
  <div class="serviceDetails">
    <!-- 导航栏-->
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
    <!--   banner -->
    <Banner :images="info.images" />
    <!--   BasicInfo(基本信息)-->
    <BasicInfo :data="info.basicInfo" />
    <!--    服务项目-->
    <ServiceItems :data="info.serviceItems" />
    <!--    服务详情-->
    <ServiceInfo />
    <!--    推荐规划师-->
    <Planners :info="info" />
  </div>
</template>

<script>
import { Sticky, TopNavBar } from '@chipspc/vant-dgg'
import Banner from '~/components/detail/Banner'
import BasicInfo from '~/components/detail/service/BasicInfo'
import ServiceItems from '~/components/detail/service/ServiceItems'
import ServiceInfo from '~/components/detail/service/ServiceInfo'
import Planners from '~/components/detail/Planners'
export default {
  name: 'ServiceDetails',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    Banner,
    BasicInfo,
    ServiceItems,
    ServiceInfo,
    Planners,
  },
  data() {
    return {
      opacity: 0,
      info: {
        images: [
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
        basicInfo: {},
        serviceItems: [
          { serviceName: '公司核名服务', serviceDes: '这是一段描述' },
          { serviceName: '工商系统提报', serviceDes: '这是一段描述' },
        ],
        planners: [
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        ],
      },
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
.serviceDetails {
  background: #f8f8f8;
  /deep/ .sp-hairline--bottom::after {
    border-bottom: none;
  }
}
</style>
