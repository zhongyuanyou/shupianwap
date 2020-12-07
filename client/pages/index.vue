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
  data() {
    return {}
  },
  mounted() {
    const data = {
      locationCodeList: ['adp100121'],
      fixedNavCategoryCode: 'a',
      fixedNavPlatformCode: 'a',
      rollNavCategoryCode: 'a',
      rollNavPlatformCode: 'a',
    }
    this.$axios.post('/chips-wap/service/nk/home/v1/get_home.do', data)
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.page-content {
  max-width: 1000px;
  overflow: hidden;
  /deep/ .sp-sticky--fixed {
    max-width: 1000px;
  }
}
</style>
