<template>
  <footer class="footer-nav">
    <client-only>
      <openApp :no-fixed="true" />
    </client-only>
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
            v-if="item.path === '/msg' && unreadNum > 0"
            class="unReadNum"
            >{{ unreadNum > 99 ? '99+' : unreadNum }}</span
          >
          <span
            class="name"
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
import { Badge } from 'vant'
import { mapState } from 'vuex'
import config from '@/config'
import { pullUnreadMsgCount } from '@/utils/im'
export default {
  name: 'Bottombar',
  data() {
    return {
      unreadNum: 0,
      active: 'home',
      iconColorDefault: '#999999',
      iconColorActive: '#4974F5',
      tabBarData: [
        {
          name: '首页',
          iconName: 'shouye1',
          path: '/',
        },
        {
          name: '发现',
          iconName: 'dongtai',
          path: '/found',
        },
        // {
        //   name: '必懂',
        //   iconName: 'bidong',
        //   path: '/known',
        // },
        {
          name: '消息',
          iconName: 'xiaoxi1',
          path: '/msg',
        },
        {
          name: '订单',
          iconName: 'faxian',
          path: '/order/',
        },
        {
          name: '我的',
          iconName: 'wode',
          path: '/my',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo, // 登录的用户信息
      imExample: (state) => state.im.imExample, // IM 实例
    }),
  },
  watch: {
    $route(to, from) {
      const path = this.$route.path
      this.active = path
    },
    userInfo(val) {
      if (!val.token) {
        this.unreadNum = 0
      }
    },
  },
  created() {
    const path = this.$route.path
    this.active = path
  },
  mounted() {
    if (this.imExample && this.userInfo.token) {
      //  获取IM未读消息总数
      pullUnreadMsgCount(this.imExample).then((res) => {
        console.log('IM消息未读数：', res)
        if (res.code === 200) {
          this.unreadNum = res.data.totleUnread
        }
      })
    }
  },
  methods: {
    pageJump(item) {
      // 消息页面跳转 IM
      if (item.path === '/msg') {
        if (this.userInfo.token) {
          if (this.userInfo.token) {
            window.location.href = `${config.imBaseUrl}/index?token=${this.userInfo.token}&userId=${this.userInfo.userId}&userType=${this.userInfo.userType}`
          } else {
            const imId = localStorage.getItem('myInfo')
              ? JSON.parse(localStorage.getItem('myInfo'))
              : {}
            window.location.href = `${config.imBaseUrl}/index?token=${imId.token}&userId=${imId.imUserId}&userType=VISITOR`
          }
          return
        } else {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.fullPath,
            },
          })
        }
        return
      }
      if (item.path.match('order') && !this.userInfo.token) {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.fullPath,
          },
        })
        return
      }
      const path = this.$route.path
      if (path === item.path) {
        return
      }
      this.$router.push({
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
        position: relative;
        width: 100%;
        height: 71px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;
        > .name {
          font-size: 20px;
          line-height: 20px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #999999;
        }
        .unReadNum {
          position: absolute;
          left: 50%;
          top: -6px;
          min-width: 36px;
          background: #f1524e;
          border: 4px solid #ffffff;
          border-radius: 18px;
          color: #fff;
          font-size: 20px;
          padding: 0 4px;
          box-sizing: border-box;
          text-align: center;
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
