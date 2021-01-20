<template>
  <div class="found">
    <sp-top-nav-bar special-layout :placeholder="true" fixed>
      <template #title>
        <sp-tabs
          v-model="activeTab"
          mask
          title-active-color="#222"
          @click="onClickTap"
        >
          <sp-tab
            v-for="item in information_class"
            :key="item.code"
            :title="item.name"
            :need-content="false"
          >
          </sp-tab>
        </sp-tabs>
      </template>
      <template #right>
        <sp-icon name="search" size="20" @click="onClickRight" />
      </template>
    </sp-top-nav-bar>
    <Con
      :banner="information_banner"
      :list="information_list"
      :category-code="categoryCode"
      :refresh-status="refreshStatus"
      :active-tab="activeTab"
      @refresh="refresh"
    />
    <Bottombar v-if="!isInApp" ref="bottombar" />
    <Loading-center v-show="loadingIndex" />
  </div>
</template>

<script>
import { Tab, Tabs, Icon, TopNavBar, Toast } from '@chipspc/vant-dgg'
import { mapMutations, mapState } from 'vuex'
import Con from '~/components/found/found/Cons'
import { foundApi } from '@/api'
import Bottombar from '@/components/common/nav/Bottombar'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  layout: 'keepAlive',
  name: 'Found',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    Con,
    Bottombar,
    LoadingCenter,
  },
  async asyncData({ store, $axios }) {
    try {
      let homeData = {}
      const params = {
        platformCode: store.state.app.isInApp
          ? store.state.app.appInfo.platformCode
          : 'COMDIC_PLATFORM_CRISPS',
        terminalCode: store.state.app.isInApp
          ? 'COMDIC_TERMINAL_APP'
          : 'COMDIC_TERMINAL_WAP',
      }
      const res = await $axios.get(foundApi.initRequest, { params })
      if (res.code === 200) {
        homeData = res.data || {}
      }
      return {
        homeData,
      }
    } catch (err) {}
  },
  data() {
    return {
      activeTab: 0,
      information_class: [], // 产品分类
      information_banner: [], // 广告数据
      information_list: [], // 资讯列表
      categoryCode: '', // code码
      refreshStatus: false,
      loadingIndex: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
    }),
  },
  mounted() {
    this.information_class =
      this.homeData && this.homeData.information_class
        ? this.homeData.information_class
        : []
    this.categoryCode =
      this.information_class && this.information_class.length
        ? this.information_class[0].code
        : ''
    this.information_banner =
      this.homeData && this.homeData.information_banner
        ? this.homeData.information_banner
        : []
    this.information_list =
      this.homeData && this.homeData.information_list
        ? this.homeData.information_list
        : []
  },
  // 离开时 路由拦截
  beforeRouteLeave(to, from, next) {
    if (['found-detail-id', 'found-foundSearch'].includes(to.name)) {
      this.SET_KEEP_ALIVE({ type: 'add', name: 'Found' })
    } else {
      this.SET_KEEP_ALIVE({ type: 'remove', name: 'Found' })
    }
    next()
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    async onClickTap(index, isRefresh) {
      // 切换按钮回滚到顶部
      window.scrollTo(0, 0)
      if (!isRefresh) {
        this.information_banner = []
        this.information_list = []
      }
      this.loadingIndex = true
      // 点击tab标签
      try {
        this.categoryCode = this.information_class[index].code
        const params = {
          categoryCode: this.categoryCode,
          platformCode: this.isInApp
            ? this.appInfo.platformCode
            : 'COMDIC_PLATFORM_CRISPS',
          terminalCode: this.isInApp
            ? 'COMDIC_TERMINAL_APP'
            : 'COMDIC_TERMINAL_WAP',
        }
        const res = await this.$axios.get(foundApi.screenRequest, { params })
        this.refreshStatus = false
        this.loadingIndex = false
        if (res.code === 200) {
          this.information_banner = res.data.information_banner
          this.information_list = res.data.information_list
        }
      } catch (err) {
        this.refreshStatus = false
        this.loadingIndex = false
      }
    },
    onClickRight() {
      this.$router.push('/found/foundSearch')
    },
    refresh() {
      this.refreshStatus = true
      this.onClickTap(this.activeTab, true)
    },
  },
}
</script>

<style lang="less" scoped>
.found {
  width: 100%;
  padding-bottom: 98px;
  /deep/ .sp-top-nav-bar {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    z-index: 5;
  }
  /deep/ .sp-tab {
    font-size: 32px;
    color: #222222;
    font-weight: bold;
  }
  /deep/ .sp-tab--active {
    font-size: 40px;
  }
  /deep/ .sp-tabs__line {
    width: 32px;
    height: 6px;
  }
  /deep/ .sp-hairline--bottom::after {
    border-bottom: none;
  }
}
</style>
