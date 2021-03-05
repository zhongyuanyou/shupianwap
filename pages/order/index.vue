<template>
  <div class="order-page">
    <Header title="我的订单" :hide-back="true" />
    <sp-tabs v-model="orderType" @click="changeTab">
      <sp-tab title="全部"></sp-tab>
      <sp-tab title="待付款"></sp-tab>
      <sp-tab title="办理中"></sp-tab>
      <sp-tab title="已完成"></sp-tab>
      <sp-tab title="已取消"></sp-tab>
    </sp-tabs>
    <div class="list">
      <orderItem
        v-for="(item, index) in list"
        :key="index"
        :data="item"
        :order-id="item.cusOrderId"
        :order-type="orderType"
        @handleClickItem="handleClickItem"
      >
      </orderItem>
    </div>
    <CancelOrder
      ref="cancleOrderModel"
      :order-id="selectedOrder.cusOrderId"
      :order-sku-list="selectedOrder.selectedOrderSkuList"
    />
    <Bottombar v-if="!isInApp && !isApplets" ref="bottombar" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Tab, Tabs } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import OrderItem from '@/components/order/OrderItem'
import CancelOrder from '@/components/order/CancelOrder'
import Bottombar from '@/components/common/nav/Bottombar'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Header,
    OrderItem,
    CancelOrder,
    Bottombar,
  },
  data() {
    return {
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
      orderType: 0,
      selectedOrder: {}, // 选中的订单
      list: [
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX03',
          orderNo: 'D2021030015',
          cusOrderId: '1314dsada',
          contractUrl: '313141241',
          orderTotalMoney: 500,
          orderDiscountMoney: 120,
          orderPayableMoney: 380,
          orderPaidMoney: 0,
          productVo: [
            {
              name:
                '公司注册公司注册公司注册公司注册公司注册公司注册公司注册公司注册公司注册',
              goodsNumber: 1,
              price: 500,
              fieldList: [
                // 交易属性值
                { fieldValue: '无附带资产' },
                { fieldValue: '无地址注册' },
              ],
              serviceResourceList: [
                // 服务资源数据
                { num: 1, price: 200, serviceItemValName: '加急办理' },
                { num: 1, price: 100, serviceItemValName: 'vip贵宾服务' },
              ],
            },
            {
              name:
                '成都市公司注册服务13313，成都市公司注册服务13313成都市公司注册服务13313成都市公司注册服务13313成都市公司注册服务13313',
              goodsNumber: 1,
              price: 9900,
              fieldList: [
                // 交易属性值
                { fieldValue: '无附带资产' },
                { fieldValue: '无地址注册' },
              ],
            },
          ],
        },
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX03',
          orderNo: 'D2021030015',
          cusOrderId: 'D9323414DAS193141',
          contractId: '',
          orderDiscountMoney: 120, // 优惠金额
          orderPayableMoney: 680, // 订单应付金额
          orderSpuTotalMoney: 800, // 商品总价
          orderTotalMoney: 800,
          productVo: [
            {
              name: '公司注册',
              goodsNumber: 1,
              price: 500,
              serviceResourceList: [
                // 服务资源数据
                { num: 1, price: 200, serviceItemValName: '加急办理' },
                { num: 1, price: 100, serviceItemValName: 'vip贵宾服务' },
              ],
              fieldList: [
                // 交易属性值
                { fieldValue: '无附带资产' },
                { fieldValue: '成都市办理' },
              ],
            },
          ],
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
      isApplets: (state) => state.app.isApplets,
    }),
  },
  methods: {
    changeTab(name, title) {
      console.log(name, title)
    },
    handleClickItem(type, order) {
      console.log(type, order)
      this.selectedOrder = order
      switch (type) {
        case 1:
          // 取消订单
          this.$refs.cancleOrderModel.showPop = true
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.order-page {
  min-height: 100%;
  background: #f5f5f5;
}
</style>
