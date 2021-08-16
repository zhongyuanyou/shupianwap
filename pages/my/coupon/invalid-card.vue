<template>
  <div class="invoice">
    <HeadWrapper>
      <Head title="失效卡"></Head>
    </HeadWrapper>

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
        <ActCardItem :item="item || {}" :coupon-type="2"></ActCardItem>
      </div>
    </sp-list>

    <div v-if="list.length == 0 && loading == false">
      <sp-empty
        class="empty-text"
        :description="tabActive === 0 ? '暂无优惠券卡' : '暂无活动卡'"
        :image="imgAddress"
      />
    </div>

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
import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import Head from '@/components/common/head/Head.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import ActCardItem from '~/components/my/coupon/index/ActCardItem.vue'

import { coupon, actCard } from '@/api/index'

export default {
  layout: 'keepAlive',
  name: 'Invalidcard',
  components: {
    LoadingCenter,
    Head,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Dialog.Component.name]: Dialog.Component,
    [List.name]: List,
    HeadWrapper,
    ActCardItem,
  },
  data() {
    return {
      imgAddress: 'https://cdn.shupian.cn/sp-pt/wap/1d02v37qg6gw000.png',

      tabActive: 1,
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
        condition: 2, //
        limit: 10,
        page: this.page,
      }
      actCard
        .user_act_card_list({ axios: this.$axios }, params)
        .then((res) => {
          this.loading = false
          this.page++
          if (this.page > res.totalPage || !res.totalPage) {
            this.finished = true
          }
          if (params.page === 1) {
            try {
              res.rows.map((item) => {
                const time = new Date(item.receiveEndDate).getTime()
                if (time - this.nowTimeStamp < 172800000) {
                  item.marketingCouponVO.showColorTime = this.showColorTime
                }
              })
            } catch (error) {
              console.log('计算时间出错了')
            }

            this.list = res.rows
          } else {
            this.list = this.list.concat(res.rows)
          }
        })
        .catch((err) => {
          this.error = true
          this.loading = false
          this.$xToast.error(err.message || '请求失败')
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

  .protocol_name {
    text-decoration: underline;
    color: #658af6;
  }

  ::v-deep .sp-work-tab__text {
    font-family: PingFang SC;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
