<template>
  <div class="search-result">
    <!--S搜索框-->
    <Search
      v-model="searchText"
      placeholder="请输入搜索内容"
      @searchKeydownHandle="searchKeydownHandle"
      @searchInputHandle="searchInputHandle"
    >
      <div slot="left" class="nav-back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div slot="right" class="info">
        <sp-badge :content="5">
          <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
        </sp-badge>
      </div>
    </Search>
    <!--E搜索框-->
    <!--S筛选栏-->
    <sp-work-tabs v-model="active">
      <sp-work-tab title="企业服务">
        <serveGoods
          :init-list-data="serveGoodsListData"
          :search-text="searchText"
        />
      </sp-work-tab>
      <sp-work-tab title="资产交易">
        <JyGoods :init-list-data="jyGoodsListData" :search-text="searchText" />
      </sp-work-tab>
    </sp-work-tabs>
    <!--E筛选栏-->
  </div>
</template>

<script>
import { WorkTabs, WorkTab, Badge } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import serveGoods from '@/components/list/serveGoods'
import JyGoods from '@/components/list/JyGoods'
import searchList from '@/mixins/searchList'
export default {
  name: 'SearchResult',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    serveGoods,
    JyGoods,
    [Badge.name]: Badge,
  },
  mixins: [searchList],
  data() {
    return {
      formData: {
        page: 1,
        size: 10,
      },
      searchText: '',
      active: 0,
      value1: 0,
      value2: 0,
      option: [
        { text: '默认排序', value: 0 },
        { text: '销量从高到低', value: 1 },
        { text: '销量从低到高', value: 2 },
        { text: '价格从高到低', value: 3 },
        { text: '价格从低到高', value: 4 },
      ],
      serveGoodsListData: [], // 服务商品列表数据
      jyGoodsListData: [], // 交易商品列表数据
    }
  },
  watch: {
    active(val) {
      // 切换请求类型
      this.reqType = val === 0 ? 'serve' : 'jy'
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.search-result {
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
