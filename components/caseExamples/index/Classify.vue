<template>
  <!-- 分类 -->
  <sp-dropdown-menu>
    <sp-dropdown-item
      v-model="tab1.value"
      :title="tab1.title"
      :options="tab1.option"
      @change="change($event)"
    />

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
      tab1: {
        title: '开票状态',
        value: '',
        options: [
          { text: '默认排序', value: 1 },
          { text: '评分由高到低', value: 2 },
        ],
      },
      tabs: [
        {
          title: '订单类型',
          value: '',
          options: [
            { text: ' 全部类型', value: '' },
            { text: '服务订单', value: '1' },
            { text: '资源订单', value: '2' },
            // { text: '服务订单', value: 'PRO_CLASS_TYPE_SALES' },
            // { text: '资源订单', value: 'PRO_CLASS_TYPE_TRANSACTION' },
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
      this.$emit('select', this.tab1, this.tabs)
    },

    change(val) {
      this.$emit('select', this.tabs)
      // this.title1 = this.option1.find((item) => {
      //   return item.value === val
      // }).text
    },
  },
}
</script>

<style lang="less" scoped>
.custom {
  // padding: 56px 40px 56px;
  padding: 56px 40px 32px;
  overflow: hidden;
  font-size: 0px;
  line-height: 0px;
  border-top: 1px solid #f5f5f5;

  .custom-container {
    margin: 0 -12px;
    & > div {
      display: inline-block;
      min-width: 140px;
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

::v-deep .sp-cell::after {
  border: 0;
}
::v-deep .sp-dropdown-menu__bar {
  box-shadow: none;
}
::v-deep .sp-dropdown-menu__title {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #222222;
  letter-spacing: 0;
  text-align: center;
}
::v-deep .sp-dropdown-menu__title::after {
  right: -12px;
}
</style>
