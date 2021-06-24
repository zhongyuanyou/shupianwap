<template>
  <div class="all_invoice">
    <div v-for="orderData of orderList" :key="orderData.id" class="card">
      <div class="card_header flex">
        <div class="card_number flex_1">订单编号：{{ orderData.orderNo }}</div>
        <div class="card_status" :class="orderData.merchantInvoiceStatus">
          {{ orderData.merchantInvoiceStatusName }}
        </div>
      </div>
      <div
        v-for="item of orderData.orderSkuEsList || orderData.orderSkuList"
        :key="item.id"
        class="card_item flex"
      >
        <div class="goods_img">
          <sp-image
            width="100%"
            height="100%"
            fit="cover"
            :src="item.indexImg || 'https://img.yzcdn.cn/vant/cat.jpeg'"
          />
        </div>
        <div class="goods_info flex_1">
          <div class="flex">
            <div class="goods_info_title flex_1">
              {{ item.spuHideName || item.spuName }}
            </div>
            <div
              v-if="
                checkPayType(orderData) !== 2 &&
                checkPayType(orderData) !== 4 &&
                !item.orderType
              "
              class="goods_num goods_price"
            >
              {{ item.skuPrice }}<span class="unit">元</span>
            </div>
          </div>

          <div class="flex">
            <div class="goods_info_des flex_1">
              {{
                item.skuType === skuTypes[1] || item.skuType === skuTypes[3]
                  ? item.skuDetailValues
                  : item.skuDetailValues || getSkus(item.skuExtInfo)
              }}
            </div>
            <div class="goods_num">x1</div>
          </div>

          <!-- <div class="flex">
            <div class="goods_info_increment flex_1">
              <span class="goods_info_increment_label">增值服务</span>
              <span class="goods_info_increment_des">加急办理3天完成</span>
            </div>
            <div class="goods_num goods_info_increment_price">100元 x1</div>
          </div> -->
        </div>
      </div>

      <!-- 定金尾款付费 -->
      <div v-if="checkPayType(orderData) === 2" class="card_price">
        <span>
          总价
          <span v-if="orderData.orderType === 0"> 面议，</span>
          <span v-else>
            {{ orderData.orderTotalMoney }} <span class="unit">元</span>，
          </span>
        </span>

        <span>
          尾款
          <span v-if="orderData.orderType === 0"> 面议，</span>
          <span v-else>
            {{ orderData.lastAount }} <span class="unit">元</span>，
          </span>
        </span>

        <span class="card_price_real">
          <span>定金</span>
          <span class="bold">{{ orderData.depositAmount }}</span>
          <span class="unit">元</span>
        </span>
      </div>
      <!-- 服务完结收费的意向单 -->
      <div
        v-else-if="checkPayType(orderData) === 4 && orderData.orderType === 0"
        class="card_price"
      >
        <span> 总价：面议</span>
      </div>
      <!-- 其他付费方式展示效果一样 -->
      <div v-else class="card_price">
        <span>
          总价
          <span v-if="orderData.orderType === 0"> 面议，</span>
          <span v-else>
            {{ orderData.orderTotalMoney }}<span class="unit">元</span>，
          </span>
        </span>
        <span>
          优惠 {{ orderData.orderDiscountMoney }}<span class="unit">元</span>，
        </span>
        <span class="card_price_real">
          <span>已付款</span>
          <span class="bold">{{ orderData.orderPayableMoney }}</span>
          <span class="unit">元</span>
        </span>
      </div>

      <div class="card_footer">
        <sp-button
          v-if="orderData.merchantInvoiceStatus == 'INVOICE_STATUS_WAITE'"
          plain
          size="small"
          round
          type="default"
          @click="toInvoiceApply(orderData)"
          >申请开发票</sp-button
        >
        <sp-button
          v-else
          plain
          size="small"
          round
          type="default"
          @click="toInvoiceDetail(orderData)"
          >查看发票</sp-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Image, Button } from '@chipspc/vant-dgg'
import OrderMixins from '@/mixins/order'

