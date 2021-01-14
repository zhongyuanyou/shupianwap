<template>
  <sp-dropdown-item
    ref="item"
    :title="dropdownTitle"
    :title-class="moreTextCss"
  >
    <div class="sort-content">
      <sp-cell
        v-for="(item, index) in option"
        :key="index"
        :title="item.name"
        :class="{
          active: isActive(item),
        }"
        @click="selectCell(item, index)"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <my-icon
            v-show="isActive(item)"
            name="tab_ic_check"
            size="0.22rem"
            color="#4974f5"
          />
        </template>
      </sp-cell>
    </div>
  </sp-dropdown-item>
</template>

<script>
import { DropdownItem, Cell } from '@chipspc/vant-dgg'
export default {
  name: 'SortFilter',
  components: {
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
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
      moreTextCss: 'jyDropdownFilter',
      dropdownTitle: '',
      selectValue: {},
      option: [],
      sortfilterDom: null,
    }
  },
  watch: {
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.initOption(val)
        this.selectValue = this.option[0]
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.initOption(this.filterData)
      this.selectValue = this.option[0]
    }
  },
  methods: {
    isActive(item) {
      return item.id === this.selectValue.id
    },
    selectCell(item, index) {
      // console.log(item, index)
      this.selectValue = item
      this.$emit('activeItem', this.selectValue, 'sortFilter')
      this.dropdownTitle = this.selectValue.name
      this.moreTextCss = 'jyDropdownFilter active'
      this.$refs.item.toggle()
    },
    initOption(data) {
      this.dropdownTitle = data.name
      const arr = []
      data.children.forEach((item, _index) => {
        arr.push({
          name: item.name,
          id: _index + 1,
        })
      })
      this.option = arr
      // this.selectValue = this.option[0]
    },
    resetFilters() {
      // 重置筛选项
      this.dropdownTitle = this.filterData.name
      this.selectValue = {}
      this.moreTextCss = 'jyDropdownFilter'
    },
  },
}
</script>

<style lang="less" scoped>
.sort-content {
  .sp-cell {
    padding: 18px 40px;
    &::after {
      display: none;
    }
    &:last-child {
      margin-bottom: 40px;
    }
    &.active {
      font-weight: bold;
      color: #4974f5;
    }
  }
}
</style>
