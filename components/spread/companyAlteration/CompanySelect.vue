<template>
  <div class="company-select">
    <h6 v-text="titleName"></h6>
    <sp-cell
      border
      is-link
      :title="title"
      title-style="color:#222222;"
      @click="showPopup"
    >
      <template #right-icon>
        <my-icon name="tap_ic_pen_n" size="0.18rem" color="#cccccc"></my-icon>
      </template>
    </sp-cell>
    <sp-action-sheet v-model="show" @select="onSelect"
      ><sp-picker
        title="请选择专业"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </sp-action-sheet>
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
  Picker,
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
    [Picker.name]: Picker,
  },
  props: {
    titleName: {
      type: String,
      default: () => {
        return '您需要办理哪项业务的变更服务？'
      },
    },
    columns: {
      type: Array,
      default: () => {
        return [
          '建造工程',
          '铁路工程',
          '港口和航道工程',
          '水利水电工程',
          '电力工程',
          '港口和航道工程',
          '水利水电工程',
          '电力工程',
        ]
      },
    },
  },
  data() {
    return {
      show: false,
      title: '不限',
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onSelect(item) {
      this.$emit('onSelect', item.name)
      this.title = item.name
      this.actions.forEach((element) => {
        if (element.name === this.title) element.className = 'action-style'
        else element.className = ''
      })
    },
    onConfirm(value, index) {
      this.title = value
      this.show = false
    },
    onCancel() {
      this.show = false
    },
  },
}
</script>
<style lang="less" scoped>
.company-select {
  padding: 64px 40px 0 40px;
  h6 {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 1;
    margin-bottom: 32px;
  }
  /deep/.sp-cell {
    background: #ffffff;
    border: 1px solid #cdcdcd;
    opacity: 0.5;
    border-radius: 4px;
    padding: 10px 24px;
  }
  // 选中样式
  .action-style {
    color: #5a79e8;
    font-weight: bold;
  }
}
</style>
