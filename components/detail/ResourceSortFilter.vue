<!--
 * @Author: xiao pu
 * @Date: 2021-01-22 14:56:09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-22 15:46:04
 * @Description: file content
 * @FilePath: /chips-wap/components/detail/ResourceSortFilter.vue
-->
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
          <sp-icon
            v-show="isActive(item)"
            class-prefix="spiconfont"
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
import { DropdownItem, Cell, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'SortFilter',
  components: {
    [DropdownItem.name]: DropdownItem,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
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
      const { id, name } = item || {}
      return id === this.selectValue.id
    },
    selectCell(item, index) {
      this.selectValue = item
      this.$emit('activeItem', this.selectValue, 'sortFilter')
      this.dropdownTitle = this.selectValue.name

      const { id: firstOptionId } = this.option[0] || {}
      this.moreTextCss =
        firstOptionId !== item.id ? 'dropdown__menu-bar--active' : ''

      this.$refs.item.toggle()
    },
    initOption(data) {
      const { children, name } = data || {}
      this.dropdownTitle = name
      let option = []
      if (Array.isArray(children)) {
        option = children.map((item) => ({ ...item }))
      }
      this.option = option
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
