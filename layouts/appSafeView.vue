<!--
 * @Author: ma jinghe
 * @Date: 2021-4-21
 * @Description: appSafeView layout 主要处理app安全距离的问题
-->
<template>
  <div class="default-layout">
    <div v-if="isInApp" :style="appSafeView"></div>
    <div :style="isInApp ? containerWarp : ''">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      appSafeView: {
        position: 'fixed',
        top: '0',
        height: '',
        width: '100%',
        'z-index': 999,
      },
      containerWarp: {
        position: 'fixed',
        top: '',
        bottom: '0',
        'overflow-y': 'scroll',
        width: '100%',
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    if (this.isInApp) {
      if (this.appInfo && this.appInfo.statusBarHeight) {
        this.appSafeView.height = this.appInfo.statusBarHeight + 'px'
        this.containerWarp.top = this.appInfo.statusBarHeight + 'px'
      }
    }
  },
}
</script>

<style></style>
