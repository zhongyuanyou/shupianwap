<template>
  <div class="select-phone">
    <div class="top">
      <sp-top-nav-bar
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <sp-icon class-prefix="sp-iconfont" name="specialreturn" />
        </template>
        <template #title>
          <sp-nav-search
            v-model="searchValue"
            border
            placeholder="请输入您喜欢的号码"
            class="search"
          >
          </sp-nav-search>
        </template>
        <template #right> 搜索 </template>
      </sp-top-nav-bar>
    </div>
    <div class="dropdown-list">
      <sp-sticky>
        <sp-dropdown-menu>
          <!-- 搜索前4位 -->
          <sp-dropdown-item
            ref="isShowBeforFour"
            :title-class="dropdownBeforFour != '前四位' ? 'title-style' : ''"
            :title="dropdownBeforFour"
          >
            <div class="select-phone">
              <SelectCheckbox
                ref="beforForuList"
                :select-list="beforForuList"
                :gutter="12"
                :is-select-more="false"
                @selectItems="selectBeforFour"
                @selectAllItems="selectAllBeforForu"
              />
            </div>
            <BottomConfirm
              @resetFilters="resetBeforForu"
              @confirmFilters="confirmBeforForu"
            />
          </sp-dropdown-item>
          <!-- 搜索后4位 -->
          <sp-dropdown-item
            ref="isShowLastFour"
            :title-class="dropdownLastFour != '后四位' ? 'title-style' : ''"
            :title="dropdownLastFour"
          >
            <div class="select-phone">
              <SelectCheckbox
                ref="lastForuList"
                :select-list="lastForuList"
                :gutter="12"
                :is-select-more="false"
                @selectItems="selectLastForu"
                @selectAllItems="selectAllLastForu"
              />
            </div>
            <BottomConfirm
              @resetFilters="resetLastForu"
              @confirmFilters="confirmLastForu"
            />
          </sp-dropdown-item>
          <!-- 选择价格区间 -->
          <sp-dropdown-item
            ref="isShowPrice"
            :title-class="dropdownPrice != '价格' ? 'title-style' : ''"
            :title="dropdownPrice"
          >
            <div class="select-price">
              <PriceFilter
                ref="PriceFilter"
                :price-list="priceList"
                @minInput="minInput"
                @maxInput="maxInput"
                @selectItems="selectedPrices"
                @selectAllItems="selectedAllPrices"
              />
            </div>
            <BottomConfirm
              @resetFilters="resetPrice"
              @confirmFilters="confirmPrice"
            />
          </sp-dropdown-item>
          <!-- 排序 -->
          <sp-dropdown-item
            v-model="sortValue"
            :title-class="sortValue > 0 ? 'title-style' : ''"
            :options="option"
          />
        </sp-dropdown-menu>
      </sp-sticky>
    </div>
    <div class="result-List">
      <!-- 搜索结果列表 -->
      <sp-pull-refresh
        v-model="refreshing"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <CheckboxList :list="checkboxList" />
        </sp-list>
      </sp-pull-refresh>
    </div>
  </div>
