<template>
  <div class="act_card">
    <!-- <HeadWrapper>
      <Head title="活动卡专区"></Head>
    </HeadWrapper> -->
    <div class="banner">
      <span class="card_des" @click="TipsShow = true">活动卡介绍</span>
      <!-- <img :src="$ossImgSetV2(banner)" alt="" /> -->
      <sp-swipe :autoplay="3000">
        <sp-swipe-item v-for="(item, index) in productAdvertData" :key="index">
          <a :href="item.materialLink" style="display: block; height: 100%">
            <sp-image
              fit="cover"
              :src="item.materialUrl"
              style="width: 100%; height: 100%"
          /></a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!--   @load="onLoad" -->
    <sp-list
      v-if="list.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-for="(item, index) of list" :key="index" class="coupon_list">
        <ActCard :item="item" :coupon-type="0" @clickBuy="clickBuy"></ActCard>
      </div>
    </sp-list>

    <div v-if="list.length == 0 && loading == false">
      <sp-empty
        class="empty-text"
        description="目前没有可购买的活动卡哦~"
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
          >和<a class="protocol_name" @click="handleProtocol('protocol100014')"
            >《权限使用规则》</a
          >各条款，包括但不限于: <br />
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
  Empty,
  List,
  Dialog,
  Swipe,
  SwipeItem,
  Image,
} from '@chipspc/vant-dgg'

import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import Head from '@/components/common/head/Head.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import ActCard from '@/components/my/coupon/ActCard.vue'

import { actCard, coupon, activityApi } from '@/api/index'

export default {
  layout: 'keepAlive',
  name: 'CouponActCard',
  components: {
    LoadingCenter,
    // Head,
    // HeadWrapper,

    [Sticky.name]: Sticky,
    [Empty.name]: Empty,

    [Dialog.Component.name]: Dialog.Component,
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
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

      advertCode: 'ad100501',
      productAdvertData: [],
      // FooterNavHeight: 32,
    }
  },
  mounted() {
    this.init()
    this.onLoad()
    this.getAdvertisingData()
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

    onLoad() {
      this.loading = true
      console.log(1111)
      this.getInitData()
    },
    getInitData() {
      const params = {
        // userId: this.$store.state.user.userId,
        // type：1,// 活动卡优惠类型 1：折扣 2：满减
        limit: 15,
        page: this.page,
      }
      actCard
        .act_card_list({ axios: this.$axios }, params)
        .then((res) => {
          this.loading = false
          this.page++

          const responseData = res.rows || []
          // responseData.map((item) => {})
          if (
            this.page > res.totalPage ||
            !res.totalPage ||
            responseData.length < params.limit
          ) {
            this.finished = true
          }

          if (params.page === 1) {
            this.list = responseData
          } else {
            this.list = this.list.concat(responseData)
          }
        })
        .catch((err) => {
          this.error = true
          this.loading = false

          this.$xToast.error(err.message || '操作失败')
        })
    },
    getAdvertisingData() {
      this.$axios
        .get(activityApi.activityAdvertising, {
          params: {
            locationCode: this.advertCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.productAdvertData = res.data.sortMaterialList
              ? res.data.sortMaterialList[0].materialList
              : []
          } else {
          }
        })
    },
    clickBuy(item) {
      this.$router.push({
        path: '/my/coupon/act-card-details',
        query: { id: item.id },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.act_card {
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
    width: 750px;
    margin: auto;
    img {
      width: 100%;
    }
    .card_des {
      position: absolute;
      z-index: 1;
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
    ::v-deep .sp-swipe {
      width: 100%;
      height: 300px;
      /*background-color: #999;*/
      overflow: hidden;
      position: relative;

      ::v-deep .sp-swipe-item {
        height: 300px;
        a {
          width: 100%;
          height: 100%;
        }
      }
      // ::v-deep .sp-image {
      //   height: 300px;
      //   width: 100%;
      //   > img {
      //     width: 100%;
      //     height: 100%;
      //     display: block;
      //     object-fit: fill !important;
      //   }
      // }
    }
  }
  .coupon_list {
    margin: 24px auto 0;
    width: 670px;
  }

  ::v-deep .sp-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  ::v-deep .sp-dialog {
    width: 540px;
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
}
</style>
