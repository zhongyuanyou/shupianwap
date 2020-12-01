<template>
  <div class="nav-layout">
    <nuxt />
    <Bottombar />
  </div>
</template>
<script>
import Bottombar from '@/components/common/nav/Bottombar'
export default {
  components: {
    Bottombar,
  },
}
</script>
<style lang="less" scoped>
.nav-layout {
  height: 100%;
}
.nav-layout::after {
  content: '';
  display: block;
  width: 100%;
  height: 98px;
}
</style>
