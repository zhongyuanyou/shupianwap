<template>
  <div class="jyGoods">
    <sp-tabs
      v-if="isShowTabs"
      ref="spTabs"
      v-model="activeTabIndex"
      title-active-color="#4974F5"
      title-inactive-color="#222"
      line-width="0"
      :ellipsis="false"
      :class="{
        lowFive: tabItems.length <= 5,
      }"
      @change="changeTabs"
    >
      <sp-tab
        v-for="(item, index) in tabItems"
        :key="index"
        :title="item.name"
      ></sp-tab>
    </sp-tabs>
    <jy-filters
      ref="dropDownMenu"
      :filter-data="jyFilterData"
      @activeItem="getFilterHandle"
    />
    <install-app v-show="listShow" ref="installApp" />
    <sp-list
      v-show="listShow"
      v-model="loading"
      :finished="finished"
      :style="{
        maxHeight: maxHeight,
      }"
      finished-text="没有更多了"
      class="goods-content"
      offset="30"
      @load="onLoad"
    >
      <goods-item
        v-for="(item, index) in jyGoodsListData"
        :key="index"
        :item-type="itemType"
        :item-data="item"
      />
    </sp-list>
    <Subscribe
      v-show="!listShow"
      title="新上商品通知"
      desc="填写手机号,相关商品上架第一时间通知"
    />
  </div>
</template>

<script>
import { List, Tabs, Tab } from '@chipspc/vant-dgg'
import InstallApp from '@/components/common/app/InstallApp'
import GoodsItem from '@/components/common/goodsItem/GoodsItem'
import Subscribe from '@/components/list/Subscribe'
import JyFilters from '@/components/list/JyFilters'
import searchList from '@/mixins/searchList'
import clone from '~/utils/clone'

