<template >
  <sp-sticky class="tabs-box" :offset-top="headerHeight">
    <ul class="tabs-box-items">
      <li
        v-for="(item, index) in activityTypeOptions"
        :key="index"
        class="li-tab"
        :class="{ active: index == currentIndex }"
        @click="menuTab(item, index)"
      >
        {{ item.labelName }}
      </li>
    </ul>
  </sp-sticky>
</template>
<script>
import { Sticky } from '@chipspc/vant-dgg'
export default {
  components: {
    [Sticky.name]: Sticky,
  },
  props: {
    headerHeight: {
      type: Number,
      default: 0,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
    activityTypeOptions: {
      type: Array,
      default: () => [],
    },

    menuTab: {
      type: Function,
      default() {},
    },
  },
  mounted() {
    const _this = this
    const imgs = [...document.getElementsByTagName('img')]

    imgs.map((img) => {
      img.onload = function () {
        _this.scroll()
      }
    })
  },
  methods: {
    scroll() {
      const doc = document.documentElement || document.body
      setTimeout(() => {
        doc.scrollTop += 1
        doc.scrollTop -= 1
      }, 50)
    },
  },
}
</script>
<style lang="less" scoped>
.tabs-box {
  font-family: PingFangSC-Medium, PingFangSC-Regular, PingFang SC;
  height: 128px;
  line-height: 128px;
  font-size: 0;

  ::v-deep .sp-sticky {
    overflow: hidden;
    background: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // padding: 0px 20px;
    height: 128px;
    line-height: 128px;
    &.sp-sticky--fixed {
      border-radius: 0 0 0 0;
    }
  }

  .tabs-box-items {
    margin-left: 40px;
    display: flex;

    overflow-x: scroll;

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    .li-tab {
      // display: inline-block;
      white-space: nowrap;

      margin-right: 23px;

      font-size: 26px;
      color: #999999;
      background: #f5f5f5;
      letter-spacing: 0;
      cursor: pointer;

      height: 64px;
      line-height: 64px;
      padding: 0px 42px;
      border-radius: 32px;
    }
    .active {
      position: relative;
      font-weight: bold;
      color: #ffffff;
      font-size: 30px;
      background-image: linear-gradient(139deg, #2f5fe4 0%, #2b52c2 100%);
    }
    // .active::after {
    //   content: '';
    //   position: absolute;
    //   bottom: 28px;
    //   right: 0;

    //   width: 60px;
    //   height: 12px;
    //   background-image: linear-gradient(
    //     270deg,
    //     rgba(73, 116, 245, 0) 0%,
    //     #4974f5 100%
    //   );
    //   border-radius: 6px;
    // }
  }
}
</style>
