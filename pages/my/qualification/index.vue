<template>
  <div class="user-privacy">
    <!-- s 头部分 -->
    <Header title="证件资质中心">
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
          name="notify_ic_next"
          size="0.1rem"
          color="#CCCCCC"
          class="content-icon"
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
      ContentList: ['ICP证书', '营业执照', '网络文化经营许可证'],
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
            title: '证照资质中心',
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
              index === 0
                ? 'protocol100005'
                : index === 1
                ? 'protocol100004'
                : 'protocol100006'
            }&hideHeader=true`,
            title:
              index === 0
                ? 'ICP证书'
                : index === 1
                ? '营业执照'
                : '网络文化经营许可证',
          },
          (res) => {}
        )
      } else {
        this.$router.push({
          name: 'login-protocol',
          query: {
            categoryCode:
              index === 0
                ? 'protocol100005'
                : index === 1
                ? 'protocol100004'
                : 'protocol100006',
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
    max-width: 500px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 44px;
  }
  .content-icon {
    width: 24px;
    height: 24px;
    margin-right: 40px;
  }
}
</style>
