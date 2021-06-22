<template>
  <div class="invoice_add">
    <sp-sticky>
      <Header class="my-header" title="编辑发票抬头"></Header>
    </sp-sticky>
    <div class="card">
      <div class="invoice_info">
        <sp-cell-group>
          <sp-cell v-if="type == 1" title="普通发票抬头-个人"></sp-cell>
          <sp-cell v-else-if="type == 2" title="普通发票抬头-单位"></sp-cell>
          <sp-cell v-else-if="type == 3" title="增值税专用发票抬头"></sp-cell>

          <sp-field
            v-model="formData.username"
            required
            label="发票抬头"
            placeholder="请填写发票抬头"
          />

          <div v-if="type == 2">
            <sp-field
              v-model="formData.username"
              required
              label="单位税号"
              placeholder="请填写单位税号"
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
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,

    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Button.name]: Button,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      type: 2,
      formData: { username: '' },
      checked: true,
    }
  },
  methods: {
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
    submit() {},
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
