<template>
  <div class="filter">
    <sp-dropdown-menu>
      <sp-dropdown-item
        v-for="(item, index) in filterData"
        :key="index"
        ref="service"
        :title="item.name"
        @open="open"
      >
        <div v-if="item.code == 'class'" class="classification">
          <ServiceSelect
            ref="classification"
            :items="classification"
            :is-select_more="true"
            :active-data="activeData"
            @select="classfn"
            @navselect="navselect"
          ></ServiceSelect>
        </div>

        <div v-if="item.code == 'price'" class="price">
          <h1 class="pricetit">价格区间（元）</h1>
          <PriceFilter
            ref="price"
            :price-list="pricelist"
            :echo-data="price"
            @selectItems="pricefn"
            @minInput="minInput"
            @maxInput="maxInput"
          ></PriceFilter>
        </div>
        <div v-if="item.code == 'sort'" class="sort">
          <SortFilter
            :list="sort"
            :sortactive="sortactive"
            @sortfn="sortfn"
          ></SortFilter>
        </div>

        <BottomConfirm
          @resetFilters="reset"
          @confirmFilters="confirm"
        ></BottomConfirm>
      </sp-dropdown-item>
    </sp-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from '@chipspc/vant-dgg'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect1'
import PriceFilter from '@/components/common/filters/NewPriceFilterComponents'
import SortFilter from '@/components/common/filters/SortFilter'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'
const initSelectData = [{}, { services: [] }]
export default {
  name: 'Filters',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    SortFilter,
    ServiceSelect,
    PriceFilter,
    BottomConfirm,
    // SelectFilter: () => import('./components/SelectFilter'), // 选择框组件
    // AreaFilter: () => import('./components/AreaFilter'), // 地区选择组件
    // MoreFilter: () => import('./components/MoreFilter'), // 更多筛选组件
    // PriceFilter: () => import('./components/PriceFilter'), // 价格筛选组件
    // SortFilter: () => import('./components/SortFilter'), // 排序筛选组件
  },
  props: {
    filterData: {
      type: Array,
      default() {
        return []
      },
    },
    classification: {
      type: Array,
      default() {
        return []
      },
    },
    price: {
      type: Object,
      default() {
        return {
          minPrice: '',
          maxPrice: '',
          activeItems: [],
        }
      },
    },
    pricelist: {
      type: Array,
      default() {
        return []
      },
    },
    sort: {
      type: Array,
      default() {
        return []
      },
    },
    sortactive: {
      type: Object,
      default() {
        return {}
      },
    },
    activeData: {
      type: Array,
      default() {
        return initSelectData
      },
    },
  },
  data() {
    return {
      value: 0,
      switch1: false,
      switch2: false,
      navIndex: 0,
      classarr: [],
      isOne: true,
      option: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
    }
  },
  watch: {
    // filterData(val) {
    //   // 处理筛选项
    //   this.resetFilterData(clone(val))
    // },
  },
  mounted() {},
  methods: {
    open() {
      if (this.isOne) {
        if (this.classarr.length > 0) {
          for (let i = 0; i < this.classarr.length; i++) {
            const item = {
              code: this.classarr[i].code,
              id: this.classarr[i].id,
              name: this.classarr[i].name,
              text: this.classarr[i].name,
            }
            this.$nextTick(() => {
              this.$refs.classification[0].classarr.push(item)
            })
          }
          this.$nextTick(() => {
            // this.$refs.classification[0].handleClickNav(this.navIndex)
            this.$refs.classification[0].active = this.navIndex
          })
        } else if (this.$route.query.navcode) {
          this.$nextTick(() => {
            if (this.$refs.service[0].showPopup) {
              // this.$refs.classification[0]
              // this.$refs.classification[0].handleClickNav(this.navIndex)
              this.$refs.classification[0].active = this.navIndex
            }
          })
        }

        this.isOne = false
      }
    },
    minInput(val) {
      this.$emit('minInput', val)
    },
    maxInput(val) {
      this.$emit('maxInput', val)
    },
    reset() {
      this.$emit('reset')
      if (this.$refs.service[0].showPopup === true) {
        this.$refs.classification[0].handleClickNav(0)
        this.$refs.classification[0].active = 0
      } else if (this.$refs.service[1].showPopup === true) {
        this.$refs.price[0].minPrice = ''
        this.$refs.price[0].maxPrice = ''
        this.$refs.price[0].$refs.selectCheckBox.clearSelect()
      }
    },
    confirm() {
      if (this.$refs.service[0].showPopup === true) {
        this.$refs.service[0].toggle()
      } else if (this.$refs.service[1].showPopup === true) {
        this.$refs.service[1].toggle()
      } else if (this.$refs.service[2].showPopup === true) {
        this.$refs.service[2].toggle()
      }
      this.$emit('confirm')
    },
    sortfn(item) {
      this.$emit('sortfn', item)
    },
    classfn(item) {
      this.$emit('classfn', item)
    },
    pricefn(item, items) {
      this.$emit('pricefn', item, items)
    },
    navselect(item) {
      this.$emit('navselect', item)
    },
  },
}
</script>

<style lang="less">
.jyGoods {
  .filter {
    width: 100%;
    background: #fff;
    .sp-dropdown-menu {
      .sp-dropdown-menu__bar {
        /deep/.sp-dropdown-menu__item {
          text-align: center;
        }
        /deep/.sp-dropdown-menu__title:after {
          right: 35px;
        }
      }
    }
  }
  .pricetit {
    font-size: 30px;
    padding-left: 20px;
    margin: 20px 10px;
  }
}
</style>
