<template>
  <!-- 分类 -->
  <sp-dropdown-menu>
    <!-- 国际分类 -->
    <sp-dropdown-item ref="item1" v-model="value1" :title="title1">
      <template>
        <div class="custom">
          <div class="custom-container">
            <div
              v-for="item in option1"
              :key="item.id"
              :class="item.value === value1 ? 'active' : ''"
              @click="custom1(item)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </template>
    </sp-dropdown-item>

    <sp-dropdown-item ref="item2" v-model="value2" :title="title2">
      <template>
        <sp-picker :show-toolbar="false" :columns="columns">
          <template #columns-bottom>
            <sp-button class="btn" plain block type="primary">确认</sp-button>
          </template>
        </sp-picker>
      </template>
    </sp-dropdown-item>
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem, Picker, Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Picker.name]: Picker,
    [Button.name]: Button,
  },
  data() {
    return {
      value1: 0,
      value2: 0,

      title1: '全部发票类型',
      title2: '开票时间',

      option1: [
        { text: '全部发票类型', value: 0 },
        { text: '电子普通发票', value: 1 },
        { text: '增值税专用电子发票', value: 2 },
      ],
      columns: [
        // 第一列
        {
          values: [
            { text: '全部', value: '0' },
            { text: '2021年', value: 2021 },
            { text: '2020年', value: 2020 },
            { text: '2019年', value: 2019 },
            { text: '2018年', value: 2018 },
            { text: '2017年', value: 2017 },
            { text: '2016年', value: 2016 },
            { text: '2015年', value: 2015 },
            { text: '2014年', value: 2014 },
            { text: '2013年', value: 2013 },
            { text: '2012年', value: 2012 },
            { text: '2011年', value: 2011 },
            { text: '2010年', value: 2010 },
          ],
          defaultIndex: 0,
        },
        // 第二列
        {
          values: [
            { text: '全年' },
            { text: '01月' },
            { text: '02月' },
            { text: '03月' },
            { text: '04月' },
            { text: '05月' },
            { text: '06月' },
            { text: '07月' },
            { text: '08月' },
            { text: '09月' },
            { text: '10月' },
            { text: '11月' },
            { text: '12月' },
          ],
          defaultIndex: 0,
        },
      ],
    }
  },
  methods: {
    custom1(item) {
      this.title1 = item.text
      this.value1 = item.value
      this.$refs.item1.toggle()
    },
    custom2(item) {
      this.title2 = item.text
      this.value2 = item.value
      this.$refs.item2.toggle()
    },
    // change1(val) {
    //   this.title1 = this.option1.find((item) => {
    //     return item.value === val
    //   }).text
    // },
  },
}
</script>

<style lang="less" scoped>
.option-title {
  padding: 55px 40px 32px;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  font-size: 36px;
  color: #1a1a1a;
  line-height: 36px;
}
.custom {
  padding: 56px 40px 56px;
  overflow: hidden;
  font-size: 0px;
  line-height: 0px;

  .custom-container {
    margin: 0 -12px;
    & > div {
      display: inline-block;
      min-width: 150px;
      // min-width: 20%;
      text-align: center;
      background: #f8f8f8;
      border-radius: 4px;
      word-break: normal;
      white-space: nowrap;

      padding: 20px 12px;
      margin: 0 12px 24px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      line-height: 24px;
      color: #222222;
    }
    .active {
      background: #f2f5ff;
      color: #4974f5;
    }
  }
}
.btn::v-deep.sp-button--primary {
  font-family: PingFangSC-Medium, PingFang SC;
  border: none;
  border-top: 1px solid #f4f4f4;
  font-weight: bold;
  font-size: 32px;
}

::v-deep .sp-cell::after {
  border: 0;
}
</style>
