<template>
  <div class="jy-list">
    <div v-if="adList.length" class="ad-area">
      <sp-swipe :autoplay="3000">
        <sp-swipe-item v-for="(item, index) in adList" :key="index">
          <a
            href="javascript:void(0)"
            @click="adJumpHandleMixin(item.materialList[0])"
          >
            <img
              v-lazy="item.materialList[0].materialUrl + $ossImgSet(375, 150)"
              alt=""
            />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
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
// import JyFilters from '@/components/list/JyFilters'
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import Goods from '@/components/list/goods'
import adJumpHandle from '~/mixins/adJumpHandle'
import { publicApi } from '@/api/index'
export default {
  name: 'TransactionList',
  components: {
    // JyFilters,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    Search,
    Goods,
  },
  mixins: [adJumpHandle],
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
      adList: [],
    }
  },
  mounted() {
    this.getAdlist('ad100399')
    // document.body.addEventListener('focusout', () => {
    //   // 监听软键盘关闭事件
    //   // 解決ios端用微信打开页面，收起软键盘后，底部出现空白问题
    //   setTimeout(() => {
    //     const scrollHeight =
    //       document.documentElement.scrollTop || document.body.scrollTop || 0
    //     window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    //   }, 100)
    // })
  },
  methods: {
    searchKeydownHandle() {
      this.$refs.goods.formData.start = 1
      this.$refs.goods.datalist = []
      this.$refs.goods.$refs.list.finished = false
      this.$refs.goods.formData.searchKey = this.currentInputText
      this.$refs.goods.formData.needTypes = 0
      this.$refs.goods.getlist()
      // 点击搜索按钮
    },
    getAdlist(transAdCode) {
      this.adList = []
      this.$axios
        .post(publicApi.findAdvertising, {
          locationCodeList: [transAdCode],
        })
        .then((res) => {
          console.log('广告', res)
          if (res.data) this.adList = res.data[transAdCode].sortMaterialList
          console.log('this.adList', this.adList)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.ad-area {
  width: 100%;
  height: 300px;
  img {
    width: auto;
    height: auto;
  }
}
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
  ::v-deep.spiconfont-sear_ic_sear {
    margin-left: 24px !important;
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
  ::v-deep.goodsbox {
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
