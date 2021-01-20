<template>
  <div class="search-result">
    <!--S搜索框-->
    <Search
      :placeholder="placeholderText"
      :disabled="true"
      :class="{ 'has-input': placeholderText !== '请输入搜索内容' }"
      @clickInputHandle="clickInputHandle"
    >
      <div slot="left" class="nav-back" @click="$router.go(-1)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a" />
      </div>
      <div slot="right" class="info" @click="jumpImMixin">
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a" />
      </div>
    </Search>
    <!--E搜索框-->
    <!--S筛选栏-->
    <sp-work-tabs v-model="active">
      <sp-work-tab title="企业服务">
        <serveGoods
          :init-service-data="serveGoodsListData"
          :search-text="formData.searchText"
          :req-type="reqType"
          @goodsList="getTabVue"
        />
      </sp-work-tab>
      <sp-work-tab title="资产交易">
        <JyGoods
          :search-text="formData.searchText"
          :tab-items="jyTypesData"
          :req-type="reqType"
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
        :maxlength="50"
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
import { mapMutations } from 'vuex'
import { WorkTabs, WorkTab } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import serveGoods from '@/components/list/ServeGoods'
import JyGoods from '@/components/list/JyGoods'
import addSearchHistory from '@/mixins/addSearchHistory'
import listJumpIm from '@/mixins/listJumpIm'
import { goods, dict } from '@/api/index'
export default {
  name: 'SearchResult',
  components: {
    Search,
    [WorkTabs.name]: WorkTabs,
    [WorkTab.name]: WorkTab,
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
      currentInputText: '',
      isShowInput: false,
      active: 0,
      serveGoodsListData: {}, // 服务商品列表数据
      jyGoodsListData: {}, // 交易商品列表数据
      jyTypesData: [], // 交易业态数据
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
        setTimeout(() => {
          // 将事件放到eventloop中去
          console.log('this.tabVues[this.reqType]', this.tabVues[this.reqType])
          this.tabVues[this.reqType] &&
            this.tabVues[this.reqType].initGoodsList()
        }, 0)
      }
      this.isInput = false
    },
  },
  mounted() {
    // 当前页面公共属性注册
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端搜索列表页', // 当前页面或服务名称
      current_url: location.href, // 发生地址
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    // SearchResult
    this.SET_KEEP_ALIVE({ type: 'add', name: 'SearchResult' })
    this.getInitData()
    if (this.$route.query.keywords) {
      this.formData.searchText = this.$route.query.keywords
      this.currentInputText = this.$route.query.keywords
    }
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    // 获取初始化数据
    getInitData() {
      // 获取服务列表需要的筛选数据
      const a = goods
        .searchServeGoodsList({ axios: this.$axios }, this.formData)
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
      const b = dict
        .findCmsCode({ axios: this.$axios }, { code: 'CONDITION-JY' })
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
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
  /deep/.spiconfont-sear_ic_sear {
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