// 支付类型CODE
const PAYTYPECODE = {
  1: 'PRO_PRE_PAY_POST_SERVICE', // 先付款后服务
  2: 'PRO_PRE_DEPOSIT_POST_OTHERS', // 先定金后尾款
  3: 'PRO_PRE_SERVICE_POST_PAY_BY_NODE', // 按服务节点付费
  4: 'PRO_PRE_SERVICE_FINISHED_PAY', // 服务完结收费
}
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [OrderMixins],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      merchantInvoiceStatus: {
        INVOICE_STATUS_WAITE: '待开票',
        INVOICE_STATUS_PROCESS: '开票中',
        INVOICE_STATUS_SUCCESS: '开票成功',
        INVOICE_STATUS_FAIL: '开票失败',
        INVOICE_STATUS_AUDIT: '审核中',
        INVOICE_STATUS_REJECT: '已驳回',
      },
    }
  },
  computed: {
    orderList() {
      const nowData = JSON.parse(JSON.stringify(this.list))
      console.log(nowData)
      const order = nowData.map((item) => {
        this.changeMoney(item)

        item.merchantInvoiceStatusName =
          this.merchantInvoiceStatus[item.merchantInvoiceStatus]
      })
      return nowData
    },
  },
  methods: {
    // 判断客户单付费类型
    checkPayType(orderData) {
      if (!orderData.cusOrderPayType) return 0
      for (const key in PAYTYPECODE) {
        if (PAYTYPECODE[key] === orderData.cusOrderPayType) return Number(key)
      }
    },

    toInvoiceApply(orderData) {
      this.$router.push({
        path: '/order/invoice/invoiceApply',
        query: {
          id: orderData.id || 1,
        },
      })
    },
    toInvoiceDetail(orderData) {
      this.$router.push({
        path: '/order/invoice/detail',
        query: {
          id: orderData.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.all_invoice {
  background: #f5f5f5;
  overflow: hidden;
  padding: 0 0 20px;
  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }
  .unit {
    display: inline-block;
    // font-size: 20px;
    // line-height: 20px;
    transform-origin: left bottom;
    transform: scale(0.75);
  }
  .bold {
    font-weight: bold;
  }
  .INVOICE_STATUS_WAITE {
    color: #fe8c29;
  }
  .INVOICE_STATUS_PROCESS {
    color: #4974f5;
  }
  .INVOICE_STATUS_SUCCESS {
    color: #00b365;
  }
  .INVOICE_STATUS_FAIL {
    color: #ff3b30;
  }
  .INVOICE_STATUS_AUDIT {
    color: #4974f5;
  }
  .INVOICE_STATUS_REJECT {
    color: #fe8c29;
  }
  .card {
    margin-top: 20px;
    padding: 32px 40px;
    background: #ffffff;
    .card_header {
      .card_number {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
      .card_status {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 24px;

        .success {
          color: #00b365;
        }
        .error {
          color: #ff3b30;
        }
        .warn {
          color: #fe8c29;
        }
      }
    }
    // 每一项的商品
    .card_item {
      padding: 32px 0;
      .goods_img {
        width: 130px;
        height: 130px;
      }
      .goods_info {
        min-width: 0;
        padding: 0 0px 0 24px;
      }
      .goods_info_title {
        padding-bottom: 14px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
        line-height: 28px;
        .mixin-text-oneoverflow();
      }
      .goods_info_des {
        padding-bottom: 26px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 32px;
      }
      .goods_num {
        padding-left: 32px;
        min-width: 120px;
        text-align: right;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
      .goods_price {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        text-align: right;
      }

      .goods_info_increment {
        font-size: 0;
        .goods_info_increment_label {
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 30px;
        }
        .goods_info_increment_des {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 30px;
        }
        .goods_info_increment_price {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 22px;
        }
      }
    }
    .card_price {
      text-align: right;

      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      font-size: 24px;
      line-height: 24px;
      .card_price_real {
        color: #222222;
        font-size: 0px;
        span {
          font-size: 24px;
        }
      }
    }
    .card_footer {
      text-align: right;
    }
  }
}
</style>
