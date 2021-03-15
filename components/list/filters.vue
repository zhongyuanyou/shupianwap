<template>
  <div class="filter">
    <sp-dropdown-menu>
      <sp-dropdown-item
        v-for="(item, index) in filterData"
        :key="index"
        :title="item.name"
      >
        <div v-if="item.name == '全部分类'" class="class">
          <ServiceSelect></ServiceSelect>
        </div>

        <div v-if="item.name == '价格'" class="price">
          <PriceFilter></PriceFilter>
        </div>
        <div v-if="item.name == '排序'" class="sort">
          <SortFilter></SortFilter>
        </div>

        <BottomConfirm v-if="item.name != '排序'"></BottomConfirm>
      </sp-dropdown-item>
    </sp-dropdown-menu>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from '@chipspc/vant-dgg'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect'
import PriceFilter from '@/components/common/filters/NewPriceFilterComponents'
import SortFilter from '@/components/common/filters/SortFilter'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'

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
  methods: {},
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
