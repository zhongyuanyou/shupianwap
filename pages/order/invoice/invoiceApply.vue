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
        <sp-button
          class="btn"
          :class="{ active: type === 1 }"
          size="small"
          type="primary"
          @click="type = 1"
        >
          个人
        </sp-button>
        <sp-button
          class="btn"
          :class="{ active: type === 2 }"
          size="small"
          type="primary"
          @click="type = 2"
        >
          单位
        </sp-button>
      </div>
      <div class="invoice_info">
        <sp-field
          v-if="type == 1"
          v-model="formData.applyUserName"
          required
          label="个人名称"
          placeholder="请填写“个人”或您的姓名"
        />
        <div v-if="type == 2">
          <sp-field
            v-model="formData.applyUserName"
            required
            label="单位名称"
            placeholder="请填写单位名称"
          />
          <sp-field
            v-model="formData.taxpayerIdentifNum"
            required
            label="纳税人识别号"
            placeholder="请填写纳税人识别号"
          />

          <div v-show="show_more_input" class="more_input">
            <sp-field
              v-model="formData.registerAddress"
              label="注册地址"
              placeholder="请填写注册地址"
            />
            <sp-field
              v-model="formData.username"
              label="注册电话"
              placeholder="请填写注册电话"
            />
            <sp-field
              v-model="formData.bankOfDeposit"
              label="开户银行"
              placeholder="请填写开户银行"
            />
            <sp-field
              v-model="formData.bankAccount"
              label="银行账号"
              placeholder="请填写银行账号"
            />
          </div>
          <div class="more_btn">
            <span @click="show_more_input = !show_more_input">
              更多选填项
              <my-icon
                :name="show_more_input ? 'shang' : 'xia'"
                size="0.2rem"
                color="#222222"
              ></my-icon>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="title">收票人信息</div>
      <div class="form">
        <sp-field
          v-model="formData.receiverPhone"
          label="收票人手机"
          placeholder=""
        />
        <sp-field
          v-model="formData.receiverEmail"
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
    <div class="card">
      <sp-button size="normal" block type="primary" disabled @click="submit">
        申请开票
      </sp-button>
    </div>
    <!--
    <sp-bottombar :fixed="false">
      <sp-bottombar-button type="primary" text="申请开票" @click="submit" />
    </sp-bottombar> -->

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

// 发票类型
const InvoiceType = {
  '027': '增值税电子专用发票',
  '026': '增值税电子普通发票 ',
  '007': '增值税普通发票 ',
  '004': '增值税专用发票',
}

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
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Field.name]: Field,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      tabActive: 0,

      type: 1, // 发票类型
      show_more_input: false,
      formData: {
        orderId: '', // 订单id
        applySource: '', // 申请来源
        applyUserId: '', // 申请人id
        applyUserName: '', // 申请人名称
        invoiceContent: '', // 发票内容（商品明细 、商品类别）
        // 发票抬头（个人 INVOICE_HEADER_PERSONAL 、 单位 INVOICE_HEADER_COMPANY）
        invoiceHeader: '',
        invoiceHeaderName: '', // 公司名称、个人名称
        invoiceType: '', // 发票类型 InvoiceType
        receiverPhone: '', // 收票人电话
        bankAccount: '', // 银行账号
        bankOfDeposit: '', // 开户银行
        receiverEmail: '', // 邮箱
        registerAddress: '', // 注册地址
        taxpayerIdentifNum: '', // 纳税人识别号

        username: '',
        email: '',
      },
    }
  },
  methods: {
    apply() {},
    submit() {
      // this.$xToast.show({ message: '提交成功' })
      this.$xToast.success('提交成功')
    },
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
      .btn {
        margin-right: 32px;
      }
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

    .invoice_info {
      .more_btn {
        text-align: center;
        & > span {
          margin-top: 32px;
          display: inline-block;
          border-radius: 24px;
          border: 1px solid #dddddd;
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 22px;
          text-align: center;
          padding: 13px 28px;
        }
      }
    }
  }
  .options .btn::v-deep.sp-button--primary {
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
  .options .btn.active::v-deep.sp-button--primary {
    background: #f2f5ff;
    color: #4974f5;
  }
}
</style>
