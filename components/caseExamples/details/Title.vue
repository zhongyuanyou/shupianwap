<template>
  <div class="title">
    <div class="title_tags">
      <span
        v-if="sellingGoodsData.salesGoodsSubVos.length > 1"
        class="title_tags_item title_tags_main"
        >套餐</span
      >
    </div>

    <p class="title_btitle">{{ sellingGoodsData.name }}</p>

    <div class="comment" @click="commentfn">
      <p class="tit">{{ comment }}</p>
      <p class="num">共999+评价</p>
      <sp-icon name="arrow" class="icon" />
    </div>
    <div class="title_bottom">
      <span class="title_bottom_money">{{
        sellingGoodsData.salesPrice !== '0.00'
          ? sellingGoodsData.salesPrice + '元'
          : '面议'
      }}</span>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
    SpIcon: Icon,
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
  .title_tags {
    span {
      background: #f0f2f5;
      border-radius: 4px;
      display: inline-block;
      margin-right: 12px;
    }
  }
}
</style>
