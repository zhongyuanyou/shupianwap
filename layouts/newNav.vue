<template>
  <div class="dgg-flexview">
    <div
      class="dgg-scrollview-tabbar"
      :class="[isShowOpenApp ? '' : 'show-open-app']"
    >
      <nuxt />
    </div>
    <Bottombar v-if="!isInApp" ref="bottombar" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Bottombar from '@/components/common/nav/Bottombar'
export default {
  components: {
    Bottombar,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isShowOpenApp: (state) => state.app.isShowOpenApp,
    }),
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
.dgg-flexview {
  height: 100%;
  max-width: 1000px;
  min-width: 300px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 0 auto;
}
.dgg-scrollview-tabbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 198px);
  overflow: hidden;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  display: flex;
}
.show-open-app {
  height: calc(100% - 98px);
  z-index: 1000;
}
</style>
