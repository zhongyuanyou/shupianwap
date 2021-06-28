<template>
  <div class="refund-details">
    <Header title="退款详情" />
    <div class="status-bar">
      <div class="status-bar_box">
        <div class="icon-box">
          <sp-icon
            class-prefix="spiconfont"
            size="0.46rem"
            color="#00B365"
            name="commodity_ic_ttime"
          ></sp-icon>
        </div>
        <div class="desc">
          <h3>{{ refundDetailData.reimburseStatusCodeName }}</h3>
          <p>{{ refundDetailData.reimburseCompleteTime }}</p>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="item">
        <h3>退款金额</h3>
        <p>{{ refundDetailData.reimburseAmountYuan }}元</p>
      </div>
      <div class="item">
        <h3>退款账户</h3>
        <p>{{ refundDetailData.passTypeCodeName }}</p>
      </div>
      <!-- <div class="item">
        <h3>退款状态</h3>
        <p>{{ refundDetailData.reimburseStatusCodeName }}</p>
      </div> -->
    </div>
    <div v-if="refundProcessData.length > 0" class="refund-process">
      <sp-steps direction="vertical" :active="refundProcessData.length - 1">
        <sp-step v-for="(item, index) in refundProcessData" :key="index">
          <h3>{{ item.operationStatus }}</h3>
          <!-- <p>已将500元入账至您的支付宝支付账户</p> -->
          <div class="date">{{ item.craeteTime }}</div>
        </sp-step>
      </sp-steps>
    </div>
  </div>
</template>

<script>
import { Icon, Step, Steps } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    SpIcon: Icon,
    [Step.name]: Step,
    [Steps.name]: Steps,
  },
  data() {
    return {
      refundDetailData: '',
      refundProcessData: [],
    }
  },
  created() {
    this.getRefundDetails()
  },
  methods: {
    async getRefundDetails() {
      const res = await this.$axios.get(afterSaleApi.refundInfo, {
        params: {
          id: this.$route.query.id,
        },
      })
      if (res.code === 200) {
        this.refundDetailData = res.data.refundDetail
        this.refundProcessData = res.data.refundProcess
      } else {
        this.$router.go(-1)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.refund-process {
  border-radius: 24px;
  margin-top: 20px;
  padding-bottom: 32px;
  background: #ffff;
  .com-title {
    padding: 32px 28px;
  }
  ::v-deep.sp-step__circle {
    width: 24px;
    height: 24px;
    border: 6px solid #f4f4f4;
    background: #999;
  }
  ::v-deep.sp-icon-checked {
    width: 24px;
    height: 24px;
    background-color: #4974f5;
    border-radius: 24px;
    border: 6px solid #d0dcff;
    &::before {
      content: '';
    }
  }

  ::v-deep.sp-step__title {
    font-family: PingFangSC-Regular;
    font-size: 26px;
    h3 {
      color: #222222;
      line-height: 40px;
      font-weight: normal;
      font-size: 28px;
    }
    p {
      color: #555;
      line-height: 34px;
      margin-top: 10px;
      font-size: 24px;
    }
    .date {
      font-size: 24px;
      color: #999999;
      line-height: 34px;
      margin: 10px;
    }
  }
}
.status-bar {
  height: 268px;
  background: #00b365;
  padding: 40px 40px 0px 40px;
  .status-bar_box {
    display: flex;
    height: 160px;
    background: #ffffff;
    border-radius: 12px;
    padding: 40px;
    .icon-box {
      width: 80px;
      height: 80px;
      background: #e5f7ef;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .desc {
      color: #222222;
      margin-left: 28px;
      h3 {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        line-height: 40px;
      }
      p {
        margin-top: 10px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        line-height: 34px;
        span {
          color: #4974f5 !important;
        }
      }
    }
  }
}
.refund-details {
  min-height: 100vh;
  background: #f8f8f8;
  .content-box {
    position: relative;
    margin-top: -16px;
    overflow: hidden;
    border-radius: 24px 24px 0 0;
    z-index: 9;
    padding: 13px 40px;
    background: #fff;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 11px 0;
      line-height: 36px;
      h3 {
        font-size: 26px;
        color: #222222;
        font-weight: normal;
      }
      p {
        font-size: 26px;
        color: #1a1a1a;
        font-weight: bold;
      }
    }
  }
}
</style>
