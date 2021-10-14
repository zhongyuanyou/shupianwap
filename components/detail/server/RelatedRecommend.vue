<template>
  <div v-if="productData.length" class="need">
    <sp-sticky ref="tabCurveRef" :offset-top="searchDomHeight" class="top">
      <p class="need_title">相关推荐</p>
    </sp-sticky>
    <sp-skeleton :row="10" :loading="needLoading">
      <div class="recomend_goods_list">
        <div
          v-for="(item, index) in productData"
          :key="index + '' + item.id"
          class="need_item"
          @click="toGoodsDeatil(item)"
        >
          <div class="inner">
            <div v-if="item.mchUserDataVO" class="goods_item_top">
              <div class="planer_header">
                <img :src="item.mchUserDataVO.photoPath" alt="" srcset="" />
              </div>
              <div class="planer_label">
                <div
                  v-for="(laberItem, laberIndex) in item.mchUserDataVO.tabs"
                  :key="laberIndex"
                  class="label_item"
                >
                  <span> {{ laberItem }}</span>
                </div>
              </div>
            </div>
            <p class="goods_name">
              {{ item.name }}
            </p>
            <div
              v-if="item.salesGoodsTags && item.salesGoodsTags.length > 1"
              class="goods_tags"
            >
              <span
                v-for="(labelItem, index2) in item.salesGoodsTags"
                v-show="labelItem.categoryCode === 'DSJTC20210514000042'"
                :key="index2"
                class="label_item"
                >{{ labelItem.tagValueName || labelItem.tagName }}</span
              >
            </div>
            <p
              v-if="item.priceType === 'PRO_FLOATING_PRICE'"
              class="goods_price"
            >
              <span class="money">
                {{ getServerPrice(item.salesPrice || item.price) }}%</span
              >服务费
            </p>
            <p v-else class="goods_price">
              <span class="money">{{ item.salesPrice || item.price }}</span
              >元
              <!-- <span
              v-if="
                item.refConfig &&
                item.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
              "
              class="monney"
            ></span>
            {{
              item.refConfig &&
              item.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
                ? (item.salesPrice || item.price) + '元'
                : '面议'
            }} -->
            </p>
          </div>
        </div>
      </div>
    </sp-skeleton>
  </div>
</template>

<script>
import { Image, Skeleton, Sticky } from '@chipspc/vant-dgg'
export default {
  name: 'RelatedRecommend',
  components: {
    [Image.name]: Image,
    [Skeleton.name]: Skeleton,
    [Sticky.name]: Sticky,
  },
  props: {
    productData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      needLoading: true,
      searchDomHeight: 0,
    }
  },
  computed: {
    detailType() {
      return this.$route.query.type ? this.$route.query.type : null
    },
  },
  methods: {
    getServerPrice(price) {
      let newPrice = ''
      if (typeof price !== 'string') price = String(price)
      if (price.match('.')) {
        const arr = price.split('.')
        if (Number(arr[1]) > 0) {
          newPrice = price
        } else {
          newPrice = arr[0]
        }
      } else {
        newPrice = price
      }
      return newPrice/100
    },
    getItemList(list) {
      const listArr = []
      list.forEach((item) => {
        if (item.fieldValueCn && item.fieldValueCn !== null) {
          listArr.push(item.fieldValueCn)
        } else if (item.fieldValue && item.fieldValueCn !== null) {
          listArr.push(item.fieldValue)
        }
      })
      return listArr
    },
  },
}
</script>

<style lang="less" scoped>
.need {
  padding: 20px 20px 0 20px;
  ::v-deep.sp-skeleton {
    margin-top: 64px;
  }
  ::v-deep.top {
    width: 100%;
    z-index: 2;
    .sp-sticky--fixed {
      width: 100%;
      position: fixed;
      top: 80px;
      left: 0;
      padding-left: 40px;
      height: 70px;
      background: white;
      box-shadow: 0px 1px 0px 0px #f4f4f4;
    }
  }
  .need_title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 36px;
  }
  .recomend_goods_list {
    column-count: 2;
    column-gap: 20px;
    .need_item {
      padding: 10px 0;
      break-inside: avoid;
      .inner {
        background: white;
        box-sizing: border-box;
        padding: 20px;
        font-size: 24px;
        height: auto;
        border-radius: 24px;
      }
      .goods_item_top {
        height: 120px;
        display: flex;
        .planer_header {
          width: 120px;
          height: 120px;
          overflow: hidden;
          border-radius: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .planer_label {
          padding-left: 20px;
          padding-top: 6px;
          flex: 1;
          .label_item {
            width: 100%;
            margin-bottom: 10px;
            font-size: 20px;
            overflow: hidden;
          }
          span {
            width: auto;
            background: #f1ece2;
            border-radius: 4px;
            padding: 4px 8px;
            color: #947e4c;
            float: left;
            padding: 2px 6px;
            .textOverflow(1);
          }
        }
      }
      .goods_name {
        font-size: 30px;
        color: #222222;
        letter-spacing: 0;
        line-height: 40px;
        margin-top: 20px;
        font-weight: 600;
        .textOverflow(2);
      }
      .goods_tags {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 20px;
        height: 40px;
        .label_item {
          margin-bottom: 20px;
          white-space: nowrap;
          overflow: hidden;
          float: left;
          width: auto;
          display: block;
          font-size: 20px;
          color: #5c7499;
          letter-spacing: 0;
          height: auto;
          background: #f0f2f5;
          border-radius: 4px;
          padding: 4px 6px;
          margin-left: 6px;
        }
        .label_item:first-child {
          margin-left: 0 !important;
        }
      }
      .goods_price {
        margin-top: 30px;
        font-size: 24px;
        color: #ec5330;
        letter-spacing: 0;
        line-height: 44px;
        .money {
          font-size: 36px;
          font-weight: 600;
        }
      }
    }
  }
}
.desc-label-tc {
  background: #fc4e41 !important;
  color: white !important;
  font-weight: 700 !important;
}
</style>
