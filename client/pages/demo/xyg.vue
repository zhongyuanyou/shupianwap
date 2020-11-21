<template>
  <div>
    <OpenApp />
    <br />
    <InstallApp />
    <br />
    <button @click="showAll">全部</button>
    <button @click="hideMore">隐藏</button>
    <button @click="clearSelect">清除所有选项</button>
    <SelectCheckBox
      ref="selectCheckBox"
      :select-list="selectList"
      :gutter="12"
      :is-select-more="false"
      @cancelItem="cancelItem"
      @selectItems="selectItems"
      @selectAllItems="selectAllItems"
    />
    <br />
    <PriceFilter
      :price-list="priceList"
      @minInput="minInput"
      @maxInput="maxInput"
    />
  </div>
</template>

<script>
import OpenApp from '@/components/app/OpenApp'
import InstallApp from '@/components/app/InstallApp'
import SelectCheckBox from '@/components/filters/SelectCheckBox'
import PriceFilter from '@/components/filters/PriceFilter'
export default {
  name: 'xyg',
  components: {
    OpenApp,
    InstallApp,
    SelectCheckBox,
    PriceFilter,
  },
  data() {
    return {
      selectList: [
        {
          id: '1',
          name: '科技信息',
        },
        {
          id: '2',
          name: '科技信息',
        },
        {
          id: '3',
          name: '科技信息',
        },
        {
          id: '4',
          name: '科技信息',
        },
        {
          id: '5',
          name: '科技信息',
        },
        {
          id: '6',
          name: '科技信息',
        },
        {
          id: '7',
          name: '科技信息',
        },
        {
          id: '8',
          name: '科技信息',
        },
        {
          id: '9',
          name: '科技信息',
        },
        {
          id: '10',
          name: '科技信息',
        },
        {
          id: '11',
          name: '科技信息',
        },
        {
          id: '12',
          name: '科技信息',
        },
        {
          id: '13',
          name: '科技信息',
        },
        {
          id: '14',
          name: '科技信息',
        },
        {
          id: '15',
          name: '科技信息',
        },
        {
          id: '16',
          name: '科技信息',
        },
        {
          id: '17',
          name: '科技信息',
        },
        {
          id: '18',
          name: '科技信息',
        },
        {
          id: '19',
          name: '科技信息',
        },
        {
          id: '20',
          name: '科技信息',
        },
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
    showAll() {
      this.$refs.selectCheckBox.showAll()
    },
    hideMore() {
      this.$refs.selectCheckBox.hideMore()
    },
    clearSelect() {
      this.$refs.selectCheckBox.clearSelect()
    },
    selectAllItems(item) {
      // 点击不限按钮
      console.log(item)
    },
    cancelItem(item, items) {
      // 取消的选项
      console.log(item, items)
    },
    selectItems(item, items) {
      // 选中的选项，返回当前选中项和所有的选中项
      console.log(item, items)
    },
    minInput(val) {
      // 最小输入框
      console.log(val)
    },
    maxInput(val) {
      // 最大输入框
      console.log(val)
    },
  },
}
</script>

<style scoped></style>
