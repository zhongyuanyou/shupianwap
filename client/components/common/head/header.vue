<template>
  <div
    v-if="isShow"
    :class="{ 'fixed-head': fixed }"
    :style="{
      height: headHeight,
      'padding-top': safeTop,
      'box-sizing': 'content-box',
    }"
  >
    <div
      class="my-head"
      :class="headClass"
      :style="{ height: headHeight, 'padding-top': safeTop }"
    >
      <div class="slot-left">
        <slot name="left">
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
        </slot>
      </div>
      <strong class="title">{{ title }} {{ appInfo.statusBarHeight }}</strong>
      <div class="slot-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import safeAreaInsets from 'safe-area-insets'

export default {
  name: 'Header',
  props: {
    // 头部标题
    title: {
      type: String,
      default: () => '帮助中心',
    },
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
    // 自定义类名
    headClass: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      isShow: true,
      safeTop: '20px', // 顶部安全区的高度
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
  watch: {
    $route() {
      this.getTopMargin()
    },
  },
  created() {
    this.getTopMargin()
  },
  methods: {
    onLeftClick() {
      this.$router.back(-1)
    },
    getTopMargin() {
      if (process && process.client) {
        let safeTop = safeAreaInsets.top
        if (this.isInApp && !safeTop)
          safeTop = this.appInfo.statusBarHeight + 'px'
        this.safeTop = safeTop
      }
    },
  },
}
</script>
<style lang="less" scoped>
.my-head {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 24px;
  box-shadow: 0px 1px 0px 0px #f4f4f4;
  .slot-left {
    display: flex;
    position: absolute;
    left: 0;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
    .back-icon {
      margin-left: 40px;
    }
  }
  .title {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    flex: 1;
    text-align: center;
  }
  .slot-right {
    display: flex;
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 2;
    transform: translateY(-50%);
  }
}
.fixed-head {
  width: 100%;
  .my-head {
    box-sizing: content-box;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
  }
}
</style>
