<template>
  <div class="invoice_add">
    <HeaderSlot>
      <Header class="my-header" title="添加发票抬头"></Header>
    </HeaderSlot>

    <div class="card">
      <div class="invoice_info">
        <sp-cell-group>
          <sp-field class="customLabel" label="发票类型">
            <template #input>
              <div class="options">
                <sp-button
                  v-for="(invoicetype, key) in InvoiceType"
                  v-show="key != 'SPECIAL' || HAVE_SPECIAL == false"
                  :key="key"
                  class="btn"
                  :class="{ active: key === formData.type }"
                  size="small"
                  type="primary"
                  @click="formData.type = key"
                >
                  {{ invoicetype }}
                </sp-button>
              </div>
            </template>
          </sp-field>

          <sp-field class="customLabel" label="抬头类型">
            <template #input>
              <div class="options">
                <sp-button
                  v-for="(headType, key) in HeadType"
                  :key="key"
                  class="btn"
                  :class="{ active: key === formData.headType }"
                  size="small"
                  type="primary"
                  @click="formData.headType = key"
                >
                  {{ headType }}
                </sp-button>
              </div>
            </template>
          </sp-field>
          <sp-form ref="form">
            <sp-field
              v-model="formData.invoiceHead"
              required
              label="发票抬头"
              placeholder="请填写发票抬头"
              maxlength="100"
              :rules="[{ required: true, message: '请填写发票抬头' }]"
              @focus="focusFn"
              @blur="blurFn"
            />

            <div v-if="formData.headType === 'COMPANY'">
              <sp-field
                v-model="formData.dutyParagraph"
                required
                label="单位税号"
                placeholder="请填写单位税号"
                maxlength="20"
                :rules="[{ required: true, message: '请填写单位税号' }]"
                @focus="focusFn"
                @blur="blurFn"
              />
              <sp-field
                v-model="formData.address"
                :required="formData.type === 'SPECIAL'"
                label="注册地址"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                maxlength="80"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '请填写注册地址',
                  },
                ]"
                @focus="focusFn"
                @blur="blurFn"
              />
              <sp-field
                v-model="formData.phone"
                :required="formData.type === 'SPECIAL'"
                label="注册电话"
                maxlength="20"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '请填写注册电话',
                  },
                ]"
                @focus="focusFn"
                @blur="blurFn"
              />
              <sp-field
                v-model="formData.depositBank"
                :required="formData.type === 'SPECIAL'"
                label="开户银行"
                maxlength="45"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '请填写开户银行',
                  },
                ]"
                @focus="focusFn"
                @blur="blurFn"
              />
              <sp-field
                v-model="formData.bankNumber"
                :required="formData.type === 'SPECIAL'"
                label="银行账号"
                maxlength="45"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '银行账号',
                  },
                ]"
                @focus="focusFn"
                @blur="blurFn"
              />
            </div>
          </sp-form>
        </sp-cell-group>
      </div>
    </div>
    <div v-if="formData.type === 'ORDINARY'" class="set_default">
      <sp-field label="设为默认" center>
        <template #input>
          <div class="placeholder">每次开票时会默认填写抬头信息</div>
        </template>
        <template #button>
          <sp-switch
            v-model="defaultHead"
            class="switch"
            size="0.5rem"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </sp-field>
    </div>

    <div v-show="!focusState" class="paddingBottom160"></div>

    <sp-bottombar
      class="sp-bottombar"
      :style="{ position: focusState ? 'static' : 'fixed' }"
      safe-area-inset-bottom
    >
      <sp-bottombar-button type="primary" text="立即添加" @click="onSubmit" />
    </sp-bottombar>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import {
  Button,
  Toast,
  Sticky,
  Empty,
  Form,
  Field,
  Cell,
  CellGroup,
  Switch,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import orderApi from '@/api/order'
import { invoiceApi } from '~/api'

export default {
  layout: 'keepAlive',
  name: 'HeadAdd',
  components: {
    LoadingCenter,
    HeaderSlot,
    Header,

    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Button.name]: Button,

    [Form.name]: Form,
    [Field.name]: Field,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,

    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
  },
  data() {
    return {
      loading: true, // 加载效果状态

      // 发票类型
      InvoiceType: {
        ORDINARY: '普通发票',
        SPECIAL: '专用发票 ',
      },
      HeadType: {
        PERSONAL: '个人',
        COMPANY: '单位',
      },
      formData: {
        type: 'ORDINARY', // 发票类型 InvoiceType
        headType: 'PERSONAL', // 抬头类型(个人/单位)
        invoiceHead: '', // 发票抬头(专票时必填)

        address: '', // 注册地址
        phone: '', // 收票人电话
        bankNumber: '', // 银行账号
        depositBank: '', // 开户银行
        dutyParagraph: '', // 纳税人识别号
      },
      defaultHead: 0, // 默认抬头(0 非默认 1 默认 仅针对普票有效)

      HAVE_SPECIAL: true, // 是否已存在增值税专用发票，用以限制只能存在一个

      focusState: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userName: (state) => state.user.userName,

      token: (state) => state.user.token,
      userPhone: (state) => state.user.userPhone,
    }),
  },
  watch: {
    'formData.type'(type) {
      // console.log(type)
      if (this.formData.type === 'SPECIAL') {
        this.formData.headType = 'COMPANY'
        this.HeadType = {
          COMPANY: '单位',
        }
      } else {
        this.HeadType = {
          PERSONAL: '个人',
          COMPANY: '单位',
        }
      }
    },
  },
  mounted() {
    this.getInvoiceHeaderList()

    /*
     *  监听input状态，屏幕滚动到input，上下居中
     * 在安卓手机上屏幕尺寸变化会产生resize事件。所以监听resize事件。
     * 然后定位到input框。
     */

    // window.addEventListener('resize', this.active)
  },
  destroyed() {
    // window.removeEventListener('resize', this.active)
    // window.removeEventListener('focus', focusFn)
    // window.removeEventListener('blur', blurFn)
  },
  methods: {
    focusFn() {
      console.log('focus')
      this.focusState = true
    },
    blurFn() {
      console.log('blur')
      this.focusState = false
    },

    active() {
      setTimeout(() => {
        if (document.activeElement.tagName === 'INPUT') {
          document.activeElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 10)
    },
    getInvoiceHeaderList() {
      this.loading = true
      invoiceApi
        .invoice_header_list({ axios: this.$axios })
        .then((res) => {
          this.loading = false

          const list = (res && res.records) || []
          const SPECIAL = list.find((item) => {
            return item.type === 'SPECIAL'
          })
          if (!SPECIAL) {
            this.HAVE_SPECIAL = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.error = true
          this.loading = false
          this.$xToast.error((error && error.message) || '请求失败，请重试')
        })
    },

    onSubmit() {
      this.$refs.form
        .validate()
        .then((res) => {
          this.add()
        })
        .catch((err) => {
          console.log(err)
          this.$xToast.error('请检查错误信息')
        })
    },
    add() {
      this.loading = true
      const params = {
        userId: this.userId,
        ...this.formData,
      }
      if (this.formData.type === 'ORDINARY') {
        // 普通电子发票才能设置默认
        params.defaultHead = this.defaultHead
      }

      invoiceApi
        .add_invoice_header({ axios: this.$axios }, params)
        .then((res) => {
          console.log('res', res)
          this.loading = false
          this.$xToast.success((res && res.message) || '添加成功')

          this.back()
        })
        .catch((error) => {
          console.error(error)

          this.loading = false
          this.$xToast.error((error && error.message) || '请求失败，请重试')
        })
    },
    back() {
      this.$router.back(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_add {
  background: #f5f5f5;

  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  ::v-deep .sp-cell {
    padding: 40px 0px 40px 32px;
  }
  ::v-deep .sp-cell__value {
    overflow: auto;
  }
  ::v-deep .sp-field__label {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
    flex: none !important;
    width: 4.5em;
  }
  ::v-deep .sp-field__control {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
  }
  .customLabel ::v-deep .sp-field__label {
    margin-top: 8px;
  }

  .card {
    background: #fff;
    margin-top: 20px;
    // margin-bottom: 20px;
    padding: 0 40px;

    .options {
      // padding-bottom: 20px;
      // margin-top: -8px;
      .btn {
        margin-right: 32px;
        // margin-bottom: 8px;
      }
      .btn:last-child {
        margin-right: 0;
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
  }
  .set_default {
    margin-top: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    padding: 0 40px;
    background: #fff;

    .placeholder {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      vertical-align: center;
    }
    ::v-deep .sp-field__control--custom {
      // display: inline-block;
      min-height: normal;
    }
    ::v-deep .sp-switch {
      min-height: normal;
    }
    ::v-deep .sp-field__button {
      line-height: 100%;
    }
  }
  .paddingBottom160 {
    padding-bottom: 160px;
  }
  .sp-bottombar {
    z-index: 2;
  }
  ::v-deep .sp-bottombar {
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
}
</style>
