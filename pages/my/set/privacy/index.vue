<template>
  <div class="user-privacy">
    <!-- s 头部分 -->
    <Header title="用户隐私与规则中心">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- e 头部分 -->
    <!-- s 内容 -->
    <div class="content-main">
      <div
        v-for="(item, index) of ContentList"
        :key="index"
        class="content"
        @click="handleClick(index)"
      >
        <div class="content-title">{{ item }}</div>
        <my-icon
          class="content-icon"
          name="order_ic_listnext"
          size="0.21rem"
          color="#CCCCCC"
        ></my-icon>
      </div>
    </div>
    <!-- e 内容 -->
  </div>
</template>

<script>
import { NavBar } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import { domainUrl } from '~/config/index'
export default {
  components: {
    [NavBar.name]: NavBar,
    Header,
  },
  data() {
    return {
      ContentList: ['薯片用户服务协议', '薯片隐私政策'],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    if (process.client) {
      if (this.isInApp) {
        this.$appFn.dggSetTitle(
          {
            title: '用户隐私与规则中心',
          },
          (res) => {}
        )
      }
    }
  },
  methods: {
    handleClick(index) {
      // 跳转
      if (this.isInApp) {
        this.$appFn.dggOpenNewWeb(
          {
            urlString: `${domainUrl}login/protocol?categoryCode=${
              index ? 'protocol100121' : 'protocol100122'
            }&hideHeader=true`,
            title: index ? '薯片隐私政策' : '薯片用户服务协议',
          },
          (res) => {}
        )
      } else {
        this.$router.push({
          name: 'login-protocol',
          query: {
            categoryCode: index ? 'protocol100121' : 'protocol100122',
            hideHeader: true,
          },
        })
      }
    },
    back() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.user-privacy {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.content-main {
  width: 100%;
  padding-left: 40px;
}
.back_icon {
  margin-left: 40px;
}
.content {
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
  .content-title {
    width: 300px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 44px;
  }
  .content-icon {
    margin-right: 40px;
  }
}
</style>
