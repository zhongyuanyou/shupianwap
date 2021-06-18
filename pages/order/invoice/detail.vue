<template>
  <div class="invoice_apply">
    <sp-sticky>
      <Header class="my-header" title="发票详情"></Header>
    </sp-sticky>

    <div class="card">
      <div class="type_list">
        <span>发票类型</span>
        <span>电子普通发票</span>
      </div>
    </div>

    <div class="card">
      <div class="title">发票信息</div>

      <div class="invoice_info_list">
        <div>发票内容</div>
        <div>商品明细</div>
      </div>
      <div class="invoice_info_list">
        <div>抬头类型</div>
        <div>个人</div>
      </div>
      <div class="invoice_info_list">
        <div>抬头名</div>
        <div>哼哼哼</div>
      </div>
      <div class="invoice_info_list">
        <div>开票金额</div>
        <div>
          229.80元
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
        <div>2020-08-25 18:58:35</div>
      </div>
      <div class="invoice_info_list">
        <div>开票时间</div>
        <div>-</div>
      </div>

      <div v-if="type == 1"></div>
      <div v-if="type == 2"></div>
    </div>

    <div class="card">
      <div class="title">接受信息</div>
      <div class>
        <div class="invoice_info_list">
          <div>手机号码</div>
          <div>{{ formData.username }}</div>
        </div>
        <div class="invoice_info_list">
          <div>电子邮箱</div>
          <div>{{ formData.email }}</div>
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
    <div class="card footer">
      <sp-button size="normal" type="primary" plain @click="submit">
        重新申请
      </sp-button>
      <sp-button
        size="normal"
        type="default"
        plain
        @click="showEmailDialog = true"
      >
        发送邮箱
      </sp-button>
      <sp-button size="normal" type="default" plain @click="submit">
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
      loading: false, // 加载效果状态
      tabActive: 0,

      type: 1, // 发票类型
      show_more_input: true,
      formData: {
        username: '1111111111111111111111111111111111111111111111',
        email: '1111111111111111111111111111111111111@qq.com',
      },

      sendEmail: '',
      showEmailDialog: false,
    }
  },
  mounted() {
    // this.moneyTips()
  },
  methods: {
    submit() {
      // this.$xToast.show({ message: '提交成功' })
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
        done()
      } else {
        this.$xToast.error('请输入邮箱地址')
        done(false)
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
.invoice_apply {
  background: #f5f5f5;
  min-height: 100vh;
  font-size: 0;

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

    .invoice_info {
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
