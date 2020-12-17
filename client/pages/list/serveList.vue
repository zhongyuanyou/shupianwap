<template>
  <div class="serve-list">
    <!--S搜索框-->
    <Search
      v-model="searchText"
      placeholder="请输入搜索内容"
      @searchKeydownHandle="searchKeydownHandle"
    >
      <div slot="left" class="nav-back" @click="console.log(123)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div slot="right" class="info">
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <!--E搜索框-->
    <!--S筛选栏-->
    <serveGoods
      :init-service-data="serveGoodsListData"
      :search-text="formData.searchText"
      :req-type="reqType"
    />
    <!--E筛选栏-->
  </div>
</template>

<script>
import { WorkTabs, WorkTab, Badge } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import serveGoods from '@/components/list/ServeGoods'
import { goods } from '@/api/index'

export default {
  name: 'ServeList',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    serveGoods,
    [Badge.name]: Badge,
  },
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
    }
  },
  mounted() {
    this.getInitData()
  },
  methods: {
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
      // todo 获取交易商品数据
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
