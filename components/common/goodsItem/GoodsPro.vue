<template>
  <a
    v-sensorsTrack:webClick="{
      recommend_number: goodsData.recomNo,
      com_level_1_code: goodsData.classCodeLevelList[0] || '',
      com_level_2_code: goodsData.classCodeLevelList[1] || '',
      commodity_level_1: '',
      commodity_level_2: '',
      commodity_type: '交易商品',
      commodity_number: goodsData.code,
      commodity_name: goodsData.name,
      n_now_price: goodsData.platformPrice,
    }"
    href="javascript:void(0);"
    class="goods-item"
    @click="jumpPage"
  >
    <div class="goods-lable-img">
      <span v-if="false" class="lable">2千元成交礼</span>
      <img v-lazy="goodsData.defaultImg + $ossImgSet(240, 240)" alt="" />
    </div>
    <div class="goods-info">
      <strong class="goods-name">
        <span v-if="false" class="pro-lable"><i>无字段</i></span
        >{{ goodsData.name }}</strong
      >
      <div v-if="false" class="goods-lable">
        <span>带地址</span>
        <span>无烂坏账</span>
        <span>小规模</span>
      </div>
      <div class="goods-sku">
        <span v-for="(item, index) in goodsData.fieldList" :key="index">{{
          item
        }}</span>
      </div>
      <div class="goods-price">
        <span class="sales-proce">
          <span class="big-value">{{ priceRest(0) }}</span>
          <span v-if="priceRest(1)" class="small-value"
            >.{{ priceRest(1) }}</span
          >
          <span class="unit">元</span>
        </span>
        <span class="original-price">{{ goodsData.goodsPrice }}元</span>
      </div>
      <div v-if="false" class="recommend">
        <span>荐</span>
        <p>卖家急售，公司干净，无否认卖家急售，公司干净，无否认</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    goodsData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    priceRest(index = 0) {
      if (!this.goodsData.platformPrice) return 0
      const isFlot = this.goodsData.platformPrice.indexOf('.')
      if (isFlot !== -1) {
        return this.goodsData.platformPrice.split('.')[index]
      }
      return index === 0 ? this.goodsData.platformPrice : ''
    },
    jumpPage() {
      this.$router.push({
        path: '/detail/transactionDetails',
        query: {
          type: this.goodsData.type,
          productId: this.goodsData.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.goods-item {
  font-size: 24px;
  width: 100%;
  padding: 32px 0;
  display: flex;
  overflow: hidden;
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
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 42px;
      margin-top: -3px;
      .textOverflow(2);
      .pro-lable {
        display: inline-block;
        position: relative;
        top: -2px;
        margin-right: 8px;
        background-color: #ec5330;
        border-radius: 4px;
        overflow: hidden;
        line-height: 32px;
        vertical-align: middle;
        > i {
          position: relative;
          font-style: inherit;
          display: inline-flex;
          align-items: center;
          padding: 0 7px;
          line-height: 32px;
          color: #fff;
          font-size: 20px;
          font-family: PingFang SC;
          color: #ffffff;
        }
      }
    }
    .goods-lable {
      display: flex;
      flex-wrap: wrap;
      > span {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
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
      margin-top: 12px;
      color: #222222;
      .textOverflow(1);
      > span {
        position: relative;
        display: inline;
        align-items: center;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        padding-right: 12px;
        margin: 8px 0 8px 0;
        &:not(:last-child) {
          &::after {
            content: '';
            position: relative;
            top: 4px;
            display: inline-block;
            margin-left: 12px;
            width: 0;
            height: 23px;
            border-right: 1px solid #222222;
          }
        }
      }
    }
    .goods-price {
      flex: 1;
      display: flex;
      margin-top: 16px;
      line-height: 18px;
      align-items: flex-end;
      vertical-align: middle;
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
          margin-left: 4px;
        }
      }
      .original-price {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-left: 16px;
        line-height: 30px;
        transform: translateY(5px);
        .textOverflow(1);
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
