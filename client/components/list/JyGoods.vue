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
        'sp-tabs-self': true,
      }"
      @change="changeTabs"
    >
      <sp-tab v-for="(item, index) in tabItems" :key="index" :title="item.name">
        <jy-filters
          ref="dropDownMenu"
          :filter-data="jyFilterData[item.code]"
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
            v-for="(_item, _index) in jyGoodsListData[item.code]"
            :key="_index"
            :item-type="itemType"
            :item-data="_item"
          />
        </sp-list>
      </sp-tab>
    </sp-tabs>
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
  },
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      maxHeight: 0,
      activeTabIndex: 0,
      formData: {},
      jyFilterData: {}, // 保存所有交易业态的筛选项数据
      jyGoodsListData: {}, // 保存所有交易业态的列表数据
      currentTabJyCode: '', // 当前tab选中的jy code
      filterItem: {}, // 保存所有交易业态的已筛选数据
      isReq: {}, // 存储当前业态是否已经进行过搜索
    }
  },
  watch: {
    searchText(val) {
      // 搜索框发生变化时
      this.formData[this.currentTabJyCode].searchKey = val
      console.log('1231312312321312312312312312321313', this.reqType)
      if (this.reqType === 'jy') {
        this.resetAllSelect(this.currentTabJyCode)
        this.initGoodsList()
      }
    },
  },
  mounted() {
    this.$emit('goodsList', 'jy', this)
    // 默认请求的数据
    this.tabItems.forEach((item) => {
      this.isReq[item.code] = false
    })
    this.currentTabJyCode = this.tabItems[0].code
    this.isReq[this.currentTabJyCode] = true
    this.filterItem[this.tabItems[0].code] = {}
    this.formData[this.tabItems[0].code] = {
      start: 1,
      limit: 10,
      needTypes: 1,
      classCode: this.tabItems[0].ext4,
      dictCode: this.tabItems[0].code,
      searchKey: this.searchText,
      fieldList: [],
    }
    this.initGoodsList()
  },
  methods: {
    getFilterHandle(data, filrerName) {
      // 获取筛选项数据
      this.$set(this.filterItem[this.currentTabJyCode], filrerName, data)
      this.filterItemHandle()
      this.initGoodsList()
    },
    onLoad() {
      console.log(1)
      this.searchKeydownHandle()
    },
    changeTabs(name, title) {
      // 切换业态tab
      if (this.reqType !== 'jy') return
      console.log(this.tabItems[name])
      this.currentTabJyCode = this.tabItems[name].code
      // 如果已经存储的有筛选数据则不需要再去请求筛选数据
      if (this.jyFilterData[this.currentTabJyCode]) {
        this.formData[this.currentTabJyCode].needTypes = 0
        if (this.jyGoodsListData[this.currentTabJyCode].length === 0) {
          this.listShow = false
        } else {
          this.listShow = true
        }
        // this.jyFilterData[this.currentTabJyCode] = this.filterObj[this.formData.dictCode]
      } else {
        this.filterItem[this.currentTabJyCode] = {}
        this.jyGoodsListData[this.currentTabJyCode] = []
        this.formData[this.currentTabJyCode] = {
          start: 1,
          limit: 10,
          needTypes: 1,
          classCode: this.tabItems[name].ext4,
          dictCode: this.tabItems[name].code,
          searchKey: this.searchText,
          fieldList: [],
        }
      }
      // 判断如果该业态下没请求过则需要重新请求
      if (!this.isReq[this.currentTabJyCode]) {
        this.initGoodsList()
      }
    },
    resetAllSelect(currentCode) {
      // 重置筛选项
      // console.log(this.$refs.dropDownMenu)
      this.$refs.dropDownMenu.forEach((item) => {
        if (item.filterData[0].pcode !== currentCode) {
          item.resetAllSelect()
        }
      })
      if (!currentCode) {
        this.activeTabIndex = 0
        this.currentTabJyCode = this.tabItems[0].code
      }
      Object.keys(this.formData).forEach((item) => {
        if (item !== currentCode) {
          this.jyGoodsListData[item] = []
          this.formData[item].start = 1
          // this.formData[item].classCode = this.tabItems[0].ext4
          // this.formData[item].dictCode = this.tabItems[0].code
          this.formData[item].fieldList = []
          this.formData[item].needTypes = 0
          this.formData[item].needTypes = 0
          this.formData[item].searchKey = this.searchText
          delete this.formData[item].platformPriceStart
          delete this.formData[item].platformPriceEnd
          delete this.formData[item].sortBy
          this.isReq[item] = false
        }
      })
    },
    initGoodsList() {
      console.log('initGoodsList')
      // 获取初始数据
      this.formData[this.currentTabJyCode].start = 1
      this.jyGoodsListData[this.currentTabJyCode] = []
      this.loading = true
      this.finished = false
      this.searchKeydownHandle()
    },
    filterItemHandle() {
      // 处理筛选数据，拼成筛选项
      let arr = []
      for (const key in this.filterItem[this.currentTabJyCode]) {
        if (key === 'sortFilter') {
          // 处理排序筛选
          this.formData[this.currentTabJyCode].sortBy = this.filterItem[
            this.currentTabJyCode
          ][key].id
        } else if (
          key === 'moreFilter' &&
          this.filterItem[this.currentTabJyCode][key].length
        ) {
          // 处理更多筛选
          arr = [...arr, ...this.filterItem[this.currentTabJyCode][key]]
        } else if (
          key === 'priceFilter' &&
          this.filterItem[this.currentTabJyCode][key]
        ) {
          // 处理价格筛选
          this.formData[
            this.currentTabJyCode
          ].platformPriceStart = this.filterItem[this.currentTabJyCode][
            key
          ].fieldValue.start
          this.formData[
            this.currentTabJyCode
          ].platformPriceEnd = this.filterItem[this.currentTabJyCode][
            key
          ].fieldValue.end
        } else if (this.filterItem[this.currentTabJyCode][key] !== '') {
          // 其他筛选数据
          arr.push(this.filterItem[this.currentTabJyCode][key])
        }
      }
      this.formData[this.currentTabJyCode].fieldList = arr
    },
    computedHeight() {
      // 计算列表的最大高
      const installAPPHeight = this.$refs.installApp[0].$el.clientHeight
      const dropDownMenuHeight = this.$refs.dropDownMenu[0].$el.clientHeight
      const topHeight = this.$el.getBoundingClientRect().top
      const spTabsHeight = document.querySelectorAll(
        '.sp-tabs-self .sp-tabs__wrap'
      )[0].clientHeight
      this.maxHeight =
        document.body.clientHeight -
        installAPPHeight -
        dropDownMenuHeight -
        spTabsHeight -
        topHeight +
        'px'
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
