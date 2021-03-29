<template>
  <div class="tabs">
    <sp-work-tabs v-model="active" is-nav-tab>
      <sp-work-tab
        v-for="index in tabs"
        :key="index"
        :need-content="false"
        :title="index"
      >
        <ListItem />
      </sp-work-tab>
    </sp-work-tabs>
    <div class="icon" @click="openPop"></div>
  </div>
</template>
<script>
import { WorkTab, WorkTabs, List, Cell, Sticky } from '@chipspc/vant-dgg'
import ListItem from '@/components/mustKnown/recommend/ListItem'

export default {
  name: 'Tabs',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
    ListItem,
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
      this.nowIndex = index
    },
    openPop() {
      console.log('this.open')
      this.$emit('openPop', true)
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
    font-weight: 500;
    color: #222222;
  }
}
/deep/ .sp-work-tab__text {
  flex-shrink: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
/deep/ .sp-work-tabs__line {
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
