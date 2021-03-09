<template>
  <sp-popup v-model="showPayModal" position="bottom">
    <div class="pay-modal">
      <my-icon
        class="btn-close"
        name="nav_ic_close"
        size="0.28rem"
        color="#222222"
      >
      </my-icon>
      <p class="title">支付款项</p>
      <div class="money-list">
        <sp-radio-group v-model="choosePayStep">
          <sp-radio name="1" icon-size="14px">本期应付</sp-radio>
          <div class="money-area">
            <span class="span1">金额:</span>
            <span class="span2">
              <i> 2800</i>
              元</span
            >
            <span class="span3"
              >查看明细
              <my-icon name="list_ic_next" size="0.28rem" color="#222222">
              </my-icon>
            </span>
          </div>
          <sp-radio name="2" icon-size="14px">全款支付</sp-radio>
          <div class="money-area">
            <span class="span1">金额:</span>
            <span class="span2">
              <i> 2800</i>
              元</span
            >
            <span class="span3"
              >查看明细
              <my-icon name="list_ic_next" size="0.28rem" color="#222222">
              </my-icon>
            </span>
          </div>
        </sp-radio-group>
        <sp-button>去支付</sp-button>
      </div>
    </div>
  </sp-popup>
</template>

<script>
// 按节点服务和定金尾款付费的支付提示弹窗
import { Popup, RadioGroup, Radio, Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
  },
  props: {
    orderData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      choosePayStep: 1,
      showPayModal: false,
    }
  },
}
</script>

<style lang="less" scoped>
.pay-modal {
  position: relative;
  background: #ffffff;
  border-radius: 24px 24px 0px 0px;
  padding: 0 40px;
  max-height: 600px;
  min-height: 400px;
  .btn-close {
    position: absolute;
    right: 40px;
    top: 40px;
  }
  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
    line-height: 136px;
  }
  .money-list {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 56px;
    .money-area {
      padding: 40px 0 40px 40px;
      border-bottom: 1px solid #f4f4f4;
      .span1 {
        color: #222222;
        font-size: 32px;
      }
      .span2 {
        color: #ec5330;
        font-size: 24px;
        i {
          color: #222222;
          font-size: 32px;
          font-style: normal;
        }
      }
      .span3 {
        display: block;
        float: right;
        color: #999999;
      }
    }
  }
}
</style>
