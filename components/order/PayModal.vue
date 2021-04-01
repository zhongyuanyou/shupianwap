<template>
  <sp-popup v-model="showPop" position="bottom">
    <div class="pay-modal">
      <div class="btn-close" @click="cancelModal">
        <my-icon name="nav_ic_close" size="0.28rem" color="#222222"> </my-icon>
      </div>
      <p class="title">支付款项</p>
      <div v-if="payList.length" class="money-list">
        <section
          v-if="payList[0].orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE'"
        >
          <!-- 服务节点付费 -->
          <sp-radio-group>
            <sp-radio name="1" icon-size="16px" class="radio radio1"
              >本期应付</sp-radio
            >
            <div class="money-area">
              <span class="span1">金额:</span>
              <span class="span2">
                <span class="money1">{{ thisTimePayTotal }}</span>
                元</span
              >
              <span class="span3" @click="toDetail"
                >查看明细
                <my-icon
                  name="list_ic_next"
                  size="0.26rem"
                  color="rgba(204, 204, 204, 1)"
                >
                </my-icon>
              </span>
            </div>
            <sp-radio name="2" icon-size="16px" class="radio radio2"
              >全款支付</sp-radio
            >
            <div class="money-area">
              <span class="span1">金额:</span>
              <span class="span2">
                <span class="money1">{{ allTimePayTotal }}</span>
                元</span
              >
              <span class="span3" @click="toDetail"
                >查看明细
                <my-icon
                  name="list_ic_next"
                  size="0.26rem"
                  color="rgba(204, 204, 204, 1)"
                >
                </my-icon>
              </span>
            </div>
          </sp-radio-group>
        </section>
        <section
          v-if="payList[0].orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS'"
        >
          <!-- 定金尾款付费 -->
          <sp-radio-group>
            <sp-radio
              v-if="payList[0].batchNumber === 0"
              name="1"
              icon-size="16px"
              class="radio radio1"
              >定金</sp-radio
            >
            <sp-radio
              v-if="payList[0].batchNumber === 1"
              name="1"
              icon-size="16px"
              class="radio radio1"
              >尾款</sp-radio
            >
            <div class="money-area">
              <span class="span1">金额:</span>
              <span class="span2">
                <span class="money1">{{ thisTimePayTotal }}</span>
                元</span
              >
              <span class="span3" @click="toDetail"
                >查看明细
                <my-icon
                  name="list_ic_next"
                  size="0.26rem"
                  color="rgba(204, 204, 204, 1)"
                >
                </my-icon>
              </span>
            </div>
          </sp-radio-group>
        </section>
      </div>
      <div class="btn-area">
        <sp-button @click="toPay">去支付</sp-button>
      </div>
    </div>
  </sp-popup>
</template>

<script>
// 分批支付弹窗
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
    // 分批支付数据列表
    payList: {
      type: Array,
      default() {
        return []
      },
    },
    batchPayStatus: {
      type: Object,
      default() {
        return {}
      },
    },
    // 本期应付总额
    thisTimePayTotal: {
      type: [Number, String],
      default: 0,
    },
    // 剩余未支付所有批次总额
    allTimePayTotal: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      showPop: false,
    }
  },
  methods: {
    cancelModal() {
      this.showPop = false
    },
    toDetail() {
      this.$router.push('/order/billDetail')
    },
    toPay() {
      this.$router.push({
        path: '/pay/payType',
        query: {
          orderId: this.orderData.id,
          cusOrderId: this.orderData.cusOrderId,
          fromPage: this.fromPage,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.sp-popup--bottom {
  border-radius: 24px 24px 0px 0px;
}
.pay-modal {
  max-height: 800px;
  min-height: 500px;
  height: auto;
  font-size: 28px;
  padding: 40px 40px 0 40px;
  position: relative;
  background: #ffffff;
  .btn-close {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 40px;
    top: 60px;
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
  }
  .money-list {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 56px;
    /deep/.sp-radio {
      color: rgba(34, 34, 34, 34);
      font-size: 32px;
    }
    .radio {
      color: rgba(34, 34, 34, 34);
      font-size: 32px;
    }
    .radio2 {
      margin-top: 20px;
    }
    .money-area {
      padding: 20px 0 20px 40px;
      border-bottom: 1px solid #f4f4f4;
      .span1 {
        color: #222222;
        font-size: 32px;
      }
      .span2 {
        color: #ec5330;
        font-size: 24px;
        .money1 {
          font-size: 32px;
          font-style: normal;
          font-weight: 600;
        }
      }
      .span3 {
        display: block;
        float: right;
        color: #999999;
        font-size: 26px;
      }
    }
  }
  .btn-area {
    padding: 24px 0;
    height: 128px;
    .sp-button {
      display: block;
      float: left;
      width: 100%;
      height: 100%;
      background: #ec5330;
      border-radius: 8px;
      color: white;
      font-size: 28px;
      font-weight: 600;
    }
  }
}
</style>
