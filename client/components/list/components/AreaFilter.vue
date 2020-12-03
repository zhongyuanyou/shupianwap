<template>
  <sp-dropdown-item
    ref="item"
    :title-class="moreTextCss"
    :title="dropdownTitle"
    @open="open"
    @close="close"
  >
    <div
      class="area-content"
      :style="{
        maxHeight: maxHeight,
      }"
    >
      <couple-select
        :city-data="city"
        :back-data="activeItems"
        @select="coupleSelect"
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
import CoupleSelect from '~/components/common/coupleSelected/CoupleSelect'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import { city } from '~/utils/city'
import clone from '~/utils/clone'
import addRemoveClass from '@/mixins/addRemoveClass'
export default {
  name: 'AreaFilter',
  components: {
    CoupleSelect,
    [DropdownItem.name]: DropdownItem,
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
  },
  data() {
    return {
      city,
      moreTextCss: 'jyDropdownFilter',
      dropdownTitle: '',
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
    activeItems(val) {
      const arr = val
      if (val.length === 0) {
        this.removeClass('moreText')
        this.removeClass('active')
        this.dropdownTitle = this.filterData.title
      } else if (arr[2].regions.length === 0) {
        this.dropdownTitle = arr[0].name + '-' + arr[1].name
        this.addClass('active')
      } else if (arr[2].regions.length === 1) {
        this.dropdownTitle =
          arr[0].name + '-' + arr[1].name + arr[2].regions.name
        this.addClass('active')
      } else if (arr[2].regions.length > 1) {
        this.dropdownTitle = '多选'
        this.addClass('active')
      }
      // 如果筛选名字个数超过了4个那么需要加样式
      /* if (this.dropdownTitle.length >= 4) {
        this.addClass('moreText')
      } else {
        this.removeClass('moreText')
      } */
    },
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.dropdownTitle = val.title
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.title
    }
  },
  methods: {
    coupleSelect(item) {
      // 选择项
      console.log(item)
      item.forEach((_item, index) => {
        this.$set(this.activeItems, index, _item)
      })
    },
    open() {},
    close() {
      this.activeItems = clone(this.saveActiveItems, true)
    },
    resetFilters() {
      this.activeItems = []
    },
    confirmFilters() {
      // 确认筛选
      this.saveActiveItems = clone(this.activeItems, true)
      this.$emit('activeItem', this.activeItems, 'areaFilter')
      this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.area-content {
  overflow-x: hidden;
  overflow-y: scroll;
  .couple {
    min-height: 533px;
    max-height: 533px;
  }
}
.bottom-confirm {
  border-top: 1px solid #cdcdcd;
}
</style>
