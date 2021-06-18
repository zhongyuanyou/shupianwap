<template>
  <div class="company">
    <DetailTemplate scene-id1="app-fwcpxq-01" scene-id2="app-jycpxq-02" />
    <ShareModal />
  </div>
</template>

<script>
import DetailTemplate from '@/components/detail/DetailTemplate1.vue'
import { productDetailsApi } from '@/api'
import ShareModal from '@/components/common/ShareModal.vue'
export default {
  name: 'SellingGoodsDetail',
  components: {
    DetailTemplate,
    ShareModal,
  },
  async asyncData({ $axios, query, store }) {
    try {
      let sellingGoodsDetailData = {}
      const { code, message, data } = await $axios.post(
        productDetailsApi.sellingGoodsDetail,
        {
          id: query.productId,
          configFlg: 1,
          floatingFlg: 1,
          withSalesSubsFlg: 1,
          withTagsFlg: 1,
          withGoodsSubFlg: 1,
          withOperatingsFlg: 1,
          clientType: 'COMDIC_TERMINAL_APP',
        }
      )
      if (code === 200) {
        sellingGoodsDetailData = data
        store.commit('sellingGoodsDetail/SET_SELLING_GOODS_DETAIL', data)
      } else {
        throw message
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      isShare: false,
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
  },
  mounted() {
    this.isShare = this.$route.query.isShare
  },
  layout: 'keepAlive',
  watchQuery: ['productId'],
}
</script>

<style lang="less" scoped></style>
