<template>
  <sp-dropdown-item
    ref="item"
    :title-class="moreTextCss"
    :title="dropdownTitle"
    @open="open"
    @close="close"
  >
    <div
      class="more-content"
      :style="{
        maxHeight: maxHeight,
      }"
    >
      <div class="more-item">
        <div class="more-item__title">
          <h2>行业类型</h2>
          <span
            >全部<my-icon
              name="tab_ic_all_n"
              size="0.56rem"
              color="rgba(0, 0, 0, 0.4)"
            ></my-icon
          ></span>
          <select-check-box
            ref="selectCheckBox"
            :select-list="selectList"
            :gutter="12"
            :is-show-all="true"
            :is-select-more="isSelectMore"
            @cancelItem="cancelItem"
            @selectItems="selectItems"
            @selectAllItems="selectAllItems"
          />
        </div>
      </div>
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
export default {
  name: 'MoreFilter',
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
      moreTextCss: '',
      dropdownTitle: '',
      isSelectMore: false,
      selectList: [],
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
        // this.selectList = [
        //   {
        //     id: '1',
        //     name: '科技信息',
        //   },
        //   {
        //     id: '2',
        //     name: '科技信息',
        //   },
        //   {
        //     id: '3',
        //     name: '科技信息',
        //   },
        //   {
        //     id: '4',
        //     name: '科技信息',
        //   },
        //   {
        //     id: '5',
        //     name: '科技信息',
        //   },
        //   {
        //     id: '6',
        //     name: '科技信息',
        //   },
        //   {
        //     id: '7',
        //     name: '科技信息',
        //   },
        // ]
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
    close() {},
    cancelItem() {},
    selectItems(item, items) {
      console.log(item, items)
    },
    selectAllItems() {},
    resetFilters() {
      this.$refs.selectCheckBox.clearSelect()
    },
    confirmFilters() {},
  },
}
</script>

<style lang="less" scoped>
.more-content {
  padding: 56px 40px;
}
</style>