</template>
<script>
import {
  TopNavBar,
  NavSearch,
  Toast,
  Icon,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Sticky,
  PullRefresh,
  List,
} from '@chipspc/vant-dgg'
import PriceFilter from '@/components/common/filters/PriceFilter'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import SelectCheckbox from '@/components/common/filters/SelectCheckBox'
import CheckboxList from '@/components/detail/CheckboxList'
export default {
  name: 'SelectPhone',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Sticky.name]: Sticky,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    PriceFilter,
    BottomConfirm,
    SelectCheckbox,
    CheckboxList,
  },
  data() {
    return {
      searchValue: null,
      dropdownBeforFour: '前四位',
      dropdownLastFour: '后四位',
      dropdownPrice: '价格',
      sortValue: 0,
      loading: false,
      finished: false,
      refreshing: false,
      //  选择后标题样式
      titleBeforFour: false,
      titleLastFour: false,
      titlePrice: false,
      titleSort: false,
      option: [
        { text: '默认排序', value: 0 },
        { text: '按照价格从低到高', value: 1 },
        { text: '按照价格从高到低', value: 2 },
      ],

      priceList: [
        {
          name: '1万以下',
          id: '1',
        },
        {
          name: '1-2万',
          id: '2',
        },
        {
          name: '2-5万',
          id: '3',
        },
        {
          name: '5-10万',
          id: '4',
        },
        {
          name: '10万以上',
          id: '5',
        },
      ],
      beforForuList: [
        {
          name: 'AAB*',
          id: '1',
        },
        {
          name: 'AACC',
          id: '2',
        },
        {
          name: 'AADD',
          id: '3',
        },
        {
          name: 'AAAC',
          id: '4',
        },
        {
          name: 'AABE',
          id: '5',
        },
      ],
      lastForuList: [
        {
          name: 'AAB*',
          id: '1',
        },
        {
          name: 'AACC',
          id: '2',
        },
        {
          name: 'AADD',
          id: '3',
        },
        {
          name: 'AAAC',
          id: '4',
        },
        {
          name: 'AABE',
          id: '5',
        },
      ],
      checkboxList: [
        { title: '4008886662', price: '10000' },
        { title: '4008886663', price: '10000' },
        { title: '4008886664', price: '10000' },
        { title: '4008886662', price: '10000' },
        { title: '4008886663', price: '10000' },
        { title: '4008886664', price: '10000' },
        { title: '4008886662', price: '10000' },
        { title: '4008886663', price: '10000' },
        { title: '4008886664', price: '10000' },
        { title: '4008886664', price: '10000' },
      ],
    }
  },
  methods: {
    onLoad() {
      // 加载更多请求
      setTimeout(() => {
        if (this.refreshing) {
          this.checkboxList = []
          this.refreshing = false
        }
        for (let i = 0; i < 10; i++) {
          this.checkboxList.push(this.checkboxList.length + 1)
        }
        this.loading = false

        // 停止加载的条件
        if (this.checkboxList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 刷新发送请求
      console.log('刷新请求')
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    onClickRight() {
      // 右侧搜索
      Toast('搜索')
    },
    onClickLeft() {
      //  左侧返回
      Toast('返回')
    },
    minInput(val) {
      // 最小输入框
      console.log(val)
    },
    maxInput(val) {
      // 最大输入框
      console.log(val)
    },

    selectAllBeforForu(item, items) {
      // 选择不限
      this.dropdownBeforFour = item.name
    },
    selectAllLastForu(item, items) {
      this.dropdownLastFour = item.name
    },
    selectedAllPrices(item, items) {
      this.dropdownPrice = item.name
    },
    selectBeforFour(item, items) {
      // 选中前四位标题显示
      this.dropdownBeforFour = item.name
    },
    selectLastForu(item, items) {
      // 选择后四位标题显示
      this.dropdownLastFour = item.name
    },
    selectedPrices(val) {
      // 选择价格标题显示
      this.dropdownPrice = val.name
    },
    resetBeforForu() {
      // 重置前四位
      this.dropdownBeforFour = '前四位'
      this.$refs.beforForuList.clearSelect()
    },
    confirmBeforForu() {
      // 确认前四位
      this.$refs.isShowBeforFour.toggle()
    },
    resetLastForu() {
      // 重置后四位
      this.dropdownLastFour = '后四位'
      this.$refs.lastForuList.clearSelect()
    },
    confirmLastForu() {
      // 确认后四位
      this.$refs.isShowLastFour.toggle()
    },
    resetPrice() {
      // 重置价格
      this.dropdownPrice = '价格'
      this.$refs.PriceFilter.clearInput()
    },
    confirmPrice() {
      // 确认价格
      this.$refs.isShowPrice.toggle()
    },
  },
}
</script>
<style lang="less" scoped>
.select-phone {
  .top {
    padding: 16px 0 0 0;
    /deep/.sp-top-nav-bar__title {
      // 搜索框样式
      margin: 0 144px 4px 104px;
      .search {
        width: 502px;
      }
    }
    /deep/.sp-top-nav-bar__right {
      // 右边搜索样式
      font-size: 32px;
      color: #1a1a1a;
      padding: 0 42px 0 41px;
    }
    /deep/.sp-top-nav-bar__left {
      // 左边返回样式
      padding-right: 0px;
    }
  }
  .dropdown-list {
    // 下拉样式
    /deep/.sp-dropdown-menu__bar {
      .sp-dropdown-menu__item:last-child {
        padding-right: 40px;
      }
    }
  }
  /deep/.title-style {
    // 下拉选择显示标题样式
    color: #4974f5;
    font-size: 28px;
    font-weight: 600;
  }
  .select-phone {
    padding: 32px 40px;
  }
  .select-price {
    padding: 56px 40px 84px 40px;
  }
  .result-List {
    padding-bottom: 94px;
  }
}
</style>
