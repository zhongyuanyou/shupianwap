<template>
  <div>
    <OpenApp />
    <InstallApp />
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
    <br />
    <BottomConfirm />
    <br />
    <sp-datetime-picker
      v-model="currentDate"
      type="date"
      title="自定义列排序"
      :columns-order="['month', 'day', 'year']"
      :formatter="formatter"
    />
    <br />
    <goods-item />
  </div>
</template>

<script>
import { DatetimePicker } from '@chipspc/vant-dgg'
import OpenApp from '@/components/common/app/OpenApp'
import InstallApp from '@/components/common/app/InstallApp'
import SelectCheckBox from '@/components/common/filters/SelectCheckBox'
import PriceFilter from '@/components/common/filters/PriceFilter'
import BottomConfirm from '@/components/common/filters/BottomConfirm'
import GoodsItem from '@/components/common/goodsItem/GoodsItem'

export default {
  name: 'Xyg',
  components: {
    OpenApp,
    InstallApp,
    SelectCheckBox,
    [DatetimePicker.name]: DatetimePicker,
    PriceFilter,
    BottomConfirm,
    GoodsItem,
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
      currentDate: new Date(),
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
    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    },
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

<style scoped>
button {
  font-size: 28px;
}
</style>
