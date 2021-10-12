<template>
  <div class="title">
    <p class="title_btitle">{{ sellingGoodsData.name }}</p>
    <div
      v-if="
        type !== 'financing' &&
        sellingGoodsData.salesGoodsOperatings &&
        sellingGoodsData.salesGoodsOperatings.slogan
      "
      class="title_ad"
    >
      {{ sellingGoodsData.salesGoodsOperatings.slogan }}
    </div>
    <div v-if="tags.length" class="title_tags">
      <div v-for="(item, index) in tags" :key="index" class="title_tags_item">
        {{ item.tagValueName }}
      </div>
    </div>
    <div
      v-if="
        type === 'financing' &&
        sellingGoodsData.salesGoodsOperatings &&
        sellingGoodsData.salesGoodsOperatings.slogan
      "
      class="title-financing_ad"
    >
      {{ sellingGoodsData.salesGoodsOperatings.slogan }}
    </div>
    <!-- 融资贷款, 展示类型 -->
    <div v-if="type === 'financing'" class="title_bottom">
      <template v-if="sellingGoodsData.priceType === 'PRO_FLOATING_PRICE'">
        <div class="financing-content">
          <div class="money">
            {{
              getServerPrice(
                sellingGoodsData.salesPrice || sellingGoodsData.price
              )
            }}%
            <span>服务费</span>
          </div>
          <div class="desc">按照实际贷款金额收取服务费</div>
        </div>
        <sp-button class="btn" type="primary" @click="linkCreditEvaluation">
          额度估算
        </sp-button></template
      >
      <template v-else>
        <!--<span class="title_bottom_money">{{
          sellingGoodsData.salesPrice !== '0.00' &&
          sellingGoodsData.refConfig &&
          sellingGoodsData.refConfig.taskType != 'PRO_WANT_ORDER_DIGEST'
            ? sellingGoodsData.salesPrice + '元'
            : '面议'
        }}</span> -->
        <div class="financing-text">已有超2万人申请</div>
        <sp-button class="btn" type="primary" @click="linkCreditEvaluation">
          额度估算
        </sp-button>
      </template>
    </div>
    <!-- 原来逻辑 -->
    <div v-else class="title_bottom">
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
    <!-- 融资贷款 apply -->
    <div
      v-if="
        type === 'financing' &&
        sellingGoodsData.priceType === 'PRO_FLOATING_PRICE'
      "
      class="financing-apply"
    >
      已有超2万人申请
    </div>
    <PriceReduction ref="priceR"></PriceReduction>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
import PriceReduction from '~/components/detail/PriceReduction'
export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
    PriceReduction,
    [Button.name]: Button,
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
    type: {
      // 页面类型
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tags: [],
    }
  },
  computed: {
    sellingGoodsData() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  mounted() {
    // 构建服务标签
    if (
      Array.isArray(this.sellingGoodsData.salesGoodsTags) &&
      this.sellingGoodsData.salesGoodsTags.length
    ) {
      this.tags = this.sellingGoodsData.salesGoodsTags.reduce((acc, cur) => {
        // 服务| 销售商品
        if (cur.categoryCode === 'DSJTC20210514000042') {
          acc.push(cur)
        }
        return acc
      }, [])
    }
  },
  methods: {
    linkCreditEvaluation() {
      this.$router.push({
        path: '/detail/server/financing/creditEvaluation',
      })
    },
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
  },
}
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  padding: 40px 40px 32px 40px;
  background-color: #ffffff;
  border-radius: 24px;
  margin-bottom: 24px;
  &_btitle {
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 52px;
    word-break: break-all;
  }
  &_ad {
    color: #222;
    font-size: 26px;
    line-height: 40px;
    margin: 16px 0;
  }
  &-financing_ad {
    color: #222;
    font-size: 26px;
    line-height: 40px;
    margin: 16px 0 32px 0;
  }
  &_tags {
    margin-top: 18px;
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
    .money-mixin() {
      font-weight: bold;
      color: #ec5330;
      font-size: 44px;
      line-height: 52px;
      span {
        font-size: 22px;
      }
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: PingFang SC;
    margin-top: 32px;
    &_money {
      .money-mixin();
    }
    &_num {
      color: #999999;
      font-size: 24px;
      font-weight: 400;
    }
    .financing-content {
      .money {
        .money-mixin();
      }
      .desc {
        height: 34px;
        font-size: 24px;
        color: #999999;
        line-height: 34px;
      }
    }
    .financing-text {
      font-size: 24px;
      color: #222222;
      line-height: 34px;
    }
    .btn {
      background: #4974f5;
      width: 168px;
      height: 64px;
      border-radius: 4px;
      font-size: 30px;
      color: #ffffff;
      line-height: 42px;
      font-weight: bold;
      padding: 0;
    }
  }
  .financing-apply {
    margin-top: 65px;
    font-size: 24px;
    color: #222222;
    line-height: 34px;
  }
}
</style>
