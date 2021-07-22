<template>
  <div class="invoice_preview">
    <HeaderSlot>
      <Header class="my-header" title="查看电子发票"></Header>
      <!-- <sp-divider :style="{ margin: '0' }" /> -->
    </HeaderSlot>

    <div class="preview_content">
      <client-only>
        <div class="preview_image">
          <div class="preview_image_item">
            <!-- <Pdf
              v-for="i in list.numPages"
              :key="i"
              :src="list.pdfUrl"
              :page="i"
              class="pdf-set"
            /> -->
            <div id="demo"></div>
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
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'

import Header from '@/components/common/head/header.vue'
import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { invoiceApi } from '@/api/index.js'

export default {
  layout: 'keepAlive',
  name: 'InvoicePreview',
  components: {
    LoadingCenter,
    Header,
    // Pdf: () => import('@fe/vue-pdf'),
    HeaderSlot,
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
      this.pdfh5 = new Pdfh5('#demo', {
        pdfurl: pdfInfo.pdfUrl,
      })
      // 监听完成事件
      this.pdfh5.on('complete', function (status, msg, time) {
        console.log(
          '状态：' +
            status +
            '，信息：' +
            msg +
            '，耗时：' +
            time +
            '毫秒，总页数：' +
            this.totalNum
        )
      })

      // this.$pdf.createLoadingTask(pdfInfo.pdfUrl).promise.then((pdf) => {
      //   pdfInfo.numPages = pdf.numPages

      //   this.list = pdfInfo
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_preview {
  background: #ffffff;
  background: #f5f5f5;
  min-height: 100vh;

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  // position: relative;

  .preview_content {
    width: 100%;
  }
  .preview_image {
    // width: 100%;
    // text-align: center;
    // padding: 60px;

    .pdf-set {
      margin-bottom: 40px;
    }
  }
  #demo {
    // height: auto;
    background: none;
  }
}
</style>
