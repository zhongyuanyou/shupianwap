<template>
  <div class="wallet">
    <div class="wallet-bg">
      <Header title="我的余额">
        <template #right>
          <sp-icon
            class-prefix="spiconfont"
            name="shezhi"
            size="0.32rem"
            color="#fff"
          ></sp-icon>
        </template>
      </Header>
    </div>
    <div class="my-wallet">
      <div class="title">
        <span>总资产(元)</span
        ><sp-icon
          class-prefix="spiconfont"
          name="xianshi"
          size="0.24rem"
          color="#555555"
        ></sp-icon>
      </div>
      <div class="total">
        <strong>1200.12</strong
        ><sp-icon
          class-prefix="spiconfont"
          name="you"
          size="0.24rem"
          color="#999"
        ></sp-icon>
      </div>
      <div class="quota-infor">
        <div class="quota-item">
          <h3>
            <span>可提现(元)</span
            ><sp-icon
              class-prefix="spiconfont"
              name="details_ic_sigh"
              size="0.24rem"
              color="#999"
            ></sp-icon>
          </h3>
          <p>800.00</p>
        </div>
        <div class="quota-item">
          <h3>
            <span>可冻结(元)</span
            ><sp-icon
              class-prefix="spiconfont"
              name="details_ic_sigh"
              size="0.24rem"
              color="#999"
            ></sp-icon>
          </h3>
          <p>200.00</p>
        </div>
      </div>
      <div class="withdrawal-btn">提现</div>
      <div class="money-desc" @click="openBalanceDesc">
        <my-icon
          class-prefix="spiconfont"
          name="toast_ic_remind"
          size="0.24rem"
          color="#4974f5"
        ></my-icon
        ><span>余额使用说明</span>
      </div>
    </div>
    <div class="more-features">
      <h2>更多功能</h2>
      <ul>
        <li @click="$router.push('/my/wallet/bill/list')">
          <img />
          <p>账单</p>
        </li>
        <li>
          <img />
          <p>银行卡</p>
        </li>
        <li>
          <img />
          <p>敬请期待</p>
        </li>
      </ul>
    </div>
    <BalanceDesc ref="balanceDesc" />
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import BalanceDesc from '@/components/wallet/BalanceDesc.vue'
export default {
  components: {
    Header,
    SpIcon: Icon,
    BalanceDesc,
  },
  data() {
    return {}
  },
  methods: {
    openBalanceDesc() {
      this.$refs.balanceDesc.showBalanceDesc = true
    },
  },
}
</script>

<style lang="less" scoped>
.wallet {
  height: 100%;
  background: #fff;
  .wallet-bg {
    height: 432px;
    background: #4974f5;
    ::v-deep.slot-left .back-icon {
      color: #fff !important;
    }
    ::v-deep.title {
      color: #fff;
    }
    ::v-deep.my-head {
      background: none !important;
    }
    ::v-deep.slot-right {
      font-size: 32px;
      text-align: center;
      .spiconfont-shezhi {
        line-height: 32px;
        margin-right: 32px;
      }
    }
  }
  .my-wallet {
    height: 602px;
    background: #ffffff;
    border-radius: 24px;
    position: relative;
    z-index: 9;
    margin: -286px 20px 0 20px;
    padding-top: 80px;
    text-align: center;

    .title {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #555555;
      line-height: 24px;
      span {
        margin-right: 8px;
      }
    }
    .total {
      line-height: 64px;
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      strong {
        font-size: 64px;
        margin-right: 12px;
      }
    }
    .quota-infor {
      padding: 0 40px;
      display: flex;
      margin-top: 70px;
      .quota-item {
        width: 50%;
        font-family: PingFangSC-Medium;
        h3 {
          color: #999;
          font-size: 24px;
          line-height: 32px;
          span {
            margin-right: 8px;
          }
        }
        p {
          color: #222;
          font-size: 36px;
          font-weight: bold;
          margin-top: 10px;
          line-height: 50px;
        }
      }
    }
    .withdrawal-btn {
      height: 100px;
      text-align: center;
      line-height: 100px;
      background: #4974f5;
      margin: 0 40px;
      margin-top: 43px;
      border-radius: 8px;
      color: #fff;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
    }
    .money-desc {
      font-size: 24px;
      margin-top: 40px;
      color: #4974f5;
      span {
        margin-left: 8px;
      }
    }
  }
  .more-features {
    margin-top: 20px;
    padding: 0 60px;
    h2 {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #1a1a1a;
      line-height: 36px;
      line-height: 130px;
    }
    ul {
      display: flex;
      justify-content: center;
      li {
        width: 33.33%;
        text-align: center;
        img {
          width: 88px;
          height: 88px;
          background: #4974f5;
        }
        p {
          font-size: 28px;
          margin-top: 18px;
          line-height: 28px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
