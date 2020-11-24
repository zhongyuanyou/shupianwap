<template>
  <div class="page-content">
    <search-banner></search-banner>
    <home-nav></home-nav>
    <SwiperBanner></SwiperBanner>
    <Help></Help>
    <div style="height: 3000px">占位</div>
  </div>
</template>

<script>
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
import SwiperBanner from '@/components/home/SwiperBanner'
import Help from '@/components/home/Help'
export default {
  name: 'Home',
  components: {
    SearchBanner,
    HomeNav,
    SwiperBanner,
    Help,
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
}
</style>
