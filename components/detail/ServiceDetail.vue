<template>
  <div v-if="productDescribe" class="container">
    <p class="container_title">服务详情</p>
    <div class="container_html" v-html="productDescribe"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ServiceDetail',
  components: {},
  data() {
    return {
      containerLoading: true,
    }
  },
  computed: {
    ...mapState({
      productDescribe: (state) =>
        state.sellingGoodsDetail.sellingGoodsData.salesGoodsOperatings
          .productDescribe,
    }),
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 48px 40px 31px 40px;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 24px;
  }
  &_html {
    font-size: 26px;
    color: #595959;
    /deep/ img {
      max-width: 100%;
    }
  }
}
</style>
