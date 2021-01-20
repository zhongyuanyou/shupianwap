<template>
  <div class="company-select">
    <h6 v-text="titleName"></h6>
    <sp-cell
      border
      is-link
      title-style="color:#222222;"
      :title="title"
      @click="showPopup = show = true"
    >
      <template #right-icon>
        <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
      </template>
    </sp-cell>
    <sp-action-sheet v-model="show"
      ><sp-picker
        :default-index="defaultIndex"
        title="选择"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </sp-action-sheet>
  </div>
</template>
<script>
import { Cell, ActionSheet, Picker } from '@chipspc/vant-dgg'
export default {
  components: {
    [Cell.name]: Cell,
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
          '卫生许可证',
          '道路运输许可证',
          '医疗器械许可证',
          '进出口许可证',
          '食品通道许可证 HOT',
          '餐饮服务许可证',
          '医疗器械许可二类备案',
          '其他许可证',
        ]
      },
    },
  },
  data() {
    return {
      show: false,
      title: '不限',
      defaultIndex: 0,
    }
  },
  methods: {
    onConfirm(value, index) {
      this.$emit('onSelect', value)
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
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 4px;
    padding: 10px 24px;
    .sp-cell__title span {
      color: #222;
    }
  }
  // 下弹窗
  /deep/.flow {
    font-size: 26px;
    color: #555555;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    padding: 34px 19px 0 19px;
  }
  /deep/ .sp-overlay,
  /deep/ .sp-popup--bottom {
    margin-left: -(@spread-page-width / 2);
    width: @spread-page-width;
    left: 50%;
    .sp-picker-column__item {
      color: #555;
    }
    // 选中后
    .sp-picker-column__item--selected {
      color: #222;
    }
  }
}
</style>
