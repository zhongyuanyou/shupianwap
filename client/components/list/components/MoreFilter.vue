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
      <div v-for="(item, index) in children" :key="index" class="more-item">
        <div class="more-item__title">
          <h2>{{ item.title }}</h2>
          <div v-if="isShowBtn[index]" @click="showAllList(index)">
            全部
            <div
              :class="{
                show_all: selectBoxVue[index].selfIsShowAll,
              }"
            >
              <my-icon
                name="tab_ic_all_n"
                size="0.16rem"
                color="#4974f5"
              ></my-icon>
            </div>
          </div>
        </div>
        <select-check-box
          :select-list="item.filters"
          :gutter="12"
          :is-select-more="item.isSelects"
          :self-active-item="activeItems[index]"
          @isShowBtnHandle="
            (_flag, _this) => {
              isShowBtnHandle(_flag, index, _this)
            }
          "
          @selectItems="
            (_item, _items) => {
              selectItems(_item, _items, index)
            }
          "
        />
      </div>
    </div>
    <BottomConfirm
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
      children: [
        {
          title: '行业类型',
          filters: [
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
          ],
          isSelects: false,
        },
        {
          title: '行业类型2',
          filters: [
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
          ],
          isSelects: true,
        },
        {
          title: '行业类型3',
          filters: [
            {
              id: '1',
              name: '科技信息',
            },
            {
              id: '2',
              name: '科技信息',
            },
            {
              id: '3',
              name: '科技信息',
            },
            {
              id: '4',
              name: '科技信息',
            },
            {
              id: '5',
              name: '科技信息',
            },
            {
              id: '6',
              name: '科技信息',
            },
            {
              id: '7',
              name: '科技信息',
            },
          ],
          isSelects: false,
        },
      ],
      isShowBtn: [], // 对应的筛选栏是否显示全部按钮
      selectBoxVue: [], // 存储所有的选择栏vue实例
      selectValueArray: [], // 所选择的数据
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
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.title
      // this.selectList = this.filterData.filters
    }
  },
  methods: {
    isShowBtnHandle(_flag, index, _this) {
      // 保存选择框对象实例
      this.$set(this.isShowBtn, index, _flag)
      // 由于不是根结点无法通过$refs去获取筛选框实例，这里通过内部抛出this来获取
      this.$set(this.selectBoxVue, index, _this)
      // 初始化所有的默认激活筛选栏数据
      this.$set(this.activeItems, index, [])
      // 初始化存储激活筛选栏数据
      this.$set(this.saveActiveItems, index, [])
    },
    showAllList(_index) {
      // 显示/隐藏选择栏多余数据
      this.selectBoxVue[_index].selfIsShowAll
        ? this.selectBoxVue[_index].hideMore()
        : this.selectBoxVue[_index].showAll()
    },
    open() {
      this.$nextTick(() => {
        // 重置内容据顶部的距离
        document.querySelector('.more-content').scrollTop = 0
      })
    },
    close() {
      // console.log('close')
      // 如果关闭需要将默认筛选数据和保存的筛选数据同步，防止在选择了筛选项后没有点确定直接关闭筛选下拉框
      this.saveActiveItems.forEach((item, index) => {
        this.$set(this.activeItems, index, item)
      })
    },
    selectItems(_item, _items, _index) {
      // 选择详细，参数选择的item，选择的所有items，下标index
      this.selectValueArray[_index] = _items
      this.$set(this.activeItems, _index, _items)
      // this.activeItems[_index] = _items
    },
    resetFilters() {
      // 重置所有筛选选项
      this.selectBoxVue.forEach((item) => {
        item.clearSelect()
      })
      this.activeItems.forEach((item, index) => {
        this.$set(this.activeItems, index, [])
        // this.activeItems[index] = []
      })
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
.more-content {
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 52px 40px 56px 40px;
  .more-item {
    margin-bottom: 60px;
    &:last-child {
      margin-bottom: 0;
    }
    .more-item__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      h2 {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4974f5;
        font-size: 26px;
        /*transform-origin: center center;*/
        /*transform: rotateX(180deg);*/
        div {
          display: inline;
          .tab_ic_all_n {
            margin-left: 12px;
          }
          &.show_all {
            transform-origin: center center;
            transition: all 0.3s;
            transform: rotateX(180deg);
          }
        }
      }
    }
  }
}
/deep/.sp-dropdown-item__content {
  max-height: 100%;
}
</style>
