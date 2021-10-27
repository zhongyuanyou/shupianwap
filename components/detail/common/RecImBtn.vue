<template>
  <sp-button
    v-if="plannerDetail.mchUserId"
    class="im_btn"
    @click="
      sendTemplateMsgWithImg(
        plannerDetail.mchUserId,
        plannerDetail.type,
        sellingGoodsData
      )
    "
    >{{ btnText }}</sp-button
  >
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import imHandle from '~/mixins/imHandle'
export default {
  components: {
    [Button.name]: Button,
  },
  mixins: [imHandle],
  props: {
    btnText: {
      type: String,
      default: '咨询更多',
    },
  },
  computed: {
    plannerDetail() {
      return this.$store.state.planner.isShare
        ? this.$store.state.planner.sharePlannerInfo
        : this.$store.state.planner.recodBottomPlanner
    },
    sellingGoodsData() {
      if (this.$route.path.match('detail/transactionDetails')) {
        // 交易商品详情
        return this.$store.state.tcProductDetail.detailData
      }
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  mounted() {},
}
</script>

<style></style>
