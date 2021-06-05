<template>
  <div class="after-sale">
    <Header title="选择售后类型">
      <template #right>
        <sp-icon
          class-prefix="spiconfont"
          name="sousuo1"
          size="0.36rem"
          color="#1A1A1A"
        ></sp-icon>
      </template>
    </Header>
    <ul>
      <li @click="$router.push('/my/afterSale/refund')">
        <div class="retreat">退</div>
        <div class="desc">
          <h3>退款</h3>
          <p>平台退款，您的业务办理进度可能会受到影响</p>
        </div>
      </li>
      <li>
        <div class="change">换</div>
        <div class="desc">
          <h3>换业务</h3>
          <p>变更业务，继续办理</p>
        </div>
      </li>
    </ul>
    <div class="platform-desc">
      <sp-icon
        class-prefix="spiconfont"
        name="toast_ic_remind"
        size="0.24rem"
        color="#4974f5"
      ></sp-icon
      ><span>平台售后说明</span>
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
}
</script>

<style lang="less" scoped>
.after-sale {
  min-height: 100vh;
  background: #f4f4f4;
  padding: 0 20px;
  ::v-deep .spiconfont-sousuo1 {
    margin-right: 34px;
  }
  ul {
    li {
      height: 200px;
      background: #ffffff;
      box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.06);
      border-radius: 24px;
      margin-top: 40px;
      display: flex;
      align-items: center;
      padding: 44px 40px;
      .change {
        color: #4974f5 !important;
        background: #f2f5ff !important;
      }
      .retreat,
      .change {
        width: 112px;
        height: 112px;
        line-height: 112px;
        background: rgba(236, 83, 48, 0.06);
        border-radius: 8px;
        color: #ec5330;
        font-size: 48px;
        font-family: PingFangSC-Medium;
        text-align: center;
        font-weight: bold;
      }
      .desc {
        margin-left: 24px;
        h3 {
          font-family: PingFangSC-Medium;
          font-size: 34px;
          color: #1a1a1a;
          line-height: 42px;
        }
        p {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #555555;
          line-height: 32px;
          margin-top: 9px;
        }
      }
    }
  }
  .platform-desc {
    line-height: 32px;
    margin-top: 40px;
    text-align: center;
    span {
      margin-left: 8px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #4974f5;
    }
  }
}
</style>
