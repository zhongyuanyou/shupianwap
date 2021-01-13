<template>
  <div class="select-checkbox">
    <sp-row
      v-for="(arr, index) in currentRenderArr"
      :key="index"
      :gutter="gutter"
    >
      <sp-col
        v-for="(item, _index) in arr"
        :key="_index"
        :span="colSpan"
        :style="{
          visibility: item.id ? 'visible' : 'hidden',
        }"
        ><div
          class="select-item"
          :class="{ active: isActive(item.id) }"
          @click="selectFilter(item, isActive(item.id))"
        >
          {{ item.name }}
        </div></sp-col
      >
    </sp-row>
  </div>
</template>

<script>
import { Col, Row } from '@chipspc/vant-dgg'
import chunkArr from '~/utils/chunkArr'
import clone from '~/utils/clone'
export default {
  name: 'SelectCheckBox',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
  },
  props: {
    gutter: {
      // 每个选项的间距
      type: Number,
      default() {
        return 12
      },
    },
    selectList: {
      // 需要渲染的选择列表
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    isShowAll: {
      // 是否全部展示
      type: Boolean,
      default() {
        return false
      },
    },
    isSelectMore: {
      // 是否多选
      type: Boolean,
      default() {
        return false
      },
    },
    isShowAllOption: {
      // 是否显示不限这个选项
      type: Boolean,
      default() {
        return true
      },
    },
    selfActiveItem: {
      // 需要激活的筛选项
      type: Array,
      default() {
        return []
      },
    },
    colSpan: {
      // 列所占的宽度百分比
      type: Number,
      default() {
        return 6
      },
    },
    lineLength: {
      // 一行多少个
      type: Number,
      default() {
        return 4
      },
    },
  },
  data() {
    return {
      renderArr: [], // 需要渲染的数据
      activeItems: [], // 激活的筛选项数组
      currentRenderArr: [], // 当前渲染的数据
      isShowAllBtn: false, // 是否需要显示全部按钮
      selfIsShowAll: false, // 内部属性，是否显示了全部数据
      a: [],
    }
  },
  watch: {
    selfActiveItem(val) {
      // console.log('selfActiveItem', val)
      if (val && val.length) {
        this.activeItems = val
      }
    },
    selectList(val) {
      const arr = clone(val, true)
      if (this.isShowAllOption) {
        arr.unshift({ name: '不限', id: 'all' })
      }
      this.renderArr = this.handleRenderArr(chunkArr(arr, this.lineLength))
      this.$set(this.activeItems, 0, arr[0])
      console.log('this.activeItems', this.activeItems)
    },
    renderArr(val) {
      if (val.length > 4 && !this.isShowAll) {
        // 如果renderArr的长度超过了4层则当前渲染只显示4层
        this.currentRenderArr = val.slice(0, 4)
        // this.isShowAllBtn = true
        this.$emit('isShowBtnHandle', true, this)
      } else {
        // this.isShowAllBtn = false
        this.currentRenderArr = val
        this.$emit('isShowBtnHandle', false, this)
      }
    },
  },
  mounted() {
    // 初始化筛选列表
    if (this.selectList.length) {
      const arr = clone(this.selectList, true)
      if (this.isShowAllOption) {
        arr.unshift({ name: '不限', id: 'all' })
      }
      this.renderArr = this.handleRenderArr(chunkArr(arr, this.lineLength))
      this.$set(this.activeItems, 0, arr[0])
      // console.log('this.activeItems', this.activeItems)
    }
    // 初始化激活筛选项
    if (this.selfActiveItem && this.selfActiveItem.length) {
      this.activeItems = this.selfActiveItem
    }
  },
  methods: {
    selectFilter(item, active) {
      // 选择某一个筛选项
      // if (!this.isSelectMore && active) {
      if (active) {
        // 禁止重复选择
        const _index = this.activeItems.findIndex(
          (_item) => _item.id === item.id
        )
        if (this.isSelectMore) {
          this.activeItems.splice(_index, 1)
          if (this.activeItems.length === 0) {
            this.activeItems = [this.selectList[0]]
          }
        }
        return
      }
      if (item.id === 'all' || item.name === '不限') {
        this.activeItems = [item]
        this.$emit('selectItems', item, this.activeItems)
        return
      }
      if (this.isSelectMore) {
        // 是否多选
        if (
          this.activeItems.length &&
          (this.activeItems[0].id === 'all' ||
            this.activeItems[0].name === '不限')
        ) {
          this.activeItems = []
        }
        const _index = this.activeItems.findIndex(
          (_item) => _item.id === item.id
        )
        if (_index > -1) {
          this.activeItems.splice(_index, 1)
          this.$emit('cancelItem', item, this.activeItems)
        } else if (item.id !== 'all' && item.name !== '不限') {
          this.activeItems.push(item)
          this.$emit('selectItems', item, this.activeItems)
        }
      } else {
        this.activeItems = [item]
        // console.log('selectItems', item, this.activeItems)
        this.$emit('selectItems', item, this.activeItems)
      }
    },
    handleRenderArr(arr) {
      const len = arr[arr.length - 1].length
      if (len < this.lineLength) {
        // 如果数组最后一个元素的长度小于4个则用空对象填满
        while (arr[arr.length - 1].length < this.lineLength) {
          arr[arr.length - 1].push({ id: undefined, name: undefined })
        }
      }
      return arr
    },
    isActive(id) {
      const _index = this.activeItems.findIndex((item) => item.id === id)
      // eslint-disable-next-line
      return _index > -1 ? true : false
    },
    showAll() {
      // 对外函数
      // ui设计规定更多筛选里面初始只显示4层，多出来的隐藏
      // 显示所有的数据
      this.currentRenderArr = this.renderArr
      this.selfIsShowAll = true
    },
    hideMore() {
      // 对外函数
      // 隐藏多余的部分
      if (this.renderArr.length > 4) {
        this.currentRenderArr = this.renderArr.slice(0, 4)
      }
      this.selfIsShowAll = false
    },
    clearSelect(_flag = false) {
      // 对外函数
      // 清除所有的选中项
      if (_flag) {
        this.activeItems = []
      } else {
        this.activeItems = [this.selectList[0]]
      }
    },
  },
}
</script>

<style lang="less" scoped>
.select-checkbox {
  /*width: 100%;*/
  /*padding: 0 40px;*/
  .select-item {
    height: 64px;
    text-align: center;
    line-height: 64px;
    padding-left: 14px;
    padding-right: 14px;
    background-color: rgba(248, 248, 248, 1);
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.active {
      background-color: rgba(240, 244, 255, 1);
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
    }
  }
  .sp-row {
    margin-top: 24px;
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
</style>
