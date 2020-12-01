<template>
  <div class="jyGoods">
    <sp-tabs
      ref="spTabs"
      title-active-color="#4974F5"
      title-inactive-color="#222"
      line-width="0"
      @click="clickTabs"
    >
      <sp-tab
        v-for="(item, index) in tabItems"
        :key="index"
        :title="item.name"
      ></sp-tab>
    </sp-tabs>
    <jy-filters ref="dropDownMenu" />
    <install-app v-show="listShow" ref="installApp" />
    <sp-list
      v-show="listShow"
      v-model="loading"
      :finished="finished"
      :style="{
        maxHeight: maxHeight,
      }"
      finished-text="没有更多了"
      class="goods-content"
      offset="30"
      @load="onLoad"
    >
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
      <goods-item />
    </sp-list>
    <Subscribe
      v-show="!listShow"
      title="新上商品通知"
      desc="填写手机号,相关商品上架第一时间通知"
    />
  </div>
</template>

<script>
import { List, Tabs, Tab } from '@chipspc/vant-dgg'
import InstallApp from '@/components/common/app/InstallApp'
import GoodsItem from '@/components/common/goodsItem/GoodsItem'
import Subscribe from '@/components/list/Subscribe'
import JyFilters from '@/components/list/JyFilters'

export default {
  name: 'JyGoods',
  components: {
    GoodsItem,
    [List.name]: List,
    InstallApp,
    Subscribe,
    JyFilters,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
  },
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      maxHeight: 0,
      tabItems: [
        {
          name: '公司',
          code: 11111,
        },
        {
          name: '专利',
          code: 2222,
        },
        {
          name: '商标',
          code: 333,
        },
        {
          name: '资质',
          code: 4444,
        },
      ], // tab栏数据
    }
  },
  mounted() {
    const installAPPHeight = this.$refs.installApp.$el.clientHeight
    const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
    const topHeight = this.$el.getBoundingClientRect().top
    const spTabsHeight = this.$refs.spTabs.$el.clientHeight
    this.maxHeight =
      document.body.clientHeight -
      installAPPHeight -
      dropDownMenuHeight -
      spTabsHeight -
      topHeight +
      'px'
  },
  methods: {
    onLoad() {
      console.log(1)
    },
    clickTabs(name, title) {
      console.log(name, title)
    },
  },
}
</script>

<style lang="less" scoped>
.jyGoods {
  /deep/.sp-tab {
    font-weight: bold;
    font-size: 30px;
    padding: 0 40px;
  }
  /deep/.sp-tabs__wrap--scrollable .sp-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
  /deep/.dropdownItem {
    &.active {
      font-weight: bold;
      color: #4974f5;
    }
  }
  /*height: calc(100% - 200px);*/
  /deep/.sp-dropdown-menu__bar {
    height: 80px;
    box-shadow: none;
    padding: 0 40px;
    border-bottom: 1px solid #f4f4f4;
    border-top: 1px solid #f4f4f4;
  }
  /deep/.sp-cell {
    padding: 18px 40px;
    &:last-child {
      margin-bottom: 40px;
    }
  }
  /deep/.sp-dropdown-menu__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    &.moreText {
      &::after {
        right: 6px;
      }
    }
  }
  /deep/.sp-dropdown-menu__title--active {
    font-weight: bold;
    color: #4974f5;
  }
  .goods-content {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /deep/.sp-tree-select {
    min-height: 600px;
    max-height: 600px;
    height: auto !important;
    .sp-tree-select__nav .sp-sidebar-item {
      padding: 30px 0 30px 40px;
    }
  }
  /deep/.sp-dropdown-item__option--active {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
  }
  /deep/.sp-tabs--line .sp-tabs__wrap {
    height: 94px;
  }
  .subscribe {
    padding: 0 40px;
  }
}
</style>
