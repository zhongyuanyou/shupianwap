<template>
  <div class="invoice" :style="{ paddingBottom: FooterNavHeight + 'px' }">
    <sp-sticky>
      <Header class="my-header" title="我的优惠券"></Header>
      <client-only>
        <sp-work-tabs v-model="tabActive" @click="onClickTab">
          <sp-work-tab title="券包"></sp-work-tab>
          <sp-work-tab title="卡包"></sp-work-tab>
        </sp-work-tabs>
      </client-only>
    </sp-sticky>
    <div v-for="(item, index) of list" :key="index" class="coupon_list">
      <Card :item="item.marketingCouponVO || {}" :coupon-type="0"></Card>
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
        :description="tabActive === 0 ? '暂无优惠券' : '暂无活动卡'"
        :image="imgAddress"
      />
    </div>

    <FooterNav
      ref="FooterNav"
      :list="tabBarData"
      @handelClick="handelFooterClick"
    >
      <div slot="header" class="rules_and_invalid">
        <span class="" @click="TipsShow = true">
          通用规则
          <my-icon
            name="order_ic_listnext"
            size="0.18rem"
            color="#999999"
            class="back"
          />
        </span>
        <span class="invalid" @click="toInvalid">
          {{ tabActive === 0 ? '查看已失效优惠券' : '查看已失效活动卡' }}
          <my-icon
            name="order_ic_listnext"
            size="0.18rem"
            color="#999999"
            class="back"
          />
        </span>
      </div>
    </FooterNav>
    <Loading-center v-show="loading" />

    <sp-dialog v-model="TipsShow" :show-confirm-button="false">
      <div class="dialog">
        <div class="head">温馨提示</div>
        <div class="body">
          请您务必审慎阅读、充分理解<a
            class="protocol_name"
            @click="handleProtocol('protocol100122')"
            >《薯片用户服务协议》</a
          >和<a class="protocol_name" @click="handleProtocol('protocol100121')"
            >《薯片隐私协议》</a
          >和《权限使用规则》各条款，包括但不限于: 各条款，包括但不限于: <br />
          为了向您提供即时通讯、内容分享等服务，我们需要收集您的设备信息、操作日志等个人信息。你可以在“设置中查看、变更、删除个人信息并管理您的授权。”
          如果您不同意本协议的修改，请立即停止访问或使用本网站或取消已经获得的服务；如果您选择继续访问或使用本网站，则视为您已接受本协议。
        </div>
        <div class="btn" @click="TipsShow = false">我知道了</div>
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

      loading: true, // 加载效果状态
      error: false,
      finished: false,
      page: 1,
      limit: 15,

      TipsShow: false,
      list: [],

      tabBarData: [
        {
          name: '领券',
          iconName: 'lingquan',
          path: '/my/coupon/act-card',
        },
        {
          name: '购卡',
          iconName: 'gouka',
          path: '/my/coupon/act-card',
        },
      ],
      FooterNavHeight: 150,
    }
  },
  mounted() {
    this.init()
    this.onLoad()

    this.FooterNavHeight = this.$refs.FooterNav.$el.offsetHeight
  },
  methods: {
    toActCard() {
      this.$router.push({
        path: '/my/coupon/act-card',
      })
    },
    init() {
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },
    handleProtocol(categoryCode) {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode },
      })
    },
    toInvalid() {
      if (this.tabActive === 0) {
        this.$router.push({
          path: '/my/coupon/invalid-coupon',
        })
      } else {
        this.$router.push({
          path: '/my/coupon/invalid-card',
        })
      }
    },
    onClickTab() {
      if (this.tabActiveIndex === this.tabActive) {
        return
      }
      this.tabActiveIndex = this.tabActive
      this.init()
      this.onLoad()
    },
    handelFooterClick(item, index) {
      console.log(item, index)
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

  .empty-text ::v-deep .sp-empty__description {
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 30px;
  }

  .coupon_list {
    margin: 24px 40px 0;
  }

  .rules_and_invalid {
    font-family: PingFangSC-Regular;
    font-weight: bold;
    font-size: 24px;
    color: #999999;
    background: #f5f5f5;
    padding: 32px 0;
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

      font-weight: 400;

      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #555555;
      letter-spacing: 0;
      line-height: 42px;

      .protocol_name {
        text-decoration: underline;
        color: #658af6;
      }
    }
    > .btn {
      border-top: 1px solid #f4f4f4;

      height: 96px;
      text-align: center;
      font-size: 32px;
      font-weight: 400;

      line-height: 96px;

      background: #4974f5;
      border-radius: 8px;
      color: white;
      margin: 50px 40px 40px;
    }
  }

  ::v-deep .sp-work-tab__text {
    font-family: PingFang SC;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
