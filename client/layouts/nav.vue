<template>
  <div class="nav-layout">
    <nuxt />
    <Bottombar v-if="!isInApp" />
    <div class="nav-placeholder"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Bottombar from '@/components/common/nav/Bottombar'
export default {
  components: {
    Bottombar,
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
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
