<template>
  <div class="filter">
    <sp-dropdown-menu>
      <sp-dropdown-item
        v-for="(item, index) in filterData"
        :key="index"
        :title="item.name"
      >
        <div v-if="item.code == 'class'" class="classification">
          <ServiceSelect
            :items="classification"
            :isSelectMore="true"
            :activeData="activeData"
            @select="classfn"
          ></ServiceSelect>
        </div>

        <div v-if="item.code == 'price'" class="price">
          <PriceFilter
            :priceList="priceList"
            :echoData="price"
            @selectItems="pricefn"
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
          v-if="item.name != '排序'"
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
    priceList: {
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
    reset() {
      this.$emit('reset')
    },
    confirm() {
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
}
</style>
