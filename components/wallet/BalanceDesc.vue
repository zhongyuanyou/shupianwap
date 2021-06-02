<template>
  <div class="content">
    <sp-popup
      v-model="showBalanceDesc"
      closeable
      round
      position="bottom"
      :style="{ width: '100%', height: '40%' }"
    >
      <div class="title">余额使用说明</div>
      <div class="info">
        <p>1、余额也可以通过推广返佣、退款获得；</p>
        <p>2、余额永不过期；</p>
        <p>
          3、余额提现每笔最低不低于<span>¥10.00</span>，每笔提现最
          <br />高不高于<span>¥10000.00</span>。
        </p>
      </div>
      <div class="confirm-btn" @click="clickClosePop">我知道了</div>
    </sp-popup>
  </div>
</template>
<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
  },
  data() {
    return {
      showBalanceDesc:false
    }
  },
  methods: {
    clickClosePop() {
      this.showBalanceDesc = false
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  ::v-deep .title {
    font-family: PingFangSC-Medium;
    font-size: 40px;
    line-height: 130px;
    color: #1a1a1a;
    font-weight: bold;
    padding: 0 40px;
  }
  ::v-deep.info {
    padding: 0 40px;
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #222222;
    p {
      margin-bottom: 28px;
      span {
        color: #ec5330;
      }
    }
  }
  .confirm-btn {
    height: 96px;
    margin: 0 40px;
    line-height: 96px;
    background: #4974f5;
    border-radius: 8px;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    margin-top: 38px;
  }
}
</style>
