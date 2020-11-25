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
    <Recommend />
    <!-- E 推荐服务 -->
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
export default {
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
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.page-content {
  max-width: 1000px;
  overflow: hidden;
}
</style>
