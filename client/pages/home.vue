<template>
  <div class="page-content">
    <search-banner></search-banner>
    <home-nav></home-nav>
    <Help></Help>
    <div style="height: 3000px">占位</div>
  </div>
</template>

<script>
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
import Help from '@/components/home/Help'
export default {
  name: 'Home',
  components: {
    SearchBanner,
    HomeNav,
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
