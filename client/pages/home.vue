<template>
  <div class="page-content">
    <SearchBanner></SearchBanner>
    <div style="height: 5.52rem; background-color: red">占位</div>
    <div style="height: 3000px">占位</div>
  </div>
</template>

<script>
import SearchBanner from '@/components/home/SearchBanner'
export default {
  name: 'Home',
  components: {
    SearchBanner,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.page-content {
  font-size: 24px;
}
</style>
