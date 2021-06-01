<template>
  <div class="bill">
    <Header title="账单" />
    <ul>
      <li @click="$router.push('/my/wallet/bill/detail')">
        <div class="left">
          <h3>提现</h3>
          <p>2020-10-20 10:30:32</p>
        </div>
        <div class="right">+2000.00</div>
      </li>
      <li>
        <div class="left">
          <h3>提现</h3>
          <p>2020-10-20 10:30:32</p>
        </div>
        <div class="right">+2000.00</div>
      </li>
    </ul>
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
.bill {
  min-height: 100vh;
  background: #f8f8f8;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      height: 170px;
      margin-top: 20px;
      padding: 40px;
      background: #fff;
      align-items: center;
      .left {
        font-family: PingFangSC-Medium;
        h3 {
          font-size: 32px;
          color: #222222;
        }
        p {
          font-size: 24px;
          color: #999999;
          margin-top: 32px;
        }
      }
      .right {
        font-family: Bebas;
        color: #1a1a1a;
        font-weight: bold;
        font-size: 40px;
      }
    }
  }
}
</style>
