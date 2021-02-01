<template>
  <div class="zhaoren">
    <div class="zhaoren-content">
      <div class="title">
        <div class="title-line"></div>
        <p class="title-name">顶呱呱</p>
        <div class="title-line"></div>
      </div>
      <p class="content">顶呱呱企业服务平台，2800万用户的选择</p>
      <p class="footer">顶呱呱科技股份版权所有</p>
    </div>
    <div class="bottom-height"></div>
  </div>
</template>

<script>
export default {
  name: 'ShuPianZhaoRen',
}
</script>

<style lang="less" scoped>
.zhaoren {
  width: 100%;
  .zhaoren-content {
    width: calc(100% - 80px);
    height: 210px;
    padding: 32px 0;
    font-family: PingFang SC;
    margin: 0 auto;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      .title-line {
        width: 90px;
        height: 1px;
        background-color: #c5c5c5;
      }
      .title-name {
        font-size: 32px;
        line-height: 32px;
        font-weight: bold;
        color: #555555;
        margin: 0 12px;
      }
    }
    .content {
      font-size: 24px;
      line-height: 24px;
      font-weight: 400;
      color: #999999;
      margin-bottom: 24px;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 20px;
      line-height: 20px;
      font-weight: 400;
      color: #c5c5c5;
    }
  }
  .bottom-height {
    width: 100%;
    height: 144px;
  }
}
</style>
