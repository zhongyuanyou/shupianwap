<template>
  <div class="bill-detail">
    <Header title="明细详情" />
    <div class="detail-info">
      <div class="count">
        <span>出/入账数量</span>
        <strong
          >{{ billDetails.orderType === 'BANK_ORDER_TYPE_3' ? '-' : '+' }}￥{{
            billDetails.amount
          }}</strong
        >
      </div>
      <div class="field-list">
        <div class="row">
          <div class="title">类型</div>
          <div class="res">{{ billDetails.orderTypeName }}</div>
        </div>
        <div class="row">
          <div class="title">时间</div>
          <div class="res">{{ billDetails.createTime }}</div>
        </div>
        <div class="row">
          <div class="title">流水号</div>
          <div class="res">{{ billDetails.billNo }}</div>
        </div>
        <div v-if="billDetails.orderTypeName === '提现'" class="row">
          <div class="title">{{ billDetails.orderTypeName }}明细</div>
          <div class="cash" @click="jumpPage">
            查看{{ billDetails.orderTypeName }}详情
          </div>
          <!-- <div class="cash">查看佣金详情</div>
          <div class="cash">查看退款详情</div> -->
        </div>
      </div>
    </div>
    <!--S loding-->
    <LoadingCenter v-show="loading" />
    <!--E loding-->
  </div>
</template>

<script>
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  components: {
    Header,
    LoadingCenter,
  },
  data() {
    return {
      billDetails: '',
      loading: false,
    }
  },
  created() {
    this.getBillDetail()
  },
  methods: {
    async getBillDetail() {
      this.loading = true
      const res = await this.$axios.post(walletApi.bill_details, {
        billId: this.$route.query.id,
      })
      this.loading = false
      if (res.code === 200) {
        this.billDetails = res.data
      }
    },
    jumpPage() {
      debugger
      switch (this.billDetails.orderType) {
        case '提现':
          this.$router.push(
            `/my/wallet/withdraw/detail?id=${this.billDetails.billId}`
          )
          break
        // case '佣金':
        //   break
        // case 'BANK_ORDER_TYPE_14':
        //   this.$router.push(`/order/detail?id=${this.billDetails.billId}`)
        //   break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.bill-detail {
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
