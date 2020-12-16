<template>
  <div class="select-phone">
    <div class="top">
      <sp-top-nav-bar
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
        </template>
        <template #title>
          <sp-nav-search
            v-model="searchValue"
            border
            placeholder="请输入您喜欢的号码"
            class="search"
          >
            <template #left-icon>
              <my-icon
                name="sear_ic_sear"
                size="0.4rem"
                color="#999999"
              ></my-icon>
            </template>
          </sp-nav-search>
        </template>
        <template #right> 搜索 </template>
      </sp-top-nav-bar>
    </div>
    <div class="dropdown-list">
      <sp-sticky>
        <sp-dropdown-menu>
          <!-- 选择价格区间 -->
          <sp-dropdown-item
            ref="isShowPrice"
            :title-class="dropdownPrice != '价格' ? 'title-style' : ''"
            :title="dropdownPrice"
          >
            <div class="select-price">
              <PriceFilterComponents
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
import PriceFilterComponents from '@/components/common/filters/PriceFilterComponents'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import CheckboxList from '@/components/detail/CheckboxList'
// import { productDetailsApi } from '~/api'
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
    PriceFilterComponents,
    BottomConfirm,
    CheckboxList,
  },
  // asyncData({ $axios, params }) {
  //   $axios.get()
  // },
  data() {
    return {
      searchValue: null,
      dropdownPrice: '价格',
      price: '价格',
      sortValue: 0,
      loading: false,
      finished: false,
      refreshing: false,
      //  选择后标题样式
      titleBeforFour: false,
      titleLastFour: false,
      titlePrice: false,
      titleSort: false,
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
      option: [
        { text: '默认排序', value: 0 },
        { text: '按照价格从低到高', value: 1 },
        { text: '按照价格从高到低', value: 2 },
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
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    onClickRight() {
      // 搜索
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
    selectedAllPrices(item, items) {
      this.price = item.name
    },
    selectedPrices(val) {
      // 选择价格标题显示
      this.price = val.name
    },
    resetPrice() {
      // 重置价格
      this.dropdownPrice = '价格'
      this.price = '价格'
      this.$refs.PriceFilter.clearInput()
    },
    confirmPrice() {
      // 确认价格
      this.$refs.isShowPrice.toggle()
      this.dropdownPrice = this.price
    },
  },
}
</script>
<style lang="less" scoped>
.select-phone {
  .top {
    padding: 16px 0 0 0;
    /deep/.iconfont {
      font-weight: 400;
    }
    /deep/.sp-top-nav-bar__title {
      // 搜索框样式
      margin: 0 144px 4px 104px;
      .search {
        width: 502px;
        .sp-field__control {
          font-size: 30px;
        }
      }
    }
    /deep/.sp-top-nav-bar__right {
      // 右边搜索样式
      font-size: 32px;
      color: #1a1a1a;
      padding: 0 42px;
    }
    /deep/.sp-top-nav-bar__left {
      // 左边返回样式
      padding: 0px 32px;
    }
    /deep/.sp-hairline--bottom::after {
      border-bottom-width: 0;
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
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #4974f5;
  }
  .select-phone {
    padding: 32px 40px;
  }
  .select-price {
    padding: 56px 40px 84px 40px;
  }
  .result-List {
    padding-bottom: 130px;
  }
}
</style>
