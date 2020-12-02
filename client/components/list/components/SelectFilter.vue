<template>
  <sp-dropdown-item
    ref="item"
    :title-class="moreTextCss"
    :title="dropdownTitle"
    @open="open"
    @close="close"
  >
    <div
      class="select-content"
      :style="{
        maxHeight: maxHeight,
      }"
    >
      <select-check-box
        ref="selectCheckBox"
        :select-list="selectList"
        :gutter="12"
        :is-show-all="true"
        :is-select-more="isSelectMore"
        :self-active-item="activeItems"
        @selectItems="selectItems"
        @isShowBtnHandle="isShowBtnHandle"
      />
    </div>
    <BottomConfirm
      v-if="isSelectMore"
      @resetFilters="resetFilters"
      @confirmFilters="confirmFilters"
    />
  </sp-dropdown-item>
</template>

<script>
import { DropdownItem } from '@chipspc/vant-dgg'
import SelectCheckBox from '@/components/common/filters/SelectCheckBox'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'
export default {
  name: 'SelectFilter',
  components: {
    [DropdownItem.name]: DropdownItem,
    SelectCheckBox,
    BottomConfirm,
  },
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
      moreTextCss: '', // 用来控制样式的显示
      dropdownTitle: '',
      isSelectMore: false,
      selectList: [],
      selectCheckBoxVue: null, // 筛选栏的实例
      activeItems: [], // 默认激活的
      saveActiveItems: [], // 存储的筛选项数据
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
    open() {},
    close() {
      this.activeItems = clone(this.saveActiveItems, true)
    },
    isShowBtnHandle(_flag, _this) {
      this.selectCheckBoxVue = _this
    },
    selectItems(item, items) {
      // console.log(item, items)
      this.activeItems = items
      if (!this.filterData.isSelects) {
        // 当该筛选框是单选时，点选了某个筛选项时，需要关闭筛选框
        this.confirmFilters()
      }
    },
    resetFilters() {
      this.selectCheckBoxVue.clearSelect()
      this.activeItems = []
    },
    confirmFilters() {
      // 确认筛选
      this.saveActiveItems = clone(this.activeItems, true)
      this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.select-content {
  padding: 54px 40px;
  border-bottom: 1px solid rgba(205, 205, 205, 1);
  overflow-x: hidden;
  overflow-y: scroll;
}
/deep/.sp-dropdown-item__content {
  max-height: 100%;
}
</style>
