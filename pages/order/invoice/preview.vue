<template>
  <div class="invoice_preview">
    <sp-sticky>
      <Header class="my-header" title="查看电子发票"></Header>
      <sp-divider :style="{ margin: '0' }" />
    </sp-sticky>
    <div class="preview_image">
      <sp-image width="100%" :src="formData.img" />
    </div>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import { Sticky, Image, Divider } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { invoiceApi } from '@/api/index.js'

export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,

    [Sticky.name]: Sticky,
    [Image.name]: Image,
    [Divider.name]: Divider,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      orderId: '',
      formData: {},
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId
    this.init()
  },
  methods: {
    init() {
      if (!this.orderId) {
        return this.$xToast.error('没有指定订单')
      }
      this.loading = true
      invoiceApi
        .preview_invoice(
          { axios: this.$axios },
          {
            orderId: this.orderId,
            // type: 1, // 是否查询订单商品信息，1查询，默认不查，根据订单id查询时有效
          }
        )
        .then((res) => {
          this.loading = false
          console.log(' res', res)

          this.formData = res || {}
        })
        .catch((error) => {
          this.loading = false
          console.error(error)
          this.$xToast.error(error.message || '请求失败，请重试')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_preview {
  background: #ffffff;
  min-height: 100vh;
  position: relative;

  .preview_image {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
