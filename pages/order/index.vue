<template>
  <div ref="orderPage" class="order-page">
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
    <div ref="scrollView" class="page-list" @scroll="handleScollList">
      <div class="scroll-inner">
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
      <sp-loading
        v-if="loadingMore && !noMore"
        type="spinner"
        color="#1989fa"
        class="loading-area"
      />
      <p v-if="noMore" class="no-more">没有更多了</p>
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
import { Tab, Tabs, Loading } from '@chipspc/vant-dgg'
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
    [Loading.name]: Loading,
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
      limit: 10,
      loading: true,
      selectedOrderStatus: '',
      orderData: {}, // 选中的订单
      list: [],
      payList: [], // 分批支付信息
      fromPage: 'orderList',
      noMore: false,
      loadingMore: false,
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
    if (this.$route.query.type) {
      const pageType = this.$route.query.type
      if (pageType === 0) {
        this.selectedOrderStatus = ''
      } else if (pageType === 1) {
        this.selectedOrderStatus = 'ORDER_CUS_STATUS_UNPAID'
      } else if (pageType === 2) {
        this.selectedOrderStatus = 'ORDER_CUS_STATUS_PROGRESSING'
      } else if (pageType === 3) {
        this.selectedOrderStatus = 'ORDER_CUS_STATUS_COMPLETED'
      } else if (pageType === 4) {
        this.selectedOrderStatus = 'ORDER_CUS_STATUS_CANCELLED'
      }
    }
    // window.addEventListener(
    //   'scroll',
    //   this.throttle(this.scollChange, 500, 1000)
    // )
    // this.$on('hook:beforeDestroy', () => {
    //   window.removeEventListener('scroll', this.chartResize)
    // })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttle())
  },
  methods: {
    handleScollList(e) {
      console.log('列表滚动', e)
      this.throttle(this.scollChange(), 500, 1000)
    },
    scollChange() {
      const scrollTop = this.$refs.scrollView.scrollTop
      const scrollHeight = this.$refs.scrollView.scrollHeight
      const windowHeight = window.innerHeight
      console.log('scrollTop', scrollTop)
      console.log('scrollHeight', scrollHeight)
      console.log('windowHeight', windowHeight)
      // 提前200px拉取下页数据
      if (scrollTop + windowHeight > scrollHeight - 10) {
        console.log('触发请求')
        this.getOrderList()
      }
    },
    throttle(func, wait, mustRun) {
      let timeout
      let startTime = new Date()
      return function () {
        const context = this
        const args = arguments
        const curTime = new Date()
        clearTimeout(timeout)
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
          func.apply(context, args)
          startTime = curTime
          // 没达到触发间隔，重新设定定时器
        } else {
          timeout = setTimeout(func, wait)
        }
      }
    },
    changeTab(name) {
      console.log('name', name)
      // 初始化数据列表
      this.page = 1
      this.selectedOrderStatus = name
      this.loadingMore = false
      this.loading = false
      this.noMore = false
      this.getOrderList()
    },
    toCar() {
      this.$router.push('../shopCart/')
    },
    getOrderList() {
      // 正在下拉加载则不加载更多
      if (this.loadingMore || this.noMore) return
      if (this.page === 1) {
        this.loading = true
      } else {
        this.loadingMore = true
      }
      this.noMore = false
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
          this.loadingMore = false
          const arr = res.records
          if (arr.length) {
            if (this.page === 1) {
              this.list = []
            }
            if (arr.length < this.limit) this.noMore = true
            this.page++
            for (let i = 0, l = arr.length; i < l; i++) {
              this.changeMoney(arr[i])
            }
            const nowData = JSON.parse(JSON.stringify(this.list))
            const allData = nowData.concat(arr)
            this.list = allData
          } else {
            this.noMore = true
          }
        })
        .catch((error) => {
          if (this.page === 1) {
            this.list = []
          }
          console.log('error', error)
          this.loading = false
          this.loadingMore = false
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
              contractStatus: this.orderData.contractStatus,
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
              contractStatus: this.orderData.contractStatus,
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
  margin-right: 40px;
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
  .page-list {
    padding-bottom: 140px;
    margin-top: 108px;
    height: calc(100vh - 200px);
    overflow-y: scroll;
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
.no-more {
  color: #999;
  font-size: 24px;
  text-align: center;
  margin-top: 40px;
}
.sp-loading {
  color: #999;
  font-size: 24px;
  text-align: center;
  margin-top: 40px;
}
</style>
