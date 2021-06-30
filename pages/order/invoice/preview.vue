<template>
  <div class="invoice_preview">
    <sp-sticky>
      <Header class="my-header" title="查看电子发票"></Header>
      <sp-divider :style="{ margin: '0' }" />
    </sp-sticky>

    <div class="preview_content">
      <client-only>
        <div class="preview_image">
          <sp-swipe
            class="my-swipe"
            :autoplay="0"
            indicator-color="white"
            @change="onSwipeChange"
          >
            <sp-swipe-item v-for="item of showList" :key="item.id">
              <Pdf
                v-if="ShowPdf"
                :autoplay="false"
                :src="item.pdfUrl"
                :page="1"
                class="pdf-set"
              />
            </sp-swipe-item>
            <template #indicator>
              <div class="progressText">
                {{ swipeCurrent + 1 }}/{{ showList.length }}
              </div>
            </template>
          </sp-swipe>
          <!-- <sp-image width="100%" :src="formData.img" /> -->
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
      orderId: '',

      swipeCurrent: 0,
      list: [],

      numPages: 1,
      ShowPdf: true,
    }
  },
  computed: {
    showList() {
      return this.list.filter((item) => {
        return item.pdfUrl
      })
    },
  },
  destroyed() {
    this.ShowPdf = false
  },
  mounted() {
    this.orderId = this.$route.query.orderId
    this.init()
  },
  methods: {
    onSwipeChange(index) {
      this.swipeCurrent = index
    },
    init() {
      if (!this.orderId) {
        return this.$xToast.error('没有指定订单')
      }
      const res = [
        {
          id: '768005953635640743',
          invoiceTypeCode: '026',
          buyName: '3333',
          invoiceCode: '1111',
          invoiceNo: '222',
          pdfUrl:
            'https://cdn.shupian.cn/1625040012000_2020年顶联互动早训培训实施管理办法-V1.1(1).pdf',
        },
        {
          id: '1047597054856949880',
          invoiceTypeCode: '026',
          buyName: '123',
          invoiceCode: '123',
          invoiceNo: '123',
          pdfUrl:
            'https://cdn.shupian.cn/1625038967000_2020年顶联互动早训培训实施管理办法-V1.1(1).pdf',
        },
        {
          id: '1118898219500491114',
          invoiceTypeCode: '004',
          buyName: '个人111',
          invoiceCode: '1111',
          invoiceNo: '11111',
        },
      ]

      this.list = res

      // this.loading = true
      // invoiceApi
      //   .preview_invoice(
      //     { axios: this.$axios },
      //     {
      //       orderId: this.orderId,
      //       // type: 1, // 是否查询订单商品信息，1查询，默认不查，根据订单id查询时有效
      //     }
      //   )
      //   .then((res) => {
      //     this.loading = false
      //     console.log(' res', res)

      //     this.formData = res || {}
      //   })
      //   .catch((error) => {
      //     this.loading = false
      //     console.error(error)
      //     this.$xToast.error(error.message || '请求失败，请重试')
      //   })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_preview {
  background: #ffffff;
  height: 100vh;

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  // position: relative;

  .preview_content {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
  }
  .preview_image {
    width: 100%;
    // position: absolute;

    text-align: center;
    // top: 50%;
    // transform: translateY(-50%);

    .progressText {
      margin: 40px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #222222;
      letter-spacing: 0;
      text-align: right;
    }
  }
}
</style>
