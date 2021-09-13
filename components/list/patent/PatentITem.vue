<template>
  <div class="patent_goods_item">
    <p class="patent_name-area">
      <span class="patent_type"></span>
      {{ goodsItem.name }}
    </p>
    <p class="goods_tag">
      <span
        v-if="
          goodsItem.salesGoodsSubVos && goodsItem.salesGoodsSubVos.length > 1
        "
        class="tc_tag"
      >
        套餐
      </span>
      <span
        v-for="(tagitem, tagindex) in goodsItem.tag"
        v-show="tagitem.categoryCode === 'DSJTC20210514000042'"
        :key="tagindex"
      >
        {{ tagitem.tagValueName }}
      </span>
    </p>
    <div class="price_area">
      <p
        v-if="
          goodsItem.priceType === 'PRO_FLOATING_PRICE' && goodsItem.plannerRatio
        "
        class="price"
      >
        {{ goodsItem.plannerRatio / 100 }}%
        <span>服务费</span>
      </p>
      <p
        v-else-if="
          goodsItem.refConfig &&
          goodsItem.refConfig.taskType === 'PRO_WANT_ORDER_DIGEST'
        "
        class="price"
      >
        面议
      </p>
      <p v-else class="price">
        {{ goodsItem.price === '0.00' ? '面议' : goodsItem.price
        }}<span v-if="goodsItem.price !== '0.00'">元</span>
      </p>
      <div class="todetail" @click="toGoodsDeatil(goodsItem)">查看详情</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style></style>
