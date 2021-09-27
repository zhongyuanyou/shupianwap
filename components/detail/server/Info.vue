<template>
  <div class="c-info">
    <div class="title">
      <div class="title__name">产品信息</div>
    </div>
    <div class="content">
      <div class="content__line">
        <span class="label">贷款期数：</span><span class="text">12，36</span>
      </div>
      <div class="content__line">
        <span class="label">月贷款利率：</span><span class="text">4.560%</span>
      </div>
      <div class="content__line">
        <span class="label">还款方式：</span
        ><span class="text">随借随还、先息后本</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GoodDetailInfo',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      sellingDetail: (state) => state.sellingGoodsDetail.sellingGoodsData,
    }),
  },
  mounted() {
    this.isShare = this.$route.query.isShare
  },
  methods: {},
}
</script>

<style lang="less" scoped>
@import '~@css/pages/detail/var.less';
.c-info {
  .c-space-mixin();
  padding: @c-padding;
  background: @c-bg;
  .title {
    .c-title-font-mixin();
  }
  .content {
    margin-top: 34px;
    &__line {
      margin-bottom: 20px;
      font-size: 30px;
      line-height: 42px;
      .label {
        color: #999;
      }
      .text {
        color: #222222;
      }
    }
  }
}
</style>
