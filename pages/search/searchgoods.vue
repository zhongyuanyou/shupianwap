<template>
  <div class="search-result">
    <div class="top_search_area"></div>
    <!--S搜索框-->
    <Search
      v-if="active === 0"
      ref="search"
      v-model="currentInputText"
      placeholder="请输入搜索内容"
      :maxlength="50"
      @searchFocusHandle="servergoodsshow"
    >
      <div slot="left" class="nav-back" @click="$router.go(-1)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
      <div
        slot="right"
        v-md:p_IMClick
        data-im_type="售前"
        data-commodity_type="交易商品"
        class="info"
        @click="jumpImMixin()"
      >
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <Search
      v-else
      :placeholder="placeholderText"
      :disabled="true"
      :class="{ 'has-input': placeholderText !== '请输入搜索内容' }"
      @clickInputHandle="clickInputHandle"
    >
      <div slot="left" class="nav-back" @click="$router.go(-1)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a" />
      </div>
      <div
        slot="right"
        v-md:p_IMClick
        data-im_type="售前"
        :data-commodity_type="reqType === 'serve' ? '服务商品' : '交易商品'"
        class="info"
        @click="jumpImMixin()"
      >
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a" />
      </div>
    </Search>
    <!--E搜索框-->
    <!--S筛选栏-->
    <sp-work-tabs ref="tabs" v-model="active" class="goods_search_tabs">
      <sp-work-tab title="企业服务">
        <serveGoods
          ref="goods"
          :searchkey="formData.searchText"
          :height="height"
        />
      </sp-work-tab>
      <sp-work-tab title="资产交易">
        <JyGoods
          :search-text="formData.searchText"
          :tab-items="jyTypesData"
          :req-type="reqType"
          class="jygood"
          @goodsList="getTabVue"
        />
      </sp-work-tab>
    </sp-work-tabs>
    <!--E筛选栏-->
    <!--S搜索页-->
    <div v-show="isShowInput" class="search-page">
      <Search
        v-if="active === 0"
        ref="searchPage"
        v-model="currentInputText"
        :maxlength="50"
        placeholder="请输入搜索内容"
        @searchKeydownHandle="servergoodsfn"
        @searchInputHandle="searchInputHandle"
      >
        <div slot="left"></div>
        <div slot="right" class="cancleBtn">
          <span @click="hidSearchPage">取消</span>
        </div>
      </Search>
      <Search
        v-else
        ref="searchPage"
        v-model="currentInputText"
        :maxlength="50"
        placeholder="请输入搜索内容"
        @searchKeydownHandle="searchKeydownHandle"
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
import { mapMutations } from 'vuex'
import { WorkTabs, WorkTab } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
// import serveGoods from '@/components/list/ServeGoods'
import serveGoods from '@/components/list/goods.vue'
import JyGoods from '@/components/list/JyGoods.vue'
import addSearchHistory from '@/mixins/addSearchHistory'
import listJumpIm from '@/mixins/listJumpIm'
import { goods, dict } from '@/api/index'
export default {
  name: 'SearchGoods',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
    // serveGoods,
    serveGoods,
    JyGoods,
  },
  layout: 'keepAlive',
  mixins: [addSearchHistory, listJumpIm],
  data() {
    return {
      formData: {
        start: 1,
        limit: 10,
        needTypes: 1,
        needGoodsList: 0,
        searchText: '',
      },
      loading: false,
      currentInputText: '',
      isShowInput: false,
      active: 0,
      serveGoodsListData: {}, // 服务商品列表数据
      jyGoodsListData: {}, // 交易商品列表数据
      jyTypesData: [], // 交易业态数据
      reqType: 'serve',
      tabVues: {}, // 两个列表实例
      isInput: false, // 判断是否进行过输入框搜索
      height: '',
      onshow: true,
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
        setTimeout(() => {
          // 将事件放到eventloop中去
          this.tabVues[this.reqType] &&
            this.tabVues[this.reqType].initGoodsList()
        }, 0)
      }
      this.isInput = false
    },
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'SearchGoods' })
    this.height =
      this.$refs.search.$el.offsetHeight +
      this.$refs.tabs.$el.offsetHeight +
      110
    // 当前页面公共属性注册
    // const param = {
    //   platform_type: 'wap端', // 平台类型：App，H5，Web
    //   app_name: '薯片wap端', // 应用名称
    //   product_line: 'Wap端搜索列表页', // 当前页面或服务名称
    //   current_url: location.href, // 发生地址
    //   referrer: document.referrer,
    // }
    // window.sensors.registerPage(param) // 设置公共属性
    // SearchResult
    this.getJyCateCode()
    if (this.$route.query.keywords) {
      this.formData.searchText = this.$route.query.keywords
      this.currentInputText = this.$route.query.keywords
    }
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    servergoodsshow() {
      this.isShowInput = true
      this.$nextTick(() => {
        this.$refs.searchPage.$refs.inputRef.focus()
      })
    },
    servergoodsfn() {
      this.$refs.goods.$refs.list.finished = false
      this.$refs.goods.formData.start = 1
      this.$refs.goods.datalist = []
      this.$refs.goods.formData.searchKey = this.currentInputText
      this.$refs.goods.formData.needTypes = 0
      this.isShowInput = false
      this.$refs.goods.onshow = false
      this.$refs.goods.getlist()
    },
    getJyCateCode() {
      dict
        .findCmsCode({ axios: this.$axios }, { code: 'CONDITION-JY' })
        .then((result) => {
          console.log('交易分类', result)
          this.jyTypesData = result.filter((item) => {
            return /[公司｜专利｜商标｜资质]/.test(item.name)
          })
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.error(e)
          }
        })
    },
    // 获取初始化数据
    getInitData() {
      // 获取服务列表需要的筛选数据
      const a = goods
        .searchServeGoodsList({ axios: this.$axios }, this.formData)
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.error(e)
          }
        })
      const b = dict
        .findCmsCode({ axios: this.$axios }, { code: 'CONDITION-JY' })
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.error(e)
          }
        })
      Promise.all([a, b]).then((res) => {
        // console.log('getInitDatares', res)
        if (res[0]) {
          this.serveGoodsListData = res[0]
        }
        if (res[1]) {
          this.jyTypesData = res[1].filter((item) => {
            return /[公司｜专利｜商标｜资质]/.test(item.name)
          })
        }
      })
    },
    searchKeydownHandle() {
      // 点击搜索按钮
      this.isShowInput = false
      this.formData.searchText = this.currentInputText
      const type = this.reqType === 'serve' ? 'jy' : 'serve'
      this.tabVues[type] && this.tabVues[type].resetAllSelect()
      if (this.tabVues[type]) {
        this.isInput = true
      }
      if (this.$refs.goods) {
        this.$refs.isLoading = false
      }
      // 处理存储路由的query
      if (
        this.$router.history.current.query.keywords !== this.formData.searchText
      ) {
        const query = this.$router.history.current.query
        const path = this.$router.history.current.path // 对象的拷
        const newQuery = JSON.parse(JSON.stringify(query))
        newQuery.keywords = this.formData.searchText
        this.$router.replace({ path, query: newQuery })
        this.addSearchHistoryMixin({
          name: this.currentInputText,
          isJumpLink: 0,
        })
      }
    },
    searchInputHandle() {},
    getTabVue(key, val) {
      // 存储服务和交易列表的vue实例
      if (key === 'jy' && !this.tabVues[key]) {
        this.tabVues[key] = val
        /* this.$nextTick(() => {
          this.tabVues[key].searchKeydownHandle()
        }) */
      } else {
        this.tabVues[key] = val
      }
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
  head: {
    meta: [
      { name: 'spptmd-track_code', content: 'SPW000006' },
      { name: 'conent_type', content: '1' },
    ],
  },
}
</script>

