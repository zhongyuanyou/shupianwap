<template>
  <div class="page-content">
    <search-banner></search-banner>
    <home-nav></home-nav>
    <div style="height: 5.52rem; background-color: red">占位</div>
    <div style="height: 3000px">占位</div>
  </div>
</template>

<script>
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
export default {
  name: 'Home',
  components: {
    SearchBanner,
    HomeNav,
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
