<template>
  <div class="card">
    <div class="card-content">
      <h3>立即预约办证</h3>
      <sp-cell
        title-class="down-left"
        value-class="down-right"
        value="内容"
        is-link
        :border="false"
        arrow-direction="down"
        title="单元格"
        @click="show = true"
      >
        <template #default> 56646 </template>
      </sp-cell>
      <sp-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <div class="input-box"></div>
      <!-- <sp-image
        width="53"
        height="41"
        src="https://axhub.im/ax9/d3646aaab2db59bc/images/%E5%B7%A5%E5%95%86%E9%A2%91%E9%81%93%E9%A1%B5/u486.svg"
      /> -->
    </div>
  </div>
</template>
<script>
import {
  Image,
  Cell,
  CellGroup,
  ActionSheet,
  Toast,
  Icon,
  Field,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  data() {
    return {
      show: false,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      Toast(item.name)
    },
  },
}
</script>
<style lang="less" scoped>
.card {
  .card-content {
    margin: 8px auto;
    border-radius: 6px;
    width: 684px;
    height: 546px;
    background-color: #fff;
    display: block;
    position: relative;
    padding: 30px;
    box-shadow: 0 0 9px #999;
    text-align: center;
    h3 {
      font-size: 36px;
      height: 60px;
      padding: 0 10px;
      &:before {
        content: '';
        display: inline-block;
        width: 60px;
        height: 4px;
        vertical-align: middle;
        background: linear-gradient(to left, #918f8f, #fff);
      }
      &::after {
        content: '';
        display: inline-block;
        width: 60px;
        height: 4px;
        vertical-align: middle;
        background: linear-gradient(to right, #918f8f, #fff);
      }
    }
    // 表单下拉
    .sp-cell {
      background-color: #e6e6e6;
      border-radius: 5px;
      .down-left {
        display: inline-block !important;
        width: 166px !important;
        color: #666;
        flex: 0 0 20%;
      }
      .down-right {
        display: inline-block;
        width: 166px !important;
        color: #000;
        text-align: left;
      }
      .sp-image {
        position: absolute;
        top: 0px;
        right: 0px;
      }
    }
  }
}
</style>
