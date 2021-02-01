<template>
  <div class="nav-layout">
    <span style="font-size: 12px"></span>
    <nuxt />
    <Bottombar v-if="!isInApp" ref="bottombar" />
    <div
      class="nav-placeholder"
      :class="[
        {
          'show-open-app': isShowOpenApp && $route.path !== '/my',
          'nav-placeholder-app': $route.path !== '/my',
        },
      ]"
    ></div>
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
    return {
      bottom: 0,
      showApp: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isShowOpenApp: (state) => state.app.isShowOpenApp,
    }),
  },
  mounted() {
    this.$nextTick(() => {
      this.bottom = this.$refs.bottombar.$el.getBoundingClientRect().height
      this.showApp = true
    })
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
  }
  & .nav-placeholder-app {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 98px;
    }
  }
  .show-open-app {
    &::after {
      height: 198px;
    }
  }
}
</style>
