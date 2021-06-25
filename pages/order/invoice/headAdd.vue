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
                  class="btn"
                  size="small"
                  type="primary"
                  :class="{ active: formData.type === '普通发票' }"
                  @click="formData.type = '普通发票'"
                >
                  普通发票
                </sp-button>
                <sp-button
                  class="btn"
                  size="small"
                  type="primary"
                  :class="{ active: formData.type === '专用发票' }"
                  @click="formData.type = '专用发票'"
                >
                  专用发票
                </sp-button>
              </div>
            </template>
          </sp-field>

          <sp-field label="发票类型">
            <template #input>
              <div class="options">
                <sp-button
                  class="btn"
                  :class="{ active: formData.headType === '个人' }"
                  size="small"
                  type="primary"
                  @click="formData.headType = '个人'"
                >
                  个人
                </sp-button>
                <sp-button
                  class="btn"
                  :class="{ active: formData.headType === '单位' }"
                  size="small"
                  type="primary"
                  @click="formData.headType = '单位'"
                >
                  单位
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
              :rules="[{ required: true, message: '请填写发票抬头' }]"
            />

            <div v-if="formData.headType === '单位'">
              <sp-field
                v-model="formData.dutyParagraph"
                required
                label="单位税号"
                placeholder="请填写单位税号"
                :rules="[{ required: true, message: '请填写单位税号' }]"
              />
              <sp-field
                v-model="formData.address"
                label="注册地址"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.phone"
                label="注册电话"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.depositBank"
                label="开户银行"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.bankNumber"
                label="银行账号"
                placeholder="选填"
              />
            </div>
          </sp-form>
        </sp-cell-group>
      </div>
    </div>
    <div v-if="formData.type === '普通发票'" class="set_default">
      <sp-field label="设为默认" center>
        <template #input>
          <div class="placeholder">每次开票时会默认填写抬头信息</div>
        </template>
        <template #button>
          <sp-switch
            v-model="formData.defaultHead"
            class="switch"
            size="0.5rem"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
      </sp-field>
    </div>
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button
        type="primary"
        text="添加发票抬头"
        @click="onSubmit"
      />
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

      formData: {
        type: '普通发票', // 发票类型(普通发票、专用发票)
        headType: '个人', // 抬头类型(个人/单位)
        invoiceHead: '', // 发票抬头(专票时必填)

        receiverEmail: '', // 邮箱
        registerTel: '', // 注册电话

        address: '', // 注册地址
        phone: '', // 收票人电话
        bankNumber: '', // 银行账号
        depositBank: '', // 开户银行
        dutyParagraph: '', // 纳税人识别号

        defaultHead: 0, // 默认抬头(0 非默认 1 默认 仅针对普票有效)
      },
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      token: (state) => state.user.token,
      userPhone: (state) => state.user.userPhone,
    }),
  },
  methods: {
    onSubmit() {
      this.$refs.form
        .validate()
        .then((res) => {
          this.add()
          this.$xToast.success('提交成功')
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
      invoiceApi
        .add_invoice_header({ axios: this.$axios }, params)
        .then((res) => {
          console.log('res', res)
          this.loading = false
        })
        .catch((error) => {
          console.error(error)

          this.loading = false
          this.$xToast.error(error.message || '请求失败，请重试')
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
    }
    .options {
      // padding-bottom: 20px;
      .btn {
        margin-right: 32px;
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
