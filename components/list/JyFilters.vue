<template>
  <sp-dropdown-menu>
    <component
      :is="item.componentName"
      v-for="(item, index) in filters"
      :ref="item.name"
      :key="index"
      :filter-data="item"
      :filter-max-height="dropdownContentMaxHeight"
      @activeItem="getFilterHandle"
    ></component>
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from '@chipspc/vant-dgg'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'

export default {
  name: 'JyFilters',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [List.name]: List,
    ServiceSelect,
    BottomConfirm,
    SelectFilter: () => import('./components/SelectFilter'), // 选择框组件
    AreaFilter: () => import('./components/AreaFilter'), // 地区选择组件
    MoreFilter: () => import('./components/MoreFilter'), // 更多筛选组件
    PriceFilter: () => import('./components/PriceFilter'), // 价格筛选组件
    SortFilter: () => import('./components/SortFilter'), // 排序筛选组件
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
      currentComponets: 'SelectFilter',
      filters: [],
      selectValue: 0,
      dropdownContentMaxHeight: 0,
    }
  },
  watch: {
    filterData(val) {
      // 处理筛选项
      this.resetFilterData(clone(val))
    },
  },
  mounted() {
    // console.log(this.$el.getBoundingClientRect().top)
    // console.log(this.$el.getBoundingClientRect().height)
    // console.log(document.body.clientHeight)
    this.dropdownContentMaxHeight =
      document.body.clientHeight -
      this.$el.getBoundingClientRect().top -
      this.$el.getBoundingClientRect().height
    if (this.filterData.length) {
      // 处理筛选项
      this.resetFilterData(clone(this.filterData))
    }
  },
  methods: {
    resetAllSelect() {
      // 重置所有筛选项
      // console.log(this.$refs)
      // console.log(Object.keys(this.$refs))
      Object.keys(this.$refs).forEach((item) => {
        // console.log(this.$refs[item])
        this.$refs[item][0].resetFilters()
      })
      this.$emit('emitVue', this, 'jyFilter')
    },
    getFilterHandle(data, filrerName) {
      console.log(data, filrerName)
      this.$emit('activeItem', data, filrerName)
    },
    resetFilterData(filter) {
      filter.forEach((item) => {
        if (item.code === 'CONDITION-JY-SB-FL') {
          // 商标下的分类筛选项是多选项
          item.isSelects = true
        } else {
          item.isSelects = false
        }
        if (item.code === 'CONDITION-JY-GS-DQ') {
          // 地区组件
          item.componentName = 'AreaFilter'
        } else if (item.name === '价格') {
          item.componentName = 'PriceFilter'
        } else if (item.name === '排序') {
          item.componentName = 'SortFilter'
        } else if (item.name === '更多') {
          item.componentName = 'MoreFilter'
          item.children.forEach((item) => {
            if (item.code === 'JY-GS-GD-FDZC') {
              // 附带资产是多选项
              item.isSelects = true
            } else {
              item.isSelects = false
            }
          })
        } else {
          item.componentName = 'SelectFilter'
        }
      })
      this.filters = filter
    },
  },
}
</script>

<style lang="less" scoped></style>
