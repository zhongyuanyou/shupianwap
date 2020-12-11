<template>
  <div class="jyGoods">
    <sp-tabs
      v-if="isShowTabs"
      ref="spTabs"
      title-active-color="#4974F5"
      title-inactive-color="#222"
      line-width="0"
      :ellipsis="false"
      :class="{
        lowFive: tabItems.length <= 5,
      }"
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
      <goods-item
        v-for="(item, index) in jyGoodsListData"
        :key="index"
        :item-type="itemType"
      />
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
import searchList from '@/mixins/searchList'
import clone from '~/utils/clone'

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
  mixins: [searchList],
  props: {
    isShowTabs: {
      // 是否显示tabs业态栏
      type: Boolean,
      default() {
        return true
      },
    },
    initListData: {
      // 初始化列表数据，仅做初始化的时候用或是在进行条件搜索的时候用
      type: Array,
      default() {
        return []
      },
    },
    typeCode: {
      // 业态类型
      type: String,
      default() {
        return '公司交易'
      },
    },
    searchText: {
      type: String,
      default() {
        return ''
      },
    },
    itemType: {
      type: Object,
      default() {
        return {
          type: 'jy',
          classify: 'wd',
        }
      },
    },
    isChangeTab: {
      // 顶层tab服务资源和交易资源发生了改变需要清空筛选项
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      listShow: true,
      loading: false,
      finished: false,
      maxHeight: 0,
      formData: {
        page: 1,
        limit: 10,
      },
      jyGoodsListData: [],
      tabItems: [
        {
          name: '公司交易',
          code: 11111,
        },
        {
          name: '专利交易',
          code: 2222,
        },
        {
          name: '商标交易',
          code: 333,
        },
        {
          name: '资质交易',
          code: 4444,
        },
      ], // tab栏数据
    }
  },
  watch: {
    isChangeTab() {
      this.formData.sortBy = ''
      this.formData.classCodes = ''
    },
    initListData(val) {
      this.jyGoodsListData = clone(val)
    },
  },
  mounted() {
    const installAPPHeight = this.$refs.installApp.$el.clientHeight
    const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
    const topHeight = this.$el.getBoundingClientRect().top
    const spTabsHeight = this.$refs.spTabs
      ? this.$refs.spTabs.$el.clientHeight
      : 0
    this.maxHeight =
      document.body.clientHeight -
      installAPPHeight -
      dropDownMenuHeight -
      spTabsHeight -
      topHeight +
      'px'
    this.reqType = 'jy'
    this.$emit('goodsList', 'jy', this)
  },
  methods: {
    onLoad() {
      console.log(1)
      const arr = new Array(10).fill(2)
      this.jyGoodsListData = [...this.jyGoodsListData, ...arr]
      this.loading = false
    },
    clickTabs(name, title) {
      console.log(name, title)
    },
    resetAllSelect() {},
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
  /deep/.sp-tabs {
    border-bottom: 1px solid #f4f4f4;
  }
  /deep/.sp-tabs__wrap--scrollable .sp-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
  /deep/.jyDropdownFilter {
    &.active {
      font-weight: bold !important;
      color: #4974f5 !important;
      &:after {
        border-color: transparent transparent #4974f5 #4974f5 !important;
      }
    }
  }
  /*height: calc(100% - 200px);*/
  /deep/.sp-dropdown-item__content {
    max-height: 100%;
  }
  /deep/.sp-dropdown-menu__bar {
    height: 80px;
    box-shadow: none;
    margin: 0 30px;
    margin-left: -8px;
    border-bottom: 1px solid #f4f4f4;
    /*border-top: 1px solid #f4f4f4;*/
    .sp-dropdown-menu__item {
      text-align: right;
      justify-content: flex-end;
    }
    /deep/.sp-dropdown-menu__title {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 80px;
      padding: 0 28px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      &:after {
        right: 0;
        top: 50%;
        /*transform: rotate(-45deg);*/
      }
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
  }
  .sort-filter /deep/.sp-cell {
    padding: 18px 40px;
    &:last-child {
      margin-bottom: 40px;
    }
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
  /deep/.lowFive {
    /deep/.sp-tabs__nav {
      /deep/.sp-tab {
        &:first-child {
          justify-content: flex-start;
        }
        &:nth-last-child(2) {
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