export default {
  name: 'JyGoods',
  components: {
    GoodsItem,
    [List.name]: List,
    InstallApp,
    Subscribe,
    JyFilters,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  mixins: [searchList],
  props: {
    tabItems: {
      // 可选业态数组数据
      type: Array,
      default() {
        return []
      },
    },
    reqType: {
      // 搜索结果页的顶部tab类型
      type: String,
      default() {
        return ''
      },
    },
    isShowTabs: {
      // 是否显示tabs业态栏
      type: Boolean,
      default() {
        return true
      },
    },
    initJyData: {
      // 初始化的交易数据，包括所有的筛选数据
      type: Object,
      default() {
        return {}
      },
    },
    typeCode: {
      // 业态类型
      type: String,
      default() {
        return '公司交易'
      },
    },
    searchText: {
      type: String,
      default() {
        return ''
      },
    },
    itemType: {
      // 商品列表的类型
      type: Object,
      default() {
        return {
          type: 'jy',
          classify: 'wd',
        }
      },
    },
    isChangeTab: {
      // 顶层tab服务资源和交易资源发生了改变需要清空筛选项
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      maxHeight: 0,
      activeTabIndex: 0,
      formData: {
        start: 1,
        limit: 10,
        needTypes: 1,
        classCode: '',
        dictCode: '',
        searchKey: '',
        fieldList: '',
      },
      jyFilterData: [],
      jyGoodsListData: [],
      filterItem: {},
      filterObj: {}, // 存储已经请求过的筛选项
    }
  },
  watch: {
    searchText(val) {
      // 搜索框发生变化时
      this.formData.searchKey = val
      if (this.reqType === 'jy') {
        this.initGoodsList()
      }
    },
    isChangeTab() {
      this.formData.sortBy = ''
      this.formData.classCodes = ''
    },
    /* initListData(val) {
      this.jyGoodsListData = clone(val)
    }, */
  },
  mounted() {
    this.$nextTick(() => {
      const installAPPHeight = this.$refs.installApp.$el.clientHeight
      const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
      const topHeight = this.$el.getBoundingClientRect().top
      const spTabsHeight = this.$refs.spTabs
        ? this.$refs.spTabs.$el.clientHeight
        : 0
      this.maxHeight =
        document.body.clientHeight -
        installAPPHeight -
        dropDownMenuHeight -
        spTabsHeight -
        topHeight +
        'px'
    })
    this.$emit('goodsList', 'jy', this)
    // 默认请求的数据
    this.formData.classCode = this.tabItems[0].ext4
    this.formData.dictCode = this.tabItems[0].code
    this.initGoodsList()
  },
  methods: {
    getFilterHandle(data, filrerName) {
      // 获取筛选项数据
      this.$set(this.filterItem, filrerName, data)
      this.filterItemHandle()
      this.initGoodsList()
    },
    onLoad() {
      console.log(1)
      // const arr = new Array(10).fill(2)
      // this.jyGoodsListData = [...this.jyGoodsListData, ...arr]
      // this.loading = false
      this.searchKeydownHandle()
    },
    changeTabs(name, title) {
      console.log(this.tabItems[name])
      this.formData.classCode = this.tabItems[name].ext4
      this.formData.dictCode = this.tabItems[name].code
      // 如果已经存储的有筛选数据则不需要再去请求筛选数据
      if (this.filterObj[this.formData.dictCode]) {
        this.formData.needTypes = 0
      } else {
        this.formData.needTypes = 1
      }
    },
    resetAllSelect() {
      // 重置筛选项
      this.$refs.dropDownMenu.resetAllSelect()
      this.formData.start = 1
      this.jyGoodsListData = []
      this.activeTabIndex = 0
      this.formData.classCode = this.tabItems[0].ext4
      this.formData.dictCode = this.tabItems[0].code
      this.formData.fieldList = []
      this.formData.needTypes = 0
      delete this.formData.platformPriceStart
      delete this.formData.platformPriceEnd
      delete this.formData.sortBy
    },
    initGoodsList() {
      console.log('initGoodsList')
      // 获取初始数据
      this.formData.start = 1
      this.jyGoodsListData = []
      this.loading = true
      this.finished = false
      this.searchKeydownHandle()
    },
    filterItemHandle() {
      // 处理筛选数据，拼成筛选项
      let arr = []
      for (const key in this.filterItem) {
        if (key === 'sortFilter') {
          // 处理排序筛选
          this.formData.sortBy = this.filterItem[key].id
        } else if (key === 'moreFilter' && this.filterItem[key].length) {
          // 处理更多筛选
          arr = [...arr, ...this.filterItem[key]]
        } else if (key === 'priceFilter' && this.filterItem[key]) {
          // 处理价格筛选
          this.formData.platformPriceStart = this.filterItem[
            key
          ].fieldValue.start
          this.formData.platformPriceEnd = this.filterItem[key].fieldValue.end
        } else if (this.filterItem[key] !== '') {
          // 其他筛选数据
          arr.push(this.filterItem[key])
        }
      }
      this.formData.fieldList = arr
    },
  },
}
</script>

<style lang="less" scoped>
.jyGoods {
  /deep/.sp-tab {
    font-weight: bold;
    font-size: 30px;
    padding: 0 40px;
  }
  /deep/.sp-tabs {
    border-bottom: 1px solid #f4f4f4;
    .sp-tabs__line {
      display: none;
    }
  }
  /deep/.sp-tabs__wrap--scrollable .sp-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
  /deep/.jyDropdownFilter {
    &.active {
      font-weight: bold !important;
      color: #4974f5 !important;
      &:after {
        border-color: transparent transparent #4974f5 #4974f5 !important;
      }
    }
  }
  /*height: calc(100% - 200px);*/
  /deep/.sp-dropdown-item__content {
    max-height: 100%;
  }
  /deep/.sp-dropdown-menu__bar {
    height: 80px;
    box-shadow: none;
    margin: 0 30px;
    margin-left: -8px;
    border-bottom: 1px solid #f4f4f4;
    /*border-top: 1px solid #f4f4f4;*/
    .sp-dropdown-menu__item {
      text-align: right;
      justify-content: flex-end;
    }
    /deep/.sp-dropdown-menu__title {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 80px;
      padding: 0 28px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      &:after {
        right: 0;
        top: 50%;
        /*transform: rotate(-45deg);*/
      }
      &.moreText {
        &::after {
          right: 6px;
        }
      }
    }
    /deep/.sp-dropdown-menu__title--active {
      font-weight: bold;
      color: #4974f5;
    }
  }
  .sort-filter /deep/.sp-cell {
    padding: 18px 40px;
    &:last-child {
      margin-bottom: 40px;
    }
  }
  .goods-content {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /deep/.sp-tree-select {
    min-height: 600px;
    max-height: 600px;
    height: auto !important;
    .sp-tree-select__nav .sp-sidebar-item {
      padding: 30px 0 30px 40px;
    }
  }
  /deep/.sp-dropdown-item__option--active {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  /deep/.sp-tabs--line .sp-tabs__wrap {
    height: 94px;
  }
  .subscribe {
    padding: 0 40px;
  }
  /deep/.lowFive /deep/.sp-tabs__nav /deep/.sp-tab {
    &:first-child {
      justify-content: flex-start;
    }
    &:nth-last-child(2) {
      justify-content: flex-end;
    }
  }
}
</style>
