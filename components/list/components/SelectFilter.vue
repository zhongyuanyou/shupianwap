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
        maxHeight: contentMaxHeight,
      }"
    >
      <select-check-box
        ref="selectCheckBox"
        :is-show-all-option="false"
        :select-list="selectList"
        :gutter="12"
        :is-show-all="true"
        :is-select-more="isSelectMore"
        :self-active-item="activeItems"
        :col-span="isShowLowLine ? 8 : 6"
        :line-length="isShowLowLine ? 3 : 4"
        @selectItems="selectItems"
        @isShowBtnHandle="isShowBtnHandle"
      />
    </div>
    <BottomConfirm
      v-if="isSelectMore"
      @resetFilters="resetFilters"
      @confirmFilters="confirmFilters"
      @bottomConfirmHeight="getBottomConfirmHeight"
    />
  </sp-dropdown-item>
</template>

<script>
import { DropdownItem } from '@chipspc/vant-dgg'
import SelectCheckBox from '@/components/common/filters/SelectCheckBox'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'
import addRemoveClass from '@/mixins/addRemoveClass'
export default {
  name: 'SelectFilter',
  components: {
    [DropdownItem.name]: DropdownItem,
    SelectCheckBox,
    BottomConfirm,
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
      // 中间筛选项的最大高度
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
      selectList: [],
      selectCheckBoxVue: null, // 筛选栏的实例
      activeItems: [], // 默认激活的
      saveActiveItems: [], // 存储的筛选项数据
      contentMaxHeight: 0, // 内容的最大高
      lowLineCode: [],
    }
  },
  computed: {
    isShowLowLine() {
      // 一行筛选行是否只显示三个筛选项
      const _index = this.lowLineCode.indexOf(this.filterData.code)
      if (_index > -1) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    activeItems(val) {
      const arr = val
      if (arr.length === 1) {
        this.dropdownTitle = arr[0].name
        this.addClass('active')
      } else if (arr.length > 1) {
        this.dropdownTitle = '多选'
        this.addClass('active')
      } else if (arr.length === 0) {
        this.removeClass('moreText')
        this.removeClass('active')
        this.dropdownTitle = this.filterData.name
      }
      // 如果筛选名字个数超过了4个那么需要加样式
      if (this.dropdownTitle.length >= 4) {
        this.addClass('moreText')
      } else {
        this.removeClass('moreText')
      }
    },
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.dropdownTitle = val.name
        this.selectList = val.filters ? val.filters : []
        this.isSelectMore = val.isSelects
        if (!this.isSelectMore) {
          this.getBottomConfirmHeight(0)
        }
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.name
      this.selectList = this.filterData.children ? this.filterData.children : []
      this.isSelectMore = this.filterData.isSelects
      if (!this.isSelectMore) {
        this.getBottomConfirmHeight(0)
      }
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
      this.selectCheckBoxVue && this.selectCheckBoxVue.clearSelect()
      this.activeItems = []
    },
    confirmFilters() {
      // 确认筛选
      this.saveActiveItems = clone(this.activeItems, true)
      const emitData = this.resultHandle()
      this.$emit('activeItem', emitData, 'selectFilter-' + this.filterData.code)
      this.$refs.item.toggle()
    },
    resultHandle() {
      // 处理结果
      const fieldCode =
        this.filterData.ext3 === '1'
          ? this.filterData.ext1
          : this.activeItems[0].ext1
      let emitData = {
        fieldCode,
        fieldValue: [],
        matchType: 'MATCH_TYPE_MULTI',
      }
      if (this.activeItems.length && this.activeItems[0].name === '不限') {
        emitData = ''
      } else if (this.activeItems.length) {
        // 如果该筛选项是产品分类查询出来的，value需要取code，如果不是则需要取ext2
        const _flag = this.filterData.ext3 === '1'
        // 资质下面的类别需要code筛选才能筛选出数据，而其他业态下面的分类需要name字段进行筛选
        const keyStr =
          this.filterData.code === 'CONDITION-JY-ZZ-LB'
            ? 'code'
            : _flag
            ? 'name'
            : 'ext2'
        this.activeItems.forEach((item) => {
          emitData.fieldValue.push(item[keyStr])
        })
      } else {
        emitData = ''
      }
      return emitData
    },
    getBottomConfirmHeight(height) {
      // 获取底部确认按钮的高度
      this.contentMaxHeight = this.filterMaxHeight - height + 'px'
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
