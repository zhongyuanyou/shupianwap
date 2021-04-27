<template>
  <div
    :class="{ 'fixed-head': fixed, 'safe-area-top': useSafeAreaClass }"
    :style="{
      height: headHeight,
      'padding-top': safeTop + 'px',
    }"
  >
    <div
      class="my-head"
      :class="{ 'safe-area-top': useSafeAreaClass }"
      :style="{
        height: headHeight,
        'padding-top': safeTop + 'px',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import safeAreaInsets from 'safe-area-insets'

export default {
  name: 'HeaderSlot',
  props: {
    // 头部高度
    height: {
      required: false,
      type: [Number, String],
      default: () => '0.88rem',
    },
    // 是否吸顶
    fixed: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      safeTop: 20, // 顶部安全区的高度
      useSafeAreaClass: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    headHeight() {
      if (typeof this.height === 'number') {
        return this.height + 'px'
      }
      return this.height
    },
  },
  created() {
    // 因为通过中间件ua获取到了 isInApp 的值，故可以在服务端设置，避免页面上头部抖动
    if (process && process.server && !this.isInApp) {
      this.safeTop = 0
      this.useSafeAreaClass = true
    }
  },
  mounted() {
    this.getTopMargin()
  },
  methods: {
    getTopMargin() {
      if (process && process.client) {
        let safeTop = safeAreaInsets.top
        if (this.isInApp) safeTop = this.appInfo.statusBarHeight
        this.safeTop = safeTop
      }
    },
  },
}
</script>
<style lang="less" scoped>
.fixed-head {
  box-sizing: content-box;
  .my-head {
    box-sizing: content-box;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    // box-shadow: 0px 1px 0px 0px #f4f4f4;
    background-color: #ffffff;
  }
  .safe-area-top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}
</style>
