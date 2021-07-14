<template>
  <div class="invoice_preview">
    <sp-sticky>
      <Header class="my-header" title="查看电子发票"></Header>
      <sp-divider :style="{ margin: '0' }" />
    </sp-sticky>

    <div class="preview_content">
      <client-only>
        <div class="preview_image">
          <div v-if="list.id" class="preview_image_item">
            <Pdf
              v-for="i in list.numPages"
              :key="i"
              :src="list.pdfUrl"
              :page="i"
              class="pdf-set"
            />
          </div>
        </div>
      </client-only>
    </div>
    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import { Sticky, Image, Divider, Swipe, SwipeItem } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

// import Pdf from '@fe/vue-pdf'

import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { invoiceApi } from '@/api/index.js'

export default {
  layout: 'keepAlive',
  name: 'InvoicePreview',
  components: {
    LoadingCenter,
    Header,
    Pdf: () => import('@fe/vue-pdf'),
    [Sticky.name]: Sticky,
    [Image.name]: Image,
    [Divider.name]: Divider,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      pdfId: '',
      orderId: '',

      list: {},
    }
  },

  mounted() {
    this.orderId = this.$route.query.orderId
    this.pdfId = this.$route.query.pdfId

    this.init()
  },
  methods: {
    init() {
      if (!this.orderId && !this.pdfId) {
        return this.$xToast.error('没有信息')
      }
      // const res = [
      //   {
      //     id: '768005953635640743',
      //     invoiceTypeCode: '026',
      //     buyName: '3333',
      //     invoiceCode: '1111',
      //     invoiceNo: '222',
      //     pdfUrl:
      //       'https://cdn.shupian.cn/1625040012000_2020年顶联互动早训培训实施管理办法-V1.1(1).pdf',
      //   },
      //   {
      //     id: '1047597054856949880',
      //     invoiceTypeCode: '026',
      //     buyName: '123',
      //     invoiceCode: '123',
      //     invoiceNo: '123',
      //     pdfUrl: 'https://cdn.shupian.cn/1625129388000_27824495.pdf',
      //   },
      //   {
      //     id: '1118898219500491114',
      //     invoiceTypeCode: '004',
      //     buyName: '个人111',
      //     invoiceCode: '1111',
      //     invoiceNo: '11111',
      //   },
      // ]
      // const pdfInfo = res.find((item) => {
      //   return item.id === this.pdfId
      // })
      // console.log(pdfInfo)
      // this.pdfTask(pdfInfo)

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
          if (res) {
            const pdfInfo = res.find((item) => {
              return item.id === this.pdfId
            })
            console.log(pdfInfo)
            this.pdfTask(pdfInfo)
          }
        })
        .catch((error) => {
          this.loading = false
          console.error(error)
          this.$xToast.error(error.message || '请求失败，请重试')
        })
    },
    pdfTask(pdfInfo) {
      if (!pdfInfo || !pdfInfo.pdfUrl) return
      this.$pdf.createLoadingTask(pdfInfo.pdfUrl).promise.then((pdf) => {
        pdfInfo.numPages = pdf.numPages

        this.list = pdfInfo
      })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_preview {
  background: #ffffff;
  background: #f5f5f5;
  height: 100vh;

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  // position: relative;

  .preview_content {
    width: 100%;
  }
  .preview_image {
    width: 100%;
    text-align: center;
    padding: 60px;

    .pdf-set {
      margin-bottom: 40px;
    }
  }
}
</style>
