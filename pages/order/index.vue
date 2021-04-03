<template>
  <div class="order-page">
    <Header v-if="!isInApp && !isApplets" title="我的订单" :hide-back="true">
      <template #right>
        <div class="btn-car" @click="toCar">购物车</div>
      </template>
    </Header>
    <div
      class="top-nav"
      :style="{ top: !isInApp && !isApplets ? '44px' : '0' }"
    >
      <sp-tabs v-model="selectedOrderStatus" @click="changeTab">
        <sp-tab name="" title="全部"></sp-tab>
        <sp-tab name="ORDER_CUS_STATUS_UNPAID" title="待付款"></sp-tab>
        <sp-tab name="ORDER_CUS_STATUS_PROGRESSING" title="办理中"></sp-tab>
        <sp-tab name="ORDER_CUS_STATUS_COMPLETED" title="已完成"></sp-tab>
        <sp-tab name="ORDER_CUS_STATUS_CANCELLED" title="已取消"></sp-tab>
      </sp-tabs>
    </div>
    <div class="list">
      <orderItem
        v-for="(item, index) in list"
        :key="index"
        :order-data="item"
        :order-id="item.cusOrderId"
        :order-type="selectedOrderStatus"
        @handleClickItem="handleClickItem"
      >
      </orderItem>
    </div>
    <CancelOrder
      ref="cancleOrderModel"
      :order-id="orderData.orderId"
      :cus-order-id="orderData.cusOrderId"
      :order-list="orderData.orderList"
      @cancleOrder="cancleOrder"
      @getBatchList="getBatchList"
    />
    <div v-if="!list.length" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p class="text">暂无订单</p>
    </div>
    <PayModal
      ref="payModal"
      :order-data="orderData"
      :pay-list="payList"
      :batch-pay-status="batchPayStatus"
      :this-time-pay-total="thisTimePayTotal"
    />
    <Bottombar v-if="!isInApp && !isApplets" ref="bottombar" />
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Tab, Tabs } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import OrderItem from '@/components/order/OrderItem'
import CancelOrder from '@/components/order/CancelOrder' // 取消订单弹窗
import PayModal from '@/components/order/PayModal' // 支付弹窗
import Bottombar from '@/components/common/nav/Bottombar'
import orderApi from '@/api/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import OrderMixins from '@/mixins/order'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Header,
    OrderItem,
    CancelOrder,
    Bottombar,
    PayModal,
    LoadingCenter,
  },
  mixins: [OrderMixins],
  data() {
    return {
      page: 1,
      limit: 20,
      loading: true,
      tabs: [
        {
          name: 0,
          title: '全部',
        },
        {
          name: 1,
          title: '待付款',
        },
        {
          name: 2,
          title: '办理中',
        },
        {
          name: 3,
          title: '已完成',
        },
        {
          name: 4,
          title: '已取消',
        },
      ],
      selectedOrderStatus: 'ORDER_CUS_STATUS_UNPAID',
      orderData: {}, // 选中的订单
      list: [],
      payList: [], // 分批支付信息
      fromPage: 'orderList',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    navTop() {
      return 44
    },
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    changeTab(name, title) {
      this.selectedOrderStatus = name
      this.getOrderList()
    },
    toCar() {
      this.$router.push('../shopCart/')
    },
    getOrderList() {
      this.loading = true
      orderApi
        .list(
          { axios: this.$axios },
          {
            page: this.page,
            limit: this.limit,
            cusOrderStatusNo: this.selectedOrderStatus,
          }
        )
        .then((res) => {
          this.loading = false
          this.list = res.records
        })
        .catch(() => {
          this.loading = false
          this.$xToast.error('获取数据失败')
        })
    },
    handleClickItem(type, order) {
      this.initItem(order)
      switch (type) {
        case 1:
          // 取消订单 首先判断是否有关联订单
          this.opType = 'cancelOrder'
          this.getChildOrders()
          break
        case 2:
          // 签署合同
          this.$router.push({
            path: '/contract/edit',
            query: {
              orderId: this.orderData.id,
              cusOrderId: this.orderData.cusOrderId,
              fromPage: this.fromPage,
            },
          })
          break
        case 3:
          // 查看合同
          this.$router.push({
            path: '/contract/edit',
            query: {
              orderId: this.orderData.id,
              cusOrderId: this.orderData.cusOrderId,
              fromPage: this.fromPage,
            },
          })
          break
        case 4:
          // 立即付款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders()
          break
        case 5:
          // 支付余款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders()
          break
        case 6:
          // 确认完成
          this.opType = 'confirmComplete'
          this.confirmOrder()
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.btn-car {
  margin-right: 20px;
}
.order-page {
  min-height: 100%;
  background: #f5f5f5;
  /deep/ .top-nav {
    position: fixed;
    width: 100%;
    left: 0;
    height: 88px;
    z-index: 2;
    overflow: hidden;
    border-bottom: 1px solid #f0f0f0;
    .sp-tab--active {
      color: rgba(73, 116, 245, 1);
    }
    .sp-tab--active .sp-tab__text {
      color: #4974f5;
      font-weight: bold;
    }
    .sp-tabs__line {
      bottom: 40px;
      width: 32px;
    }
  }
  .list {
    padding-bottom: 180px;
    margin-top: 108px;
  }
}
.no-data-area {
  width: 100%;
  height: 100vh;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  img {
    width: 340px;
    height: 340px;
    margin: 20vh auto 40px auto;
    display: block;
  }
  .text {
    height: 29px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #1a1a1a;
    text-align: center;
  }
}
</style>
