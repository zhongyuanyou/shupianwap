<template>
  <div class="withdraw">
    <Header title="提现">
      <template #right>
        <span
          class="recording"
          @click="$router.push('/my/wallet/withdraw/list')"
          >提现记录</span
        >
      </template>
    </Header>
    <div class="tips">
      <sp-icon
        class-prefix="spiconfont"
        size="0.30rem"
        color="#F86E21"
        name="laba"
      />
      <p>电子钱包由工商银行承保，为了保证提现实时到账，建议提现到工行储蓄卡</p>
    </div>
    <div class="withdraw-form">
      <div class="select">
        <div class="select-row">
          <div class="title">单项选择</div>
          <div class="select-val" @click="openSelectBankPop">
            <span>{{ selectCardInfo.bankName || '请选择' }}</span>
            <sp-icon
              class-prefix="spiconfont"
              size="0.25rem"
              color="#ccc"
              name="you"
            />
          </div>
        </div>
        <div v-if="selectCardInfo" class="bank-item">
          <div class="bank-logo">
            <img :src="selectCardInfo.bankIconUrl" />
          </div>
          <p>
            {{ selectCardInfo.bankName }}({{
              selectCardInfo.desensitizationCardNumber
            }})
          </p>
        </div>
      </div>

      <div class="withdraw-money">
        <div class="title">提现金额</div>
        <div class="amount">
          <span>￥</span
          ><sp-field v-model="amount" type="number" maxlength="5" />
        </div>
      </div>
      <div class="amount-tips">
        账户余额：¥129999.99，<span @click="withdrawAll">全部提现</span>
      </div>
      <div class="withdraw-btn" @click="withdraw">提现</div>
    </div>
    <div class="small-tips">
      <p>
        <sp-icon
          class-prefix="spiconfont"
          size="0.24rem"
          color="#999"
          name="toast_ic_remind"
        />小提示
      </p>
      <p>1、提现申请提交后48小时内到账；</p>
      <p>2、每次提现金额不低于<span>10</span>元；</p>
      <p>3、每次最多可提现<span>10000</span>元;</p>
    </div>
    <SelectBank ref="bank" :current-id="currentId" @selectCard="selectCard" />
  </div>
</template>

<script>
import { Icon, Field } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import SelectBank from '@/components/wallet/SelectBank.vue'
export default {
  components: {
    Header,
    SelectBank,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  data() {
    return {
      selectCardInfo: '',
      currentId: '',
      amount: 88,
    }
  },
  methods: {
    openSelectBankPop() {
      this.$refs.bank.showBankPop = true
    },
    selectCard(data) {
      this.selectCardInfo = data
      this.$refs.bank.showBankPop = false
    },
    // 提现
    withdraw() {
      // if (!account) {
      //   this.$xToast.warning('请填写提现金额')
      //   return false
      // } else if (account < 10) {
      //   this.$xToast.warning('提现金额不可小于N')
      //   return false
      // } else if (account > 88) {
      //   this.$xToast.warning('每次提现不可超过N元')
      //   return false
      // } else if (account > 88) {
      //   this.$xToast.warning('提现金额是否大于可用余额')
      //   return false
      // }
      this.$router.push('/my/wallet/withdraw/setPwd')
    },
    // 全部提现
    withdrawAll() {
      this.amount = 88
    },
  },
}
</script>

<style lang="less" scoped>
.withdraw {
  min-height: 100vh;
  background: #f4f4f4;
  ::v-deep.recording {
    margin-right: 32px;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #1a1a1a;
    font-weight: bold;
  }
  .tips {
    display: flex;
    height: 112px;
    background: #fff3e9;
    padding: 17px 30px;
    i {
      position: relative;
      top: 8px;
    }
    p {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #f86e21;
      line-height: 38px;
      margin-left: 12px;
    }
  }
  .withdraw-form {
    padding: 0 40px;
    padding-bottom: 40px;
    background: #fff;
    .amount-tips {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      margin-top: 16px;
      span {
        color: #4974f5 !important;
      }
    }
    .withdraw-btn {
      height: 96px;
      line-height: 96px;
      text-align: center;
      background: #4974f5;
      border-radius: 8px;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
      margin-top: 60px;
    }

    .withdraw-money {
      border-bottom: 1px solid #f4f4f4;
      .title {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #222222;
        line-height: 110px;
        height: 110px;
      }
      .amount {
        display: flex;
        align-items: center;
        span {
          font-family: PingFangSC-Medium;
          font-size: 52px;
          color: #222222;
        }
        ::v-deep .sp-cell {
          font-size: 50px;
        }
      }
    }
  }
  .select {
    border-bottom: 1px solid #f4f4f4;
    padding: 34px 0px;
    .select-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 32px;
        color: #222222;
        font-family: PingFangSC-Regular;
        line-height: 44px;
      }
      .select-val {
        display: flex;
        align-items: center;
        span {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #999999;
          margin-right: 16px;
        }
      }
    }
    .bank-item {
      height: 40px;
      line-height: 40px;
      margin-top: 28px;
      display: flex;
      align-items: center;
      .bank-logo {
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        margin-left: 10px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #222222;
      }
    }
  }

  .small-tips {
    background: #f4f4f4;
    padding: 0 40px;
    p:first-child {
      margin-top: 36px;
      margin-bottom: 4px;
    }
    p {
      font-family: PingFangSC-Regular;
      line-height: 40px;
      font-size: 24px;
      color: #999999;
      ::v-deep i {
        margin-right: 10px;
      }
      span {
        color: #ec5330 !important;
      }
    }
  }
}
</style>
