<template>
  <div class="select-address">
    <div class="top">
      <sp-top-nav-bar
        padding
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
    <div class="dropdown-item">
      <sp-dropdown-menu>
        <!-- 选择价格区间 -->
        <sp-dropdown-item
          ref="isShowPrice"
          title-class=""
          :title="dropdownPriceTitle"
        >
          <div class="select-price">
            <PriceFilter
              ref="PriceFilter"
              :price-list="priceList"
              @minInput="minInput"
              @maxInput="maxInput"
              @selectItems="selectedPrice"
            />
          </div>
          <BottomConfirm
            @resetFilters="resetFilters"
            @confirmFilters="confirmFilters"
          />
        </sp-dropdown-item>
        <sp-dropdown-item v-model="valueSearch" :options="option" />
      </sp-dropdown-menu>
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
} from '@chipspc/vant-dgg'
import PriceFilter from '@/components/common/filters/PriceFilter'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    PriceFilter,
    BottomConfirm,
  },
  data() {
    return {
      searchValue: null,
      dropdownPriceTitle: '价格',

      valueSearch: 0,
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
    }
  },
  methods: {
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
<style lang="less" scoped></style>
