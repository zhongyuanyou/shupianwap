<template>
  <div class="invoice">
    <sp-sticky>
      <Header class="my-header" title="发票中心"></Header>
      <sp-work-tabs v-model="tabActive">
        <sp-work-tab title="全部发票">
          <AllInvoiceClassify />
        </sp-work-tab>
        <sp-work-tab title="开票历史">
          <HistoryInvoiceClassify />
        </sp-work-tab>
        <sp-work-tab title="抬头管理"></sp-work-tab>
      </sp-work-tabs>
    </sp-sticky>
    <AllInvoice v-if="tabActive === 0"></AllInvoice>
    <HistoryInvoice v-else-if="tabActive === 1"></HistoryInvoice>
    <HeadManagement v-else-if="tabActive === 2"></HeadManagement>
    <div>
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
    <!-- <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
      <template #right>
        <p class="process" @click="complaintList">反馈进度</p>
      </template> -->
    <!-- <TabCurve
      v-model="tabActive"
      :tabList="[{ label: '111' }, { label: '222' }]"
      :curentItem="0"
    ></TabCurve> -->

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
    // TabCurve,
    AllInvoice,
    AllInvoiceClassify,
    HistoryInvoice,
    HistoryInvoiceClassify,
    HeadManagement,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      tabActive: 0,
    }
  },
  methods: {
    // back() {
    //   if (this.isInApp) {
    //     this.$appFn.dggWebGoBack((res) => {})
    //     return
    //   }
    //   this.$router.back()
    // },
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
}
</style>
