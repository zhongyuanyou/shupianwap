<template>
  <div
    v-if="btnData.isShow"
    class="fixed-botton"
    @click="scrollHandle(btnData.text)"
  >
    <my-icon :name="btnData.iconName" size="0.25rem" color="#222222"></my-icon>
    <span>{{ btnData.text }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headHeight: 0,
      btnData: {
        isShow: false,
        text: '推荐',
        iconName: 'buoy_ic_recom',
      },
      recommendTop: 0, // 推荐板块距离顶部的距离
    }
  },
  mounted() {
    // 监听页面滚动
    window.addEventListener('scroll', this.scrollToTop)
    // 动态获取头部搜索栏高度
    this.headHeight = this.$parent.$refs.searchBannerRef.$refs.searchRef.$el.clientHeight
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
    scrollToTop() {
      // 获取推荐板块到顶部的距离 减 搜索栏高度
      this.recommendTop =
        this.$parent.$refs.recommendRef.$el.offsetTop - this.headHeight
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const showScollHeight =
        this.$parent.$refs.showScollHeight.$el.offsetTop - this.headHeight
      if (scrollTop > showScollHeight && scrollTop < this.recommendTop) {
        this.btnData.isShow = true
        this.btnData.text = '推荐'
        this.btnData.iconName = 'buoy_ic_recom'
        return
      }
      if (scrollTop >= this.recommendTop) {
        this.btnData.isShow = true
        this.btnData.text = '顶部'
        this.btnData.iconName = 'buoy_ic_top'
        return
      }
      this.btnData.isShow = false
    },
    scrollHandle(text) {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 获取推荐板块到顶部的距离 减 搜索栏高度
      this.recommendTop =
        this.$parent.$refs.recommendRef.$el.offsetTop - this.headHeight
      const timer = setInterval(() => {
        if (text === '推荐') {
          document.body.scrollTop = document.documentElement.scrollTop = top += 80
          if (top >= this.recommendTop) {
            document.body.scrollTop = document.documentElement.scrollTop = this.recommendTop
            clearInterval(timer)
          }
          return
        }
        document.body.scrollTop = document.documentElement.scrollTop = top -= 200
        if (top <= 0) {
          clearInterval(timer)
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.fixed-botton {
  position: fixed;
  right: 24px;
  bottom: 262px;
  z-index: 999;
  width: 96px;
  height: 96px;
  background: #ffffff;
  border: 1px solid #d0d3d8;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 37px;
  }
}
</style>
