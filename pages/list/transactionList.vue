<template>
  <div class="jy-list">
    <!--S搜索框-->
    <Search
      ref="search"
      v-model="currentInputText"
      placeholder="请输入搜索内容"
      :maxlength="50"
      @searchKeydownHandle="searchKeydownHandle"
    >
      <div slot="left" class="nav-back" @click="$router.go(-1)">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <goods ref="goods" :searchkey="currentInputText" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
// import JyFilters from '@/components/list/JyFilters'
import Search from '@/components/common/search/Search'
import Goods from '@/components/list/goods'
import listJumpIm from '@/mixins/listJumpIm'
export default {
  name: 'TransactionList',
  components: {
    // JyFilters,
    Search,
    Goods,
  },
  layout: 'keepAlive',
  mixins: [listJumpIm],
  data() {
    return {
      tabItems: [],
      ctiveTabIndex: '',
      jyGoodsListData: {}, // 服务商品列表数据
      typeCodeIndex: 0,
      searchText: '',
      currentInputText: '',
      reqType: 'jy',
      jyTypesData: [], // 交易业态数据
      height: '',
    }
  },
  mounted() {
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
      this.$refs.goods.formData.start = 1
      this.$refs.goods.datalist = []
      this.$refs.goods.formData.searchKey = this.currentInputText
      this.$refs.goods.formData.needTypes = 0
      this.$refs.goods.getlist()
      // 点击搜索按钮
    },
  },
}
</script>

<style lang="less" scoped>
.jy-list {
  width: 100%;
  height: 100%;
  background: #e4e4e4;
  .search-content {
    padding: 16px 32px;
  }
  .nav-back {
    margin-right: 32px;
  }
  .info {
    margin-left: 41px;
  }
  /deep/.spiconfont-sear_ic_sear {
    margin-left: 24px !important;
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
  > .nav-content {
    border-top: 1px solid #f4f4f4;
    display: flex;
    height: 80px;
    align-self: center;
    justify-content: space-between;
    padding: 0 55px;
    position: relative;
    > div {
      height: 80px;
      > p {
        height: 80px;
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
      }
    }
  }
  /deep/.goodsbox {
    height: calc(100vh - 210px);
  }
}
</style>
<style lang="less">
.jy-list {
  .search-icon {
    margin-right: 32px;
  }
}
</style>
