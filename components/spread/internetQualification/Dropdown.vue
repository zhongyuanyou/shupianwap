<template>
  <div class="dropdown-menu">
    <div class="dropdown-menu-content" @click="showDropdownMenu">
      <span class="dropdown-menu-content-val">{{ showValue }}</span>
      <img
        class="dropdown-menu-content-img"
        src="https://cdn.shupian.cn/sp-pt/wap/images/4ehy9youej60000.png"
      />
    </div>
    <sp-action-sheet
      v-model="menuIsShow"
      :actions="dropList"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { ActionSheet } from '@chipspc/vant-dgg'

export default {
  name: 'Dropdown',
  components: {
    [ActionSheet.name]: ActionSheet,
  },
  props: {
    value: {
      type: [String, Object],
      default: () => {
        return ''
      },
    },
    options: {
      type: Array,
      default: () => {
        return [
          {
            name: '',
            color: '',
          },
        ]
      },
    },
    // 当数组里的是对象时，下列值必要
    onlyKey: {
      type: String,
      default: () => {
        return 'id'
      },
    },
    showKey: {
      type: String,
      default: () => {
        return 'name'
      },
    },
  },
  data() {
    return {
      menuIsShow: false,
    }
  },
  computed: {
    dropList() {
      return this.options
    },
    showValue() {
      return this.value.name || ''
    },
  },
  methods: {
    onSelect(item) {
      this.menuIsShow = false
      this.showValue = item.name
      this.$emit('input', item)
      this.$emit('select', item)

      // 更改选项颜色
      this.dropList.forEach((obj) => {
        if (obj.name === item.name) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    showDropdownMenu() {
      this.menuIsShow = true
    },
    isObject(item) {
      if (Object.prototype.toString.call(item) === '[object Object]') {
        return true
      }
      return false
    },
  },
}
</script>

<style lang="less" scoped>
.dropdown-menu {
  width: 100%;
  padding: 0 26px;
  height: 93px;
  background: #f8f8f8;
  border: 1px solid #f4f4f4;
  border-radius: 8px;
  .dropdown-menu-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .dropdown-menu-content-prefix {
      flex: none;
      font-size: 28px;
      font-weight: 400;
      color: #1a1a1a;
      margin-right: 33px;
    }
    .dropdown-menu-content-val {
      flex: none;
      font-size: 32px;
      line-height: 32px;
      font-weight: 400;
      color: #222222;
    }
    .dropdown-menu-content-img {
      flex: none;
      width: 20px;
      height: 11px;
      position: absolute;
      right: 0;
    }
  }
  // 穿透-遮罩
  /deep/ .sp-popup--bottom {
    width: @spread-page-width;
    left: 50%;
    right: auto;
    margin-left: calc(-@spread-page-width / 2);
    //transform: translateX(-126px); // 该属性因为组件样式未知bug，导致左侧出来一部分。且距离是一直固定是63px，不能转成rem
  }
  /deep/ .sp-overlay {
    width: @spread-page-width;
    left: 50%;
    right: auto;
    margin-left: calc(-@spread-page-width / 2);
  }
}
</style>
