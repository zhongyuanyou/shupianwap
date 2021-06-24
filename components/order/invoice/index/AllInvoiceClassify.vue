<template>
  <!-- 分类 -->
  <sp-dropdown-menu>
    <!-- 国际分类 -->
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

    <!-- <sp-dropdown-item ref="item2" v-model="value2" :title="title2">
      <template>
        <div class="custom">
          <div class="custom-container">
            <div
              v-for="item in option2"
              :key="item.id"
              :class="item.value === value2 ? 'active' : ''"
              @click="custom2(item)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </template>
    </sp-dropdown-item> -->
  </sp-dropdown-menu>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  data() {
    return {
      tabs: [
        {
          title: '开票状态',
          value: '',
          options: [
            { text: '全部状态', value: '' },
            { text: '待开票', value: 'INVOICE_STATUS_WAITE ' },
            { text: '开票中', value: 'INVOICE_STATUS_PROCESS' },
            { text: '开票成功', value: 'INVOICE_STATUS_SUCCESS' },
            { text: '开票失败', value: 'INVOICE_STATUS_FAIL' },
            { text: '审核中', value: 'INVOICE_STATUS_AUDIT' },
            { text: '已驳回', value: 'INVOICE_STATUS_REJECT' },
          ],
        },
        {
          title: '订单类型',
          value: '',
          options: [
            { text: ' 全部类型', value: '' },
            { text: '服务订单', value: 'PRO_CLASS_TYPE_SALES' },
            { text: '资源订单', value: 'PRO_CLASS_TYPE_TRANSACTION' },
          ],
        },
      ],
    }
  },
  methods: {
    custom(item, option, index) {
      item.value = option.value
      item.title = option.text
      // console.log(item, option, index)
      this.$refs.tabs[index].toggle()
      this.$emit('select', this.tabs)
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
.filter-footer {
  display: flex;
  height: 159px;
  box-sizing: border-box;
  padding: 31px 40px 32px 0;
  font-size: 0px;

  & > div:nth-child(1) {
    font-family: PingFangSC-Medium;

    text-align: center;
    padding: 0px 44px;
    .filter-footer-rest-icon {
      padding: 10px 0;
    }
    .filter-footer-rest-text {
      color: #1a1a1a;
      letter-spacing: 0;
      font-size: 24px;
      line-height: 24px;
    }
  }
  & > div:nth-child(2) {
    flex: 1;
    background: #4974f5;
    border-radius: 8px;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    line-height: 96px;
    height: 96px;
    cursor: pointer;
  }
}

::v-deep .sp-cell::after {
  border: 0;
}
::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
</style>
