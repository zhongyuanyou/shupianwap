<template>
  <!-- 功能：获取子组件高度，并浮动子组件到顶部，并自动占位子组件的高度 -->
  <!-- 使用示例 -->
  <!--
    <HeadWrapper>
      <Header class="my-header" title="案例广场"></Header>
      <client-only>
        <Classify @select="selectClassify"></Classify>
      </client-only>
    </HeadWrapper>
   -->
  <header class="head-wrapper" :style="{ height: fillHeaderHeight + 'px' }">
    <div
      ref="headerWarpper"
      class="head-wrapper-warpper"
      :class="{ 'safe-area-top': useSafeAreaClass }"
      :style="{
        borderBottom: line ? '1px solid #f5f5f5' : '',
        backgroundColor: backgroundColor,
        'padding-top': safeTop + 'px',
      }"
    >
      <slot></slot>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'

import safeAreaInsets from 'safe-area-insets'
export default {
  props: {
    // 是否占位
    fill: {
      type: Boolean,
      default: true,
    },
    line: {
      type: Boolean,
      default: true,
    },
    backgroundColor: {
      type: String,
      default: '#fff', // none,#fff等色值
    },
  },
  data() {
    return {
      HeaderHeight: 44,
      timer: null,

      useSafeAreaClass: false,
      safeTop: 20, // 顶部安全区的高度
    }
  },

  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),

    // 填充占位的高度
    fillHeaderHeight() {
      return this.fill ? this.HeaderHeight : 0
    },
  },
  watch: {
    line() {
      this.getHeaderHeight()
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
    if (window.AlipayJSBridge || this.$route.query.platForm === 'mpass') {
      this.safeTop = 30
      this.useSafeAreaClass = true
    }
    this.getTopMargin()
    this.getHeaderHeight()

    this.timer = setInterval(() => {
      this.getHeaderHeight()
    }, 200)
    this.timerout = setTimeout(() => {
      clearInterval(this.timer)
    }, 5000)
    window.addEventListener('resize', this.getHeaderHeight)
  },
  destroyed() {
    clearInterval(this.timer)
    clearTimeout(this.timerout)
    window.removeEventListener('resize', this.getHeaderHeight)
  },
  methods: {
    getTopMargin() {
      if (process && process.client) {
        let safeTop = safeAreaInsets.top
        if (window.AlipayJSBridge || this.$route.query.platForm === 'mpass') {
          safeTop = 30
        } else if (this.isInApp) {
          safeTop = this.appInfo.statusBarHeight
        }
        this.safeTop = safeTop
      }
    },

    getHeaderHeight() {
      if (!this.$refs.headerWarpper) {
        return
      }
      this.$nextTick(() => {
        const HeaderHeight = parseInt(
          this.$refs?.headerWarpper?.offsetHeight || 0
        )

        this.HeaderHeight = HeaderHeight
        this.$emit('onHeightChange', HeaderHeight)
      })
    },
  },
}
</script>
<style lang="less" scoped>
.head-wrapper {
  .head-wrapper-warpper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // background-color: #ffffff;
    z-index: 999;
    box-sizing: border-box;
    // border-bottom: 1px solid #f5f5f5;
  }
  .safe-area-top {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
}
</style>
