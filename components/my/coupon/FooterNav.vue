<template>
  <footer class="footer-nav">
    <ul class="footer-nav-ul">
      <li
        v-for="(item, index) in tabBarData"
        :key="index"
        class="footer-nav-ul-li"
        @click="pageJump(item, index)"
      >
        <span class="item">
          <my-icon
            class="my-icon"
            :name="item.iconName"
            size="0.32rem"
            color="#222222"
          ></my-icon>
          <span class="name" :style="{ color: '#222222' }">
            {{ item.name }}
          </span>
        </span>
      </li>
    </ul>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterNav',
  data() {
    return {
      unreadNum: 0,
      active: 'home',
      DefaultColor: '#222222',
      ActiveColor: '#4974F5',
      tabBarData: [
        {
          name: '领券',
          iconName: 'lingquan',
          path: '/',
        },
        {
          name: '购卡',
          iconName: 'gouka',
          path: '/found',
        },
      ],
    }
  },

  // watch: {
  //   $route(to, from) {
  //     const path = this.$route.path
  //     this.active = path
  //   },
  //   userInfo(val) {
  //     if (!val.token) {
  //       this.unreadNum = 0
  //     }
  //   },
  // },

  mounted() {},
  methods: {},
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

  > .footer-nav-ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    > .footer-nav-ul-li {
      flex: 1;
      display: flex;
      // height: 98px;
      padding: 19px 0 24px 0;

      .item {
        position: relative;
        width: 100%;

        display: flex;
        // justify-content: space-between;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        > .name {
          margin-top: 10px;
          font-size: 26px;
          line-height: 26px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #999999;
        }
      }
    }
    > .footer-nav-ul-li::after {
      content: '';
      height: '';
    }
  }
}
</style>
