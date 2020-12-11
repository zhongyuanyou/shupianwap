<template>
  <div class="page-content">
    <!-- S 搜索 + 大banner -->
    <SearchBanner
      ref="searchBannerRef"
      :fiexd-banner-data="initData.fiexdBannerData"
    />
    <!-- E 搜索 + 大banner -->
    <!-- S 金刚区nav -->
    <HomeNav
      :fiexd-nav="initData.fiexdNavData"
      :roll-nav="initData.rollNavData"
    />
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
    const fiexdAdCode = 'ad100064' // 顶部固定banner的code
    const rollAdCode = 'ad100056' // 导航下方轮播banner code
    // 首屏请求导航和广告的参数
    const initReqParams = {
      locationCodeList: [fiexdAdCode, rollAdCode], // 广告位code列表
      rollPage: 1, // 滚动导航当前页
      rollLimit: 1000, // 滚动导航每页条数
      fixedPage: 1, // 固定导航当前页
      fixedLimit: 5, // 固定导航每页条数
      fixedNavCategoryCode: 'nav065140', // 固定导航分类code
      fixedNavPlatformCode: 'COMDIC_PLATFORM_CRISPS', // 固定导航平台code
      rollNavCategoryCode: 'nav000888', // 滚动导航分类code
      rollNavPlatformCode: 'COMDIC_PLATFORM_CRISPS', // 滚动导航平台code
    }
    const initData = {
      fiexdBannerData: [], // 固定广告
      rollBannerData: [], // 轮播广告
      fiexdNavData: [], // 固定导航
      rollNavData: [], // 滚动导航
    }
    try {
      const res = await $axios.post(homeApi.initRequest, initReqParams)
      if (res.code === 200) {
        initData.fiexdBannerData = res.data.advertising[fiexdAdCode] || []
        initData.rollBannerData = res.data.advertising[rollAdCode] || []
        initData.fiexdNavData = res.data.fixedNavList || []
        initData.rollNavData = res.data.rollNavList || []
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
