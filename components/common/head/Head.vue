<template >
  <div class="search_container">
    <div class="search">
      <div class="left-back" @click="onLeftClick">
        <my-icon
          name="nav_ic_back"
          class="back_icon"
          size="0.4rem"
          :color="color"
        ></my-icon>
      </div>
      <div class="search-box" :style="{ color: color }">
        <div class="center">
          {{ title }}
        </div>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    color: {
      type: String,
      default: '#1a1a1a', // 1,表现为白色，0，黑色
    },
    title: {
      type: String,
      default: '',
    },

    // 是否执行自定义跳转
    customJump: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
      isApplets: (state) => state.app.isApplets,
    }),
  },
  methods: {
    onLeftClick() {
      if (!this.customJump) {
        if (this.isInApp) {
          this.$appFn.dggWebGoBack((res) => {})
        } else if (
          window.AlipayJSBridge ||
          this.$route.query.platForm === 'mpass'
        ) {
          if (window.AlipayJSBridge) {
            window.AlipayJSBridge.call('closeWebview')
          } else {
            this.$back()
          }
        } else {
          this.$router.back(-1)
        }
      } else {
        this.$emit('backHandle')
      }
    },
  },
}
</script>
<style lang="less" scoped>
.search_container {
  .search {
    display: flex;
    align-items: center;
    // padding: 16px 0;

    background-size: 100% auto;
    -moz-background-size: 100% auto;
    .left-back {
      display: flex;

      align-items: center;
      margin: 0 32px;
      min-width: 150px;
      .back_icon {
        width: 40px;
        height: 40px;
      }
    }

    .search-box {
      margin-right: 40px;
      height: 88px;
      line-height: 88px;

      display: flex;
      align-items: center;
      flex: 1;

      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      // color: #1a1a1a;
      text-align: center;

      // max-width: 450px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      .center {
        flex: 1;
        text-align: center;
      }
    }
    .right {
      display: flex;
      align-items: center;
      min-width: 150px;
    }
  }
}
</style>
