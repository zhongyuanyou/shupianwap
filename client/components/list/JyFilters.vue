<template>
  <sp-dropdown-menu>
    <component
      :is="item.componentName"
      v-for="(item, index) in filters"
      :key="index"
      :filter-data="item"
      @activeItem="filterItem"
    ></component>
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem, List } from '@chipspc/vant-dgg'
import ServiceSelect from '@/components/common/serviceSelected/ServiceSelect'
import BottomConfirm from '@/components/common/filters/BottomConfirm'

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
  data() {
    return {
      currentComponets: 'SelectFilter',
      filters: [],
      selectValue: 0,
      dropdownTitle1: '全部服务',
      dropdownTitle2: '默认排序',
      activeData: [
        { text: '工商服务', id: '1' },
        {
          services: [
            {
              text: '有限公司注册',
              id: 1,
            },
            {
              text: '外资公司注册',
              id: 2,
              disabled: true,
            },
          ],
        },
      ],
      option: [
        { text: '默认排序', value: 0 },
        { text: '销量从高到低', value: 1 },
        { text: '销量从低到高', value: 2 },
        { text: '价格从高到低', value: 3 },
        { text: '价格从低到高', value: 4 },
      ],
      filterData: [],
    }
  },
  watch: {},
  mounted() {
    this.getFiterData()
  },
  methods: {
    filterItem(data, filrerName) {
      console.log(data, filrerName)
    },
    getFiterData() {
      /* const res = [
        {
          title: '地区',
          filters: null,
          isSelects: true,
        },
        {
          title: '价格',
          filters: null,
          isSelects: false,
        },
        {
          title: '行业',
          filters: null,
          isSelects: false,
        },
        {
          title: '更多',
          children: [
            {
              title: '行业类型',
              filters: null,
              isSelects: false,
            },
          ],
        },
        {
          title: '排序',
          filters: null,
          isSelects: true,
        },
      ] */
      const res = [
        {
          title: '更多',
          children: [
            {
              title: '行业类型',
              filters: [
                {
                  id: '1',
                  name: '科技信息',
                },
                {
                  id: '2',
                  name: '科技信息',
                },
                {
                  id: '3',
                  name: '科技信息',
                },
                {
                  id: '4',
                  name: '科技信息',
                },
                {
                  id: '5',
                  name: '科技信息',
                },
                {
                  id: '6',
                  name: '科技信息',
                },
                {
                  id: '7',
                  name: '科技信息',
                },
              ],
              isSelects: false,
            },
          ],
        },
        {
          title: '价格',
          filters: [
            {
              id: '1',
              name: '1万以下',
            },
            {
              id: '2',
              name: '1-2万',
            },
            {
              id: '3',
              name: '2-5万',
            },
            {
              id: '4',
              name: '5-10万',
            },
            {
              id: '5',
              name: '10万以上',
            },
          ],
          isSelects: false,
        },
        {
          title: '行业',
          filters: [
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
          ],
          isSelects: false,
        },
        {
          title: '地区',
          isSelects: true,
        },
        {
          title: '排序',
          filters: [
            {
              id: '1',
              name: '综合排序',
            },
            {
              id: '2',
              name: '最新发布',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '价格从低到高',
            },
          ],
        },
      ]
      res.forEach((item) => {
        if (item.title === '地区') {
          item.componentName = 'AreaFilter'
        } else if (item.title === '价格') {
          item.componentName = 'PriceFilter'
        } else if (item.title === '排序') {
          item.componentName = 'SortFilter'
        } else if (item.title === '更多') {
          item.componentName = 'MoreFilter'
        } else {
          item.componentName = 'SelectFilter'
        }
      })
      this.filters = res
    },
  },
}
</script>

<style lang="less" scoped></style>
