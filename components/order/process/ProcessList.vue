<template>
  <div class="pro-list">
    <div v-for="(item, index) in batchData" :key="index" class="item">
      <div class="node-name">
        <span>{{ item.serviceName }}</span>
      </div>
      <div class="infos">
        办理人员:
        <span> {{ item.handlerName || '-' }}</span>
        <span v-if="item.taskStatus === '已完成'" class="status status1">{{
          item.taskStatus
        }}</span>
        <span v-else class="status status2">{{ item.taskStatus }}</span>
      </div>
    </div>
    <div v-if="!batchData.length" class="no-data">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/78km3o58dnw0000.png"
        alt=""
        srcset=""
      />
      <p>暂无办理进度信息</p>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
  },
  props: {
    batchData: {
      type: Array,
      default() {
        return []
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
    border-bottom: 1px solid #f4f4f4;
    padding: 40px 0;
    .node-name {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-bottom: 20px;
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
  .no-data {
    text-align: center;
    width: 100%;
    padding: 100px 0;
    font-size: 24px;
    color: #999;
    img {
      width: 330px;
      height: 330px;
    }
  }
  .infos {
    font-size: 24px;
    overflow: hidden;
    span {
      line-height: 30px;
      margin-right: 10px;
    }
    .img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      float: left;
      display: block;
      font-size: 12px;
      margin-right: 20px;
    }
    .status {
      display: block;
      float: right;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 24px;
      font-weight: 400;
      border-radius: 4px;
    }
    .status1 {
      background: rgba(248, 248, 248, 1);
      color: #999;
    }
    .status2 {
      background: #e4eafe;
      color: rgba(73, 116, 245, 1);
    }
  }
}
</style>
