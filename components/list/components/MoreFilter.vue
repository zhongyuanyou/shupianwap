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
        maxHeight: contentMaxHeight,
      }"
    >
      <div v-for="(item, index) in children" :key="index" class="more-item">
        <div class="more-item__title">
          <h2>{{ item.name }}</h2>
          <div v-if="isShowBtn[index]" @click="showAllList(index)">
            全部
            <div
              :class="{
                show_all: selectBoxVue[index].selfIsShowAll,
              }"
            >
              <my-icon name="tab_ic_all_n" size="0.16rem" color="#4974f5" />
            </div>
          </div>
        </div>
        <select-check-box
          :is-show-all-option="false"
          :select-list="item.children"
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
      ref="BottomConfirm"
      @resetFilters="resetFilters"
      @confirmFilters="confirmFilters"
      @bottomConfirmHeight="getBottomConfirmHeight"
    />
  </sp-dropdown-item>
</template>

<script>
import moment from 'moment'
import { DropdownItem } from '@chipspc/vant-dgg'
import SelectCheckBox from '@/components/common/filters/SelectCheckBox'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import clone from '~/utils/clone'
import addRemoveClass from '@/mixins/addRemoveClass'

export default {
  name: 'MoreFilter',
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
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {
      moreTextCss: 'jyDropdownFilter',
      dropdownTitle: '',
      children: [],
      isShowBtn: [], // 对应的筛选栏是否显示全部按钮
      selectBoxVue: [], // 存储所有的选择栏vue实例
      selectValueArray: [], // 所选择的数据
      activeItems: [], // 默认激活的
      saveActiveItems: [], // 存储的筛选项数据
      contentMaxHeight: 0, // 内容的最大高
    }
  },
  watch: {
    activeItems(val) {
      // const arr = val.flat(1)
      // if (arr.length === 1 && arr[0].name !== '不限') {
      //   // 选中的选项只有一项
      //   this.dropdownTitle = arr[0].name
      //   this.addClass('active')
      // } else if (arr.length > 1) {
      //   // 选中的选项有多个
      //   this.dropdownTitle = '多选'
      //   this.addClass('active')
      // } else if (arr.length === 0) {
      //   // 选中的选项为0项
      //   this.removeClass('moreText')
      //   this.removeClass('active')
      //   this.dropdownTitle = this.filterData.name
      // }
    },
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.dropdownTitle = val.name
        this.children = val.children
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.dropdownTitle = this.filterData.name
      this.children = this.filterData.children
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
      this.activeItems = clone(this.saveActiveItems, true)
    },
    selectItems(_item, _items, _index) {
      // 选择详细，参数选择的item，选择的所有items，下标index
      // this.selectValueArray[_index] = _items
      this.$set(this.activeItems, _index, _items)
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
      this.resetTitle(this.saveActiveItems)
      const emitData = this.resultHandle()
      this.$emit('activeItem', emitData, 'moreFilter-' + this.filterData.code)
      this.$refs.item.toggle()
    },
    resultHandle() {
      // 处理结果
      const filterKeyValArr = []
      const charLength = {}
      this.saveActiveItems.forEach((item) => {
        const emitData = {
          fieldCode: '',
          fieldValue: [],
          matchType: 'MATCH_TYPE_MULTI',
        }
        if (item.length) {
          item.forEach((_item) => {
            switch (_item.pcode) {
              case 'CONDITION-JY-SB-GD-ZFCD':
                // 字符长度
                if (_item.ext2.indexOf('-') > -1) {
                  charLength.nameLengthStart = _item.ext2.split('-')[0]
                  if (_item.ext2.split('-')[1])
                    charLength.nameLengthEnd = _item.ext2.split('-')[1]
                } else {
                  charLength.nameLengthStart = _item.ext2
                  charLength.nameLengthEnd = _item.ext2
                }
                break
              case 'JY-GS-GD-ZCZB':
                // 注册资本
                if (_item.id !== 'all' && _item.name !== '不限') {
                  emitData.fieldCode = _item.ext1
                  emitData.fieldValue = {
                    start: _item.ext2.split('-')[0],
                    end: _item.ext2.split('-')[1],
                  }
                  emitData.matchType = 'MATCH_TYPE_RANGE'
                }
                break
              case 'CONDITION-JY-SB-GD-ZCNX':
              case 'JY-GS-GD-JYSJ':
                // 注册年限 || 经营时间
                // const current = moment("MM-DD-YYYY")
                if (_item.id !== 'all' && _item.name !== '不限') {
                  emitData.fieldCode = _item.ext1
                  const timeArr = moment().format('YYYY-MM-DD').split('-')
                  // debugger
                  if (_item.name.indexOf('-') > -1) {
                    const a = parseInt(_item.name.split('-')[0])
                    const b = parseInt(_item.name.split('-')[1])
                    const one = moment([
                      parseInt(timeArr[0]) - a,
                      timeArr[1],
                      timeArr[2],
                    ]).unix()
                    let two = ''
                    if (b) {
                      two = moment([
                        parseInt(timeArr[0]) - b,
                        timeArr[1],
                        timeArr[2],
                      ]).unix()
                    }
                    emitData.fieldValue = {
                      start: two,
                      end: one,
                    }
                  } else if (
                    _item.name.indexOf('以下') > -1 ||
                    _item.name.indexOf('以内') > -1
                  ) {
                    // 年以下
                    const a = parseInt(_item.name)
                    const one = moment([
                      parseInt(timeArr[0]) - a,
                      timeArr[1],
                      timeArr[2],
                    ]).unix()
                    const two = moment().unix()
                    emitData.fieldValue = {
                      start: one,
                      end: two,
                    }
                  } else if (_item.name.indexOf('以上') > -1) {
                    // 年以上
                    const a = parseInt(_item.name)
                    const one = moment([
                      parseInt(timeArr[0]) - a,
                      timeArr[1],
                      timeArr[2],
                    ]).unix()
                    const two = moment().unix()
                    emitData.fieldValue = {
                      // start: one,
                      end: one,
                    }
                  }
                  emitData.matchType = 'MATCH_TYPE_RANGE'
                }
                break
              default:
                if (_item.id !== 'all' && _item.name !== '不限') {
                  emitData.fieldCode = _item.ext1
                  // 像地区这种ext2没有值，就需要去取字典上面的code
                  emitData.fieldValue.push(_item.ext2 ? _item.ext2 : _item.code)
                }
            }

            // if (_item.pcode === 'CONDITION-JY-SB-GD-ZFCD') {
            //   // 该筛选项为字节筛选项
            //   if (_item.code !== 'JY-SB-GD-ZFCD-BX') {
            //     if (_item.ext2.indexOf('-') > -1) {
            //       charLength.nameLengthStart = _item.ext2.split('-')[0]
            //       if (_item.ext2.split('-')[1])
            //         charLength.nameLengthEnd = _item.ext2.split('-')[1]
            //     } else {
            //       charLength.nameLengthStart = _item.ext2
            //       charLength.nameLengthEnd = _item.ext2
            //     }
            //   }
            // } else if (_item.id !== 'all' && _item.name !== '不限') {
            //   emitData.fieldCode = _item.ext1
            //   // 像地区这种ext2没有值，就需要去取字典上面的code
            //   emitData.fieldValue.push(_item.ext2 ? _item.ext2 : _item.code)
            // }
          })
          if (emitData.fieldCode) filterKeyValArr.push(emitData)
        }
      })
      return { filterKeyValArr, charLength }
    },
    resetTitle(val) {
      const arr = val.flat(1)
      if (arr.length === 1 && arr[0].name !== '不限') {
        // 选中的选项只有一项
        this.dropdownTitle = arr[0].name
        this.addClass('active')
      } else if (arr.length > 1) {
        // 选中的选项有多个
        this.dropdownTitle = '多选'
        this.addClass('active')
      } else if (arr.length === 0) {
        // 选中的选项为0项
        this.removeClass('moreText')
        this.removeClass('active')
        this.dropdownTitle = this.filterData.name
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
.more-content {
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 52px 40px 56px 40px;
  max-height: 584px;
  border-bottom: 1px solid #cdcdcd;
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
          .spiconfont-tab_ic_all_n {
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
