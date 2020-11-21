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
      :is-select-more="false"
      @cancelItem="cancelItem"
      @selectItems="selectItems"
    />
  </div>
</template>

<script>
import OpenApp from '@/components/app/OpenApp'
import InstallApp from '@/components/app/InstallApp'
import SelectCheckBox from '@/components/filters/SelectCheckBox'
export default {
  name: 'xyg',
  components: {
    OpenApp,
    InstallApp,
    SelectCheckBox,
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
    cancelItem(item, items) {
      // 取消的选项
      console.log(item, items)
    },
    selectItems(item, items) {
      // 选中的选项，返回当前选中项和所有的选中项
      console.log(item, items)
    },
  },
}
</script>

<style scoped></style>
