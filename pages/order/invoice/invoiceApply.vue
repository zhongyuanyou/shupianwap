<template>
  <div class="invoice_apply">
    <sp-sticky>
      <Header class="my-header" title="发票信息"></Header>
    </sp-sticky>

    <div class="card">
      <div class="title">发票类型</div>
      <div class="options">
        <sp-button class="btn active" size="small" type="primary">
          电子普通发票
        </sp-button>
      </div>
      <div class="des">
        电子发票与纸质发票具有相同的法律效力，可以报销、售后、维权凭证，使用电子发票，不易丢失，更方便环保。
      </div>
    </div>

    <div class="card">
      <div class="title">发票抬头</div>
      <div class="options">
        <sp-button class="btn active" size="small" type="primary">
          个人
        </sp-button>
        <sp-button class="btn active" size="small" type="primary">
          单位
        </sp-button>
      </div>
      <div class="name">
        <sp-field
          v-model="formData.username"
          required
          label="个人名称"
          placeholder="请填写“个人”或您的姓名"
        />
      </div>
    </div>

    <div class="card">
      <div class="title">收票人信息</div>
      <div class="form">
        <sp-field
          v-model="formData.username"
          label="收票人手机"
          placeholder=""
        />
        <sp-field
          v-model="formData.email"
          label="收票人邮箱"
          placeholder="用来接收电子发票邮件，可选填"
        />
      </div>
    </div>

    <div class="card">
      <div class="title">发票内容</div>
      <div class="options">
        <sp-button class="btn active" size="small" type="primary">
          商品明细
        </sp-button>
      </div>
    </div>

    <div class="card">
      <div class="title">发票须知</div>
      <div class="tips">
        <div>1、发票金额为实际支付金额，不包含优惠券等；</div>
        <div>2、电子发票可以在订单确认后，在订单详情中查看和下载。</div>
      </div>
    </div>

    <LoadingCenter v-show="loading" />
  </div>
</template>
<script>
import {
  Toast,
  TopNavBar,
  Uploader,
  Bottombar,
  Sticky,
  BottombarButton,
  WorkTab,
  WorkTabs,
  Button,
  Field,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'

import AllInvoiceClassify from '@/components/order/invoice/index/AllInvoiceClassify.vue'
import HistoryInvoiceClassify from '@/components/order/invoice/index/HistoryInvoiceClassify.vue'

import AllInvoice from '@/components/order/invoice/index/AllInvoice.vue'
import HistoryInvoice from '@/components/order/invoice/index/HistoryInvoice.vue'

export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [Field.name]: Field,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      tabActive: 0,

      formData: {
        username: '',
        email: '',
      },
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
.invoice_apply {
  background: #f5f5f5;
  min-height: 100vh;
  font-size: 0;

  .card {
    background: #fff;
    margin-bottom: 20px;
    padding: 40px;

    .title {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
      line-height: 32px;
      padding-bottom: 40px;
    }

    .options {
      padding-bottom: 20px;
    }
    .des {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }
    .tips {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 36px;
    }
  }
  .btn::v-deep.sp-button--primary {
    min-width: 152px;
    background: #f5f5f5;
    color: #999999;

    border-radius: 8px;
    border: none;

    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: 26px;
  }
  .btn.active::v-deep.sp-button--primary {
    background: #f2f5ff;
    color: #4974f5;
  }
}
</style>
