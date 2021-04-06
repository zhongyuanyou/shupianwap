<template>
  <div class="pro-list">
    <div
      v-for="(item, index) in batchData"
      :key="index"
      class="item"
      :class="index === 0 ? 'no-border' : ''"
    >
      <div class="node-name">
        <span>{{ item.serviceName }}</span>
        <span class="status">{{ item.taskStatus }}</span>
      </div>
      <p>办理人员：{{ item.handlerName }}</p>
    </div>
    <div class="item">
      <div class="node-name">
        <span>材料提交</span>
        <span class="status">未完成</span>
      </div>
      <p>办理人员：张三</p>
    </div>
    <div class="item">
      <div class="node-name">
        <span>实地勘察</span>
        <span class="status">未完成</span>
      </div>
      <p>办理人员：王五</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    batchData: {
      type: Array,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.pro-list {
  background: white;
  padding: 0 40px;
  .item {
    border-top: 1px solid #f4f4f4;
    padding: 40px 0;
    .node-name {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-bottom: 20px;
      .status {
        display: block;
        float: right;
        padding: 4px 8px;
        background: #f8f8f8;
        border-radius: 4px;
        font-size: 24px;
        color: #999999;
        font-weight: 400;
      }
    }
    p {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 24px;
    }
  }
  .no-border {
    border-top: none;
  }
}
</style>
