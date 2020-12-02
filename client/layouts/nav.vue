<template>
  <div class="nav-layout">
    <nuxt />
    <Bottombar />
    <div class="nav-placeholder"></div>
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
  & .nav-placeholder {
    display: block;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 98px;
    }
  }
}
</style>
