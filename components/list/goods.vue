<template>
  <div class="jyGoods">
    <Filters
      ref="dropDownMenu"
      :filter-data="jyFilterData"
      :classification="items.typeData"
      :active_data="itemsclass"
      :pricelist="items.price"
      :sort="items.sortFilter"
      :sortactive="sortactive"
      @classfn="classfn"
      @pricefn="pricefn"
      @sortfn="sortfn"
      @reset="reset"
      @confirm="confirm"
      @navselect="navselect"
      @minInput="minInput"
      @maxInput="maxInput"
    />
    <sp-skeleton
      v-for="_index in 10"
      :key="_index"
      title
      :row="3"
      style="margin-top: 10px"
      :loading="skeletonLoading"
    >
    </sp-skeleton>
    <div v-show="!skeletonLoading" class="goodsbox">
      <Newlist ref="list" :datalist="datalist" @load="pagefn"></Newlist>
    </div>
  </div>
</template>

<script>
import { Skeleton } from '@chipspc/vant-dgg'
import Newlist from '@/components/list/Newlist'
import Filters from '@/components/list/filters'
import searchList from '@/mixins/searchList'
import { goods } from '@/api/index'
export default {
  name: 'JyGoods',
  components: {
    Filters,
    Newlist,
    [Skeleton.name]: Skeleton,
  },
  mixins: [searchList],
  props: {
    searchkey: {
      type: String,
      default: '',
    },
    heigth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      maxHeight: 0,
      activeTabIndex: 0,
      typeText: '',
      itemsclass: [
        { id: -1, name: '不限', text: '不限' },
        { services: [{ id: -1, name: '不限', text: '不限' }] },
      ],
      skeletonLoading: true,
      jyFilterData: [
        {
          name: '全部分类',
          code: 'class',
        },
        {
          name: '价格',
          code: 'price',
        },
        {
          name: '排序',
          code: 'sort',
        },
      ],
      jyGoodsListData: {}, // 保存所有交易业态的列表数据
      currentTabJyCode: '', // 当前tab选中的jy code
      filterItem: {}, // 保存所有交易业态的已筛选数据
      isReq: {}, // 存储当前业态是否已经进行过搜索
      formData: {
        start: 1,
        limit: 10,
        needTypes: 1,
        needGoodsList: 1,
        searchKey: this.searchkey,
        price: this.priceactive,
        sort: this.sortactive,
        class: this.itemsclass,
        clientType: 'COMDIC_TERMINAL_APP',
      },
      datalist: [],
      items: '',
      sortactive: {},
      priceactive: {
        minPrice: '',
        maxPrice: '',
        activeItems: {},
      },
      classcode: this.$route.query,
      isOne: true,
    }
  },
  computed: {},
  watch: {},
  mounted() {
    if (this.classcode.classcode && this.classcode.navcode) {
      const arr = this.classcode.classcode.split(',')
      for (let i = 0; i < arr.length; i++) {
        const item = {
          code: arr[i],
          id: 1,
        }
        this.itemsclass[1].services.push(item)
      }
      this.itemsclass[0].id = 1
      this.itemsclass[0].code = this.classcode.navcode
      this.formData.class = this.itemsclass
    } else if (this.classcode.navcode) {
      this.itemsclass[0].id = 1
      this.itemsclass[0].code = this.classcode.navcode
      this.formData.class = this.itemsclass
    }
    if (this.classcode.priceid && this.classcode.price) {
      this.formData.price = {
        maxPrice: '',
        minPrice: '',
        activeItems: {
          code: this.classcode.priceid,
          ext2: this.classcode.price,
        },
      }
    } else if (this.classcode.price) {
      this.formData.price = {
        minPrice: this.classcode.price.slice(
          0,
          this.classcode.price.match('-').index
        ),
        maxPrice: this.classcode.price.slice(
          this.classcode.price.match('-').index + 1
        ),
        activeItems: {},
      }
    }
    if (this.classcode.sort) {
      this.formData.sort = {
        code: this.classcode.sort,
      }
    }
    this.getlist()
  },
  methods: {
    confirm() {
      this.datalist = []
      this.formData.start = 1
      this.formData.needTypes = 0
      this.formData.price = this.priceactive
      this.formData.sort = this.sortactive
      this.formData.class = this.itemsclass
      this.$refs.list.finished = false
      this.$refs.list.pages = 1
      this.getlist()
    },
    navselect(item) {
      if (item[0].id === -1 && item[0].name === '不限') {
        this.jyFilterData[0].name = '全部分类'
      } else {
        this.jyFilterData[0].name = item[0].name
        this.itemsclass = item
      }
      this.itemsclass = item
    },
    reset() {
      this.priceactive = {
        minPrice: '',
        maxPrice: '',
        activeItems: [],
      }
      this.itemsclass = [
        { id: -1, name: '不限', text: '不限' },
        { services: [{ id: -1, name: '不限', text: '不限' }] },
      ]
      this.sortactive = {}
      this.jyFilterData[0].name = '全部分类'
      this.jyFilterData[1].name = '价格'
      this.jyFilterData[2].name = '排序'
    },
    minInput(val) {
      this.priceactive.minPrice = val
      this.priceactive.activeItems = {}
      this.jyFilterData[1].name = '价格'
    },
    maxInput(val) {
      this.priceactive.maxPrice = val
      this.priceactive.activeItems = {}
      this.jyFilterData[1].name = '价格'
    },
    pricefn(item, items) {
      this.priceactive.activeItems = item
      if (this.priceactive.activeItems) {
        this.jyFilterData[1].name = this.priceactive.activeItems.name
      }
    },
    classfn(item) {
      if (item[1].services.length && item[1].services.length > 0) {
        if (
          item[1].services[0].id !== -1 &&
          item[1].services[0].name !== '不限'
        ) {
          let arr = item[1].services.map((x) => {
            return x.name
          })
          arr = arr.toString()
          this.jyFilterData[0].name = arr
        } else if (item[0].id !== -1 && item[0].name !== '不限') {
          this.jyFilterData[0].name = item[0].name
        } else {
          this.jyFilterData[0].name = '全部分类'
        }
      }
      this.itemsclass = item
    },
    sortfn(item) {
      this.sortactive = item
      if (this.sortactive.name) {
        this.jyFilterData[2].name = this.sortactive.name
      } else {
        this.jyFilterData[2].name = '排序'
      }
    },
    getlist() {
      goods
        .transactionList({ axios: this.$axios }, this.formData)
        .then((data) => {
          if (this.formData.needTypes === 1) {
            this.items = data
            if (this.classcode && this.isOne) {
              for (let i = 0; i < this.items.typeData.length; i++) {
                if (this.classcode.navcode === this.items.typeData[i].code) {
                  this.$refs.dropDownMenu.navIndex = i + 1
                  this.itemsclass[0].code = this.items.typeData[i].code
                  this.itemsclass[0].id = this.items.typeData[i].id
                  this.itemsclass[0].name = this.items.typeData[i].name
                  this.itemsclass[0].text = this.items.typeData[i].text
                  this.jyFilterData[0].name = this.itemsclass[0].name
                  if (this.classcode.classcode) {
                    this.classcode.classcode = this.classcode.classcode.split(
                      ','
                    )
                    this.itemsclass[1].services = []
                    for (
                      let b = 0;
                      b < this.items.typeData[i].children.length;
                      b++
                    ) {
                      for (
                        let a = 0;
                        a < this.classcode.classcode.length;
                        a++
                      ) {
                        if (
                          this.items.typeData[i].children[b].code ===
                          this.classcode.classcode[a]
                        ) {
                          this.itemsclass[1].services.push(
                            this.items.typeData[i].children[b]
                          )
                          if (
                            this.jyFilterData[0].name ===
                            this.items.typeData[i].name
                          ) {
                            this.jyFilterData[0].name = this.items.typeData[
                              i
                            ].children[b].name
                          } else {
                            this.jyFilterData[0].name = `${this.jyFilterData[0].name},${this.items.typeData[i].children[b].name}`
                          }
                          console.log(this.jyFilterData[0].name)
                        }
                      }
                    }
                    this.$refs.dropDownMenu.classarr = this.itemsclass[1].services
                    this.isOne = false
                  }
                }
              }
              if (this.classcode.priceid) {
                for (let z = 0; z < this.items.price.length; z++) {
                  if (this.classcode.priceid === this.items.price[z].code) {
                    this.jyFilterData[1].name = this.items.price[z].name
                    this.$refs.dropDownMenu.priceobj = this.items.price[z]
                  }
                }
              }
              if (this.classcode.sort) {
                for (let x = 0; x < this.items.sortFilter.length; x++) {
                  if (this.classcode.sort === this.items.sortFilter[x].code) {
                    this.jyFilterData[2].name = this.items.sortFilter[x].name
                    this.sortactive = this.items.sortFilter[x]
                  }
                }
              }
            }
          }
          if (data.goodsList.records.length < 1) {
            this.$refs.list.finished = true
          }
          if (this.datalist.length > 0) {
            this.datalist = this.datalist.concat(data.goodsList.records)
            if (
              data.goodsList.totalCount === this.datalist.length ||
              data.goodsList.totalCount < this.datalist.length
            ) {
              this.$refs.list.finished = true
            }
            this.skeletonLoading = false
          } else {
            this.datalist = data.goodsList.records
            if (
              data.goodsList.totalCount === this.datalist.length ||
              data.goodsList.totalCount < this.datalist.length
            ) {
              this.$refs.list.finished = true
            }
          }
          this.$refs.list.loading = false
          this.skeletonLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.skeletonLoading = false
          this.$refs.list.loading = false
        })
    },
    getFilterHandle(data, filrerName) {
      console.log(data, filrerName)
    },
    pagefn(val) {
      console.log(val)
      this.formData.start = val
      this.getlist()
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
  ::v-deep.sp-tab {
    font-weight: bold;
    font-size: 30px;
    padding: 0 40px;
  }
  // ::v-deep.sp-ellipsis {
  //   width: 87%;
  // }
  .goodsbox {
    overflow-y: auto;
    padding-bottom: 20px;
    background: #fff;
  }
  ::v-deep.sp-tabs {
    .sp-tabs__line {
      display: none;
    }
    ::v-deep.sp-dropdown-menu {
      border-bottom: 1px solid #f4f4f4;
    }
    .sp-ellipsis {
      padding-right: 12px;
    }
  }
  ::v-deep.sp-tabs__wrap--scrollable .sp-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
  ::v-deep.jyDropdownFilter {
    &.active {
      font-weight: bold !important;
      color: #4974f5 !important;
      &:after {
        border-color: transparent transparent #4974f5 #4974f5 !important;
      }
    }
  }
  ::v-deep.sp-dropdown-item {
    z-index: 30 !important;
  }
  /*height: calc(100% - 200px);*/
  ::v-deep.sp-dropdown-item__content {
    max-height: 100%;
  }
  ::v-deep.sp-dropdown-menu__bar {
    height: 80px;
    box-shadow: none;
    padding: 0 10px;
    // margin: 0 30px;
    // margin-left: -8px;
    /*border-bottom: 1px solid #f4f4f4;*/
    /*border-top: 1px solid #f4f4f4;*/
    .sp-dropdown-menu__item {
      // text-align: right;
      width: 33%;
      // justify-content: flex-end;
    }
    ::v-deep.sp-dropdown-menu__title {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 0.8rem;
      padding: 0 0.28rem;
      font-size: 0.28rem;
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
    ::v-deep.sp-dropdown-menu__title--active {
      font-weight: bold;
      color: #4974f5;
    }
  }
  .sort-filter ::v-deep.sp-cell {
    padding: 18px 40px;
    &:last-child {
      margin-bottom: 40px;
    }
  }
  .goods-content {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  ::v-deep.sp-tree-select {
    min-height: 600px;
    max-height: 600px;
    height: auto !important;
    .sp-tree-select__nav .sp-sidebar-item {
      padding: 30px 0 30px 40px;
    }
  }
  ::v-deep.sp-dropdown-item__option--active {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  ::v-deep.sp-tabs--line .sp-tabs__wrap {
    height: 94px;
  }
  .subscribe {
    padding: 0 40px;
  }
  ::v-deep.lowFive ::v-deep.sp-tabs__nav ::v-deep.sp-tab {
    &:first-child {
      justify-content: flex-start;
    }
    &:nth-last-child(2) {
      justify-content: flex-end;
    }
  }
}
</style>
