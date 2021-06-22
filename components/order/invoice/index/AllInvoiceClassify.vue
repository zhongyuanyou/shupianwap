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
    </sp-dropdown-item>
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
      value1: 0,

      value2: 0,
      title1: '开票状态',
      title2: '订单类型',
      option1: [
        { text: '全部状态', value: 0 },
        { text: '待开票', value: 1 },
        { text: '开发票', value: 2 },
        { text: '开票成功', value: 3 },
        { text: '开票失败', value: 4 },
        { text: '审核中', value: 5 },
        { text: '已驳回', value: 6 },
      ],
      option2: [
        { text: ' 全部类型', value: 0 },
        { text: '服务订单', value: 1 },
        { text: '资源订单', value: 2 },
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
