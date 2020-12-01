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
            :color="index === active ? iconColorActive : iconColorDefault"
          ></my-icon>
          <span
            :style="{
              color: index === active ? iconColorActive : iconColorDefault,
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
      active: 0,
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
          path: '/',
        },
        {
          name: '消息',
          iconName: 'tabbar_ic_msg',
          path: '/',
        },
        {
          name: '我的',
          iconName: 'tabbar_ic_personal',
          path: '/',
        },
      ],
    }
  },
  methods: {
    pageJump(item, index) {
      this.active = index
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
  left: 0;
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
