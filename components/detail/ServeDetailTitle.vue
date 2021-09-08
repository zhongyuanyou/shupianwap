<template>
  <div class="title">
    <p class="title_btitle">{{ sellingGoodsData.name }}</p>
    <p
      v-if="
        sellingGoodsData.salesGoodsOperatings &&
        sellingGoodsData.salesGoodsOperatings.slogan
      "
      class="goods_slogan"
    >
      {{ sellingGoodsData.salesGoodsOperatings.slogan }}
    </p>
    <p class="title_tags">
      <span
        v-if="sellingGoodsData.salesGoodsSubVos.length > 1"
        class="title_tags_item title_tags_main tag_item"
        >套餐</span
      >
      <span
        v-for="(labelItem, index2) in sellingGoodsData.salesGoodsTags"
        v-show="labelItem.categoryCode === 'DSJTC20210514000042'"
        :key="index2"
        class="tag_item"
        >{{ labelItem.tagValueName }}</span
      >
    </p>
    <div class="title_bottom">
      <p
        v-if="
          sellingGoodsData.priceType === 'PRO_FLOATING_PRICE' &&
          sellingGoodsData.plannerRatio
        "
        class="title_bottom_money"
      >
        {{ sellingGoodsData.plannerRatio / 100 }}%
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
  },
  props: {
    comment: {
      type: String,
      default: '',
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
  .title_btitle {
    font-size: 44px;
    color: #1a1a1a;
    line-height: 56px;
  }
  .goods_slogan {
    width: 100%;
    font-size: 26px;
    color: #222222;
    line-height: 36px;
    margin-top: 20px;
  }
  .title_tags {
    margin-top: 15px;
    display: flex;
    .tag_item {
      height: 32px;
      background-color: #f0f2f5;
      color: #5c7499;
      font-size: 22px;
      padding: 0 7px;
      line-height: 32px;
      border-radius: 4px;
      font-weight: 400;
      margin-right: 12px;
    }
    .title_tags_main {
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
