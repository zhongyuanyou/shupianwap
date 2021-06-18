<template>
  <div class="dropdown-all">
    <div class="content-item-title">{{ title }}</div>
    <div class="dropdown-menu">
      <div class="dropdown-menu-content" @click="showDropdownList">
        <span v-if="!value" class="dropdown-menu-content-prefix">请选择</span>
        <span v-if="value" class="dropdown-menu-content-val">{{ value }}</span>
        <my-icon
          class="dropdown-menu-content-img"
          name="sear_ic_open"
          size="0.2rem"
          color="#cccccc"
        ></my-icon>
      </div>
      <sp-popup
        v-model="dropdownMenuIsShow"
        round
        position="bottom"
        :style="{ height: '55%' }"
      >
        <sp-picker
          title="选择主营业务"
          show-toolbar
          :default-index="Math.floor(options.length / 2)"
          :columns="options"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </sp-popup>
    </div>
  </div>
</template>

<script>
import { Picker, Popup } from '@chipspc/vant-dgg'

export default {
  name: 'Dropdown',
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      },
    },
    value: {
      type: String,
      default: () => {
        return ''
      },
    },
    options: {
      type: Array,
      default: () => {
        return [
          '不限',
          '科技信息',
          '广告传媒',
          '金融投资',
          '电子贸易',
          '教育培训',
          '物业地产',
          '经济中介',
          '建筑装饰',
          '家居建材',
          '通讯网络',
          '实业生产',
          '珠宝服饰',
          '文化初版',
          '印刷包装',
          '餐饮美容',
          '咨询服务',
          '食品农业',
          '会务展览',
          '物流供应链',
          '其他',
        ]
      },
    },
  },
  data() {
    return {
      dropdownMenuIsShow: false,
    }
  },
  methods: {
    onChange() {},
    // @--下拉
    onCancel() {
      this.dropdownMenuIsShow = false
    },
    onConfirm(value, index) {
      this.dropdownMenuIsShow = false
      this.$emit('update:value', value)
    },
    showDropdownList() {
      this.dropdownMenuIsShow = true
    },
  },
}
</script>

<style lang="less" scoped>
.dropdown-all {
  padding-top: 40px;
  padding-bottom: 24px;
}
.content-item-title {
  height: 34px;
  font-size: 36px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 32px;
}
.dropdown-menu {
  width: 100%;
  border-radius: 8px;
  .dropdown-menu-content {
    width: 100%;
    display: flex;
    height: 72px;
    align-items: center;
    position: relative;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 4px;
    padding: 0 24px;
    .dropdown-menu-content-prefix {
      flex: none;
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      margin-right: 33px;
    }
    .dropdown-menu-content-val {
      flex: none;
      font-size: 28px;
      color: #1a1a1a;
      font-weight: 400;
    }
    .dropdown-menu-content-img {
      flex: none;
      position: absolute;
      right: 24px;
    }
  }
}
/deep/ .sp-popup--bottom {
  width: @spread-page-width;
  left: 50%;
  right: auto;
  margin-left: calc(-@spread-page-width / 2);
  //transform: translateX(-@spread-page-width / 2); // 不用transform是因为将过渡给覆盖了。。。
  //transform: translateX(-126px); // 该属性因为组件样式未知bug，导致左侧出来一部分。且距离是一直固定是63px，不能转成rem
}
/deep/ .sp-overlay {
  width: @spread-page-width;
  left: 50%;
  right: auto;
  transform: translateX();
  margin-left: calc(-@spread-page-width / 2);
}
</style>
