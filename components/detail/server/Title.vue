<template>
  <div class="title">
    <p class="title_btitle">{{ sellingGoodsData.name }}</p>
    <div class="title_tags">
      <span
        v-if="
          sellingGoodsData.salesGoodsSubVos &&
          sellingGoodsData.salesGoodsSubVos.length &&
          sellingGoodsData.salesGoodsSubVos.length > 1
        "
        class="title_tags_item title_tags_main"
        >套餐</span
      >
    </div>
    <div
      v-if="comment.records && comment.records.length"
      class="comment"
      @click="commentfn"
    >
      <p class="tit">{{ comment.records[0].evaluateContent }}</p>
      <p class="num">共{{ comment.totalCount | count }}评价</p>
      <sp-icon name="arrow" class="icon" />
    </div>
    <div class="title_bottom">
      <p
        v-if="sellingGoodsData.priceType === 'PRO_FLOATING_PRICE'"
        class="title_bottom_money"
      >
        {{
          getServerPrice(sellingGoodsData.salesPrice || sellingGoodsData.price)
        }}%
        <span>服务费</span>
      </p>
      <span v-else class="title_bottom_money">{{
        sellingGoodsData.salesPrice !== '0.00' &&
        sellingGoodsData.refConfig &&
        sellingGoodsData.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
          ? sellingGoodsData.salesPrice + '元'
          : '面议'
      }}</span>
      <!-- <span class="title_bottom_num"
        >销量 {{ sellingGoodsData.salesVolume }}</span
      > -->
    </div>
    <PriceReduction ref="priceR"></PriceReduction>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
import PriceReduction from '~/components/detail/PriceReduction'
export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
    PriceReduction,
    SpIcon: Icon,
  },
  filters: {
    count(val) {
      if (isNaN(Number(val))) {
        return 0
      } else if (val < 999) {
        return val
      } else {
        return '999+'
      }
    },
  },
  props: {
    comment: {
      type: Object,
      default: () => {
        return {
          totalCount: 0, // 初始化评论字段,防止程序报错
          records: [],
        }
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
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
      return newPrice
    },
    handleShowPriceRed() {
      this.$refs.priceR.show = true
    },
    commentfn() {
      this.$emit('onComment')
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  padding: 60px 40px 45px 40px;
  background-color: #ffffff;
  border-bottom: 24px solid #f8f8f8;
  > .comment {
    margin-top: 32px;
    height: 64px;
    background: #ebf3ff;
    border-radius: 4px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4974f5;
    display: flex;
    align-items: center;
    padding: 0 20px;
    > .tit {
      width: 410px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > .num {
      width: 150px;
      margin-left: 30px;
    }
    > .icon {
      margin-left: auto;
    }
  }
  &_btitle {
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 52px;
    word-break: break-all;
  }
  &_tags {
    margin-top: 15px;
    display: flex;
    &_item {
      height: 32px;
      background-color: #f0f2f5;
      color: #5c7499;
      font-size: 22px;
      font-family: PingFang SC;
      padding: 0 7px;
      line-height: 32px;
      border-radius: 4px;
      font-weight: 400;
      margin-right: 12px;
    }
    &_main {
      background-color: #fc4e41;
      color: #ffffff;
      font-weight: bold;
    }
  }
  &_desc {
    margin-top: 26px;
    color: #999999;
    font-size: 26px;
    line-height: 38px;
    font-family: PingFang SC;
  }
  &_bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFang SC;
    margin-top: 50px;
    &_money {
      font-weight: bold;
      color: #ec5330;
      font-size: 44px;
      line-height: 52px;
      span {
        font-size: 22px;
      }
    }
    &_num {
      color: #999999;
      font-size: 24px;
      font-weight: 400;
    }
  }
}
</style>
