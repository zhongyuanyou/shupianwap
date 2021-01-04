<template>
  <div class="company-select">
    <h6 v-text="titleName"></h6>
    <sp-cell
      border
      is-link
      @click="showPopup"
      :title="title"
      title-style="color:#222222;"
    >
      <template #right-icon>
        <my-icon name="tap_ic_pen_n" size="0.08rem" color="#cccccc"></my-icon>
      </template>
    </sp-cell>
    <sp-action-sheet
      v-model="show"
      :close-on-click-action="true"
      :actions="actions"
      @select="onSelect"
    />
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
        return '您需要办理哪项业务的变更服务？'
      },
    },
    actions: {
      type: Array,
      default: () => {
        return [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]
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
}
</style>
