<template>
  <div class="invoice">
    <sp-sticky>
      <Header class="my-header" title="我的优惠券"></Header>
      <client-only>
        <sp-work-tabs v-model="tabActive" @click="onClickTab">
          <sp-work-tab title="券包"></sp-work-tab>
          <sp-work-tab title="卡包"></sp-work-tab>
        </sp-work-tabs>
      </client-only>
    </sp-sticky>
    <div v-for="(item, index) of list" :key="index">
      <Card v-if="tabActive === 0" :item="item"></Card>
    </div>

    <!-- <sp-list
      v-if="list.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-if="tabActive === 0" :list="list"></div>
    </sp-list> -->

    <div v-if="list.length == 0 && loading == false">
      <sp-empty
        class="empty-text"
        :description="
          tabActive === 0 || tabActive === 1 ? '暂无活动卡' : '暂无活动卡'
        "
        :image="imgAddress"
      />
    </div>

    <div class="paddingBottom150"></div>

    <!-- <div class="footer-nav">
      <div class="rules_and_invalid">
        <span class="" @click="TipsShow = true">
          通用规则
          <my-icon
            name="order_ic_listnext"
            size="0.18rem"
            color="#999999"
            class="back"
          />
        </span>
        <span class="invalid">
          查看已失效优惠券
          <my-icon
            name="order_ic_listnext"
            size="0.18rem"
            color="#999999"
            class="back"
          />
        </span>
      </div>

      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button type="default" text="领券" class="del_btn" />
        <sp-bottombar-button type="primary" text="购卡" />
      </sp-bottombar>
    </div> -->
    <FooterNav>1111</FooterNav>
    <Loading-center v-show="loading" />

    <sp-dialog v-model="TipsShow" :show-confirm-button="false">
      <div class="dialog">
        <div class="head">温馨提示</div>
        <div class="body">
          一般用作重要通知或帮助提示，具体 形态可由UI根据实际需求进行设计。
        </div>
        <div class="btn act" @click="timeshowFn()">我知道了</div>
      </div>
    </sp-dialog>
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Uploader,
  Bottombar,
  Sticky,
  BottombarButton,
  WorkTab,
  WorkTabs,
  Empty,
  List,
  Dialog,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'
import AllInvoiceClassify from '@/components/order/invoice/index/AllInvoiceClassify.vue'
import HistoryInvoiceClassify from '@/components/order/invoice/index/HistoryInvoiceClassify.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import Card from '@/components/my/coupon/Card.vue'
import FooterNav from '~/components/my/coupon/FooterNav.vue'

import { coupon } from '@/api/index'

export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Dialog.Component.name]: Dialog.Component,
    [List.name]: List,

    Card,
    FooterNav,
  },
  data() {
    return {
      imgAddress: 'https://cdn.shupian.cn/sp-pt/wap/1d02v37qg6gw000.png',

      tabActive: 0,
      tabActiveIndex: 0, // 激活的tab

      pagination: {
        loading: true, // 加载效果状态
        error: false,
        finished: false,
        page: 1,
        limit: 15,
      },
      loading: true, // 加载效果状态
      error: false,
      finished: false,
      page: 1,
      limit: 15,

      TipsShow: false,
      list: [],

      // 请求数据格式
      formData: {
        orderByWhere: 'log_receive_time=desc;',
        findType: 2,
        userId: this.$store.state.user.userId,
        limit: '100',
        page: '1',
      },
    }
  },
  mounted() {
    this.init()
    this.onLoad()
  },
  methods: {
    headAdd() {
      this.$router.push('/order/invoice/headAdd')
    },
    init() {
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },
    onClickTab() {
      if (this.tabActiveIndex === this.tabActive) {
        return
      }
      this.tabActiveIndex = this.tabActive
      this.init()
      this.onLoad()
    },
    onLoad() {
      if (this.tabActive === 0) {
        this.getInitData()
      } else if (this.tabActive === 1) {
        this.getOrderList()
      }
    },
    getInitData() {
      this.finished = false
      const params = {
        orderByWhere: 'log_receive_time=desc;',
        findType: 2,
        userId: this.$store.state.user.userId,
        limit: '100',
        page: this.page,
      }
      coupon
        .getCouponList({ axios: this.$axios }, params)
        .then((result) => {
          this.loading = false

          const responseData = result.marketingCouponLogList || []

          for (let i = 0, length = responseData.length; i < length; i++) {
            let useTime = responseData[i].marketingCouponVO.serviceLife
            useTime = useTime.slice(11)
            console.log('useTime', useTime)
            const thisTime = useTime.split('.').join('-')
            const time = new Date(thisTime).getTime()
            if (time - this.nowTimeStamp < 172800000) {
              responseData[i].marketingCouponVO.showColorTime =
                this.showColorTime
            }
          }
          if (params.page === 1) {
            this.list = responseData
          } else {
            this.list.concat(responseData)
            // const allData = this.list.concat(responseData)
            // this.list = allData
          }
        })
        .catch((e) => {
          this.loading = false
        })
    },

    getOrderList() {
      this.loading = false
    },
  },
}
</script>

<style lang="less" scoped>
.invoice {
  min-height: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  background-color: #f5f5f5;

  .paddingBottom150 {
    padding-bottom: 150px;
  }
  .empty-text ::v-deep .sp-empty__description {
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 30px;
  }

  .coupon-page {
    height: 100%;
    .coupon_list {
      width: 100%;
      padding: 12px 40px 12px 40px;
      background: #f5f5f5;
      height: 100%;
    }
  }

  .not_coupon_data {
    background: #f5f5f5 !important;
  }
  .rules_and_invalid {
    font-family: PingFangSC-Regular;
    font-weight: bold;
    font-size: 24px;
    color: #999999;
    letter-spacing: 0;

    text-align: center;

    .invalid {
      margin-left: 64px;
    }
    .back {
      margin-right: 18px;
      font-weight: 500;
    }
  }
  .dialog {
    padding: 48px 0 0 0;
    > .head {
      padding: 0 40px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
    }
    > .body {
      padding: 0 40px;
      margin-top: 32px;
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 38px;
    }
    > .btn {
      border-top: 1px solid #f4f4f4;
      margin-top: 48px;
      height: 96px;
      text-align: center;
      font-size: 32px;
      font-weight: 400;
      color: #999999;
      line-height: 96px;
    }
    > .act {
      color: #4974f5;
    }
  }
  // .footer-nav {
  //   position: fixed;
  //   left: 0;
  //   // transform: translateX(-50%);
  //   bottom: 0;
  //   z-index: 999;
  //   width: 100%;
  //   background: #ffffff;
  //   padding-bottom: constant(safe-area-inset-bottom);
  //   padding-bottom: env(safe-area-inset-bottom);
  //   margin-bottom: 134px;
  // }

  // ::v-deep .sp-tabs__line {
  //   width: 64px;
  // }
  // ::v-deep .sp-work-tabs__wrap {
  //   font-family: PingFang SC;
  //   font-size: 28px;
  // }
  // ::v-deep .sp-tab--active {
  //   font-size: 28px;
  //   font-family: PingFang SC;
  //   font-weight: bold;
  //   color: #4974f5;
  // }
}
</style>
