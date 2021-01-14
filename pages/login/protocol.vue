<template>
  <div class="protocol">
    <div v-if="!hideHeader" class="top">
      <sp-top-nav-bar
        ellipsis
        :title="article.title || '协议'"
        @on-click-left="onClickLeft"
      >
        <template #left>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A" />
        </template>
      </sp-top-nav-bar>
    </div>
    <div class="content">
      <sp-skeleton title :row="10" :loading="loading">
        <p class="content-text" v-html="article.content"></p>
      </sp-skeleton>
    </div>
  </div>
</template>
<script>
import { Toast, TopNavBar, NavSearch, Icon, Skeleton } from '@chipspc/vant-dgg'

import { auth } from '@/api'

export default {
  name: 'Protocol',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
  },
  data() {
    return {
      article: {
        title: '',
        content: '',
      },
      loading: true,
      hideHeader: this.$route.query.hideHeader || false,
      categoryCode: this.$route.query.categoryCode,
      redirect: this.$route.query.redirect || '', // 登录后需要跳转的地址
    }
  },
  created() {
    if (process && process.client) {
      this.getProtocol(this.categoryCode)
    }
  },
  methods: {
    onClickLeft() {
      if (this.redirect) {
        const isPath = /\//.test(this.redirect + '')
        const pushParams = {
          path: isPath ? this.redirect : null,
          name: isPath ? null : this.redirect,
        }
        this.$router.push(pushParams)
      } else {
        this.$router.go(-1)
      }
    },

    async getProtocol(categoryCode) {
      if (!categoryCode) {
        Toast('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        this.loading = true
        const data = await auth.protocol(params)
        console.log('data:', data)
        const { rows = [] } = data || {}
        this.article = rows[0] || {}
        this.loading = false
        return rows[0] || {}
      } catch (error) {
        Toast(error.message)
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.protocol {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .top {
    flex: 88px 0 0;
    /deep/.sp-top-nav-bar {
      &__left,
      &__right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  /deep/.content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    color: #555555;
    padding: 40px;
    &-text {
      font-size: 32px;
      line-height: 42px;
      text-indent: 2em;
    }
  }
}
</style>
