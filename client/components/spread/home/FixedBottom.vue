<template>
  <div class="fixed-bottom">
    <div class="left">
      <div class="avatar"></div>
      <div class="desc">
        <p class="guihuashi-name">王深林</p>
        <p><label class="guihuashi-label">金牌规划师</label></p>
      </div>
    </div>
    <div class="right">
      <sp-button type="primary">主要按钮</sp-button>
      <sp-button type="info">信息按钮</sp-button>
    </div>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
export default {
  name: 'FixedBottom',
  components: {
    [Button.name]: Button,
  },
}
</script>

<style lang="less" scoped>
.fixed-bottom {
  height: 144px;
  padding: 24px 40px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  .left {
    flex: none;
    display: flex;
    align-items: center;
    .avatar {
      flex: none;
      width: 80px;
      height: 80px;
      border-radius: 80px;
      background-color: #24ae68;
      margin-right: 25px;
    }
    .desc {
      flex: none;
      .guihuashi-name {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        margin-bottom: 10px;
      }
      .guihuashi-label {
        display: block;
        padding: 6px 8px;
        font-size: 22px;
        font-weight: 400;
        color: #7b6225;
        background: #ffefc5;
        border: 2px solid #dac79a;
        border-radius: 4px;
      }
    }
  }
  .right {
    font-size: 14px;
  }
}
</style>
