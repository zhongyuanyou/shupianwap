<template>
  <div class="select-desired">
    <h6 v-text="titleName"></h6>
    <div class="select-item">
      <span
        v-for="(item, index) of selectList"
        :key="index"
        :class="index === selectActive ? 'select-list--active' : ''"
        class="select-list"
        @click="onSelectActive(item, index)"
        v-text="item.name"
      >
      </span>
    </div>
  </div>
</template>
<script>
import {
  TopNavBar,
  Icon,
  Toast,
  Image,
  Cell,
  Popup,
  ActionSheet,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    // 待删除--
    [Toast.name]: Toast,
    [Image.name]: Image,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [ActionSheet.name]: ActionSheet,
  },
  props: {
    titleName: {
      type: String,
      default: () => {
        return '你的身份？'
      },
    },
    selectList: {
      type: Array,
      default: () => {
        return [
          {
            name: '经办人',
          },
          {
            name: '法人',
          },
          {
            name: '股东',
          },
        ]
      },
    },
  },
  data() {
    return {
      show: false,
      title: '注册类型',
      selectActive: 0,
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    // 选择的内容
    onSelectActive(item, index) {
      this.selectActive = index
      this.$emit('onSelectActive', item)
    },
  },
}
</script>
<style lang="less" scoped>
.select-desired {
  padding: 64px 40px 0 40px;
  h6 {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 1;
    margin-bottom: 32px;
  }
  .select-item {
    display: flex;
    .select-list {
      display: inline-block;
      width: 149px;
      height: 72px;
      line-height: 72px;
      text-align: center;
      background: #f8f8f8;
      border-radius: 8px;
      font-size: 24px;
      font-weight: 400;
      color: #1a1a1a;
      box-sizing: content-box;
    }
    .select-list:not(:last-child) {
      margin-right: 24px;
    }
    .select-list--active {
      background: #ffffff;
      border: 3px solid #000000;
      width: 143px;
      line-height: 66px;
      border-radius: 8px;
    }
  }
}
</style>
