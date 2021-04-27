<!--
 * @Author: ma jinghe
 * @Date: 2021-4-21
 * @Description: appSafeView layout 主要处理app安全距离的问题
-->
<template>
  <div class="default-layout">
    <nuxt />
    <!-- 底部占位符, 暂定固定30 -->
    <div v-if="isInApp" style="width: 100%; height: 30px"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppSafeView',
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
    }),
  },
  /*
  data() {
    return {
      appSafeView: {
        position: 'fixed',
        top: '0',
        height: '',
        width: '100%',
        'z-index': 999,
      },
      appSafePlaceholder: {
        'margin-top': '',
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
        this.appSafePlaceholder['margin-top'] =
          this.appInfo.statusBarHeight + 'px'
      }
    }
  },
  */
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.default-layout {
  height: 100%;
}
</style>
