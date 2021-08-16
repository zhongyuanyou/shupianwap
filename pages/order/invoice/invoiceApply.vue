<template>
  <div class="invoice_apply">
    <HeaderSlot>
      <Header class="my-header" title="发票信息"></Header>
    </HeaderSlot>

    <div class="card">
      <div class="title">发票类型</div>
      <div class="options">
        <sp-button
          v-for="(invoicetype, key) in InvoiceType"
          :key="key"
          class="btn"
          :class="{ active: key === formData.invoiceType }"
          size="small"
          type="primary"
          @click="click_invoicetype(key)"
        >
          {{ invoicetype }}
        </sp-button>
      </div>
      <div class="des">
        电子发票与纸质发票具有相同的法律效力，可以报销、售后、维权凭证，使用电子发票，不易丢失，更方便环保。
      </div>
    </div>
    <sp-form ref="form">
      <div class="card">
        <div class="title">发票抬头</div>
        <div class="options">
          <sp-button
            v-for="(invoice_header, key) in InvoiceHeader"
            v-show="
              key == 'INVOICE_HEADER_COMPANY' ||
              (formData.invoiceType != '004' && formData.invoiceType != '027')
            "
            :key="key"
            class="btn"
            :class="{ active: key === formData.invoiceHeader }"
            size="small"
            type="primary"
            @click="click_invoice_header(key)"
          >
            {{ invoice_header }}
          </sp-button>
        </div>

        <div class="invoice_info">
          <sp-field
            v-if="formData.invoiceHeader === 'INVOICE_HEADER_PERSONAL'"
            v-model="formData.invoiceHeaderName"
            required
            label="个人名称"
            placeholder="请填写“个人”或您的姓名"
            maxlength="100"
            :rules="[{ required: true, message: '请填写“个人”或您的姓名' }]"
          />
          <div v-else-if="formData.invoiceHeader === 'INVOICE_HEADER_COMPANY'">
            <sp-field
              v-model="formData.invoiceHeaderName"
              required
              label="单位名称"
              placeholder="请填写单位名称"
              maxlength="100"
              :rules="[{ required: true, message: '请填写单位名称' }]"
            />
            <sp-field
              v-model="formData.taxpayerIdentifNum"
              required
              label="纳税人识别号"
              maxlength="20"
              placeholder="请填写纳税人识别号"
            />

            <div v-show="show_more_input" class="more_input">
              <sp-field
                v-model="formData.registerAddress"
                label="注册地址"
                maxlength="80"
                placeholder="请填写注册地址"
              />
              <sp-field
                v-model="formData.registerTel"
                label="注册电话"
                maxlength="20"
                placeholder="请填写注册电话"
              />
              <sp-field
                v-model="formData.bankOfDeposit"
                label="开户银行"
                maxlength="45"
                placeholder="请填写开户银行"
              />
              <sp-field
                v-model="formData.bankAccount"
                label="银行账号"
                maxlength="45"
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
            required
            maxlength="60"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          />
          <sp-field
            v-model="formData.receiverEmail"
            label="收票人邮箱"
            maxlength="80"
            placeholder="用来接收电子发票邮件，可选填"
          />
        </div>
      </div>
    </sp-form>
    <div class="card">
      <div class="title">发票内容</div>
      <div class="options">
        <sp-button
          v-for="(content, key) in InvoiceContent"
          :key="content"
          class="btn"
          :class="{ active: key === formData.invoiceContent }"
          size="small"
          type="primary"
          @click="formData.invoiceContent = key"
        >
          {{ content }}
        </sp-button>
        <!-- <sp-button class="btn active" size="small" type="primary">
          商品明细
        </sp-button> -->
      </div>
    </div>

    <div class="card">
      <div class="title">发票须知</div>
      <div class="tips">
        <div>1、发票金额为实际支付金额，不包含优惠券等；</div>
        <div>2、电子发票开具成功后可在发票中心查看和下载；</div>
      </div>
    </div>
    <div class="card">
      <sp-button
        class="submit"
        size="normal"
        block
        type="primary"
        :disabled="submitDisabled"
        @click="submit"
      >
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
  Form,
  Field,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import Header from '@/components/common/head/header.vue'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { invoiceApi } from '@/api/index.js'
import contractApi from '@/api/contract'
const InvoiceType = {
  '007': '增值税普通发票 ',
  '026': '增值税电子普通发票',
  '004': '增值税专用发票',
  '027': '增值税电子专用发票',
}

