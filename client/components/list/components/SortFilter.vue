<template>
  <sp-dropdown-item
    ref="item"
    :title="dropdownTitle"
    :title-class="moreTextCss"
    @open="open"
    @close="close"
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
          ></my-icon>
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
      moreTextCss: 'jyDropdownFilter active',
      dropdownTitle: '',
      selectValue: null,
      option: [],
      sortfilterDom: null,
    }
  },
  watch: {
    selectValue(val) {
      if (val) {
        this.dropdownTitle = val.name
        // 如果文字大于4个字需要添加样式
        if (val.name.length >= 4) {
          this.moreTextCss.indexOf('moreText') === -1 &&
            (this.moreTextCss += ' moreText')
        } else {
          this.moreTextCss = this.moreTextCss.split(' ').splice(0, 2).join(' ')
        }
      }
    },
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.initOption(val)
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.initOption(this.filterData)
    }
  },
  methods: {
    open() {
      if (this.sortfilterDom) {
        this.sortfilterDom = document.querySelector('.sortfilter')
      }
    },
    close() {},
    isActive(item) {
      return item.id === this.selectValue.id
    },
    selectCell(item, index) {
      // console.log(item, index)
      this.selectValue = item
      this.$refs.item.toggle()
    },
    initOption(data) {
      this.dropdownTitle = data.title
      this.option = data.filters
      this.selectValue = this.option[0]
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
