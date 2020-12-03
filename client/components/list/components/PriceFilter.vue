<template>
  <sp-dropdown-item
    ref="item"
    :title-class="moreTextCss"
    :title="dropdownTitle"
    @open="open"
    @close="close"
  >
    <div
      class="price-content"
      :style="{
        maxHeight: maxHeight,
      }"
    >
      <price-filter-components
        :price-list="selectList"
        :echo-data="echoData"
        @minInput="minInput"
        @maxInput="maxInput"
        @selectItems="selectItems"
        @emitSelf="getPriceFilterVue"
      />
    </div>
    <BottomConfirm
      @resetFilters="resetFilters"
      @confirmFilters="confirmFilters"
    />
  </sp-dropdown-item>
</template>

<script>
import { DropdownItem } from '@chipspc/vant-dgg'
import PriceFilterComponents from '@/components/common/filters/PriceFilterComponents'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'
import addRemoveClass from '@/mixins/addRemoveClass'
export default {
  name: 'PriceFilter',
  components: {
    [DropdownItem.name]: DropdownItem,
    BottomConfirm,
    PriceFilterComponents,
  },
  mixins: [addRemoveClass],
  props: {
    filterData: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      moreTextCss: 'jyDropdownFilter', // 用来控制样式的显示
      dropdownTitle: '',
      isSelectMore: false,
      selectList: [], // 展示筛选数据
      priceComponent: null, // 价格组件实例对象
      minValue: '',
      maxValue: '',
      echoData: {
        minValue: '',
        maxValue: '',
        activeItems: [],
      }, // 需要回显的数据
      saveEchoData: {
        minValue: '',
        maxValue: '',
        activeItems: [],
      }, // 存储的回显数据
    }
  },
  computed: {
    maxHeight() {
      let height = parseInt(this.$parent.$parent.$parent.maxHeight)
      height = height + 44 - 80
      height += 'px'
      return height
    },
  },
  watch: {
    echoData: {
      deep: true,
      handler(val) {
        const minValue = val.minValue
        const maxValue = val.maxValue
        const activeItems = val.activeItems
        if (activeItems.length) {
          this.dropdownTitle = activeItems[0].name
          this.addClass('active')
        } else if (activeItems.length === 0 && (minValue || maxValue)) {
          this.dropdownTitle = Number(minValue) + '-' + Number(maxValue)
          this.addClass('active')
        } else {
          this.dropdownTitle = this.filterData.title
          this.removeClass('moreText')
          this.removeClass('active')
        }
        // 如果筛选名字个数超过了4个那么需要加样式
        /* if (this.dropdownTitle.length >= 4) {
          this.addClass('moreText')
        } else {
          this.removeClass('moreText')
        } */
      },
    },
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.dropdownTitle = val.title
        this.selectList = val.filters
        this.isSelectMore = val.isSelects
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.title
      this.selectList = this.filterData.filters
      this.isSelectMore = this.filterData.isSelects
    }
  },
  methods: {
    getPriceFilterVue(ref) {
      this.priceComponent = ref
    },
    open() {},
    close() {
      this.echoData = clone(this.saveEchoData, true)
    },
    minInput(val) {
      // this.minValue = val
      console.log(val)
      this.echoData.minValue = val
      this.echoData.activeItems = []
    },
    maxInput(val) {
      // this.maxValue = val
      this.echoData.maxValue = val
      this.echoData.activeItems = []
    },
    selectItems(item, items) {
      // console.log(item, items)
      this.echoData.activeItems = items
      this.echoData.minValue = ''
      this.echoData.maxValue = ''
    },
    resetFilters() {
      this.priceComponent.clearInput()
      this.echoData.activeItems = []
      this.echoData.maxValue = ''
      this.echoData.minValue = ''
    },
    confirmFilters() {
      this.saveEchoData = clone(this.echoData, true)
      this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.price-content {
  width: 100%;
  padding: 50px 40px 54px 40px;
  border-bottom: 1px solid #cdcdcd;
}
</style>
