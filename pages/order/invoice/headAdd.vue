<template>
  <div class="invoice_add">
    <sp-sticky>
      <Header class="my-header" title="添加发票抬头"></Header>
    </sp-sticky>
    <div class="card">
      <div class="invoice_info">
        <sp-cell-group>
          <sp-field label="发票类型">
            <template #input>
              <div class="options">
                <sp-button
                  v-for="(invoicetype, key) in InvoiceType"
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

          <sp-field label="发票类型">
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
            />

            <div v-if="formData.headType === 'COMPANY'">
              <sp-field
                v-model="formData.dutyParagraph"
                required
                label="单位税号"
                placeholder="请填写单位税号"
                maxlength="20"
                :rules="[{ required: true, message: '请填写单位税号' }]"
              />
              <sp-field
                v-model="formData.address"
                label="注册地址"
                placeholder="选填"
                maxlength="120"
              />
              <sp-field
                v-model="formData.phone"
                label="注册电话"
                maxlength="20"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.depositBank"
                label="开户银行"
                maxlength="50"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.bankNumber"
                label="银行账号"
                maxlength="50"
                placeholder="选填"
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
    <sp-bottombar safe-area-inset-bottom>
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

import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import orderApi from '@/api/order'
import { invoiceApi } from '~/api'

export default {
  layout: 'keepAlive',
  name: 'HeadAdd',
  components: {
    LoadingCenter,
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
      loading: false, // 加载效果状态

      // 发票类型
      InvoiceType: {
        ORDINARY: '电子普通发票',
        SPECIAL: '增值税专用发票 ',
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
  methods: {
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
        })
        .catch((error) => {
          console.error(error)

          this.loading = false
          this.$xToast.error((error && error.message) || '请求失败，请重试')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_add {
  background: #f5f5f5;
  padding: 0 0 170px;
  min-height: 100vh;
  .card {
    background: #fff;
    margin-bottom: 20px;
    padding: 0 40px;

    ::v-deep .sp-cell {
      padding: 40px 0px 40px 32px;

      .sp-field__label {
        flex: none;
      }
    }
    .options {
      // padding-bottom: 20px;
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
}
</style>
