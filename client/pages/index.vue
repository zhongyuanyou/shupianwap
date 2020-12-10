<template>
  <div class="page-content">
    <!-- S 搜索 + 大banner -->
    <SearchBanner ref="searchBannerRef" />
    <!-- E 搜索 + 大banner -->
    <!-- S 金刚区nav -->
    <HomeNav />
    <!-- E 金刚区nav -->
    <!-- S 轮播banner -->
    <SwiperBanner />
    <!-- E 轮播banner -->
    <!-- S 帮我找服务 -->
    <Help />
    <!-- E 帮我找服务 -->
    <!-- S 限时特惠 -->
    <Preferential />
    <!-- E 限时特惠 -->
    <!-- S 资讯精选 -->
    <Information />
    <!-- E 资讯精选 -->
    <!-- S 热门服务 -->
    <HotServe />
    <!-- E 热门服务 -->
    <!-- S 推荐服务 -->
    <Recommend ref="recommendRef" />
    <!-- E 推荐服务 -->
    <!-- S 悬浮按钮 -->
    <FiexdBtn />
    <!-- E 悬浮按钮 -->
  </div>
</template>

<script>
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
import SwiperBanner from '@/components/home/SwiperBanner'
import Help from '@/components/home/Help'
import Preferential from '@/components/home/Preferential'
import Information from '@/components/home/Information'
import HotServe from '@/components/home/HotServe'
import Recommend from '@/components/home/Recommend'
import FiexdBtn from '@/components/home/FiexdBtn'
import { homeApi } from '@/api'
export default {
  layout: 'nav',
  name: 'Home',
  components: {
    SearchBanner,
    HomeNav,
    SwiperBanner,
    Help,
    Preferential,
    Information,
    HotServe,
    Recommend,
    FiexdBtn,
  },
  async asyncData({
    $axios,
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    // 首屏请求导航和广告的参数
    const initReqParams = {
      locationCodeList: ['ad100064'], // 广告位code
      rollPage: 1, // 滚动导航当前页
      rollLimit: 20, // 滚动导航每页条数
      fixedPage: 1, // 固定导航当前页
      fixedLimit: 5, // 固定导航每页条数
      fixedNavCategoryCode: 'nav100020', // 固定导航分类code
      fixedNavPlatformCode: 'CRISPS', // 固定导航平台code
      rollNavCategoryCode: 'nav100020', // 滚动导航分类code
      rollNavPlatformCode: 'CRISPS', // 滚动导航平台code
    }
    let initData = {}
    try {
      const res = await $axios.post(homeApi.initRequest, initReqParams)
      if (res.code === 200) {
        initData = res.data
      }
    } catch (error) {}
    return {
      initData,
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.initData)
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.page-content {
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
  /deep/ .sp-sticky--fixed {
    max-width: 1000px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
