<template>
  <div class="apply">
    <Header title="申请提交" custom-jump="true" @backHandle="backHandle"/>
    <div class="apply-box">
      <sp-icon
        class-prefix="spiconfont"
        size="1.19rem"
        color="#00B365"
        name="popup_img_success"
      />
      <p>
        提现申请已提交<br />
        等待银行处理
      </p>
      <div class="apply-item">
        <h3>提现金额</h3>
        <span>¥{{ withdrawInfo.amount }}</span>
      </div>
      <div class="apply-item">
        <h3>提现账户</h3>
        <span>{{ withdrawInfo.bankName }} 储蓄卡(622****4490)</span>
      </div>
      <div class="apply-item">
        <h3>提现用户</h3>
        <span>{{ withdrawInfo.relationName }}</span>
      </div>
      <button @click="$router.push('/my/wallet/withdraw')">返回</button>
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
      withdrawInfo: '',
    }
  },
  mounted() {
    this.withdrawInfo = JSON.parse(localStorage.getItem('withdrawInfo'))
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.apply {
  padding: 0 40px;
  padding-top: 74px;
  min-height: 100vh;
  background: #f5f5f5;
  .apply-box {
    text-align: center;
    p {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #1a1a1a;
      margin-top: 40px;
      margin-bottom: 64px;
    }
    .apply-item {
      display: flex;
      height: 74px;
      line-height: 74px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      justify-content: space-between;
      h3 {
        color: #555555;
        font-weight: normal;
        font-size: 28px;
      }
      span {
        color: #222222;
        width: 500px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 28px;
        text-align: right;
      }
    }
    button {
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      width: 100%;
      display: block;
      height: 95px;
      background: #4974f5;
      border-radius: 8px;
      margin-top: 64px;
    }
  }
}
</style>
