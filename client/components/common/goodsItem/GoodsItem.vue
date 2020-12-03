<template>
  <div class="goods-item">
    <div class="goods-item-left">
      <img src="" alt="" class="goods-img" />
      <span class="tag">急售</span>
    </div>
    <div class="goods-right">
      <h3>全国地区 外资公司注册</h3>
      <p>累计服务10000家外资企业</p>
      <div class="tags"><span>极速办理</span><span>极速办理</span></div>
      <div class="price-sales"><span>3000元</span><span>销量 6000</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
}
</script>

<style lang="less" scoped>
.goods-item {
  display: flex;
  width: 100%;
  align-items: flex-start;
  overflow: hidden;
  .goods-item-left {
    position: relative;
    width: 160px;
    height: 160px;
    min-width: 160px;
    min-height: 160px;
    background: #f8f8f8;
    border-radius: 4px;
    margin: 40px 32px 0 40px;
    .goods-img {
      width: 160px;
      height: 160px;
      min-width: 160px;
      min-height: 160px;
    }
    .tag {
      position: absolute;
      font-size: 22px;
      line-height: 1;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      background: #fa5741;
      border-radius: 4px 0px 4px 0px;
      padding: 10px;
      left: 0;
      top: 0;
    }
  }
  .goods-right {
    display: flex;
    flex-direction: column;
    width: calc(100% - 52px);
    padding-right: 52px;
    overflow: hidden;
    h3 {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 38px;
      .textOverflow(2);
      overflow: hidden;
      margin-top: 36px;
      margin-bottom: 12px;
    }
    p {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-bottom: 12px;
      .textOverflow(1);
    }
    .tags {
      display: inherit;
      span {
        padding: 5px 8px;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 22px;
        line-height: 1;
        line-height: 1;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .price-sales {
      display: flex;
      align-items: flex-end;
      display: inherit;
      margin-top: 12px;
      margin-bottom: 34px;
      span {
        &:nth-child(1) {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          margin-right: 20px;
        }
        &:nth-child(2) {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
