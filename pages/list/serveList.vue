<template>
  <div class="serve-list">
    <!--S搜索框-->
    <Search
      v-model="searchText"
      :maxlength="50"
      placeholder="请输入搜索内容"
      @searchKeydownHandle="searchKeydownHandle"
    >
      <div slot="left" class="nav-back" @click="$router.go(-1)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div slot="right" class="info" @click="jumpImMixin">
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <!--E搜索框-->
    <!--S筛选栏-->
    <serveGoods
      :init-service-data="serveGoodsListData"
      :search-text="formData.searchText"
      :req-type="reqType"
      :session-category="sessionCategory"
    />
    <!--E筛选栏-->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { WorkTabs, WorkTab, Badge } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import serveGoods from '@/components/list/ServeGoods'
import { goods } from '@/api/index'
import listJumpIm from '@/mixins/listJumpIm'

export default {
  name: 'ServeList',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    serveGoods,
    [Badge.name]: Badge,
  },
  layout: 'keepAlive',
  mixins: [listJumpIm],
  data() {
    return {
      serveGoodsListData: {}, // 服务商品列表数据
      searchText: '',
      reqType: 'serve',
      formData: {
        start: 1,
        limit: 10,
        needTypes: 1,
        needGoodsList: 0,
        searchText: '',
      },
      sessionCategory: null,
    }
  },
  beforeMount() {
    // 获取从分类页session中需要搜索服务的数据
    this.sessionCategory = JSON.parse(sessionStorage.getItem('categoryData'))
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'ServeList' })
    this.getInitData()
    document.body.addEventListener('focusout', () => {
      // 监听软键盘关闭事件
      // 解決ios端用微信打开页面，收起软键盘后，底部出现空白问题
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    })
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    searchKeydownHandle() {
      // 点击搜索按钮
      this.formData.searchText = this.searchText
    },
    // 获取初始化数据
    getInitData() {
      // 获取服务列表需要的筛选数据
      goods
        .searchServeGoodsList({ axios: this.$axios }, this.formData)
        .then((data) => {
          console.log(data)
          this.serveGoodsListData = data
        })
        .catch()
    },
  },
}
</script>

<style lang="less" scoped>
.serve-list {
  width: 100%;
  height: 100%;
  .search-content {
    padding: 16px 32px;
  }
  /deep/.spiconfont-sear_ic_sear {
    margin-left: 24px !important;
  }
  .nav-back {
    margin-right: 32px;
  }
  .info {
    margin-left: 41px;
  }
  /deep/.sp-work-tabs__nav .sp-work-tab {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    &.sp-work-tab--active {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
    }
  }
}
</style>
