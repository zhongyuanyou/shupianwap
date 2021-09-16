<template >
  <sp-sticky class="tabs-box" :offset-top="headerHeight">
    <!-- <div v-if="hasCity || activityTypeOptions.length == 0" class="drop_down">
      <div class="drop_down_title" @click="swichCityHandle">
        {{ cityName ? cityName : '定位中' }}
      </div>

      <div class="drop_down_icon"></div>
    </div> -->

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
    hasCity: {
      type: Boolean,
      default: false,
    },
    cityName: {
      type: String,
      default: '',
    },
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
    swichCityHandle: {
      type: Function,
      default() {},
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
  height: 96px;
  line-height: 96px;
  font-size: 0;

  ::v-deep .sp-sticky {
    overflow: hidden;
    background: #f8f8f8;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // padding: 0px 20px;
    height: 96px;
    line-height: 96px;
    &.sp-sticky--fixed {
      border-radius: 0 0 0 0;
    }
  }

  .drop_down {
    height: 56px;

    border: 1px solid #4974f5;
    border-radius: 32px;

    display: flex;
    align-items: center;
    padding: 0 24px;
    margin-left: 20px;
    .drop_down_title {
      white-space: nowrap;

      font-weight: bold;
      color: #ffffff;
      line-height: 56px;

      font-family: PingFangSC-Medium;
      font-size: 30px;
      color: #4974f5;
      letter-spacing: 0;
    }
    .drop_down_icon {
      background: url('https://cdn.shupian.cn/sp-pt/wap/images/3obtk0xjgos0000.png');
      width: 15px;
      height: 10px;
      margin-left: 8px;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    }
  }

  .tabs-box-items {
    margin-left: 40px;
    display: flex;

    overflow-x: scroll;
    align-items: center;
    height: 3rem;

    // height: 96px;
    // line-height: 96px;

    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none;
    }
    .li-tab {
      // display: inline-block;
      white-space: nowrap;

      margin-right: 40px;

      font-size: 32px;
      color: #999999;
      letter-spacing: 0;
      cursor: pointer;
    }
    .active {
      position: relative;
      font-weight: bold;
      color: #222222;
    }
    .active::after {
      content: '';
      position: absolute;
      bottom: 28px;
      right: 0;

      width: 60px;
      height: 12px;
      background-image: linear-gradient(
        270deg,
        rgba(73, 116, 245, 0) 0%,
        #4974f5 100%
      );
      border-radius: 6px;
    }
  }
}
</style>
