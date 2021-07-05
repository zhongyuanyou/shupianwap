<template>
  <div class="invoice" :style="{ paddingBottom: FooterNavHeight + 'px' }">
    <sp-sticky>
      <Header class="my-header" title="购买确认"></Header>
    </sp-sticky>
    <div class="details">
      <div v-for="(item, index) of list" :key="index" class="coupon_list">
        <ActCard
          :item="item"
          :show-buybutton="false"
          :show-progress="false"
          :coupon-type="0"
        ></ActCard>
      </div>
      <div class="details_content">
        <div class="price">49999元</div>

        <div class="list">
          <div class="list_name">活动卡</div>
          <div class="list_des">这是活动卡名称活动卡名称</div>
        </div>
        <div class="list">
          <div class="list_name">可使用次数</div>
          <div class="list_des">5次</div>
        </div>
        <div class="list">
          <div class="list_name">有效期限</div>
          <div class="list_des">2020.09.01-2020.09.31</div>
        </div>

        <div class="list">
          <div class="list_name">使用限制</div>
          <div class="list_des">部分产品分类使用</div>
        </div>
        <div class="list">
          <div class="list_name">其他说明</div>
          <div class="list_des">
            这是其他说明文字这是其他说明文字这是其他说明文字这是其他说明文字
          </div>
        </div>
      </div>
    </div>

    <sp-bottombar ref="FooterNav" safe-area-inset-bottom class="submit_btns">
      <sp-bottombar-button type="primary" text="" @click="submit">
        <span class="text">立即购买：</span>
        <span class="price">4200.55</span>
        <span class="unit">元</span>
      </sp-bottombar-button>
    </sp-bottombar>

    <Loading-center v-show="loading" />
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

import { actCard } from '@/api/index'

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
    [Button.name]: Button,

    ActCard,
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
    submit() {},
    init() {
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },

    onLoad() {
      this.getInitData()
    },
    getInitData() {
      this.finished = false
      const params = {
        userId: this.$store.state.user.userId,
        limit: '100',
        page: this.page,
        id: this.$route.query.id,
      }
      actCard
        .act_card_list({ axios: this.$axios }, params)
        .then((res) => {
          this.loading = false
          this.page++

          const responseData = res.rows || []
          responseData.map((item) => {})

          if (responseData && responseData[0]) {
            this.list = [responseData[0]]
          }
        })
        .catch((e) => {
          this.loading = false
        })
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

  .details {
    margin: 40px;

    .details_content {
      background: white;
      padding: 32px;
      border-top: 1px solid #f4f4f4;
      .price {
        font-family: PingFangSC-Medium;
        font-size: 48px;
        color: #ec5330;
        line-height: 48px;
      }

      .list {
        margin-top: 32px;
        display: flex;

        font-family: PingFangSC-Regular;
        font-size: 26px;

        letter-spacing: 0;
        line-height: 26px;

        .list_name {
          width: 140px;
          margin-right: 12px;
          color: #999999;
        }
        .list_des {
          flex: 1;
          color: #222222;
          line-height: 37px;
        }
      }
    }
  }
  .submit_btns {
    font-family: PingFangSC;
    color: #ffffff;

    .text {
      font-size: 28px;
    }
    .price {
      font-size: 40px;
      font-weight: bold;
    }
    .unit {
      font-size: 24px;
    }
  }
}
</style>
