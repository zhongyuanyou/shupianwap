<template>
  <div class="hotSale-banner">
    <sp-sticky
      offset-top="0"
      :style="{ background: tabBg }"
      @scroll="searchHandle"
    >
      <div class="hotSale-banner-tabs">
        <div
          v-for="(item, index) of tabs"
          :key="index"
          :style="
            isSelect === index && isFont === 1
              ? { color: '#4974f5' }
              : isSelect !== index && isFont === 1
              ? { color: '#1a1a1a' }
              : { color: '#ffffff' }
          "
          class="hotSale-banner-tabs-tab"
          @click="changeSelect(index)"
        >
          {{ item }}
          <div
            v-show="isSelect === index"
            :style="
              isFont === 1
                ? { background: '#4974f5' }
                : { background: '#ffffff' }
            "
            class="hotSale-banner-tabs-tab-i"
          ></div>
        </div>
      </div>
    </sp-sticky>
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
export default {
  name: 'Banner',
  components: {
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      tabs: ['工商代办', '会计财税', '知识产权'],
      isSelect: 0,
      tabBg: 'transparent',
      isFont: 0,
    }
  },
  methods: {
    // 改变选项
    changeSelect(i) {
      this.isSelect = i
    },
    // 滚动条变化，背景变白
    searchHandle({ scrollTop }) {
      if (scrollTop > 0) {
        this.tabBg = '#1a1a1a'
        this.isFont = 1
      } else {
        this.tabBg = 'transparent'
        this.isFont = 0
      }
    },
  },
}
</script>

<style scoped lang="less">
.hotSale-banner {
  width: 750px;
  height: 438px;
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/e7l2kxjqlps0000.png');
  background-position: center center;
  background-size: 100% 100%;
  &-tabs {
    display: flex;
    padding-top: 48px;
    justify-content: space-around;
    height: 128px;
    &-tab {
      font-size: 32px;
      font-weight: bold;
      line-height: 32px;
      color: #ffffff;
      &-i {
        margin: 15px auto 0;
        width: 36px;
        height: 6px;
        border-radius: 3px;
      }
    }
  }
}
</style>
