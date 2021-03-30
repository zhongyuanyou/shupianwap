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
        :data="item"
        :order-id="item.cusOrderId"
        :order-type="selectedOrderStatus"
        @handleClickItem="handleClickItem"
      >
      </orderItem>
    </div>
    <CancelOrder
      ref="cancleOrderModel"
      :order-id="selectedOrder.cusOrderId"
      :order-sku-list="selectedOrder.selectedOrderSkuList"
    />
    <PayModal ref="payModal" :order-data="selectedOrder" />
    <Bottombar v-if="!isInApp && !isApplets" ref="bottombar" />
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
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Header,
    OrderItem,
    CancelOrder,
    Bottombar,
    PayModal,
  },
  data() {
    return {
      page: 1,
      limit: 20,
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
      selectedOrderStatus: '',
      selectedOrder: {}, // 选中的订单
      list: [
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX01',
          orderNo: 'D2021030015',
          cusOrderId: '1314dsada',
          contractUrl: '313141241',
          orderTotalMoney: 500,
          orderDiscountMoney: 120,
          orderPayableMoney: 380,
          orderPaidMoney: 0,
          payType: 1, // 订单支付方式 1全款 2节点付费 3定金尾款 4服务完结
          productVo: [
            {
              name: '非服务商品这是测试1',
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
          id: 'D013DDA41OIX01',
          orderNo: 'D2021030015',
          cusOrderId: '1314dsada',
          contractUrl: '313141241',
          orderTotalMoney: 500,
          orderDiscountMoney: 120,
          orderPayableMoney: 380,
          orderPaidMoney: 0,
          payType: 1, // 订单支付方式 1全款 2节点付费 3定金尾款 4服务完结
          productVo: [
            {
              name:
                '服务商品全款公司注册公司注册公司注册公司注册公司注册公司注册公司注册公司注册公司注册',
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
          cusOrderId: 'D9323414DAS193143',
          contractId: '',
          orderDiscountMoney: 120, // 优惠金额
          orderPayableMoney: 680, // 订单应付金额
          orderSpuTotalMoney: 800, // 商品总价
          orderTotalMoney: 800,
          payType: 3, // 订单支付方式 1全款 2节点付费 3定金尾款 4服务完结
          productVo: [
            {
              name: '服务商品按节点付费13131',
              goodsNumber: 1,
              price: 500,
              serviceResourceList: [
                // 服务资源数据
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
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX01',
          orderNo: 'D2021030015',
          cusOrderId: 'D9323414DAS193143',
          contractId: '',
          orderDiscountMoney: 120, // 优惠金额
          orderPayableMoney: 680, // 订单应付金额
          orderSpuTotalMoney: 800, // 商品总价
          orderTotalMoney: 800,
          payType: 3, // 订单支付方式 1全款 2节点付费 3定金尾款 4服务完结
          productVo: [
            {
              name: '服务商品定金尾款付费13131',
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
            {
              name: '商标注册服务1',
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
            {
              name: '公司注册服务2',
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
                {
                  fieldValue: '成都市办理2，成都市办理2成都市办理2成都市办理2',
                },
                { fieldValue: '成都市办理' },
                { fieldValue: '成都市办理' },
                { fieldValue: '成都市办理' },
              ],
            },
            {
              name: '公司注册服务3',
              goodsNumber: 1,
              price: 400,
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
            {
              name: '公司注册服务4',
              goodsNumber: 1,
              price: 400,
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
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX01',
          orderNo: 'D2021030015',
          cusOrderId: 'D9323414DAS193143',
          contractId: '',
          orderDiscountMoney: 120, // 优惠金额
          orderPayableMoney: 680, // 订单应付金额
          orderSpuTotalMoney: 800, // 商品总价
          orderTotalMoney: 800,
          payType: 4, // 订单支付方式 1全款 2节点付费 3定金尾款 4服务完结
          productVo: [
            {
              name: '服务商品服务完结付费13133',
              goodsNumber: 1,
              price: 500,
              serviceResourceList: [
                // 服务资源数据
                { num: 1, price: 200, serviceItemValName: '加急办理' },
              ],
              fieldList: [
                // 交易属性值
                { fieldValue: '无附带资产' },
                { fieldValue: '成都市办理' },
              ],
            },
          ],
        },
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX02',
          orderNo: 'D2021030015',
          cusOrderId: 'D9323414DAS193141',
          contractId: '',
          orderDiscountMoney: 120, // 优惠金额
          orderPayableMoney: 680, // 订单应付金额
          orderSpuTotalMoney: 800, // 商品总价
          orderTotalMoney: 800,
          productVo: [
            {
              name: '服务资源数据公司注册',
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
        {
          orderStatusNo: 'ORDER_ORDER_SALE_STATUS_UN_PAID',
          orderStatusName: '未付款',
          id: 'D013DDA41OIX03',
          orderNo: 'D2021030015',
          cusOrderId: 'D9323414DAS193143',
          contractId: '',
          orderDiscountMoney: 120, // 优惠金额
          orderPayableMoney: 680, // 订单应付金额
          orderSpuTotalMoney: 800, // 商品总价
          orderTotalMoney: 800,
          productVo: [
            {
              name: '交易资源这是数据',
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
    navTop() {
      return 44
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    changeTab(name, title) {
      this.selectedOrderStatus = name
      this.getList(name)
    },
    toCar() {
      this.$router.push('../shopCart/')
    },
    handleClickItem(type, text, order) {
      console.log('type', type)
      console.log('text', text)
      this.selectedOrder = order
      console.log('this.selectedOrder', this.selectedOrder)
      switch (type) {
        case 1:
          // 取消订单 无关联订单直接取消
          if (!this.checkHasOtherOrder()) {
            this.$xToast.success('订单取消成功')
          } else {
            // 有关联订单则弹起弹窗
            this.$refs.cancleOrderModel.showPop = true
            this.$refs.cancleOrderModel.modalType = 1
          }
          break
        case 2:
          console.log('2')
          //
          break
        case 4:
          // if (order.payType) {
          //   // 服务商品
          //   if (order.payType === 1) {
          //     // 全款时直接跳转支付页面
          //     this.$router.push('/order/pay')
          //   } else if (order.payType === 2) {
          //     // 节点付费
          //     // 弹起节点付款提示弹窗
          //     this.$refs.payModal.showPayModal = true
          //   } else if (order.payType === 3) {
          //     // 定金尾款
          //     // 弹起定金尾款付费提示弹窗
          //     this.$refs.payModal.showPayModal = true
          //   } else {
          //     // 服务完结
          //     // 全款时直接跳转支付页面
          //     this.$router.push('/order/pay')
          //   }
          //   return
          // }
          // // 非服务商品
          // if (!this.checkHasOtherOrder()) {
          //   // 立即支付 无关联订单直接支付
          //   this.$router.push('/order/pay')
          // } else {
          //   // 有关联订单则弹起弹窗
          //   this.$refs.cancleOrderModel.showPop = true
          //   this.$refs.cancleOrderModel.modalType = 2
          // }
          break
      }
    },
    // 查询是否有关联订单  0 无 1有
    checkHasOtherOrder() {
      return Math.floor(Math.random(0, 1) * 2)
    },
    async getList(cusOrderStatusNo = '') {
      const res = await orderApi.list(
        { axios: this.$axios },
        { page: this.page, limit: this.limit, cusOrderStatusNo }
      )
      console.log('orderList', res)
      this.list = res.records
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
</style>
