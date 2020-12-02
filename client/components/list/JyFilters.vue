<template>
  <sp-dropdown-menu>
    <!--<sp-dropdown-item
      ref="item"
      title-class="dropdownItem"
      :title="dropdownTitle1"
      @open="open(0)"
      @close="close(0)"
    >
      <ServiceSelect :active-data="activeData" @select="handleSelect" />
      <BottomConfirm
        @resetFilters="resetFilters"
        @confirmFilters="confirmFilters"
      />
    </sp-dropdown-item>
    <sp-dropdown-item
      v-model="selectValue"
      :title="dropdownTitle2"
      title-class="dropdownItem"
      :options="option"
      @open="open(1)"
      @close="close(1)"
    />-->
    <!--<SelectFilter />-->
    <component
      :is="item.componentName"
      v-for="(item, index) in filters"
      :key="index"
      :filter-data="item"
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
      dropDownDom: null,
      currentSelectActiveData: null,
      currentDropDownDom: null, // 当前触发的下拉框dom
    }
  },
  watch: {},
  mounted() {
    this.getFiterData()
    this.$nextTick(() => {
      this.dropDownDom = [].slice.call(
        document.querySelectorAll('.dropdownItem')
      )
    })
  },
  methods: {
    handleSelect(val) {
      // 分类选择
      console.log(val)
      this.activeData = val
      // this.currentSelectActiveData = val
    },
    open(index) {
      // 打开下拉选择框
      console.log('open', index)
      if (index === 0) {
        this.currentSelectActiveData = this.activeData
      }
    },
    close(index) {
      console.log(123)
      // 关闭下拉选择框
      if (index === 1 && this.selectValue !== 0) {
        // 给下拉标题增加选中
        this.dropDownDom[1].classList.add('active')
      } else {
        this.dropDownDom[1].classList.remove('active')
      }
      if (index === 0) {
        this.activeData = this.currentSelectActiveData
        this.currentSelectActiveData = null
        if (this.activeData.length) {
          this.dropDownDom[0].classList.add('active')
        } else {
          this.dropDownDom[0].classList.remove('active')
        }
      }
    },
    resetFilters() {
      // 重置分类筛选
      this.activeData = []
    },
    confirmFilters() {
      // 确认筛选
      console.log('this.activeData', this.activeData)
      if (this.activeData && this.activeData.length) {
        this.currentSelectActiveData = this.activeData
        this.concatStr(this.activeData)
      } else {
        this.dropdownTitle1 = '全部服务'
      }
      this.$refs.item.toggle()
    },
    concatStr(val) {
      if (val[1] && val[1].services && val[1].services.length > 1) {
        this.dropdownTitle1 = '多选'
      } else if (val[1] && val[1].services && val[1].services.length === 1) {
        this.dropdownTitle1 = val[1].services[0].text
      }
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
          title: '行业3',
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
