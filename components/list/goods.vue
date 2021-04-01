<template>
  <div class="jyGoods">
    <Filters ref="dropDownMenu" :filter-data="jyFilterData" />
    <div class="listbox" :style="{ height: listboxheight + 'px' }">
      <Newlist ref="list" :searchtext="searchkey"></Newlist>
    </div>
  </div>
</template>

<script>
import Newlist from '@/components/list/Newlist'
import Filters from '@/components/list/filters'
import searchList from '@/mixins/searchList'

export default {
  name: 'JyGoods',
  components: {
    Filters,
    Newlist,
  },
  mixins: [searchList],
  props: {
    searchkey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      listboxheight: 700,
      listShow: true,
      loading: false,
      finished: false,
      maxHeight: 0,
      activeTabIndex: 0,
      formData: {},
      typeText: '',
      skeletonLoading: true,
      // jyFilterData: {}, // 保存所有交易业态的筛选项数据
      jyFilterData: [
        {
          children: [],
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
          name: '全部分类',
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
      jyGoodsListData: {}, // 保存所有交易业态的列表数据
      currentTabJyCode: '', // 当前tab选中的jy code
      filterItem: {}, // 保存所有交易业态的已筛选数据
      isReq: {}, // 存储当前业态是否已经进行过搜索
    }
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(this.list, 'list')
    this.listboxheight =
      document.documentElement.clientHeight -
      (this.$parent.$refs.search.$el.offsetHeight +
        this.$refs.dropDownMenu.$el.offsetHeight)
  },
  methods: {
    getFilterHandle(data, filrerName) {
      console.log(data, filrerName)
    },
    onLoad() {
      this.searchKeydownHandle()
    },
    changeTabs(name, title) {
      // 切换业态tab
      if (this.reqType !== 'jy') return
      // console.log(this.tabItems[name])
      // console.log(title)
      this.typeText = title
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
          statusList: ['PRO_STATUS_LOCKED', 'PRO_STATUS_PUT_AWAY'],
          fieldList: [],
        }
      }
      // 判断如果该业态下没请求过则需要重新请求
      if (!this.isReq[this.currentTabJyCode]) {
        this.initGoodsList()
      }
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
  .listbox {
    overflow-y: auto;
    padding-bottom: 20px;
  }
  /deep/.sp-tabs {
    .sp-tabs__line {
      display: none;
    }
    /deep/.sp-dropdown-menu {
      border-bottom: 1px solid #f4f4f4;
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
  /deep/.sp-dropdown-item {
    z-index: 30 !important;
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
    /*border-bottom: 1px solid #f4f4f4;*/
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
