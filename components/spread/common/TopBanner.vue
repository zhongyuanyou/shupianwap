<template>
  <div class="hotSale-banner">
    <!--  头部  -->
    <sp-top-nav-bar
      title="服务热卖榜"
      background="#ffffff"
      title-color="#1A1A1A"
      ellipsis
      :fixed="true"
      :placeholder="true"
      z-index="999"
    >
      <template #left>
        <div class="hotSale-banner-top-left" @click="back">
          <my-icon name="nav_ic_back" size="0.4rem" color="#1a1a1a"></my-icon>
        </div>
        <my-icon name="notify_ic_close" size="0.4rem" color="#1a1a1a"></my-icon>
      </template>
      <template #right>
        <my-icon name="nav_ic_share1" size="0.4rem" color="#1a1a1a" />
      </template>
    </sp-top-nav-bar>
    <!--  头部  -->
    <!--  吸顶  -->
    <sp-sticky offset-top="44px" @scroll="searchHandle">
      <div class="hotSale-banner-sticky-tabs" :style="{ background: tabBg }">
        <div
          v-for="(item, index) of bannerData.tabs"
          :key="index"
          :style="
            isSelect === index && isFont === 1
              ? { color: '#4974f5' }
              : isSelect !== index && isFont === 1
              ? { color: '#1a1a1a' }
              : { color: '#ffffff' }
          "
          class="hotSale-banner-sticky-tabs-tab"
          @click="changeSelect(index, item)"
        >
          {{ item }}
          <div
            v-show="isSelect === index"
            :style="
              isFont === 1
                ? { background: '#4974f5' }
                : { background: '#ffffff' }
            "
            class="hotSale-banner-sticky-tabs-tab-i"
          ></div>
        </div>
      </div>
    </sp-sticky>
    <!--  吸顶  -->
    <!--  banner  -->
    <div class="hotSale-banner-sweipe">
      <div class="hotSale-banner-sweipe-font01">
        {{ bannerData.title[0] }}<br />{{ bannerData.title[1] }}
      </div>
      <div class="hotSale-banner-sweipe-font02">
        根据实时数据进行计算本次更新时间为:10分钟前
      </div>
    </div>
    <!--  banner  -->
  </div>
</template>

<script>
import { Sticky, TopNavBar, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Banner',
  components: {
    [Sticky.name]: Sticky,
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
  },
  props: {
    bannerData: {
      type: Object,
      default: () => {
        return {
          tabs: ['工商代办', '会计财税', '知识产权'],
          title: ['交易', '热卖榜'],
        }
      },
    },
  },
  data() {
    return {
      isSelect: 0,
      tabBg: 'transparent',
      isFont: 0,
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 关闭
    close() {},
    // 改变选项
    changeSelect(i, val) {
      this.isSelect = i
      this.$parent.selected = val
    },
    // 滚动条变化，背景变白
    searchHandle({ scrollTop }) {
      if (scrollTop > 0) {
        this.tabBg = '#ffffff'
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
  &-top {
    &-left {
      margin-right: 36px;
    }
  }
  &-sticky {
    &-tabs {
      display: flex;
      padding-top: 48px;
      justify-content: space-around;
      height: 128px;
      width: 750px;
      margin: 0 auto;
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
  &-sweipe {
    width: 750px;
    height: 438px;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/e7l2kxjqlps0000.png');
    background-position: center center;
    background-size: 100% 100%;
    padding: 167px 0 0 50px;
    margin-top: -128px;
    &-font01 {
      margin: 0 0 0 0;
      font-size: 62px;
      font-weight: bold;
      color: #ffffff;
      line-height: 72px;
    }
    &-font02 {
      margin: 9px 0 0 0;
      font-size: 26px;
      font-weight: 400;
      color: #ffffff;
      line-height: 44px;
    }
  }
}
/deep/ .sp-top-nav-bar--fixed {
  width: 750px;
  margin-left: 50%;
  transform: translateX(-375px);
}
// 头部组件多出线条的修改
/deep/ .sp-hairline--bottom::after {
  border: none;
}
</style>
