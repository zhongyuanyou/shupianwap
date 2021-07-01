<template>
  <div class="history_invoice">
    <div
      v-for="item of list"
      :key="item.id"
      class="card"
      @click="toInvoiceDetail(item)"
    >
      <div class="card_header flex">
        <div class="card_time flex_1">
          <my-icon
            name="details_ic_time"
            size="0.24rem"
            color="#CCCCCC"
            class="myIcon details_ic_time"
          />{{ item.applyTime }}
        </div>
        <div>
          <my-icon
            name="order_ic_listnext"
            size="0.24rem"
            color="#CCCCCC"
            class="myIcon"
          />
        </div>
      </div>
      <div class="card_label">
        <span>{{ InvoiceType[item.invoiceType] }}</span>
      </div>
      <div class="card_footer">
        <div class="flex_1">
          <span class="name">{{ item.invoiceHeaderName }}</span>
        </div>
        <div class="price">
          {{ changeMoney(item.invoiceMoney) }}
          <span class="unit">元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button, Empty } from '@chipspc/vant-dgg'
import changeMoney from '@/utils/changeMoney.js'
export default {
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      InvoiceType: {
        '027': '增值税电子专用发票',
        '026': '电子普通发票',
        '007': '增值税普通发票',
        '004': '增值税专用发票',
      },
    }
  },
  methods: {
    changeMoney(RMB) {
      return RMB ? changeMoney.regFenToYuan(RMB) : ''
    },
    toInvoiceDetail(orderData) {
      this.$router.push({
        path: '/order/invoice/detail',
        query: {
          orderId: orderData.orderId,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.history_invoice {
  background: #f5f5f5;
  overflow: hidden;
  padding: 0 0 20px;
  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }

  .card {
    margin-top: 20px;
    padding: 32px 40px;
    background: #ffffff;
    font-size: 0;
    min-width: 0;
    .card_header {
      padding: 0 0 42px;
      .card_time {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
        .details_ic_time {
          margin-right: 8px;
        }
      }
    }
    .card_label {
      padding: 0 0 26px;
      & > span {
        display: inline-block;
        padding: 9px 12px;
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4974f5;
        line-height: 22px;
        background: #f2f5ff;
      }
    }

    .card_footer {
      display: flex;
      min-width: 0;
      .flex_1 {
        min-width: 0;
        overflow: hidden;
        margin-right: 40px;
      }
      .name {
        display: inline-block;
        width: 100%;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;

        .mixin-text-oneoverflow();
      }
      .price {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 36px;
      }
      .unit {
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 22px;
      }
    }
  }
}
</style>
