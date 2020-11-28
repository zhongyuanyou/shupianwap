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
        <sp-dropdown-item
          v-model="value1"
          title-class=""
          :title="dropdownTitle1"
        >
          <ForuDigit :child="befor_foru" />
        </sp-dropdown-item>
        <sp-dropdown-item
          v-model="value1"
          title-class=""
          :title="dropdownTitle2"
          ><ForuDigit :child="befor_foru2" />
        </sp-dropdown-item>
        <sp-dropdown-item
          v-model="value1"
          title-class=""
          :title="dropdownTitle3"
        >
          <PriceFilter
            :price-list="priceList"
            @minInput="minInput"
            @maxInput="maxInput"
          />
        </sp-dropdown-item>
        <sp-dropdown-item v-model="sortValue" :options="option2" />
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
import ForuDigit from '@/components/detail/ForuDigit'
import PriceFilter from '@/components/common/filters/PriceFilter'
export default {
  name: 'SelectPhone',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    ForuDigit,
    PriceFilter,
  },
  data() {
    return {
      // show: true,
      searchValue: null,
      sortValue: 'a',
      activeNames: ['1'],
      dropdownTitle1: '前四位',
      dropdownTitle2: '后四位',
      dropdownTitle3: '价格',
      value1: 0,
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      befor_foru: ['全部', 'AAA*', 'AAB', 'AAB', 'AAC', 'AAD'],
      befor_foru2: ['全部', 'AAA*', 'AAB', 'AAB', 'AAC', 'AAD'],
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
  },
}
</script>
<style lang="less" scoped>
.selectPhone {
  .top {
    /deep/.search {
      width: 100%;
    }
  }
}
</style>
