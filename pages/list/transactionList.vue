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
      <div
        slot="right"
        v-md:p_IMClick
        data-im_type="售前"
        data-commodity_type="交易商品"
        class="info"
        @click="jumpImMixin"
      >
        <my-icon name="nav_ic_msg" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </Search>
    <!--E搜索框-->
    <!-- Stab -->
    <!-- <jy-filters
      ref="dropDownMenu"
      :filter-data="tabItems"
      @activeItem="getFilterHandle"
    /> -->
    <!-- Etab -->
    <goods
      v-if="jyTypesData.length"
      :is-show-tabs="false"
      :tab-items="jyTypesData"
      :type-code-index="typeCodeIndex"
      :req-type="reqType"
      :search-text="searchText"
      :is-list="false"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
// import JyFilters from '@/components/list/JyFilters'
import Search from '@/components/common/search/Search'
import Goods from '@/components/list/goods'
import { dict } from '@/api/index'
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
      tabItems: [
        {
          code: 'CONDITION-JY-ZZ-LB',
          componentName: 'SelectFilter',
          ext1: 'qualification_type',
          ext2: '',
          ext3: '1',
          ext4: 'FL20201224136348',
          id: '607967087427479044',
          isSelects: false,
          levels:
            '-1_607966778189835763_607966846909310222_607967018708008664_607967018708008721',
          name: '类别',
          pcode: 'CONDITION-JY-ZZ',
        },
        {
          children: [
            {
              code: 'CONDITION-JY-ZZ-JG-A',
              ext1: 'platform_price',
              ext2: '',
              ext3: '',
              ext4: '',
              id: '607967121787221663',
              levels:
                '-1_607966778189835763_607966846909310222_607967018708008664_607967018708008721_607967087427479046',
              name: '不限',
              pcode: 'CONDITION-JY-ZZ-JG',
            },
            {
              code: 'CONDITION-JY-ZZ-JG-B',
              ext1: 'platform_price',
              ext2: '0-5000000',
              ext3: '',
              ext4: '',
              id: '607967121787221662',
              levels:
                '-1_607966778189835763_607966846909310222_607967018708008664_607967018708008721_607967087427479046',
              name: '5万以下',
              pcode: 'CONDITION-JY-ZZ-JG',
            },
          ],
          code: 'CONDITION-JY-ZZ-JG',
          componentName: 'PriceFilter',
          ext1: 'platform_price',
          ext2: '',
          ext3: '',
          ext4: '',
          id: '607967087427479046',
          isSelects: false,
          levels:
            '-1_607966778189835763_607966846909310222_607967018708008664_607967018708008721',
          name: '价格',
          pcode: 'CONDITION-JY-ZZ',
        },
        {
          code: 'CONDITION-JY-ZZ-PX',
          componentName: 'SortFilter',
          ext1: '',
          ext2: '',
          ext3: '',
          ext4: '',
          id: '607967087427479064',
          isSelects: false,
          levels:
            '-1_607966778189835763_607966846909310222_607967018708008664_607967018708008721',
          name: '排序',
          pcode: 'CONDITION-JY-ZZ',
          children: {
            code: 'CONDITION-JY-ZZ-PX-A',
            ext1: 'CONDITION-JY-ZZ-PX-A',
            ext2: '',
            ext3: '',
            ext4: '',
            id: '607967121787221733',
            levels:
              '-1_607966778189835763_607966846909310222_607967018708008664_607967018708008721_607967087427479064',
            name: '综合排序',
            pcode: 'CONDITION-JY-ZZ-PX',
          },
        },
      ],
      ctiveTabIndex: '',
      jyGoodsListData: {}, // 服务商品列表数据
      typeCodeIndex: 0,
      searchText: '',
      currentInputText: '',
      reqType: 'jy',
      jyTypesData: [], // 交易业态数据
      formData: {
        page: 1,
        limit: 10,
      },
    }
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'JyList' })
    this.getJyType()
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
    getFilterHandle(data, filrerName) {
      console.log(data, filrerName)
    },
    searchKeydownHandle() {
      // 点击搜索按钮
      this.searchText = this.currentInputText
    },
    async getJyType() {
      // 交易的业态数据
      const jyTypeData = await dict
        .findCmsCode({ axios: this.$axios }, { code: 'CONDITION-JY' })
        .then((result) => result)
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
      if (jyTypeData) {
        this.jyTypesData = jyTypeData
        // 查找query的typeCode是第几个下标
        const index = this.jyTypesData.findIndex((item) => {
          const typeCode = this.$route.query.typeCode
            ? this.$route.query.typeCode
            : item.ext4
          return item.ext4 === typeCode
        })
        if (index === -1) {
          this.$router.replace('/500')
        }
        this.typeCodeIndex = index
      }
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
}
</style>
<style lang="less">
.jy-list {
  .search-icon {
    margin-right: 32px;
  }
}
</style>
