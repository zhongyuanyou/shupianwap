<template>
  <div class="protocol">
    <header-slot v-if="!hideHeader">
      <div class="top">
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
    </header-slot>
    <div class="content">
      <sp-skeleton title :row="10" :loading="loading">
        <div class="content-text" v-html="article.content"></div>
      </sp-skeleton>
    </div>
  </div>
</template>
<script>
import { TopNavBar, NavSearch, Icon, Skeleton } from '@chipspc/vant-dgg'

import { mapState } from 'vuex'
import { auth } from '@/api'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  name: 'Protocol',
  layout: 'keepAlive',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    [HeaderSlot.name]: HeaderSlot,
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
  computed: {
    ...mapState({
      isApplets: (state) => state.app.isApplets,
    }),
  },
  created() {
    if (process && process.client) {
      console.log(this.$route.query.categoryCode)
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
        this.$xToast.warn('请传入需要获取的协议!')
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
        if (rows.length > 0) {
          this.article = rows[0] || {}
          this.loading = false
          return rows[0] || {}
        } else {
          this.$xToast.error('获取协议失败')
        }
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },
  },
  head() {
    return {
      title:
        this.$route.query.categoryCode === 'protocol100121'
          ? '隐私政策'
          : '服务协议',
    }
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
    ::v-deep.sp-top-nav-bar {
      height: 88px;
      min-height: auto;
      &__left,
      &__right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 400;
      }
    }
  }
  ::v-deep.content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    color: #555555;
    padding: 40px;
    &-text {
      font-size: 32px;
      line-height: 1.6;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    * {
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
</style>
