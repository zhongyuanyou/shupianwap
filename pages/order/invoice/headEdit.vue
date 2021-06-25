<template>
  <div class="invoice_add">
    <sp-sticky>
      <Header class="my-header" title="编辑发票抬头"></Header>
    </sp-sticky>
    <div class="card">
      <div class="invoice_info">
        <sp-cell-group>
          <sp-cell
            v-if="formData.headType == '个人'"
            title="普通发票抬头-个人"
          ></sp-cell>
          <sp-cell
            v-else-if="formData.headType == '单位'"
            title="普通发票抬头-单位"
          ></sp-cell>
          <!-- <sp-cell v-else-if="formData.headType == 3" title="增值税专用发票抬头"></sp-cell> -->
          <sp-form ref="form">
            <sp-field
              v-model="formData.invoiceHead"
              required
              label="发票抬头"
              placeholder="请填写发票抬头"
              :rules="[{ required: true, message: '请填写发票抬头' }]"
            />

            <div v-if="formData.headType == '单位'">
              <sp-field
                v-model="formData.dutyParagraph"
                required
                label="单位税号"
                placeholder="请填写单位税号"
                :rules="[{ required: true, message: '请填写单位税号' }]"
              />
              <sp-field
                v-model="formData.username"
                label="注册地址"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.username"
                label="注册电话"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.username"
                label="开户银行"
                placeholder="选填"
              />
              <sp-field
                v-model="formData.username"
                label="银行账号"
                placeholder="选填"
              />
            </div>
          </sp-form>
        </sp-cell-group>
      </div>
    </div>

    <sp-bottombar safe-area-inset-bottom class="submit_btns">
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
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'

export default {
  layout: 'keepAlive',
  name: 'HeadEdit',
  components: {
    LoadingCenter,
    Header,

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
  },
  data() {
    return {
      loading: false, // 加载效果状态

      formData: {
        id: '',
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
  mounted() {
    this.formData.id = this.$route.query.id
    this.getInfo()
  },
  methods: {
    getInfo() {},
    del() {
      Dialog.confirm({
        // title: '确定删除该发票抬头？',
        message: '确定删除该发票抬头？',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          this.$xToast.success('提交成功')
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
  }
  .submit_btns ::v-deep .sp-button__text {
    font-weight: 500;
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
  }
}
</style>
