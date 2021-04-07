<template>
  <div class="page">
    <Header title="账单明细" @leftClickFuc="onClickLeft" />
    <div class="list">
      <div
        v-for="(item, index) in allOrderSkuList"
        :key="index"
        class="item"
        @click="toDetail(item.orderId, item.id)"
      >
        <div class="left">
          <p class="goods-name">
            {{ item.orderSaleName }}
          </p>
          <p class="goods-skus">
            {{ item.skuExtInfo }}
          </p>
        </div>
        <div class="right">
          {{ item.skuPayableTotalMoney }}元
          <my-icon
            name="list_ic_next"
            size="0.24rem"
            color="rgba(204, 204, 204, 1)"
          >
          </my-icon>
        </div>
      </div>
    </div>
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
// 服务商品账单明细
import Header from '@/components/common/head/header'
import OrderMixins from '@/mixins/order'
import orderApi from '@/api/order'
import changeMoney from '@/utils/changeMoney'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  components: {
    Header,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      loading: true,
      isPayAll: 0, // 0 未本期 1为全部付款
      cusOrderId: '',
      allOrderSkuList: [],
    }
  },
  // computed: {
  //   shoulPayDetail: {
  //     set(val) {
  //       return val
  //     },
  //     get() {
  //       return this.payList.filter((item) => {
  //         return this.isPayAll === 0
  //           ? item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1'
  //           : item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_1' ||
  //               item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_0'
  //       })
  //     },
  //   },
  // },
  mounted() {
    if (this.$route.query.cusOrderId) {
      this.cusOrderId = this.$route.query.cusOrderId
      this.isPayAll = this.$route.query.isPayAll
      this.getChildOrders()
    } else {
      this.$xToast.error('缺少参数')
      this.$router.back(-1)
    }
  },
  methods: {
    // 查询客户单下的关联订单
    getChildOrders() {
      orderApi
        .getChildOrder({ axios: this.$axios }, { cusOrderId: this.cusOrderId })
        .then((res) => {
          this.loading = false
          console.log('子订单返回', res)
          // 筛选应支付订单
          const shoudPayOrderList = res.list.filter((item) => {
            return item.isNeedPay === 1 || item.isNeedPay === '1'
          })
          console.log('shoudPayOrderList', shoudPayOrderList)
          // 组装所有应支付订单下的商品
          const allOrderSkuList = []
          for (let i = 0; i < shoudPayOrderList.length; i++) {
            const everyOrderSku =
              shoudPayOrderList[i].orderSkuList ||
              shoudPayOrderList[i].orderSkueList
            for (let j = 0; j < everyOrderSku.length; j++) {
              allOrderSkuList.push(everyOrderSku[j])
            }
          }
          // 处理价格
          for (let i = 0, l = allOrderSkuList.length; i < l; i++) {
            if (allOrderSkuList[i].skuPayableTotalMoney)
              allOrderSkuList[
                i
              ].skuPayableTotalMoney = changeMoney.regFenToYuan(
                allOrderSkuList[i].skuPayableTotalMoney
              )
          }
          this.allOrderSkuList = allOrderSkuList
          console.log('allOrderSkuList', allOrderSkuList)
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.data.err || '操作失败')
        })
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    toDetail(orderId, skuId) {
      this.$router.push({
        path: '/order/nodeDetail',
        query: { cusOrderId: this.cusOrderId, orderId, skuId },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background: #f4f4f4;
  .list {
    background: white;
    padding: 0 40px;
    .item {
      padding: 40px 0;
      display: flex;
      border-bottom: 1px solid #f4f4f4;
      .left {
        flex: 1;
        .goods-name {
          font-size: 32px;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
          .textOverflow(1);
        }
        .goods-skus {
          font-size: 24px;
          color: #999;
          .textOverflow(1);
        }
      }
      .right {
        padding-top: 30px;
        width: 170px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ec5330;
        line-height: 48px;
        text-align: right;
      }
    }
  }
}
</style>
