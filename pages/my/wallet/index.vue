<template>
  <div class="wallet">
    <div class="wallet-bg">
      <Header
        title="我的余额"
        :custom-jump="customJump"
        @backHandle="backHandle"
      >
        <template #right>
          <sp-icon
            v-if="accAccountData.status && accAccountData.status === 1"
            class-prefix="spiconfont"
            name="shezhi"
            size="0.4rem"
            color="#fff"
            @click="$router.push('/my/settings')"
          ></sp-icon>
        </template>
      </Header>
    </div>
    <div class="my-wallet">
      <div class="title">
        <span>总资产(元)</span
        ><sp-icon
          class-prefix="spiconfont"
          :name="look"
          size="0.24rem"
          color="#555555"
          @click="showAccountMoney"
        ></sp-icon>
      </div>
      <div class="total" @click="jumpBillPage">
        <strong v-if="showAccountBal"
          >¥{{ accountBalData.totalBalance || '0.00' }}</strong
        ><strong v-else class="top9">****</strong
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
              name="toast_ic_remind"
              size="0.24rem"
              color="#999"
              @click="tipsPop(0)"
            ></sp-icon>
          </h3>
          <p v-if="showAccountBal">¥{{ accountBalData.balance || '0.00' }}</p>
          <p v-else>****</p>
        </div>
        <div class="quota-item">
          <h3>
            <span>已冻结(元)</span
            ><sp-icon
              class-prefix="spiconfont"
              name="toast_ic_remind"
              size="0.24rem"
              color="#999"
              @click="tipsPop(1)"
            ></sp-icon>
          </h3>
          <p v-if="showAccountBal">
            ¥{{ accountBalData.frozenBalance || '0.00' }}
          </p>
          <p v-else>****</p>
        </div>
      </div>
      <div class="withdrawal-btn" @click="withdraw">提现</div>
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
        <li @click="jumpBillPage">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/cywftptrfq80000.png"
          />
          <p>账单</p>
        </li>
        <li @click="jumpBankCardPage">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/1vqyes3vygdc000.png"
          />
          <p>银行卡</p>
        </li>
        <li @click="more">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/5goi47anw8g0000.png"
          />
          <p>敬请期待</p>
        </li>
      </ul>
    </div>
    <BalanceDesc ref="balanceDesc" />
  </div>
</template>

<script>
import { Icon, Dialog } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
import BalanceDesc from '@/components/wallet/BalanceDesc.vue'
export default {
  components: {
    Header,
    SpIcon: Icon,
    BalanceDesc,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      accountBalData: '', // 查询余额
      accAccountData: '', // 查询激活返回的数据
      checkPassword: '', // 检测是否设置密码
      showAccountBal: false,
      look: 'yincang',
      customJump: true,
      userInfo: '',
      accountInfo: '',
    }
  },
  async mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('info'))
    this.accountInfo = JSON.parse(localStorage.getItem('accountInfo'))
    await this.getAccountInfo()
    await this.getAccountBalInfo()
    // this.checkSetPassword()
    // this.$router.push('/my/settings/protocol?categoryCode=protocol100041')
    // this.openActivationDialog()
  },
  methods: {
    jumpBillPage() {
      // 先验证激活没有
      if (!this.accAccountData.status && this.accAccountData.status !== 1) {
        this.openActivationDialog()
      } else {
        this.$router.push('/my/wallet/bill/list')
      }
    },
    jumpBankCardPage() {
      // 先验证激活没有
      if (!this.accAccountData.status && this.accAccountData.status !== 1) {
        this.openActivationDialog()
      } else {
        this.$router.push('/my/wallet/bankCards/list')
      }
    },

    // 金额信息友情提示
    tipsPop(state) {
      this.$xToast.show({
        message: state === 0 ? '可提现总金额' : '提现中的总金额',
      })
    },
    backHandle() {
      this.$router.push('/my')
    },
    // 金额脱敏
    showAccountMoney() {
      // 先验证激活没有
      if (!this.accAccountData.status && this.accAccountData.status !== 1) {
        this.openActivationDialog()
      } else {
        this.showAccountBal = !this.showAccountBal
        this.showAccountBal ? (this.look = 'xianshi') : (this.look = 'yincang')
      }
    },
    //     // 实名认证信息
    async getAccountBalInfo() {
      const res = await this.$axios.post(walletApi.account_balance_info, {
        relationId: this.userInfo.id,
        accType: 'BANK_ACCOUNT_TYPE_2', // 账户类型个人
      })
      console.log(res)
      if (res.code === 200) {
        this.accountBalData = res.data
      }
    },
    withdraw() {
      // 没有激活就去激活
      if (!this.accAccountData.status && this.accAccountData.status !== 1) {
        this.openActivationDialog()
      } else {
        // if (this.accountBalData.totalBalance < 10) {
        //   this.$xToast.show({ message: '提现金额不能低于10元' })
        //   return
        // }
        this.$router.push('/my/wallet/withdraw')
      }
    },
    async checkSetPassword() {
      const res = await this.$axios.get(walletApi.check_set_password, {
        params: {
          accId: this.accountInfo.id,
        },
      })
      if (res.code === 200) {
        this.checkPassword = res.data
        if (!this.checkPassword) {
          this.$router.push({
            path: '/my/settings/setPwd?status=0',
          })
        } else {
          this.$router.push('/my/settings/protocol?categoryCode=protocol100041')
        }
      }
    },
    openActivationDialog() {
      Dialog.confirm({
        title: '激活钱包',
        message: '钱包激活后才可以使用哦！',
        confirmButtonText: '马上激活',
        cancelButtonText: '取消',
      })
        .then((res) => {
          if (this.userInfo.realStatus === 'AUTHENTICATION_SUCCESS') {
            // 未查询到账户信息及未激活
            if (
              !this.accAccountData.status &&
              this.accAccountData.status !== 1
            ) {
              this.$router.push(
                '/my/settings/protocol?categoryCode=protocol100041'
              )
            }
          } else {
            // 未认证
            this.$router.push({
              path: '/contract/authentication',
            })
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    openBalanceDesc() {
      this.$refs.balanceDesc.showBalanceDesc = true
    },
    // 获取钱包信息
    async getAccountInfo() {
      const res = await this.$axios.post(walletApi.info, {
        accountId: '',
        relationId: this.userInfo.id,
      })
      if (res.code === 200) {
        this.accAccountData = res.data
        if (!this.accAccountData.status && this.accAccountData.status !== 1) {
          this.openActivationDialog()
        } else {
          // 保存账户信息
          localStorage.setItem(
            'accountInfo',
            JSON.stringify(this.accAccountData)
          )
        }
      }
    },

    more() {
      this.$xToast.show({
        message: '功能建设中...',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.top9 {
  position: relative;
  top: 9px;
}
.wallet {
  height: 100%;
  background: #f8f8f8;
  ::v-deep .sp-dialog__message--has-title {
    color: #222 !important;
    font-size: 28px;
  }
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
    padding: 0 60px;
    background: #fff;
    padding-bottom: 46px;
    margin: 0 20px;
    margin-top: 20px;
    border-radius: 24px;
    h2 {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #1a1a1a;
      padding: 40px 0;
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
