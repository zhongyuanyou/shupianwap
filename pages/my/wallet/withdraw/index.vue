<template>
  <div class="withdraw">
    <Header title="提现" custom-jump="true" @backHandle="backHandle">
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
          <span>￥</span>
          <input
            v-model="amount"
            type="number"
            maxlength="9"
            oninput="if(value.length>9)value=value.slice(0,9)"
          />
          <!-- <sp-field v-model="amount" type="number" maxlength="9" /> -->
        </div>
      </div>
      <div class="amount-tips">
        账户余额：¥{{ accBalanceData.balance }}，<span @click="withdrawAll"
          >全部提现</span
        >
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
import { walletApi } from '@/api'
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
      accBalanceData: '',
      amount: '',
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('info'))
    },
    accountInfo() {
      return JSON.parse(localStorage.getItem('accountInfo'))
    },
  },
  created() {
    this.getAccountBalance()
    this.getCardList()
  },
  methods: {
    // 返回到提现页面
    backHandle() {
      this.$router.push('/my/wallet')
    },
    // 银行卡列表
    async getCardList() {
      const res = await this.$axios.get(walletApi.cardList, {
        params: {
          accountId: this.accountInfo.id,
        },
      })
      if (res.code === 200) {
        this.selectCardInfo = res.data[0]
      }
    },
    // 账户余额查询
    async getAccountBalance() {
      const res = await this.$axios.post(walletApi.account_balance_info, {
        relationId: this.userInfo.id,
        accType: 'BANK_ACCOUNT_TYPE_2', // 账户类型个人
      })
      console.log(res)
      if (res.code === 200) {
        this.accBalanceData = res.data
      }
    },
    openSelectBankPop() {
      this.$refs.bank.showBankPop = true
    },
    // 选择银行卡
    selectCard(data) {
      this.selectCardInfo = data
      this.$refs.bank.showBankPop = false
    },
    // 提现
    withdraw() {
      const am = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
      if (!this.selectCardInfo.bankName) {
        this.$xToast.warning('请选择到账银行卡')
        return false
      } else if (!this.amount) {
        this.$xToast.warning('请填写提现金额')
        return false
      } else if (Number(this.amount) > Number(this.accBalanceData.balance)) {
        this.$xToast.warning('提现金额不能大于可用余额')
        return false
      } else if (!am.test(this.amount)) {
        this.$xToast.warning('金额格式有误，小数需保留两位')
        return false
      }
      // else if (this.amount < 10) {
      //   this.$xToast.warning('提现金额不可小于N')
      //   return false
      // } else if (this.amount > 88) {
      //   this.$xToast.warning('每次提现不可超过N元')
      //   return false
      // } else if (this.amount > 88) {
      //   this.$xToast.warning('提现金额是否大于可用余额')
      //   return false
      // }
      const withdrawData = {
        amount: this.amount,
        serviceCharge: '0',
        paymentPassword: '',
        bankCardId: this.selectCardInfo.id,
        callBackUrl: '',
        relationId: this.userInfo.id,
        relationName: this.userInfo.fullName,
        attach: '', // 回调会携带此参数
        sysCode: 'chips-app',
        bankName: this.selectCardInfo.bankName,
        desensitizationCardNumber:
          this.selectCardInfo.desensitizationCardNumber,
      }
      localStorage.setItem('withdrawInfo', JSON.stringify(withdrawData))
      this.$router.push('/my/wallet/withdraw/setPwd')
    },
    // 全部提现
    withdrawAll() {
      this.amount = this.accBalanceData.balance
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
        input {
          width: 100%;
          height: 76px;
          border: none;
          font-size: 50px;
        }
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
