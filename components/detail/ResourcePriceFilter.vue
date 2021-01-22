<!--
 * @Author: xiao pu
 * @Date: 2021-01-21 18:37:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-22 15:37:49
 * @Description: file content
 * @FilePath: /chips-wap/components/detail/ResourcePriceFilter.vue
-->
<template>
  <sp-dropdown-item
    ref="item"
    :title-class="moreTextCss"
    :title="dropdownTitle"
    @open="open"
    @close="close"
  >
    <div class="price-content">
      <price-filter-components
        :price-list="selectList"
        :echo-data="echoData"
        :is-show-all-option="false"
        @minInput="minInput"
        @maxInput="maxInput"
        @selectItems="selectItems"
        @emitSelf="getPriceFilterVue"
      />
    </div>
    <BottomConfirm
      @resetFilters="resetFilters"
      @confirmFilters="confirmFilters"
      @bottomConfirmHeight="getBottomConfirmHeight"
    />
  </sp-dropdown-item>
</template>

<script>
import { DropdownItem } from '@chipspc/vant-dgg'
import PriceFilterComponents from '@/components/common/filters/PriceFilterComponents'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '@/utils/clone'
import addRemoveClass from '@/mixins/addRemoveClass'
export default {
  name: 'ResourcePriceFilter',
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
    filterMaxHeight: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      moreTextCss: '', // 用来控制样式的显示
      dropdownTitle: '',
      isSelectMore: false,
      selectList: [], // 展示筛选数据
      priceComponent: null, // 价格组件实例对象
      // 需要回显的数据
      echoData: {
        minValue: '',
        maxValue: '',
        activeItems: [],
      },
      // 存储的回显数据
      saveEchoData: {
        minValue: '',
        maxValue: '',
        activeItems: [],
      },
    }
  },
  watch: {
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.dropdownTitle = val.name
        this.selectList = val.children
        this.isSelectMore = val.isSelects
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.name
      this.selectList = this.filterData.children
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
      console.log(val)
      this.echoData.minValue = val
      this.echoData.activeItems = []
    },
    maxInput(val) {
      this.echoData.maxValue = val
      this.echoData.activeItems = []
    },
    selectItems(item, items) {
      this.echoData.activeItems = items
      this.echoData.minValue = ''
      this.echoData.maxValue = ''
    },
    resetFilters() {
      this.priceComponent && this.priceComponent.clearInput()
      this.echoData.activeItems = []
      this.echoData.maxValue = ''
      this.echoData.minValue = ''
    },
    confirmFilters() {
      const emitData = this.resultHandle()
      this.saveEchoData = clone(this.echoData, true)
      this.handlePriceTitle(this.echoData)
      this.$emit('activeItem', emitData)
      this.$refs.item.toggle()
    },
    resultHandle() {
      // 处理结果
      const emitData = {
        fieldValue: {
          start: '',
          end: '',
        },
        matchType: 'MATCH_PRICE_RANGE',
      }
      if (this.echoData.maxValue || this.echoData.minValue) {
        // 如果输入框有值
        emitData.fieldValue.start = Number(this.echoData.minValue) * 100
        emitData.fieldValue.end = Number(this.echoData.maxValue) * 100
        if (
          this.echoData.maxValue !== '' &&
          emitData.fieldValue.start > emitData.fieldValue.end
        ) {
          ;[emitData.fieldValue.start, emitData.fieldValue.end] = [
            emitData.fieldValue.end,
            emitData.fieldValue.start,
          ]
          // 将页面显示的输入框调整为最小和最大的显示
          this.echoData.minValue = emitData.fieldValue.start / 100
          this.echoData.maxValue = emitData.fieldValue.end / 100
          this.priceComponent.setPrice(
            emitData.fieldValue.start / 100,
            emitData.fieldValue.end / 100
          )
        }
      } else if (this.echoData.activeItems.length) {
        emitData.fieldValue.start = Number(this.echoData.activeItems[0].ext1)
        emitData.fieldValue.end = Number(this.echoData.activeItems[0].ext2)
      }
      return emitData
    },
    handlePriceTitle(val) {
      // 处理价格的title
      const minValue = val.minValue
      const maxValue = val.maxValue
      const activeItems = val.activeItems
      if (activeItems.length) {
        if (activeItems[0].name === '不限') {
          this.dropdownTitle = this.filterData.name
          this.removeClass('dropdown__menu-bar--active')
        } else {
          this.dropdownTitle = activeItems[0].name
          this.addClass('dropdown__menu-bar--active')
        }
      } else if (activeItems.length === 0 && (minValue || maxValue)) {
        this.dropdownTitle = Number(minValue) + '元-' + Number(maxValue) + '元'
        this.addClass('dropdown__menu-bar--active')
      } else {
        this.dropdownTitle = this.filterData.name
        this.removeClass('dropdown__menu-bar--active')
      }
    },
    // 获取底部确认按钮的高度
    getBottomConfirmHeight(height) {},
  },
}
</script>

<style lang="less" scoped>
.price-content {
  width: 100%;
  padding: 50px 40px 54px 40px;
}
</style>
