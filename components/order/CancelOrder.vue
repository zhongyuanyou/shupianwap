<template>
  <sp-popup v-model="showPop" position="bottom">
    <div class="page-inner">
      <div v-if="step === 1" class="step1">
        <p class="title">{{ modalTitle }}</p>
        <p class="msg">{{ modalToast }}</p>
        <div class="order-list">
          <div class="inner">
            <div
              v-for="(item, index) in orderSkuList"
              :key="index"
              class="item"
              :class="index === orderSkuList.length - 1 ? 'last-item' : ''"
            >
              <p class="p1">
                订单编号：
                <span class="no">{{ item.orderNo }}</span>
                <span class="price">{{ item.price }}元</span>
              </p>
              <div class="serve-area">
                <p
                  v-for="(item2, index2) in item.productVo"
                  :key="index2"
                  class="p2"
                >
                  <span class="name">{{ item2.name }}</span>
                  <span class="num">×{{ item2.goodsNumber }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="step2">
        <p class="title">订单取消</p>
        <div class="toast-area">
          <p>温馨提示：</p>
          <p class="p2">
            订单取消后将无法恢复，优惠券，红包可退回，有效期内使用
          </p>
        </div>
        <p class="title2">请选择取消订单的原因：</p>
        <sp-radio-group v-model="form.reason" class="reason-list">
          <sp-cell
            v-for="(item, index) in reasonList"
            :key="index"
            :title="item.name"
            :border="false"
            clickable
            @click="form.reason = item.code"
          >
            <template #right-icon>
              <sp-radio :name="item.code"></sp-radio>
            </template>
          </sp-cell>
        </sp-radio-group>
      </div>
      <div class="btn-area">
        <sp-button type="default" class="btn1" @click="cancel">{{
          cancelText
        }}</sp-button>
        <sp-button type="primary" class="btn2" @click="submit">{{
          confirmText
        }}</sp-button>
      </div>
    </div>
  </sp-popup>
</template>

<script>
// 有关联订单时的取消订单和支付提示弹窗
// 关联订单提示弹窗
import { Popup, Button, RadioGroup, Radio, Cell } from '@chipspc/vant-dgg'
import { dict } from '@/api/index'
import orderApi from '@/api/order'
let timer
export default {
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
  },
  props: {
    // 订单id
    orderId: {
      type: String,
      default: '',
    },
    // 客户单id
    csuOrderId: { type: String, default: '' },
    // 关联订单列表
    orderSkuList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      showPop: false,
      step: 1,
      // 弹窗业务类型 1为取消订单 2为立即付款
      modalType: 1,
      reasonList: [
        {
          code: 'DONT_NEED',
          name: '用户不需要了',
        },
        {
          code: 'WRONG_PRO_CHOOSE',
          name: '产品选择错误',
        },
        {
          code: 'ORDER_REPEAT',
          name: '重复下单',
        },
        {
          code: 'ORTHER_REASON',
          name: '其他原因',
        },
      ],
      form: {
        reason: '',
      },
    }
  },
  computed: {
    modalTitle() {
      return this.modalType === 1 ? '以下订单会一起取消' : '以下订单需一起付款'
    },
    modalToast() {
      return this.modalType === 1
        ? '由于以下订单具有同属关系，将会一起被取消'
        : '由于以下订单具有同属关系，需要一起付款'
    },
    cancelText() {
      return this.modalType === 1 ? '暂不取消' : '暂不支付'
    },
    confirmText() {
      return this.modalType === 1 ? ' 确定取消' : '立即支付'
    },
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
    if (timer) clearTimeout(timer)
  },
  methods: {
    // 获取取消原因
    async getData() {
      try {
        const data = await dict.findCmsCode(
          { axios: this.$axios },
          {
            code: 'CUS_ORDER_CANCEL_REASON',
          }
        )
        this.reasonList = data
      } catch (error) {
        this.reasonList = []
      }
    },
    submit() {
      if (this.modalType === 1) {
        // 取消订单
        if (this.step === 1) this.step = 2
        else {
          this.$xToast.success('取消订单成功')
          this.cancel()
        }
      } else if (this.modalType === 2) {
        // 立即支付
        this.$router.push('/order/pay')
      }
    },
    cancleOrder() {
      orderApi.cancelOrder(
        { axios: this.axios },
        {
          orderId: this.orderId,
          cancelReasonCode: this.cancelReasonCode,
          cancelReasonName: this.cancelReasonName,
        }
      )
    },
    cancel() {
      this.showPop = false
      timer = setTimeout(() => {
        this.step = 1
      }, 300)
    },
  },
}
</script>

<style lang="less" scoped>
.sp-popup--bottom {
  border-radius: 24px 24px 0px 0px;
}
.page-inner {
  padding: 40px 0;
  position: relative;
  .step1 {
    min-height: 400px;
    max-height: 1200px;
    .title {
      height: 36px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 44px;
      text-align: center;
      margin-bottom: 20px;
    }
    .msg {
      height: 28px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 44px;
      text-align: center;
      margin-bottom: 50px;
    }
    .order-list {
      max-height: 766px;
      min-height: 400px;
      overflow-x: scroll;
      margin-bottom: 140px;
      .inner {
        width: 100%;
        height: auto;
        padding: 0 40px;
        .item {
          width: 100%;
          height: auto;
          background: #f8f8f8;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 40px;
          .p1 {
            font-size: 24px;
            font-weight: 400;
            color: #666;
            .no {
              font-weight: 600;
              color: #222;
            }
            .price {
              float: right;
              color: rgba(236, 83, 48, 1);
            }
          }
          .serve-area {
            margin-top: 24px;
            .p2 {
              height: 36px;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #222222;
              line-height: 36px;
              display: flex;
              .name {
                flex: 1;
                .textOverflow(1);
                padding-right: 40px;
              }
              .num {
                color: #999;
              }
            }
          }
        }
        .last-item {
          margin-bottom: 0;
        }
      }
    }
  }
  .step2 {
    min-height: 400px;
    max-height: 1200px;
    padding: 0 40px;
    .title {
      height: 40px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      margin-bottom: 60px;
    }
    .toast-area {
      width: 100%;
      height: 171px;
      background: #f8f8f8;
      border-radius: 8px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 36px;
      padding: 40px;
      .p2 {
        width: 100%;
        height: 61px;
        font-size: 26px;
        color: #999999;
      }
    }
    .title2 {
      width: 100%;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-top: 70px;
    }
    .reason-list {
      font-size: 28px;
      color: rgba(34, 34, 34, 1);
      margin-bottom: 160px;
      .reason-item {
        margin-top: 70px;
      }
      .sp-cell {
        padding: 0;
        overflow: hidden;
        color: #1a1a1a;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
        margin-top: 70px;
        font-size: 28px;
      }
    }
  }
  .btn-area {
    position: absolute;
    width: 100%;
    height: 180px;
    left: 0;
    bottom: 0;
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 40px;
    .btn1 {
      width: 48%;
      height: 100px;
      background: rgba(73, 116, 245, 0.1);
      border-radius: 8px;
      font-size: 32px;
      color: #4974f5;
      font-weight: 600;
    }
    .btn2 {
      width: 48%;
      height: 100px;
      background: #4974f5;
      font-weight: 600;
      font-size: 32px;
      border-radius: 8px;
    }
  }
}
</style>
