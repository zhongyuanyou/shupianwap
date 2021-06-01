<template>
  <div class="bill-detail">
    <Header title="明细详情" />
    <div class="detail-info">
      <div class="count">
        <span>出/入账数量</span>
        <strong>-2000.00</strong>
      </div>
      <div class="field-list">
        <div class="row">
          <div class="title">类型</div>
          <div class="res">提现</div>
        </div>
        <div class="row">
          <div class="title">时间</div>
          <div class="res">提现</div>
        </div>
        <div class="row">
          <div class="title">流水号</div>
          <div class="res">提现</div>
        </div>
        <div class="row">
          <div class="title">提现明细</div>
          <div class="cash">查看提现详情</div>
          <!-- <div class="cash">查看佣金详情</div>
          <div class="cash">查看退款详情</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
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
