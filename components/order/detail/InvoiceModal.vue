<template>
  <sp-popup v-model="showPop">
    <div class="invoice-toast-modal">
      <div class="btn-close" @click="showPop = false">
        <my-icon name="nav_ic_close" size="0.28rem" color="#222222"> </my-icon>
      </div>
      <p class="title">开票提示</p>
      <div class="modal-content">
        <p class="toast">根据选择的发票类型不同，开具发票时间提示如下：</p>
        <p>1、开具发票需要您先进行确认收货；</p>
        <p>2、电子发票在订单完成后X天开出，在订单详情中下载和查看；</p>
        <p>
          3、如您在下单时未选择开票，180天内，仍可通过订单详情在收货后重新申请开票；
        </p>
        <p>4、退货后原开具的发票自动失效，将不能再作为有效票据；</p>
        <p>
          5、开具同一发票的多个商品部分退货的，原发票将作废，并重新开具与实际等额的发票
        </p>
      </div>
      <div class="btn-area">
        <sp-button @click="showPop = false">我知道了</sp-button>
      </div>
    </div>
  </sp-popup>
</template>

<script>
// 分批支付弹窗
// 按节点服务和定金尾款付费的支付提示弹窗
import { Popup, Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
  data() {
    return {
      showPop: false,
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.sp-popup--bottom {
  border-radius: 24px 24px 0px 0px;
}
.invoice-toast-modal {
  height: auto;
  font-size: 28px;
  position: relative;
  background: #ffffff;
  width: 600px;
  .btn-close {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 40px;
    top: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 0;
  }
  .title {
    text-align: center;
    font-size: 40px;
    margin-bottom: 40px;
    color: #1a1a1a;
    font-weight: 600;
    margin-top: 40px;
  }
  .modal-content {
    padding: 0 40px 40px 40px;
  }
  p {
    font-size: 24px;
    font-weight: 400;
    line-height: 44px;
    margin-bottom: 4px;
  }
  .toast {
    margin-bottom: 10px;
  }
  .btn-area {
    height: 128px;
    border-top: 1px solid #d2d2d2;
    .sp-button {
      width: 100%;
      height: 100%;
      background: none;
      color: #222222;
      font-size: 44px;
      font-weight: 600;
      border: none;
    }
  }
}
</style>
