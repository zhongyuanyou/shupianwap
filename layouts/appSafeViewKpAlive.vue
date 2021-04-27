<template>
  <div class="default-layout">
    <nuxt keep-alive :keep-alive-props="keepAliveProps" />
    <!-- start: 创建遮挡层 -->
    <div
      class="ui-bottom-placeholder"
      :style="isInApp ? 'padding-bottom: 0.3rem' : ''"
    >
      <div :style="isInApp ? 'padding-bottom: 0.3rem' : ''"></div>
    </div>
    <!-- end: 创建遮挡层 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppSafeViewKpAlive',
  computed: {
    ...mapState({
      keepAliveProps: (state) => state.keepAlive.keepAliveProps,
      isInApp: (state) => state.app.isInApp, // 是否app中
    }),
  },
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

.ui-bottom-placeholder {
  width: 100%;
  height: 1px;
}
.ui-bottom-placeholder > div {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 1px;
  z-index: 999;
  background: #fff;
}
</style>
