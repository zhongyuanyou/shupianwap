<template>
  <div class="invoice_apply">
    <sp-sticky
      ref="sticky"
      :class="{
        scroTopStyle: Boolean(opacity),
      }"
      @scroll="scrollHandle"
    >
      <Header
        class="my-header"
        :back-icon-color="opacity == 1 ? '' : '#fff'"
        :title="opacity == 1 ? '发票详情' : ''"
      ></Header>
    </sp-sticky>

    <div
      ref="status_container"
      class="status_container"
      :style="{ backgroundImage: `url(${status.bk})` }"
    >
      <div class="status_title">
        <my-icon :name="status.icon" color="#fff" size="0.4rem"></my-icon>

        {{ status.title }}
      </div>
      <div class="status_des">{{ status.des }}</div>
      <div class="status_tips">{{ status.tips }}</div>
    </div>

    <div class="card">
      <div class="type_list">
        <span>发票类型</span>
        <span>{{ InvoiceType[formData.invoiceType] }}</span>
      </div>
    </div>

    <div class="card">
      <div class="title">发票信息</div>

      <div class="invoice_info_list">
        <div>发票内容</div>
        <div>{{ formData.invoiceContent }}</div>
      </div>
      <div class="invoice_info_list">
        <div>抬头类型</div>
        <div>
          {{
            formData.invoiceHeader == 'INVOICE_HEADER_PERSONAL'
              ? '个人'
              : '单位'
          }}
        </div>
      </div>
      <div class="invoice_info_list">
        <div>抬头名</div>
        <div>{{ formData.invoiceHeaderName }}</div>
      </div>
      <div class="invoice_info_list">
        <div>开票金额</div>
        <div v-if="formData.invoiceMoney">
          {{ formData.invoiceMoney }}元
          <span @click="moneyTips">
            <my-icon
              name="guanyu_mian"
              color="#D8D8D8"
              size="0.28rem"
            ></my-icon>
          </span>
        </div>
      </div>
      <div class="invoice_info_list">
        <div>申请时间</div>
        <div>{{ formData.applyTime || '-' }}</div>
      </div>
      <div class="invoice_info_list">
        <div>开票时间</div>
        <div>{{ formData.invoiceTime || '-' }}</div>
      </div>
    </div>

    <div class="card">
      <div class="title">接受信息</div>
      <div class>
        <div class="invoice_info_list">
          <div>手机号码</div>
          <div>{{ formData.receiverPhone }}</div>
        </div>
        <div class="invoice_info_list">
          <div>电子邮箱</div>
          <div>{{ formData.receiverEmail }}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="title">发票须知</div>
      <div class="tips">
        <div>1、发票金额为实际支付金额，不包含优惠券等；</div>
        <div>2、电子发票可以在订单确认后，在订单详情中查看和下载。</div>
      </div>
    </div>
    <div
      v-if="
        formData.invoiceStatus == 'INVOICE_STATUS_REJECT' ||
        formData.invoiceStatus == 'INVOICE_STATUS_FAIL' ||
        formData.invoiceStatus == 'INVOICE_STATUS_SUCCESS'
      "
      class="card footer"
    >
      <sp-button
        v-if="
          formData.invoiceStatus == 'INVOICE_STATUS_REJECT' ||
          formData.invoiceStatus == 'INVOICE_STATUS_FAIL'
        "
        size="normal"
        type="primary"
        plain
        @click="toInvoiceApply"
      >
        重新申请
      </sp-button>
      <sp-button
        v-if="formData.invoiceStatus == 'INVOICE_STATUS_SUCCESS'"
        size="normal"
        type="default"
        plain
        @click="showEmailDialog = true"
      >
        发送邮箱
      </sp-button>
      <sp-button
        v-if="formData.invoiceStatus == 'INVOICE_STATUS_SUCCESS'"
        size="normal"
        type="default"
        plain
        @click="toPreview"
      >
        查看发票
      </sp-button>
    </div>
    <LoadingCenter v-show="loading" />
    <sp-dialog
      v-model="showEmailDialog"
      title="请确认邮箱地址"
      show-cancel-button
      :before-close="emailConfirm"
    >
      <div class="email_input">
        <input
          v-model="sendEmail"
          type="text"
          class=""
          placeholder="用来接收电子发票邮件"
        />
      </div>
    </sp-dialog>
  </div>
