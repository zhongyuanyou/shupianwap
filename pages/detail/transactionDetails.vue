<template>
  <div class="company">
    <DetailTemplate
      :im-jump-query="imJumpQuery"
      scene-id1="app-jycpxq-01"
      scene-id2="app-jycpxq-02"
    />
  </div>
</template>

<script>
import DetailTemplate from '~/components/detail/DetailTemplate'
import { productDetailsApi } from '~/api'
import getUserSign from '~/utils/fingerprint'
import { GOODSLIST } from '~/config/constant'
export default {
  name: 'Id',
  components: {
    DetailTemplate,
  },
  async asyncData({ $axios, query, app, store }) {
    try {
      let tcProductDetailData = {}
      const { code, message, data } = await $axios.get(
        productDetailsApi.tcProductDetail,
        {
          params: {
            productId: query.productId,
          },
        }
      )
      if (code === 200) {
        tcProductDetailData = data
        store.commit('tcProductDetail/SET_TCPRODUCT_DETAIL', data)
        return { tcProductDetailData }
      } else {
        console.log(code, message)
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      tcProductDetailData: {
        classCodeLevelList: [],
        platformPrice: '0',
        classCodeLevel: '',
        qftDetails: {
          fieldValueCn: '',
          fieldValue: '',
          fieldValueList: [],
        },
      },
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    imJumpQuery() {
      const imdata = {
        productName: this.tcProductDetailData.name, // 产品名称
        productContent: this.tcProductDetailData.name, // 产品信息
        price: `${this.tcProductDetailData.platformPrice}元`, // 价格
        forwardAbstract: this.tcProductDetailData.name, // 摘要信息，可与显示内容保持一致
        routerId: 'IMRouter_APP_ProductDetail_Trade', // 路由ID
        imageUrl: this.tcProductDetailData.productImgArr
          ? this.tcProductDetailData.productImgArr
          : [GOODSLIST], // 产品图片
        unit: `${this.tcProductDetailData.platformPrice.split('.')[1]}元`, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      return imdata
    },
  },
  head: {
    title: '商品详情',
    meta: [
      { name: 'spptmd-track_code', content: 'SPW000014' },
      { name: 'conent_type', content: '1' },
    ],
  },
  layout: 'keepAlive',
  watchQuery: ['productId'],
}
</script>

<style lang="less" scoped></style>
