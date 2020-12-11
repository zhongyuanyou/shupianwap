<template>
  <div class="search-result">
    <!--S搜索框-->
    <Search
      :placeholder="placeholderText"
      :disabled="true"
      :class="{ 'has-input': placeholderText !== '请输入搜索内容' }"
      @clickInputHandle="clickInputHandle"
    >
      <div slot="left" class="nav-back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div slot="right" class="info">
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <!--E搜索框-->
    <!--S筛选栏-->
    <sp-work-tabs v-model="active">
      <sp-work-tab title="企业服务">
        <serveGoods
          :init-service-data="serveGoodsListData"
          :search-text="formData.searchText"
          @goodsList="getTabVue"
        />
      </sp-work-tab>
      <sp-work-tab title="资产交易">
        <JyGoods
          :init-list-data="jyGoodsListData"
          :search-text="formData.searchText"
          @goodsList="getTabVue"
        />
      </sp-work-tab>
    </sp-work-tabs>
    <!--E筛选栏-->
    <!--S搜索页-->
    <div v-show="isShowInput" class="search-page">
      <Search
        ref="searchPage"
        v-model="currentInputText"
        placeholder="请输入搜索内容"
        @searchKeydownHandle="searchKeydownHandle"
        @searchInputHandle="searchInputHandle"
      >
        <div slot="left"></div>
        <div slot="right" class="cancleBtn">
          <span @click="hidSearchPage">取消</span>
        </div>
      </Search>
    </div>
    <!--E搜索页-->
  </div>
</template>

<script>
import { WorkTabs, WorkTab } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import serveGoods from '@/components/list/serveGoods'
import JyGoods from '@/components/list/JyGoods'
// import searchList from '@/mixins/searchList'
import { goods } from '@/api/index'
export default {
  name: 'SearchResult',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    serveGoods,
    JyGoods,
  },
  // mixins: [searchList],
  data() {
    return {
      formData: {
        start: 1,
        limit: 10,
        needTypes: 1,
        searchText: '',
      },
      currentInputText: '',
      isShowInput: false,
      active: 0,
      serveGoodsListData: {}, // 服务商品列表数据
      jyGoodsListData: {}, // 交易商品列表数据
      reqType: 'serve',
      tabVues: {}, // 两个列表实例
      isInput: false, // 判断是否进行过输入框搜索
    }
  },
  computed: {
    placeholderText() {
      return this.formData.searchText !== ''
        ? this.formData.searchText
        : '请输入搜索内容'
    },
  },
  watch: {
    active(val) {
      // 切换请求类型
      this.reqType = val === 0 ? 'serve' : 'jy'
      if (this.isInput) {
        // 如果在当前列表进行了搜索框搜索，
        // 那么在切换列表的时候需要重新请求数据
        this.tabVues[this.reqType].searchKeydownHandle()
      }
      this.isInput = false
    },
  },
  mounted() {
    this.getInitServeData()
  },
  methods: {
    // 获取初始化数据
    getInitServeData() {
      // 获取服务列表需要的数据
      goods
        .searchServeGoodsList({ axios: this.$axios }, this.formData)
        .then((data) => {
          console.log(data)
          this.serveGoodsListData = data
        })
        .catch()
      // todo 获取交易商品数据
    },
    searchKeydownHandle() {
      // 点击搜索按钮
      this.isShowInput = false
      this.formData.searchText = this.currentInputText
      const type = this.reqType === 'serve' ? 'jy' : 'serve'
      this.tabVues[type] && this.tabVues[type].resetAllSelect()
      this.isInput = true
    },
    searchInputHandle() {},
    getTabVue(key, val) {
      this.tabVues[key] = val
    },
    clickInputHandle() {
      // 打开搜索页
      this.isShowInput = true
      this.$nextTick(() => {
        this.$refs.searchPage.$refs.inputRef.focus()
      })
    },
    hidSearchPage() {
      // 关闭搜索页
      this.isShowInput = false
      this.currentInputText = this.formData.searchText
    },
  },
}
</script>

<style lang="less" scoped>
.search-result {
  width: 100%;
  height: 100%;
  .search-content {
    padding: 16px 32px;
    &.has-input {
      /deep/.input-box .imitate-input {
        color: #1a1a1a;
      }
    }
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
  .search-page {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    z-index: 999;
    .search-content {
      padding: 16px 32px;
    }
    .cancleBtn {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-left: 40px;
      margin-right: 8px;
    }
  }
}
</style>