</template>
<script>
import {
  Toast,
  TopNavBar,
  Bottombar,
  BottombarButton,
  Sticky,
  WorkTab,
  WorkTabs,
  Button,
  Field,
  Dialog,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { invoiceApi } from '@/api/index.js'

import changeMoney from '@/utils/changeMoney.js'

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
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      opacity: 0,
      loading: false, // 加载效果状态

      orderId: '', // 订单id

      // 发票类型
      InvoiceType: {
        '027': '增值税电子专用发票',
        '026': '增值税电子普通发票 ',
        '007': '增值税普通发票 ',
        '004': '增值税专用发票',
      },
      formData: {
        status: 1,

        applyUserName: '',
        applyUserId: '', // 申请人id
        invoiceMoney: '', // 发票金额
        applySource: '', // 申请渠道
        receiverEmail: '', // 收票人邮箱
        receiverPhone: '', // 收票人电话
        bankAccount: '', // 开户账号
        bankOfDeposit: '', // 开户银行
        registerTel: '', // 注册电话
        registerAddress: '', // 注册地址
        taxpayerIdentifNum: '', // 纳税人识别号

        invoiceHeaderName: '', // 发票抬头名称
        invoiceHeader: '', // 发票抬头类型
        invoiceContent: '', // 发票内容（商品明细 、商品类别）
        invoiceType: '', // 发票类型
        invoiceStatus: '', // 发票状态
        orderNo: '',
        orderId: '',
        invoiceApplyNo: '', // 申请号
        id: '', // 发票id

        applyTime: '',
        invoiceTime: '',

        remarks: '', // 备注（被驳回）
      },

      sendEmail: '',
      showEmailDialog: false,

      imgList: {
        primary: '2s7aonmjbgq0000.png', // 审核中，开票中
        warning: 'd3y3vfj6l9c0000.png', // 已驳回
        danger: '7rkfmb1m3ig0000.png', // 开票失败
        success: 'esetx9jdoag0000.png', // 已开票
      },
    }
  },
  computed: {
    status() {
      const info = {
        INVOICE_STATUS_AUDIT: {
          icon: 'shijian',
          bk: this.$ossImgSetV2(this.imgList.primary),
          title: '审核中',
          des: '您的开票申请正在审核中',
          tips: '请耐心等待',
        },
        INVOICE_STATUS_REJECT: (info = '发票信息错误') => {
          return {
            icon: 'tixing',
            bk: this.$ossImgSetV2(this.imgList.warning),
            title: '已驳回',
            des: '您的开票申请已被驳回，请和商户沟通后再重新提交',
            tips: '驳回原因：' + info,
          }
        },
        INVOICE_STATUS_PROCESS: {
          icon: 'shijian',
          bk: this.$ossImgSetV2(this.imgList.primary),
          title: '开票中',
          des: '您的发票正在开票中',
          tips: '请耐心等待',
        },
        INVOICE_STATUS_FAIL: (info) => {
          return {
            icon: 'tixing',
            bk: this.$ossImgSetV2(this.imgList.danger),
            title: '开票失败',
            des: '您的开票申请已失败，请核对开票信息后再重新提交',
            tips: '失败原因：' + info,
          }
        },
        INVOICE_STATUS_SUCCESS: {
          icon: 'wancheng',
          bk: this.$ossImgSetV2(this.imgList.success),
          title: '已开票',
          des: '您的开票申请已经办理完成',
          tips: '请对本次服务进行评价，谢谢您的支持',
        },
      }
      const invoiceStatus = this.formData?.invoiceStatus || ''
      if (
        invoiceStatus === 'INVOICE_STATUS_REJECT' ||
        invoiceStatus === 'INVOICE_STATUS_FAIL'
      ) {
        return info[invoiceStatus](this.formData.remarks || '未知错误')
      }
      return info[invoiceStatus] || {}
    },
  },
  mounted() {
    // this.moneyTips()
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
        .invoice_detail(
          { axios: this.$axios },
          {
            orderId: this.orderId,
            // type: 1, // 是否查询订单商品信息，1查询，默认不查，根据订单id查询时有效
          }
        )
        .then((res) => {
          this.loading = false
          console.log(' res', res)
          if (res && res.invoiceMoney) {
            res.invoiceMoney = changeMoney.regFenToYuan(res.invoiceMoney)
          }
          if (res && res.receiverEmail) {
            this.sendEmail = res.receiverEmail
          }
          this.formData = res || {}
          // {
          //   applySource: "COMDIC_PLATFORM_CRISPS",
          //   applyTime: "2021-06-28 14:21:24",
          //   applyUserId: "767579755195165966",,
          //   applyUserName: "唐代兵",
          //   bankAccount: "",
          //   bankOfDeposit: "",
          //   // goods: [,…],
          //   id: "1251978880678714646",
          //   invoiceApplyNo: "FP210628005002",
          //   invoiceContent: "商品明细",
          //   invoiceHeader: "INVOICE_HEADER_PERSONAL",
          //   invoiceHeaderName: "h1",
          //   invoiceMoney: "2",
          //   invoiceStatus: "INVOICE_STATUS_PROCESS",
          //   invoiceType: "027",
          //   isValid: 1,
          //   orderId: "8083886946797813760",
          //   orderNo: "D21052164188",
          //   receiverEmail: "h@adtk.cn",
          //   receiverPhone: "17608390654",
          //   registerAddress: "",
          //   registerTel: "",
          //   signStoreId: "607997736314104054",
          //   signStoreName: "案加测试一公司",
          //   taxpayerIdentifNum: "",
          // }
        })
        .catch((error) => {
          this.loading = false
          console.error(error)
          this.$xToast.error(error.message || '请求失败，请重试')
        })
    },
    toPreview() {
      this.$router.push({
        path: '/order/invoice/preview',
        query: {
          orderId: this.formData.orderId,
        },
      })
    },
    toInvoiceApply() {
      this.$router.push({
        path: '/order/invoice/invoiceApply',
        query: {
          orderId: this.formData.orderId,
        },
      })
    },

    submit() {
      // this.$xToast.show({ message: '提交成功' })
      this.$router.push('/order/invoice/invoiceApply')
      this.$xToast.success('提交成功')
    },
    moneyTips() {
      // 待审核弹窗
      Dialog.alert({
        title: '温馨提示',
        message: '您好！现展示的为订单预计开票金额，最终金额以发票实际开具为准',
      }).then(() => {
        // on close
      })
    },
    emailConfirm(action, done) {
      if (action === 'cancel') {
        return done()
      }
      if (this.sendEmail) {
        invoiceApi
          .send_invoice_to_email(
            { axios: this.$axios },
            {
              email: this.sendEmail,
              orderId: this.formData.orderId,
            }
          )
          .then((res) => {
            console.log('res', res)
            this.loading = false
            this.$xToast.success((res && res.message) || '成功')
            done()
          })
          .catch((error) => {
            console.error(error)
            done(false)
            this.loading = false
            this.$xToast.error((error && error.message) || '请求失败，请重试')
          })
      } else {
        this.$xToast.error('请输入邮箱地址')
        done(false)
      }
    },
    scrollHandle({ scrollTop }) {
      const statusContainerHeight = this.$refs.status_container.offsetHeight
      // console.log(this.$refs.sticky)
      const headerHeight = this.$refs.sticky.height
      console.log(statusContainerHeight, headerHeight)

      // 滚动事件
      if (scrollTop > statusContainerHeight - headerHeight) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
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
.scroTopStyle {
  ::v-deep.sp-sticky {
    // border: 1px solid #f4f4f4;
    background-color: #ccc !important;
  }
  ::v-deep .my-head {
    background: #fff;
  }
}
::v-deep .my-head {
  background: none;
}

.invoice_apply {
  background: #f5f5f5;
  min-height: 100vh;
  font-size: 0;

  .status_container {
    margin-top: -0.88rem;
    text-align: center;
    height: 303px;
    background-color: #999999;
    background-size: cover;
    background-repeat: no-repeat;

    .status_title {
      font-size: 40px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 40px;
      padding: 100px 0 34px;
    }
    .status_des {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
      padding-bottom: 16px;
    }
    .status_tips {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 24px;
    }
  }
  .card {
    background: #fff;
    margin-bottom: 20px;
    padding: 40px;

    .type_list {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 32px;
      display: flex;
      & > span:nth-child(1) {
        flex: 1;
      }
      & > span:nth-child(2) {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 30px;
      }
    }
    .title {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #000000;
      line-height: 32px;
      padding-bottom: 20px;
      display: flex;
    }

    .options {
      padding-bottom: 20px;
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

    .invoice_info_list {
      display: flex;
      padding: 16px 0;
      & > div:nth-child(1) {
        width: 150px;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 40px;
      }
      & > div:nth-child(2) {
        flex: 1;
        padding-left: 10px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 40px;
      }
    }
  }
  .card.footer {
    text-align: right;
    padding: 24px;

    ::v-deep.sp-button {
      margin-left: 20px;
    }
  }
  .email_input {
    display: block;
    margin: 40px 44px 48px;
    border-radius: 8px;
    border: 1px solid #dddddd;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    input {
      width: 100%;
      border: 0;
      padding: 22px 24px;
      box-sizing: border-box;
    }
  }
}
</style>
