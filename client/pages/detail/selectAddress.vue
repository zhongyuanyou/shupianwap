<template>
  <div class="select-address">
    <div class="top">
      <sp-top-nav-bar
        @on-click-left="onClickLeft"
        @on-click-right="onClickRight"
      >
        <template #left>
          <sp-icon class-prefix="sp-iconfont" name="specialreturn2" />
        </template>
        <template #title>
          <sp-nav-search
            v-model="searchValue"
            border
            placeholder="请输入您想注册的地址"
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
          <!-- 选择价格区间 -->
          <sp-dropdown-item
            ref="isShowPrice"
            :title-class="dropdownPriceTitle != '价格' ? 'title-style' : ''"
            :title="dropdownPriceTitle"
          >
            <div class="select-price">
              <PriceFilter
                ref="PriceFilter"
                :price-list="priceList"
                @minInput="minInput"
                @maxInput="maxInput"
                @selectItems="selectedPrice"
                @selectAllItems="selectAllPrice"
              />
            </div>
            <BottomConfirm
              @resetFilters="resetFilters"
              @confirmFilters="confirmFilters"
            />
          </sp-dropdown-item>
          <sp-dropdown-item
            v-model="valueSearch"
            :title-class="valueSearch > 0 ? 'title-style' : ''"
            :options="option"
          />
        </sp-dropdown-menu>
      </sp-sticky>
    </div>
    <div class="result-list">
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
          <AddressList :list="addressList" />
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
  Sticky,
  List,
  PullRefresh,
} from '@chipspc/vant-dgg'
import PriceFilter from '@/components/common/filters/PriceFilter'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import AddressList from '@/components/detail/AddressList'
export default {
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
    AddressList,
  },
  data() {
    return {
      searchValue: null,
      dropdownPriceTitle: '价格',
      valueSearch: 0,
      loading: false,
      finished: false,
      refreshing: false,
      option: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
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
      addressList: [
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
        {
          title: '四川省成都市武侯区科华南路1号',
          attribute: ['属性', '属性', '属性'],
          price: 10000,
        },
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
    onClickLeft() {
      // 返回按钮
      Toast('返回')
    },
    onClickRight() {
      // 搜索按钮
      Toast('搜索')
    },
    minInput(val) {
      // 最小输入框
      console.log(val)
    },
    maxInput(val) {
      // 最大输入框
      console.log(val)
    },
    selectAllPrice(item) {
      // 选择不限显示标题
      this.dropdownPriceTitle = item.name
    },
    selectedPrice(val) {
      // 修改选中价格区间标题显示
      this.dropdownPriceTitle = val.name
    },
    resetFilters() {
      // 价格区间重置
      this.dropdownPriceTitle = '价格'
      this.$refs.PriceFilter.clearInput()
    },
    confirmFilters() {
      // 价格区间确认
      this.$refs.isShowPrice.toggle()
    },
  },
}
</script>
<style lang="less" scoped>
.select-address {
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
  /deep/.title-style {
    // 下拉选择显示标题样式
    color: #4974f5;
    font-size: 28px;
    font-weight: 600;
  }
  .select-price {
    padding: 56px 40px 84px 40px;
  }
  .result-list {
    padding-bottom: 94px;
  }
}
</style>
