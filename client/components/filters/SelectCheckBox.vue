<template>
  <div class="select-checkbox">
    <sp-row v-for="(arr, index) in currentRenderArr" :key="index" gutter="12">
      <sp-col v-for="(item, _index) in arr" :key="_index" span="6"
        ><div
          class="select-item"
          :class="{ active: isActive(item.id) }"
          @click="selectFilter(item)"
        >
          {{ item.name }}
        </div></sp-col
      >
    </sp-row>
  </div>
</template>

<script>
import { Col, Row } from '@chipspc/vant-dgg'
import chunkArr from '@/utils/chunkArr'
export default {
  name: 'SelectCheckBox',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
  },
  props: {
    selectList: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      renderArr: [], // 需要渲染的数据
      activeItems: [], // 可以激活的筛选项数组
      currentRenderArr: [], // 当前渲染的数据
    }
  },
  watch: {
    selectList(val) {
      this.renderArr = chunkArr(val, 4)
    },
    renderArr(val) {
      if (val.length > 4) {
        // 如果renderArr的长度超过了4层则当前渲染只显示4层
        this.currentRenderArr = val.slice(0, 4)
      }
    },
  },
  mounted() {
    if (this.selectList.length) {
      this.renderArr = chunkArr(this.selectList, 4)
    }
  },
  methods: {
    showAll() {
      // 显示所有的数据
      this.currentRenderArr = this.renderArr
    },
    selectFilter(item) {
      // 选择某一个筛选项
      const _index = this.activeItems.findIndex((_item) => _item.id === item.id)
      if (_index) {
      }
      this.activeItems.push(item)
    },
    isActive(id) {
      const _index = this.activeItems.findIndex((item) => item.id === id)
      // eslint-disable-next-line
      return _index > -1 ? true : false
    },
  },
}
</script>

<style lang="less" scoped>
.select-checkbox {
  /*width: 100%;*/
  padding: 0 40px;
  .select-item {
    height: 64px;
    text-align: center;
    line-height: 64px;
    padding-left: 16px;
    padding-right: 16px;
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