export default {
  layout: 'keepAlive',
  name: 'InvoiceApply',
  components: {
    LoadingCenter,
    HeaderSlot,
    Header,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Form.name]: Form,
    [Field.name]: Field,
  },

  data() {
    return {
      loading: false, // 加载效果状态

      show_more_input: false,
      // 发票类型
      InvoiceType: {
        // '007': '增值税普通发票 ',
        // '026': '增值税电子发票',
        // '004': '增值税专用发票',
        // '027': '增值税电子专用发票',
      },
      InvoiceHeader: {
        INVOICE_HEADER_PERSONAL: '个人',
        INVOICE_HEADER_COMPANY: '单位',
      },
      InvoiceContent: {
        GOODS_DETAILS: '商品明细 ',
        GOODS_CATEGORY: '商品类别',
      },

      mchId: '', // 商户id
      id: '', // 发票id
      orderId: '',

      formData: {
        orderId: '', // 订单id
        applySource: 'INVOICE_APPLY_SOURCE_CUSTOMER', // 申请来源  薯片 INVOICE_APPLY_SOURCE_CUSTOMER 案加 COMDIC_PLATFORM_QIDABAO
        // applyUserId: '', // 申请人id
        // applyUserName: '', // 申请人名称
        invoiceType: '', // 发票类型 InvoiceType
        invoiceContent: 'GOODS_DETAILS', // 发票内容（商品明细 、商品类别）
        // 发票抬头（个人 INVOICE_HEADER_PERSONAL 、 单位 INVOICE_HEADER_COMPANY）
        invoiceHeader: 'INVOICE_HEADER_PERSONAL',
        invoiceHeaderName: '', // 公司名称、个人名称

        receiverPhone: '', // 收票人电话
        bankAccount: '', // 银行账号
        bankOfDeposit: '', // 开户银行
        receiverEmail: '', // 邮箱
        registerTel: '', // 注册电话
        registerAddress: '', // 注册地址
        taxpayerIdentifNum: '', // 纳税人识别号
      },

      submitDisabled: false, // 禁用提交
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.orderId = this.$route.query.orderId
    this.formData.orderId = this.$route.query.orderId
    this.mchId = this.$route.query.mchId
    this.init()
    // this.getDefaultInvoiceHeader()
  },
  methods: {
    click_invoicetype(key) {
      this.formData.invoiceType = key
      if (
        this.formData.invoiceType === '004' ||
        this.formData.invoiceType === '027'
      ) {
        this.formData.invoiceHeader = 'INVOICE_HEADER_COMPANY'
      }
      this.formData.invoiceHeaderName = ''
      this.getDefaultInvoiceHeader()
    },
    click_invoice_header(key) {
      this.formData.invoiceHeader = key
      this.formData.invoiceHeaderName = ''
      this.getDefaultInvoiceHeader()
    },
    init() {
      if (!this.formData.orderId) {
        return this.$xToast.error('没有指定订单')
      }
      this.loading = true
      invoiceApi
        .invoice_detail(
          { axios: this.$axios },
          {
            orderId: this.formData.orderId,
            type: 1, // 是否查询订单商品信息，1查询，默认不查，根据订单id查询时有效
          }
        )
        .then((res) => {
          console.log(' res', res)

          if (res && res.orderId) {
            this.setFormData(res || {})
          } else {
            this.getDefaultInvoiceHeader()
          }
          this.getConfig()
        })
        .catch((error) => {
          this.loading = false
          this.getDefaultInvoiceHeader()
          this.getConfig()

          console.error(error)
          // this.$xToast.error(error.message || '请求失败，请重试')
        })
    },

    setFormData(info) {
      this.mchId = info.signStoreId
      this.formData = Object.assign({}, this.formData, {
        // id: info.id,
        orderId: info.orderId,
        applySource: 'INVOICE_APPLY_SOURCE_CUSTOMER',
        invoiceType: info.invoiceType,
        invoiceContent: info.invoiceContent || 'GOODS_DETAILS',
        invoiceHeader: info.invoiceHeader || 'INVOICE_HEADER_PERSONAL',
        invoiceHeaderName: info.invoiceHeaderName,
        receiverPhone: info.receiverPhone,
        receiverEmail: info.receiverEmail,

        bankAccount: info.bankAccount,
        bankOfDeposit: info.bankOfDeposit,

        registerTel: info.registerTel,
        registerAddress: info.registerAddress,
        taxpayerIdentifNum: info.taxpayerIdentifNum,
      })
    },
    getConfig() {
      if (!this.mchId) {
        return this.$xToast.error('未获取到商户信息')
      }
      invoiceApi
        .apply_invoice_types(
          { axios: this.$axios },
          {
            mchId: this.mchId,
          }
        )
        .then((res) => {
          const arr = res.applyInvoiceType.split(',')
          let info = {}
          if (arr.length === 0) {
            info = {
              '007': '增值税普通发票 ',
            }
          } else {
            arr.map((item) => {
              if (InvoiceType[item]) {
                info[item] = InvoiceType[item]
              }
            })
          }

          // arr.map((item, index) => {
          //   info[item] = res.applyInvoiceTypeNames[index]
          // })
          this.InvoiceType = info

          if (
            !this.formData.invoiceType &&
            res.defaultInvoiceType &&
            this.InvoiceType[res.defaultInvoiceType]
          ) {
            this.formData.invoiceType = res.defaultInvoiceType || '007'
          } else if (!this.formData.invoiceType && !res.defaultInvoiceType) {
            this.formData.invoiceType = '007'
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
          this.InvoiceType = {
            '007': '增值税普通发票 ',
          }
          this.formData.invoiceType = '007'
          // this.$xToast.error('商户信息错误')
        })
    },
    /** 获取默认抬头 */
    getDefaultInvoiceHeader() {
      try {
        invoiceApi
          .invoice_header_list({ axios: this.$axios })
          .then((res) => {
            const list = (res && res.records) || []
            const head = list.find((item) => {
              let invoiceType = ''
              let invoiceHeader = ''
              if (
                this.formData.invoiceType === '004' ||
                this.formData.invoiceType === '027'
              ) {
                // 专用发票
                invoiceType = 'SPECIAL'
              } else {
                // 普通发票
                invoiceType = 'ORDINARY'
              }
              if (this.formData.invoiceHeader === 'INVOICE_HEADER_PERSONAL') {
                invoiceHeader = 'PERSONAL'
              } else {
                invoiceHeader = 'COMPANY'
              }
              if (invoiceType === 'SPECIAL') {
                return (
                  item.headType === invoiceHeader && item.type === invoiceType
                )
              }

              return (
                item.headType === invoiceHeader &&
                item.type === invoiceType &&
                item.defaultHead === 1
              )
            })
            if (head) {
              return this.setDefaultFormDataWithHead(head)
            } else {
              console.log('没有对应的head')
            }
          })
          .catch((error) => {
            console.error(error)
            this.$xToast.error((error && error.message) || '请求失败，请重试')
          })
      } catch (error) {}
    },
    // 用默认抬头填充数据
    async setDefaultFormDataWithHead(info) {
      console.log(info)
      const phone = await this.decryptionPhone(info.phoneFull)

      this.formData = Object.assign({}, this.formData, {
        orderId: this.orderId,
        applySource: 'INVOICE_APPLY_SOURCE_CUSTOMER',
        // invoiceType: '026',
        // invoiceContent: 'GOODS_DETAILS',
        invoiceHeader:
          info.headType === 'COMPANY'
            ? 'INVOICE_HEADER_COMPANY'
            : 'INVOICE_HEADER_PERSONAL',

        invoiceHeaderName: info.invoiceHead || '',
        // receiverPhone: '',
        // receiverEmail: '',

        bankAccount: info.bankNumber || '',
        bankOfDeposit: info.depositBank || '',

        registerTel: phone || '',
        registerAddress: info.address || '',
        taxpayerIdentifNum: info.dutyParagraph || '',
      })
    },
    // 解密电话
    decryptionPhone(contactWay) {
      return new Promise((resolve, reject) => {
        if (!contactWay) {
          console.log('没有电话')
          return resolve('')
        }
        contractApi
          .decryptionPhone(
            { axios: this.axios },
            {
              phoneList: [contactWay],
            }
          )
          .then((res) => {
            console.log(res)
            if (res) {
              return resolve(res)
            }
            resolve('')
          })
          .catch(() => {
            resolve('')
          })
      })
    },

    submit() {
      if (!this.formData.invoiceType) {
        return this.$xToast.error('请选择发票类型')
      }
      if (!this.formData.invoiceHeader) {
        return this.$xToast.error('请选择发票抬头')
      }
      this.$refs.form
        .validate()
        .then((res) => {
          this.apply()
        })
        .catch((err) => {
          console.log(err)
          this.$xToast.error('请检查错误信息')
        })

      console.log(this.formData)
    },
    apply() {
      this.loading = true
      console.log({
        applyUserId: this.$store.state.user.userId,
        applyUserName: this.$store.state.user.userName,
        type: this.formData.invoiceType,
      })
      const params = {
        ...this.formData,
        applyUserId: this.$store.state.user.userId,
        applyUserName: this.$store.state.user.userName,
      }
      invoiceApi
        .apply_invoice({ axios: this.$axios }, params)
        .then((res) => {
          console.log('res', res)
          this.loading = false
          this.$xToast.success('请求成功')
          setTimeout(() => {
            this.back()
          }, 1000)
        })
        .catch((error) => {
          console.error(error)

          this.loading = false
          // setTimeout(() => {
          //   this.back()
          // }, 1000)
          this.$xToast.error(error.message || '请求失败，请重试')
        })
    },
    back() {
      this.$router.replace({
        path: '/order/invoice',
        query: {
          tabActive: 1,
        },
      })
      // this.$router.back(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_apply {
  background: #f5f5f5;
  min-height: 100vh;
  font-size: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  ::v-deep .sp-field__label {
    flex: none !important;
    // width: 4.5em;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
  }
  ::v-deep .sp-field__control {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
  }
  // .my-header {
  //   border-bottom: 1px solid #f5f5f5;
  // }
  .card {
    background: #fff;
    margin-bottom: 20px;
    padding: 40px;

    .title {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #000000;
      line-height: 32px;
      padding-bottom: 40px;
    }

    .options {
      padding-bottom: 10px;
      .btn {
        margin-right: 32px;
        margin-bottom: 10px;
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

    .submit {
      font-weight: bold;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
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
    font-weight: bold;
    line-height: 26px;
  }
  .options .btn.active::v-deep.sp-button--primary {
    background: #f2f5ff;
    color: #4974f5;
  }
}
</style>
