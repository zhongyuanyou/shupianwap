<template>
  <div class="select-phone">
    <div class="top">
      <sp-top-nav-bar
        padding
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
    <div class="item">
      <sp-dropdown-menu>
        <!-- 搜索前4位 -->
        <sp-dropdown-item
          ref="isShowBeforFour"
          title-class=""
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
          title-class=""
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
          v-model="value1"
          title-class=""
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
        <sp-dropdown-item v-model="sortValue" :options="option" />
      </sp-dropdown-menu>
    </div>
    <div class="result-phone">
      <CheckboxList :list="checkbosList" />
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
    PriceFilter,
    BottomConfirm,
    SelectCheckbox,
    CheckboxList,
  },
  data() {
    return {
      searchValue: null,
      sortValue: 'a',
      activeNames: ['1'],
      dropdownBeforFour: '前四位',
      dropdownLastFour: '后四位',
      dropdownPrice: '价格',
      value1: 0,
      option: [
        { text: '默认排序', value: 'a' },
        { text: '按照价格从低到高', value: 'b' },
        { text: '按照价格从高到低', value: 'c' },
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
      checkbosList: [
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
    onClickRight() {
      // 右侧搜索
      Toast('按钮')
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
    /deep/.search {
      width: 100%;
    }
  }
  .item {
    .select-phone {
      padding: 32px 40px 64px 40px;
    }
    .select-price {
      padding: 32px 40px 64px 40px;
      border-bottom: 1px solid #cdcdcd;
    }
  }
}
</style>
