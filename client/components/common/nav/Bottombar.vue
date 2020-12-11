<template>
  <footer class="footer-nav">
    <ul>
      <li
        v-for="(item, index) in tabBarData"
        :key="index"
        @click="pageJump(item, index)"
      >
        <a href="javascript:void(0);">
          <my-icon
            class="my-icon"
            :name="item.iconName"
            size="0.4rem"
            :color="item.path === active ? iconColorActive : iconColorDefault"
          ></my-icon>
          <span
            :style="{
              color: item.path === active ? iconColorActive : iconColorDefault,
            }"
            >{{ item.name }}</span
          >
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Bottombar',
  data() {
    return {
      active: 'home',
      iconColorDefault: '#999999',
      iconColorActive: '#4974F5',
      tabBarData: [
        {
          name: '首页',
          iconName: 'tabbar_ic_home',
          path: '/',
        },
        {
          name: '发现',
          iconName: 'tabbar_ic_news',
          path: '/found',
        },
        {
          name: '消息',
          iconName: 'tabbar_ic_msg',
          path: '',
        },
        {
          name: '我的',
          iconName: 'tabbar_ic_personal',
          path: '/my',
        },
      ],
    }
  },
  watch: {
    $route(to, from) {
      const path =
        this.$route.path === '/' ||
        this.$route.path === '/examples' ||
        this.$route.path === '/tools'
          ? '/'
          : this.$route.path
      this.active = path
    },
  },
  created() {
    const path =
      this.$route.path === '/' ||
      this.$route.path === '/examples' ||
      this.$route.path === '/tools'
        ? '/'
        : this.$route.path
    this.active = path
  },
  methods: {
    pageJump(item) {
      const path =
        this.$route.path === '/' ||
        this.$route.path === '/examples' ||
        this.$route.path === '/tools'
          ? '/'
          : this.$route.path
      if (path === item.path) {
        return
      }
      this.$router.replace({
        path: item.path,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.footer-nav {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 999;
  width: 100%;
  background: #ffffff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  max-width: 1000px;
  > ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    > li {
      width: 25%;
      display: flex;
      height: 98px;
      padding: 16px 0 11px 0;
      a {
        width: 100%;
        height: 71px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        > span {
          font-size: 20px;
          line-height: 20px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #999999;
        }
      }
      .active {
        i {
          color: #4974f5 !important;
        }
        span {
          color: #4974f5 !important;
        }
      }
    }
  }
}
</style>
