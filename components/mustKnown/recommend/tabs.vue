<template>
  <div class="tabs">
    <sp-work-tabs v-model="active" is-nav-tab @click="getBackIndex">
      <sp-work-tab
        v-for="index in tabs"
        :key="index"
        :need-content="false"
        :title="index"
      >
      </sp-work-tab>
    </sp-work-tabs>
    <div class="icon" @click="openPop"></div>
  </div>
</template>
<script>
import { WorkTab, WorkTabs, List, Cell, Sticky } from '@chipspc/vant-dgg'

export default {
  name: 'Tabs',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
  },

  props: {
    // banner: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   },
    // },
  },
  data() {
    return {
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
      active: 1,
    }
  },
  methods: {
    toggleTabs(index) {
      console.log('index', index)
    },
    openPop() {
      console.log('this.open')
      this.$emit('openPop', true)
    },
    getBackIndex() {
      console.log('getBackIndex')
    },
  },
}
</script>
<style lang="less" scoped>
::v-deep .sp-work-tab {
  padding: 0;
  margin-right: 48px;
}
::v-deep .sp-work-tab--active {
  span {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #222222;
  }
}
::v-deep .sp-work-tab__text {
  flex-shrink: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #999999;
}
::v-deep .sp-work-tabs__line {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
}
.tabs {
  height: 88px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 32px;
  .tabs-box {
    .tabs-box-items {
      display: flex;
      overflow: auto;
    }
  }
  .icon {
    width: 32px;
    height: 32px;
    background: black;
    border-radius: 1px;
  }
}
</style>
