<template>
  <div class="refund-record">
    <Header title="退款明细" />
    <ul v-if="!showNoData">
      <li @click="$router.push('/my/afterSale/refundDetails')">
        <div class="pic">
          <sp-icon
            class-prefix="spiconfont"
            size="0.82rem"
            color="#1797EC"
            name="pay_ic_alipay"
          ></sp-icon>
        </div>
        <div class="desc">
          <h3>换业务</h3>
          <p>变更业务，继续办理</p>
        </div>
        <div class="amount">100<span>元</span></div>
      </li>
      <li>
        <div class="pic">
          <sp-icon
            class-prefix="spiconfont"
            size="0.82rem"
            color="#29AF12"
            name="pay_ic_wechat"
          ></sp-icon>
        </div>
        <div class="desc">
          <h3>换业务</h3>
          <p>变更业务，继续办理</p>
        </div>
        <div class="amount">100<span>元</span></div>
      </li>
    </ul>
    <!-- 无退款明细 -->
    <div v-else class="no-refund">
      <div class="middle">
        <div class="img-box">
          <img src="" alt="" />
        </div>
        <p>退款中，请您耐心等待额~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    SpIcon: Icon,
  },
  data() {
    return {
      showNoData: false,
    }
  },
}
</script>

<style lang="less" scoped>
.refund-record {
  min-height: 100vh;
  background: #f8f8f8;
  ::v-deep .spiconfont-sousuo1 {
    margin-right: 34px;
  }
  ul {
    background: #fff;
    li {
      display: flex;
      height: 162px;
      padding: 40px;
      border-top: 1px solid #f4f4f4;
      .pic {
        width: 82px;
        height: 82px;
        display: flex;
        align-items: center;
      }
      .desc {
        margin-left: 28px;
        h3 {
          font-size: 34px;
          color: #222222;
          line-height: 40px;
          font-weight: bold;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #555555;
          line-height: 34px;
          margin-top: 17px;
        }
      }
      .amount {
        font-size: 36px;
        color: #ec5330;
        margin-left: auto;
        span {
          font-size: 24px !important;
        }
      }
    }
  }
  .no-refund {
    display: flex;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
    background: #f8f8f8;
    padding-top: 200px;
    .img-box {
      width: 340px;
      height: 340px;
      background: #000;
      .img {
        width: 340px;
        height: 340px;
      }
    }

    p {
      margin-top: 24px;
      font-size: 30px;
      line-height: 30px;
      color: #222222;
    }
  }
}
</style>
