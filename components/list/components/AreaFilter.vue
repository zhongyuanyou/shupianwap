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
        ref="area"
        :city-data="filterData.children"
        :back-data="activeItems"
        @select="coupleSelect"
        @initThis="getCoupleSelectVue"
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
        return {}
      },
    },
  },
  data() {
    return {
      moreTextCss: 'jyDropdownFilter',
      dropdownTitle: '',
      activeItems: [], // 默认激活的
      saveActiveItems: [], // 存储的筛选项数据
      coupleSelectVue: null, // 地区筛选的组件
      isOne: true,
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
      // const arr = val
      // if (val.length === 0) {
      //   this.removeClass('moreText')
      //   this.removeClass('active')
      //   this.dropdownTitle = this.filterData.name
      // } else if (arr[2].regions.length === 0) {
      //   this.dropdownTitle = arr[0].name + '-' + arr[1].name
      //   this.addClass('active')
      // } else if (arr[2].regions.length === 1) {
      //   this.dropdownTitle =
      //     arr[0].name + '-' + arr[1].name + arr[2].regions.name
      //   this.addClass('active')
      // } else if (arr[2].regions.length > 1) {
      //   this.dropdownTitle = '多选'
      //   this.addClass('active')
      // }
      // 如果筛选名字个数超过了4个那么需要加样式
      /* if (this.dropdownTitle.length >= 4) {
        this.addClass('moreText')
      } else {
        this.removeClass('moreText')
      } */
    },
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.dropdownTitle = val.name
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.name
    }
  },
  methods: {
    coupleSelect(item) {
      // 选择项
      // console.log(item)
      item.forEach((_item, index) => {
        this.$set(this.activeItems, index, _item)
      })
    },
    // 递归查询数组
    getObjById(list, id) {
      // 遍历数组
      for (const i in list) {
        const item = list[i]
        if (item.code === id) {
          return item
        } else {
          console.log(1)
          // 查不到继续遍历
          if (item.children) {
            const value = this.getObjById(item.children, id)
            // 查询到直接返回
            if (value) {
              return value
            }
          }
        }
      }
    },
    open() {
      if (
        this.$parent.$parent.$parent.$parent.$parent.$parent.classCode1 &&
        this.$parent.$parent.$parent.$parent.$parent.$parent.classCode1.area &&
        this.isOne
      ) {
        this.$nextTick(() => {
          for (let i = 0; i < this.filterData.children.length; i++) {
            if (
              this.$parent.$parent.$parent.$parent.$parent.$parent.classCode1
                .area === this.filterData.children[i].code
            ) {
              this.$refs.area.handleProvince(this.filterData.children[i], i)
              break
            } else if (this.filterData.children[i].children.length > 0) {
              for (
                let a = 0;
                a < this.filterData.children[i].children.length;
                a++
              ) {
                if (
                  this.$parent.$parent.$parent.$parent.$parent.$parent
                    .classCode1.area ===
                  this.filterData.children[i].children[a].code
                ) {
                  this.$refs.area.handleProvince(this.filterData.children[i], i)
                  this.$refs.area.handleCity(
                    this.filterData.children[i].children[a],
                    a
                  )
                  break
                } else if (
                  this.filterData.children[i].children[a].children.length > 0
                ) {
                  for (
                    let b = 0;
                    b < this.filterData.children[i].children[a].children.length;
                    b++
                  ) {
                    if (
                      this.$parent.$parent.$parent.$parent.$parent.$parent
                        .classCode1.area ===
                      this.filterData.children[i].children[a].children[b].code
                    ) {
                      this.$refs.area.handleProvince(
                        this.filterData.children[i],
                        i
                      )
                      this.$refs.area.handleCity(
                        this.filterData.children[i].children[a],
                        a
                      )
                      this.$refs.area.handleRegion(
                        this.filterData.children[i].children[a].children[b + 1],
                        b + 1
                      )
                      break
                    }
                  }
                }
              }
            }
          }
          // const val = this.getObjById(
          //   this.filterData.children,
          //   this.$parent.$parent.$parent.$parent.$parent.$parent.classCode1.area
          // )
        })
      }

      this.isOne = false
    },
    close() {
      this.activeItems = clone(this.saveActiveItems, true)
    },
    resetFilters() {
      this.activeItems = []
      this.coupleSelectVue && this.coupleSelectVue.clear()
    },
    confirmFilters() {
      const pcode = this.filterData.pcode
      const emitData1 = this.resultHandle()
      if (
        this.$parent.$parent.$parent.$parent.$parent.$parent.formData[pcode] &&
        this.$parent.$parent.$parent.$parent.$parent.$parent.formData[pcode]
          .fieldList.length > 0
      ) {
        for (
          let i = 0;
          i <
          this.$parent.$parent.$parent.$parent.$parent.$parent.formData[pcode]
            .fieldList.length;
          i++
        ) {
          if (
            emitData1.fieldCode ===
            this.$parent.$parent.$parent.$parent.$parent.$parent.formData[pcode]
              .fieldList[i].fieldCode
          ) {
            console.log(111)
            this.$parent.$parent.$parent.$parent.$parent.$parent.formData[
              pcode
            ].fieldList = this.$parent.$parent.$parent.$parent.$parent.$parent.formData[
              pcode
            ].fieldList.splice(i, 0)
          }
        }
      }
      // 确认筛选
      this.saveActiveItems = clone(this.activeItems, true)
      const emitData = this.resultHandle()
      this.handleAreaTitle(this.activeItems)
      this.$emit('activeItem', emitData, 'areaFilter-' + this.filterData.code)
      this.$refs.item.toggle()
    },
    resultHandle() {
      // 处理结果
      let emitData = {
        fieldCode: 'registration_area',
        fieldValue: [],
        matchType: 'MATCH_TYPE_MULTI',
      }
      if (this.activeItems.length === 0) {
        // 当没有选中的筛选项的时候
        emitData = ''
      } else if (this.activeItems[0].name === '全国') {
        // 当省级为全国时，就不必去对地区进行筛选搜索
        emitData = ''
      } else if (this.activeItems[1].name === '不限') {
        // 当市级为不限时，直接将省级code给筛选项
        emitData.fieldValue.push(this.activeItems[0].code)
      } else if (
        this.activeItems[2].regions.length &&
        this.activeItems[2].regions[0].name === '不限'
      ) {
        // 当区级为不限时，直接将市级code给筛选项
        emitData.fieldValue.push(this.activeItems[1].code)
      } else if (this.activeItems[2].regions.length) {
        this.activeItems[2].regions.forEach((item) => {
          emitData.fieldValue.push(item.code)
        })
      } else {
        emitData = ''
      }
      return emitData
    },
    handleAreaTitle(val) {
      // 处理地区的title
      const arr = val
      if (val.length === 0) {
        this.removeClass('moreText')
        this.removeClass('active')
        this.dropdownTitle = this.filterData.name
      } else if (arr[1].name === '不限') {
        this.dropdownTitle = arr[0].name
        this.addClass('active')
      } else if (arr[2].regions.length && arr[2].regions[0].name === '不限') {
        this.dropdownTitle = arr[1].name
        this.addClass('active')
      } else if (
        arr[2].regions.length === 1 &&
        arr[2].regions[0].name !== '不限'
      ) {
        this.dropdownTitle = arr[2].regions[0].name
        this.addClass('active')
      } else if (arr[2].regions.length > 1) {
        this.dropdownTitle = '多选'
        this.addClass('active')
      }
    },
    getCoupleSelectVue(_this) {
      this.coupleSelectVue = _this
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
