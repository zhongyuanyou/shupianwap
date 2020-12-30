<template>
  <div class="nav-layout">
    <nuxt />
    <openApp v-if="!isInApp && showApp" :bottom="bottom" />
    <Bottombar v-if="!isInApp" ref="bottombar" />
    <div class="nav-placeholder"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Bottombar from '@/components/common/nav/Bottombar'
import openApp from '@/components/common/app/OpenApp.vue'
export default {
  components: {
    Bottombar,
    openApp,
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
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 98px;
    }
  }
}
</style>
