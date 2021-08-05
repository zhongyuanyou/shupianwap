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
      ref="couponHeaderWarpper"
      class="head-wrapper-warpper"
      :style="{ borderBottom: line && '1px solid #f5f5f5' }"
    >
      <slot></slot>
    </div>
  </header>
</template>
<script>
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
  },
  data() {
    return {
      HeaderHeight: 44,
      timer: null,
    }
  },
  computed: {
    // 填充占位的高度
    fillHeaderHeight() {
      return this.fill ? this.HeaderHeight : 0
    },
  },
  mounted() {
    this.getHeaderHeight()
    this.timer = setInterval(() => {
      this.getHeaderHeight()
    }, 100)
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
    getHeaderHeight() {
      this.$nextTick(() => {
        const HeaderHeight = parseInt(
          this.$refs.couponHeaderWarpper.offsetHeight
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
    // border-bottom: 1px solid #f5f5f5;
  }
}
</style>
