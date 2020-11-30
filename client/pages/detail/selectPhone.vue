<template>
  <div class="select-phone">
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
          v-model="value1"
          title-class=""
          :title="dropdownTitle1"
        >
          <div class="select-phone">
            <SelectCheckbox
              ref="foruDigitList"
              :select-list="foruDigitList1"
              :gutter="12"
              :is-select-more="false"
              @cancelItem="cancelItem"
              @selectItems="selectItems"
              @selectAllItems="selectAllItems"
            />
          </div>
          <BottomConfirm
            @resetFilters="resetFilters"
            @confirmFilters="confirmFilters"
          />
        </sp-dropdown-item>
        <!-- 搜索后4位 -->
        <sp-dropdown-item
          v-model="value1"
          title-class=""
          :title="dropdownTitle2"
        >
          <div class="select-phone">
            <SelectCheckbox
              ref="foruDigitList"
              :select-list="foruDigitList1"
              :gutter="12"
              :is-select-more="false"
              @cancelItem="cancelItem"
              @selectItems="selectItems2"
              @selectAllItems="selectAllItems"
            />
          </div>
          <BottomConfirm />
        </sp-dropdown-item>
        <!-- 选择价格区间 -->
        <sp-dropdown-item
          v-model="value1"
          title-class=""
          :title="dropdownTitle3"
        >
          <div class="select-price">
            <PriceFilter
              :price-list="priceList"
              @minInput="minInput"
              @maxInput="maxInput"
              @selectItems="selectedPrices"
            />
          </div>
          <BottomConfirm @confirmFilters="confirmFilters2" />
        </sp-dropdown-item>
        <!-- 排序 -->
        <sp-dropdown-item v-model="sortValue" :options="option2" />
      </sp-dropdown-menu>
    </div>
    <div class="result-phone">
      <CheckboxList :list="list" />
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
      dropdownTitle1: '前四位',
      dropdownTitle2: '后四位',
      dropdownTitle3: '价格',
      value1: 0,
      option2: [
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
      foruDigitList1: [
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
      foruDigitList2: [
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
      list: [
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
    showPopup() {
      this.show = true
    },
    onClickRight() {
      // 左侧按钮事件
      Toast('按钮')
    },
    onClickLeft() {
      // 右侧按钮
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
    cancelItem(item, items) {
      this.$emit('cancelItem', item, items)
    },
    selectItems(item, items) {
      // 选中前四位
      this.dropdownTitle1 = item.name
      this.$emit('selectItems', item, items)
    },
    selectItems2(item, items) {
      // 选择后四位
      this.dropdownTitle2 = item.name
      this.$emit('selectItems', item, items)
    },
    selectAllItems(item) {
      this.$emit('selectAllItems', item)
    },
    resetFilters() {
      // 重置
      alert('重置')
    },
    confirmFilters() {
      // 确认
      alert('确定')
    },
    confirmFilters2() {
      // 确认价格

      alert('确定价格')
    },
    selectedPrices(val) {
      this.dropdownTitle3 = val.name
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
