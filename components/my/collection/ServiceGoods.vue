<template>
  <div class="service-goods-component">
    <div
      class="service-goods-component-item"
      :class="{ invalid: info.status !== 'PRO_STATUS_PUT_AWAY' }"
    >
      <slot name="left"></slot>
      <sp-image
        class="img"
        fit="cover"
        :src="info.img || (info.productImgArr && info.productImgArr[0]) || ''"
      />
      <div class="desc">
        <div class="desc-container">
          <div class="desc-name">
            {{ info.name || '' }}
          </div>
          <div v-if="type === 'Service'" class="desc-label">
            <span
              v-if="info.salesGoodsSubVos && info.salesGoodsSubVos.length > 1"
              class="desc-label-tc"
            >
              套餐
            </span>
            <span
              v-for="(item, index) of info.salesGoodsTags"
              v-show="item.categoryCode === 'DSJTC20210514000042' && index < 3"
              :key="item.tagValueCode"
            >
              {{ item.tagValueName }}
            </span>
          </div>
          <div
            v-if="info.goodsSubDetailsName && type === 'Trading'"
            class="desc-text"
          >
            {{ info.goodsSubDetailsName }}
          </div>
          <div v-if="type === 'Service'" class="desc-text">
            {{ info.salesGoodsOperatings && info.salesGoodsOperatings.slogan }}
          </div>
          <div v-if="type === 'Trading'" class="desc-text">
            {{ info.slogan }}
          </div>
        </div>
        <div class="price-container">
          <span class="price">
            <span
              v-if="
                info.price == 0 ||
                info.price === '0.00' ||
                info.price === '0.0' ||
                info.price === '0'
              "
            >
              <span class="big-value">面议</span>
            </span>
            <span v-else
              >{{ info.price || info.salesPrice || info.platformPrice
              }}<span class="price-unit">元</span></span
            >
          </span>
          <!-- <span v-if="info.settlementPrice" class="original-price">
            {{ info.settlementPrice }}元
          </span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'

export default {
  name: 'EvaluateList',
  components: {
    [Image.name]: Image,
  },
  props: {
    type: {
      type: String,
      default: 'Service', // Service Or Trading
    },
    info: {
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
    // linkServiceGoodsDetail(info) {
    //   this.$router.push({
    //     path: '/detail',
    //     query: {
    //       productId: info.id,
    //     },
    //   })
    // },
  },
}
</script>
<style lang="less" scoped>
.service-goods-component {
  @item-padding: 32px 40px;
  @item-img-size: 130px;
  min-width: 0;

  .invalid {
    background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/2tl729383go0000.png);
    background-position: top right;
    background-repeat: no-repeat;
    background-size: 162px;
  }
  .service-goods-component-item {
    padding: 24px 32px 28px;
    background-color: #fff;
    // padding: @item-padding;
    font-family: @fontf-pfsc-med;

    display: flex;

    .img {
      width: 220px;
      height: 220px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .desc {
      // position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;

      padding-left: 32px;
      font-size: 0;
      overflow: hidden;
      min-width: 0;

      .desc-container {
        flex: 1;
        overflow: hidden;
        min-width: 0;
      }
      .desc-name {
        font-family: @fontf-pfsc-med;
        font-size: 32px;
        color: #222222;
        letter-spacing: 0;
        line-height: 42px;
      }
      .desc-label {
        margin-top: 7px;
        margin-right: -8px;
        span {
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          line-height: 20px;
          color: #5c7499;
          letter-spacing: 0;

          margin-right: 8px;
          margin-bottom: 4px;
          padding: 4px 6px;
          background: #f0f2f5;
          border-radius: 4px;
        }
        .desc-label-tc {
          background: #fc4e41;
          color: white;
          font-weight: 700;
        }
      }
      .desc-text {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #222222;
        letter-spacing: 0;
        line-height: 26px;
        padding: 18px 0 0;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // width: 100%;
        // .mixin-text-oneoverflow();
      }

      .price-container {
        .price {
          font-family: PingFangSC-Medium;
          font-weight: bold;
          font-size: 36px;
          color: #ec5330;
          letter-spacing: 0;
          line-height: 36px;
        }
        .price-unit {
          font-weight: bold;
          font-size: 22px;
          color: #ec5330;
          letter-spacing: 0;
          line-height: 22px;
        }
        .original-price {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #999999;
          letter-spacing: 0;
          line-height: 22px;
          margin-left: 16px;
        }
      }
    }
  }
}
</style>
