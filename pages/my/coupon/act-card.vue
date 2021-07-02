<template>
  <div class="invoice" :style="{ paddingBottom: FooterNavHeight + 'px' }">
    <sp-sticky>
      <Header class="my-header" title="我的优惠券"></Header>
    </sp-sticky>
    <div v-if="banner" class="banner">
      <span class="card_des">活动卡介绍</span>
      <img :src="$ossImgSetV2(banner)" alt="" />
    </div>
    <div v-for="(item, index) of list" :key="index" class="coupon_list">
      <ActCard :item="item" :coupon-type="0"></ActCard>
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
          如果您不同意本协议的修改，请立即停止访问或使用本网站或取消已经获得的服务；如果您选择继续访问或使用本网站，则视为您已接受本协议。修改
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
import ActCard from '@/components/my/coupon/ActCard.vue'
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

    ActCard,
  },
  data() {
    return {
      banner: '3a9u8adm49q0000.png',
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

      FooterNavHeight: 150,
    }
  },
  mounted() {
    this.init()
    this.onLoad()
  },
  methods: {
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
        userId: this.$store.state.user.userId,
        limit: '100',
        page: this.page,
      }
      coupon
        .act_card_list({ axios: this.$axios }, params)
        .then((res) => {
          this.loading = false
          this.page++

          const responseData = res.rows || []
          responseData.map((item) => {})

          if (params.page === 1) {
            this.list = responseData
          } else {
            this.list.concat(responseData)
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

  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
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

  .banner {
    position: relative;
    img {
      width: 100%;
    }
    .card_des {
      position: absolute;
      right: 0;
      top: 32px;
      border-radius: 22px 0 0 22px;

      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      padding: 10px 10px 10px 12px;

      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
