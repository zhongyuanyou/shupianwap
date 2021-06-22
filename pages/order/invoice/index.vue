<template>
  <div class="invoice">
    <sp-sticky>
      <Header class="my-header" title="发票中心"></Header>
      <client-only>
        <sp-work-tabs v-model="tabActive" @click="onClickWorkTab">
          <sp-work-tab title="全部发票">
            <AllInvoiceClassify @select="AllInvoiceSelect" />
          </sp-work-tab>
          <sp-work-tab title="开票历史">
            <HistoryInvoiceClassify @select="HistoryInvoiceSelect" />
          </sp-work-tab>
          <sp-work-tab title="抬头管理"></sp-work-tab>
        </sp-work-tabs>
      </client-only>
    </sp-sticky>
    <sp-list
      v-if="list.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <AllInvoice v-if="tabActive === 0" :list="list"></AllInvoice>
      <HistoryInvoice v-else-if="tabActive === 1" :list="list"></HistoryInvoice>
      <HeadManagement v-else-if="tabActive === 2" :list="list"></HeadManagement>
    </sp-list>

    <div v-if="list.length == 0 && loading == false">
      <sp-empty
        class="empty-text"
        :description="
          tabActive === 0 || tabActive === 1
            ? '您还没有任何发票哦！'
            : '您尚未添加发票抬头哦！'
        "
        :image="$ossImgSetV2('feper6k9s0o0000.png')"
      />
    </div>
    <sp-bottombar v-if="tabActive === 2" safe-area-inset-bottom>
      <sp-bottombar-button type="primary" text="添加发票抬头" @click="toAdd" />
    </sp-bottombar>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Uploader,
  Bottombar,
  Sticky,
  BottombarButton,
  WorkTab,
  WorkTabs,
  Empty,
  List,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'
// import TabCurve from '@/components/common/tab/TabCurve.vue'
import AllInvoiceClassify from '@/components/order/invoice/index/AllInvoiceClassify.vue'
import HistoryInvoiceClassify from '@/components/order/invoice/index/HistoryInvoiceClassify.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'

import AllInvoice from '@/components/order/invoice/index/AllInvoice.vue'
import HistoryInvoice from '@/components/order/invoice/index/HistoryInvoice.vue'
import HeadManagement from '@/components/order/invoice/index/HeadManagement.vue'

export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [List.name]: List,

    // TabCurve,
    AllInvoice,
    AllInvoiceClassify,
    HistoryInvoice,
    HistoryInvoiceClassify,
    HeadManagement,
  },
  data() {
    return {
      tabActive: 0,
      tabActiveIndex: 0, // 激活的tab

      loading: false, // 加载效果状态
      error: false,
      finished: false,
      page: 1,
      limit: 15,

      list: [
        {
          number: 1,
          status: 1,
          goods: [
            {
              name: '1111111111111111111111111111111111111111111111111',
              img: '',
            },
            {
              name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              img: '',
            },
          ],
        },
        {
          number: 2,
          status: 2,
          goods: [
            {
              name: '1111111111111111111111111111111111111111111111111',
              img: '',
            },
            {
              name: '1111111111111111111111111111111111111111111111111',
              img: '',
            },
          ],
        },
      ],

      AllInvoiceSelectState: {},
      HistoryInvoiceSelectState: {},
    }
  },
  mounted() {
    this.init()
    this.onLoad()
  },
  methods: {
    toAdd() {
      this.$router.push('/order/invoice/add')
    },
    init() {
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },
    onLoad() {
      if (this.tabActive === 0) {
        this.getList()
      } else if (this.tabActive === 1) {
        this.getList()
      }
    },
    onClickWorkTab() {
      if (this.tabActiveIndex === this.tabActive) {
        return
      }

      this.tabActiveIndex = this.tabActive
      this.init()
      this.onLoad()
    },
    HistoryInvoiceSelect(tabs, timePicker) {
      console.log('tabs', tabs, timePicker)

      this.HistoryInvoiceSelectState = {}
    },
    AllInvoiceSelect(tabs) {
      console.log('tabs', tabs)
      this.AllInvoiceSelectState = {}
    },
    getList() {
      const params = {
        type: this.tabActive, //  1问题 2文章 3回答.默认问题
        limit: this.limit,
        page: this.page,
      }
      setTimeout(() => {
        this.loading = false
        this.finished = true
        this.list = [
          {
            number: 1,
            status: 1,
            goods: [
              {
                name: '1111111111111111111111111111111111111111111111111',
                img: '',
              },
              {
                name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                img: '',
              },
            ],
          },
          {
            number: 2,
            status: 2,
            goods: [
              {
                name: '1111111111111111111111111111111111111111111111111',
                img: '',
              },
              {
                name: '1111111111111111111111111111111111111111111111111',
                img: '',
              },
            ],
          },
        ]
      }, 1000)
      try {
        // const res = await this.$axios.get(knownApi.home.collection, { params })
        // this.loading = false
        // if (res.code === 200) {
        //   this.list.push(...res.data.rows)
        //   this.page++
        //   if (this.page > res.data.totalPage) {
        //     this.finished = true
        //   }
        // } else {
        //   this.error = true
        // }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.invoice {
  .empty-text ::v-deep .sp-empty__description {
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 30px;
  }
  // .footer-nav {
  //   position: fixed;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   bottom: 0;
  //   z-index: 999;
  //   width: 100%;
  //   background: #ffffff;
  //   padding-bottom: constant(safe-area-inset-bottom);
  //   padding-bottom: env(safe-area-inset-bottom);
  //   max-width: 1000px;
  // }
}
</style>
