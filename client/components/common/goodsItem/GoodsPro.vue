<template>
  <a href="javascript:void(0);" class="goods-item">
    <div class="goods-lable-img">
      <span class="lable">2千元成交礼</span>
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
    </div>
    <div class="goods-info">
      <strong class="goods-name">
        <span class="pro-lable"><i>双11大促</i></span
        >成都**科技有限科技有限科技有限科技有限科技有限科技有限科技有限</strong
      >
      <div class="goods-lable">
        <span>带地址</span>
        <span>无烂坏账</span>
        <span>小规模</span>
      </div>
      <div class="goods-sku">
        <span>锦江区</span>
        <span>有注册经营地址</span>
        <span>其他</span>
      </div>
      <div class="goods-price">
        <span class="sales-proce">
          <span class="big-value">4030</span>
          <span class="small-value">.52</span>
          <span class="unit">元</span>
        </span>
        <span class="original-price">4,510元</span>
      </div>
      <div class="recommend">
        <span>荐</span>
        <p>卖家急售，公司干净，无否认卖家急售，公司干净，无否认</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.goods-item {
  font-size: 24px;
  width: 100%;
  padding: 32px 0;
  display: flex;
  .goods-lable-img {
    position: relative;
    width: 240px;
    height: 240px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 32px;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.2);
    }
    > img {
      width: 100%;
      height: 100%;
    }
    > .lable {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      z-index: 2;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      height: 44px;
      padding: 0 12px;
      background: #ec5330;
      border-radius: 8px 0px 8px 0px;
    }
  }
  .goods-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .goods-name {
      display: flex;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 42px;
      margin-top: -4px;
      .textOverflow(2);
      .pro-lable {
        display: inline-block;
        position: relative;
        top: 4px;
        margin-right: 8px;
        background-color: #ec5330;
        border-radius: 4px;
        overflow: hidden;
        height: 32px;
        > i {
          position: relative;
          top: -8px;
          font-style: inherit;
          height: 32px;
          display: inline-flex;
          align-items: center;
          padding: 0 7px;
          color: #fff;
          font-size: 20px;
          line-height: 16px;
          font-family: PingFang SC;
          color: #ffffff;
        }
      }
    }
    .goods-lable {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 8px;
      > span {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        height: 28px;
        background: #f0f2f5;
        border-radius: 4px;
        padding: 0 6px;
        margin-right: 8px;
        margin-top: 10px;
        .textOverflow(1);
      }
    }
    .goods-sku {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      > span {
        display: flex;
        align-items: center;
        height: 23px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        padding-right: 12px;
        border-right: 1px solid #222222;
        margin: 8px 12px 8px 0;
        &:last-child {
          border-right: none;
        }
      }
    }
    .goods-price {
      display: flex;
      align-items: baseline;
      margin-top: 16px;
      line-height: 36px;
      .sales-proce {
        display: flex;
        align-items: baseline;
        .big-value {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        .small-value {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        .unit {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ec5330;
        }
      }
      .original-price {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-left: 16px;
      }
    }
    .recommend {
      width: 100%;
      margin-top: 8px;
      padding-top: 16px;
      display: flex;
      align-items: center;
      border-top: 1px solid #f4f4f4;
      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        background: #ffb042;
        border-radius: 4px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-right: 13px;
      }
      > p {
        flex: 1;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 32px;
        .textOverflow(1);
      }
    }
  }
}
</style>
