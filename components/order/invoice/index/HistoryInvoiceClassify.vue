<template>
  <!-- 分类 -->
  <sp-dropdown-menu>
    <sp-dropdown-item
      v-for="(item, index) of tabs"
      ref="tabs"
      :key="index"
      v-model="item.value"
      :title="item.title"
    >
      <template>
        <div class="custom">
          <div class="custom-container">
            <div
              v-for="option in item.options"
              :key="option.id"
              :class="option.value === item.value ? 'active' : ''"
              @click="custom(item, option, index)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
      </template>
    </sp-dropdown-item>

    <sp-dropdown-item
      ref="timePickerContainer"
      v-model="timePicker.value"
      :title="timePicker.title"
    >
      <template>
        <sp-picker
          ref="item2picker"
          :show-toolbar="false"
          :columns="timePickerColumns"
        >
          <template #columns-bottom>
            <sp-button class="btn" plain block type="primary" @click="onConfirm"
              >确认</sp-button
            >
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
      tabs: [
        {
          title: '全部发票类型',
          value: 0,
          options: [
            { text: '全部发票类型', value: 0 },
            { text: '电子普通发票', value: 1 },
            { text: '增值税专用电子发票', value: 2 },
          ],
        },
      ],
      timePicker: {
        title: '开票时间',
        value: 0,
      },
    }
  },
  computed: {
    timePickerColumns() {
      const nowDate = new Date()
      const year = nowDate.getFullYear()
      const columns = [{ text: '全部', value: 0 }]

      for (let i = 0; i <= year - 2000; i++) {
        columns.push({ text: year - i + '年', value: year - i })
      }
      const PickerColumns = [
        {
          defaultIndex: 0,
          values: columns,
        },
        {
          defaultIndex: 0,
          values: [
            { text: '全年', value: 0 },
            { text: '01月', value: 1 },
            { text: '02月', value: 2 },
            { text: '03月', value: 3 },
            { text: '04月', value: 4 },
            { text: '05月', value: 5 },
            { text: '06月', value: 6 },
            { text: '07月', value: 7 },
            { text: '08月', value: 8 },
            { text: '09月', value: 9 },
            { text: '10月', value: 10 },
            { text: '11月', value: 11 },
            { text: '12月', value: 12 },
          ],
        },
      ]
      return PickerColumns
    },
  },
  methods: {
    custom(item, option, index) {
      item.value = option.value
      item.title = option.text
      // console.log(item, option, index)
      this.$refs.tabs[index].toggle()
      this.$emit('select', this.tabs, this.timePicker)
    },

    // custom1(item) {
    //   this.title1 = item.text
    //   this.value1 = item.value
    //   this.$refs.item1.toggle()
    // },
    // custom2(item) {
    //   this.title2 = item.text
    //   this.value2 = item.value
    //   this.$refs.timePickerContainer.toggle()
    // },
    onConfirm() {
      const values = this.$refs.item2picker.getValues()
      this.timePicker.value = values

      console.log(values)
      this.$refs.timePickerContainer.toggle()
      this.$emit('select', this.tabs, this.timePicker.value)
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
::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
</style>
