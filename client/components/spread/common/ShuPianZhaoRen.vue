<template>
  <div class="zhaoren">
    <div class="title">
      <div class="title-line"></div>
      <p class="title-name">薯片找人</p>
      <div class="title-line"></div>
    </div>
    <p class="content">薯片找人企业服务平台，2800万用户的选择</p>
    <p class="footer">薯片科技版权所有</p>
  </div>
</template>

<script>
export default {
  name: 'ShuPianZhaoRen',
}
</script>

<style lang="less" scoped>
.zhaoren {
  width: calc(100% - 80px);
  height: 210px;
  padding: 30px 0;
  font-family: PingFang SC;
  margin: 0 auto;
  margin-bottom: 144px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 9px;
    .title-line {
      width: 90px;
      height: 1px;
      background-color: #c5c5c5;
    }
    .title-name {
      font-size: 32px;
      font-weight: bold;
      color: #555555;
      margin: 0 12px;
    }
  }
  .content {
    font-size: 24px;
    font-weight: 400;
    color: #999999;
    margin-bottom: 16px;
    text-align: center;
  }
  .footer {
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #c5c5c5;
  }
}
</style>
