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
        maxHeight: contentMaxHeight,
      }"
    >
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
    filterMaxHeight: {
      type: Number,
      default() {
        return 0
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
      contentMaxHeight: 0,
    }
  },
  watch: {
    // echoData: {
    //   deep: true,
    //   handler(val) {
    //     const minValue = val.minValue
    //     const maxValue = val.maxValue
    //     const activeItems = val.activeItems
    //     if (activeItems.length) {
    //       this.dropdownTitle = activeItems[0].name
    //       this.addClass('active')
    //     } else if (activeItems.length === 0 && (minValue || maxValue)) {
    //       this.dropdownTitle = Number(minValue) + '-' + Number(maxValue)
    //       this.addClass('active')
    //     } else {
    //       this.dropdownTitle = this.filterData.name
    //       this.removeClass('moreText')
    //       this.removeClass('active')
    //     }
    //     // 如果筛选名字个数超过了4个那么需要加样式
    //     /* if (this.dropdownTitle.length >= 4) {
    //       this.addClass('moreText')
    //     } else {
    //       this.removeClass('moreText')
    //     } */
    //   },
    // },
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
      // this.echoData = clone(this.saveEchoData, true)
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
      this.priceComponent && this.priceComponent.clearInput()
      this.echoData.activeItems = []
      this.echoData.maxValue = ''
      this.echoData.minValue = ''
    },
    confirmFilters() {
      this.saveEchoData = clone(this.echoData, true)
      const emitData = this.resultHandle()
      this.handlePriceTitle(this.echoData)
      this.$emit('activeItem', emitData, 'priceFilter-' + this.filterData.code)
      this.$refs.item.toggle()
    },
    resultHandle() {
      // 处理结果
      const emitData = {
        fieldCode: this.filterData.children[0].ext1,
        fieldValue: {
          start: '',
          end: '',
        },
        matchType: 'MATCH_TYPE_RANGE',
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
        emitData.fieldValue.start = Number(
          this.echoData.activeItems[0].ext2.split('-')[0]
        )
        emitData.fieldValue.end = Number(
          this.echoData.activeItems[0].ext2.split('-')[1]
        )
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
          this.removeClass('moreText')
          this.removeClass('active')
        } else {
          this.dropdownTitle = activeItems[0].name
          this.addClass('active')
        }
      } else if (activeItems.length === 0 && (minValue || maxValue)) {
        this.dropdownTitle = Number(minValue) + '元-' + Number(maxValue) + '元'
        this.addClass('active')
      } else {
        this.dropdownTitle = this.filterData.name
        this.removeClass('moreText')
        this.removeClass('active')
      }
    },
    getBottomConfirmHeight(height) {
      // 获取底部确认按钮的高度
      this.contentMaxHeight = this.filterMaxHeight - height + 'px'
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
