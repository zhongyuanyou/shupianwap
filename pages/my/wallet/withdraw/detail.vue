<template>
  <div class="detail">
    <Header title="余额提现详情" />
    <div class="detail-info">
      <div class="count">
        <span>提现金额</span>
        <strong>-￥{{ withdrawDetails.amount }}</strong>
      </div>
      <div class="field-list">
        <div class="row">
          <div class="title">业务类型</div>
          <div class="res">{{ withdrawDetails.orderTypeName || '-' }}</div>
        </div>
        <div class="row">
          <div class="title">时间</div>
          <div class="res">{{ withdrawDetails.createTime || '-' }}</div>
        </div>
        <div class="row">
          <div class="title">银行卡号</div>
          <div class="res">{{ withdrawDetails.cardNumber || '-' }}</div>
        </div>
        <div class="row">
          <div class="title">账户名称</div>
          <div class="res">{{ withdrawDetails.accountName || '-' }}</div>
        </div>
        <div class="row">
          <div class="title">银行</div>
          <div class="res">{{ withdrawDetails.bankName || '-' }}</div>
        </div>
        <div class="row">
          <div class="title">流水号</div>
          <div class="res">{{ withdrawDetails.billNo || '-' }}</div>
        </div>
        <!-- <div class="row">
          <div class="title">备注</div>
          <div class="res">{{withdrawDetails.}}</div>
        </div> -->
        <div class="row">
          <div class="title">状态</div>
          <div class="res">
            {{ withdrawDetails.statusName }}
            <span v-if="withdrawDetails.successTime"
              >({{ withdrawDetails.successTime || '-' }})</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      withdrawDetails: '',
    }
  },
  created() {
    this.getWithdrawDetails()
  },
  methods: {
    async getWithdrawDetails() {
      const res = await this.$axios.post(walletApi.bill_details, {
        billId: this.$route.query.id,
      })
      if (res.code === 200) {
        this.withdrawDetails = res.data
      }
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  min-height: 100vh;
  background: #f8f8f8;
  .detail-info {
    background: #fff;
    padding: 0 40px;
    border-top: 1px solid #f4f4f4;
    .count {
      display: flex;
      justify-content: space-between;
      line-height: 112px;
      border-bottom: 1px solid #f4f4f4;
      span {
        height: 44px;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #222222;
      }
      strong {
        font-family: Bebas;
        font-size: 40px;
        color: #1a1a1a;
        text-align: right;
      }
    }
    .field-list {
      padding: 32px 0;
      .row {
        display: flex;
        justify-content: space-between;
        height: 74px;
        line-height: 74px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        .title {
          color: #555555;
        }
        .res {
          color: #222222;
        }
        .cash {
          color: #4974f5;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