<style lang="less" scoped>
.search-result {
  width: 100%;
  height: 100%;
  background: #fff;
  ::v-deep.goodsbox {
    height: calc(100vh - 290px);
  }
  .search-content {
    position: fixed;
    left: 0;
    top: 0;
    padding: 16px 32px;
    &.has-input {
      ::v-deep.input-box .imitate-input {
        color: #1a1a1a;
      }
    }
  }
  ::v-deep.tablist {
    position: fixed;
    left: 0;
    top: 1.3rem;
    width: 100%;
    z-index: 2;
  }
  .top_search_area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 300px;
    z-index: 1;
    background: white;
  }
  ::v-deep.goods_search_tabs {
    width: 100%;
    .sp-work-tabs__wrap {
      position: fixed;
      left: 0;
      top: 1.3rem;
      width: 100%;
      z-index: 2;
    }
  }
  ::v-deep.goods-item {
    padding: 32px 0;
    width: 96%;
    margin: 0 40px;
    .goods-item-left {
      width: 220px;
      height: 220px;
      margin: 0;
      .goods-img {
        width: 220px;
        height: 220px;
        min-width: 220px;
        min-height: 220px;
        border-radius: 12px;
      }
    }
    .goods-right {
      width: calc(100% - 252px);
      margin-left: 32px;
      h3 {
        margin-top: 0;
        margin-bottom: 16px;
      }
      .price-sales {
        span {
          font-size: 36px;
          font-weight: bold;
          color: #ec5330;
          b {
            font-size: 22px;
            line-height: 22px;
          }
        }
      }
    }
  }
  .jygood {
    ::v-deep.sp-dropdown-menu {
      background: #fff;
      border: none;
    }
    // ::v-deep.goods-item {
    //   margin: 0.2rem auto 0 auto;
    //   background: #fff;
    //   border-radius: 0.24rem;
    //   width: 90%;
    // }
  }
  .nav-back {
    margin-right: 32px;
  }
  .info {
    margin-left: 41px;
  }
  ::v-deep.sp-work-tabs__nav .sp-work-tab {
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
  ::v-deep.spiconfont-sear_ic_sear {
    margin-left: 24px !important;
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
