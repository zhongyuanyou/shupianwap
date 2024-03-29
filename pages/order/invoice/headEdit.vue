<template>
  <div class="invoice_edit">
    <HeaderSlot>
      <Header class="my-header" title="编辑发票抬头"></Header>
    </HeaderSlot>
    <sp-skeleton
      title
      :row="6"
      style="margin-top: 30px"
      :loading="skeletonloading"
    />

    <div v-if="!skeletonloading" class="card">
      <div class="invoice_info">
        <sp-cell-group>
          <sp-cell
            class="head_type"
            :title="`${InvoiceType[formData.type]}-${
              HeadType[formData.headType]
            }`"
          ></sp-cell>

          <sp-form ref="form">
            <sp-field
              v-model="formData.invoiceHead"
              required
              label="发票抬头"
              placeholder="请填写发票抬头"
              maxlength="100"
              :rules="[{ required: true, message: '请填写发票抬头' }]"
            />

            <div v-if="formData.headType == 'COMPANY'">
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
                maxlength="80"
                :required="formData.type === 'SPECIAL'"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '请填写注册地址',
                  },
                ]"
              />

              <sp-field
                v-model="formData.phone"
                label="注册电话"
                maxlength="20"
                :required="formData.type === 'SPECIAL'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '请填写注册电话',
                  },
                ]"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
              />
              <sp-field
                v-model="formData.depositBank"
                label="开户银行"
                maxlength="45"
                :required="formData.type === 'SPECIAL'"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '请填写开户银行',
                  },
                ]"
              />
              <sp-field
                v-model="formData.bankNumber"
                label="银行账号"
                maxlength="45"
                :required="formData.type === 'SPECIAL'"
                :placeholder="formData.type === 'SPECIAL' ? '必填' : '选填'"
                :rules="[
                  {
                    required: formData.type === 'SPECIAL',
                    message: '银行账号',
                  },
                ]"
              />
            </div>
          </sp-form>
        </sp-cell-group>
      </div>
    </div>
    <div
      v-if="formData.type === 'ORDINARY' && !skeletonloading"
      class="set_default"
    >
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

    <div class="paddingBottom160"></div>

    <sp-bottombar
      v-if="!skeletonloading"
      safe-area-inset-bottom
      class="submit_btns"
    >
      <sp-bottombar-button
        type="default"
        text="删除"
        class="del_btn"
        @click="del"
      />
      <sp-bottombar-button type="primary" text="提交" @click="submit" />
    </sp-bottombar>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import {
  Button,
  Toast,
  Bottombar,
  Sticky,
  BottombarButton,
  Empty,
  Form,
  Field,
  Cell,
  CellGroup,
  Switch,
  Dialog,
  Skeleton,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import { invoiceApi } from '@/api/index.js'
import contractApi from '@/api/contract'

export default {
  layout: 'keepAlive',
  name: 'HeadEdit',
  components: {
    LoadingCenter,
    Header,
    HeaderSlot,
    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Button.name]: Button,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Form.name]: Form,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      skeletonloading: true, // 骨架屏loading
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
      id: '',
      oldFormData: {},
      formData: {
        id: '',
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
  mounted() {
    this.id = this.$route.query.id
    if (this.id) {
      this.getInvoiceHeaderList(this.id)
    }
  },
  methods: {
    validatorPhone(val) {
      if (val) {
        return /[\d-]/.test(val)
      }
      return true
    },
    back() {
      this.$router.back()
    },
    async setFormData(info) {
      const phone = await this.decryptionPhone(info.phoneFull)
      this.formData = {
        id: info.id,
        userId: info.userId,
        type: info.type, // 发票类型(普通发票、专用发票)
        headType: info.headType, // 抬头类型(个人/单位)
        invoiceHead: info.invoiceHead, // 发票抬头(专票时必填)

        address: info.address, // 注册地址
        phone, // 收票人电话
        bankNumber: info.bankNumber, // 银行账号
        depositBank: info.depositBank, // 开户银行
        dutyParagraph: info.dutyParagraph, // 纳税人识别号
      }
      this.oldFormData = { ...this.formData, defaultHead: info.defaultHead }
      this.defaultHead = info.defaultHead // 默认抬头(0 非默认 1 默认 仅针对普票有效)

      this.loading = false
      this.skeletonloading = false
    },
    // 解密电话
    decryptionPhone(phone) {
      return new Promise((resolve, reject) => {
        if (!phone) {
          console.log('没有电话')
          return resolve('')
        }
        contractApi
          .decryptionPhone({ axios: this.axios }, { phoneList: [phone] })
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

    getInvoiceHeaderList(id) {
      try {
        invoiceApi
          .invoice_header_list({ axios: this.$axios })
          .then((res) => {
            this.finished = true

            const list = (res && res.records) || []
            const head = list.find((item) => {
              return item.id === id
            })
            if (head) {
              return this.setFormData(head)
            }
            this.loading = false
            this.skeletonloading = false
            this.$xToast.error('没有找到抬头信息')
          })
          .catch((error) => {
            console.error(error)
            this.error = true
            this.loading = false
            this.$xToast.error((error && error.message) || '请求失败，请重试')
          })
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    del() {
      if (!this.formData.id) {
        return Toast.fail('没有指定抬头')
      }

      Dialog.confirm({
        // title: '确定删除该发票抬头？',
        message: '确定删除该发票抬头？',
      })
        .then(() => {
          this.loading = true
          invoiceApi
            .dlt_invoice_header(
              { axios: this.$axios },
              {
                ids: [this.formData.id],
              }
            )
            .then((res) => {
              console.log('res', res)
              this.loading = false
              this.$xToast.success((res && res.message) || '成功')
              this.back()
            })
            .catch((error) => {
              console.error(error)

              this.loading = false
              this.$xToast.error((error && error.message) || '请求失败，请重试')
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    edit() {
      // this.back()
      this.loading = true
      const params = {
        id: this.formData.id,
        invoiceHead: this.formData.invoiceHead,
      }
      for (const key in this.formData) {
        if (Object.hasOwnProperty.call(this.formData, key)) {
          const element = this.formData[key]
          if (this.formData[key] !== this.oldFormData[key]) {
            params[key] = this.formData[key]
          }
        }
      }

      console.log(this.oldFormData, this.formData)
      if (
        this.formData.type === 'ORDINARY' &&
        this.oldFormData.defaultHead !== this.defaultHead
      ) {
        // 普通电子发票才能设置默认
        params.defaultHead = this.defaultHead
      }
      // if (this.formData.phone && this.formData.phone.indexOf('*') !== -1) {
      //   // 手机号为*时不修改
      //   delete params.phone
      // }

      invoiceApi
        .update_invoice_header({ axios: this.$axios }, params)
        .then((res) => {
          console.log('res', res)
          this.loading = false
          this.$xToast.success((res && res.message) || '成功')
          this.back()
        })
        .catch((error) => {
          console.error(error)

          this.loading = false
          this.$xToast.error((error && error.message) || '请求失败，请重试')
        })
    },
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          this.edit()
          // this.$xToast.success('提交成功')
        })
        .catch((err) => {
          console.log(err)
          this.$xToast.error('请检查错误信息')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_edit {
  background: #f5f5f5;
  padding: 0 0 170px;
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  ::v-deep .sp-cell {
    padding: 40px 0px 40px 32px;
  }
  ::v-deep .sp-field__label {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
    flex: none !important;
  }
  ::v-deep .sp-field__control {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
  }
  .card {
    background: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 40px;

    .head_type {
      font-family: PingFangSC-Medium;
      font-size: 30px;
      font-weight: bold;
      color: #222222;
      line-height: 30px;
    }
  }
  .submit_btns ::v-deep .sp-button__text {
    font-weight: 700;
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .set_default {
    padding: 0 40px;
    margin-top: 20px;
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
