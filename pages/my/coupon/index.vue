<template>
  <div class="coupon">
    <HeadWrapper :background-color="'#fff'">
      <Head color="#1a1a1a" title="我的优惠券"></Head>
      <!-- <sp-tabs v-model="tabActive" line-width="0.28rem" @click="onClickTab">
        <sp-tab title="券包"></sp-tab>
        <sp-tab title="卡包"></sp-tab>
      </sp-tabs> -->
    </HeadWrapper>

    <!-- <div class="coupon-header" :style="{ height: HeaderHeight + 'px' }">
      <div ref="couponHeaderWarpper" class="coupon-header-warpper">


        <sp-tabs v-model="tabActive" line-width="0.28rem" @click="onClickTab">
          <sp-tab title="券包"></sp-tab>
          <sp-tab title="卡包"></sp-tab>
        </sp-tabs>
      </div>
    </div> -->

    <sp-list
      v-if="list.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-if="tabActive === 0">
        <div v-for="(item, index) of list" :key="index" class="coupon_list">
          <CouponsItem
            :item="item.marketingCouponVO || {}"
            :coupon-type="0"
            :log-type="item.logType"
          ></CouponsItem>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, index) of list" :key="index" class="coupon_list">
          <ActCardItem :item="item || {}" :coupon-type="0"></ActCardItem>
        </div>
      </div>
    </sp-list>

    <div v-if="list.length == 0 && loading == false" class="empty-container">
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
      <div
        slot="header"
        class="rules_and_invalid"
        :class="{ rules_and_invalid_bk: list.length > 0 }"
      >
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
  Tabs,
  Tab,
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
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import Head from '@/components/common/head/Head.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import CouponsItem from '~/components/my/coupon/index/CouponsItem.vue'
import ActCardItem from '~/components/my/coupon/index/ActCardItem.vue'
import FooterNav from '~/components/my/coupon/FooterNav.vue'

import { actCard, coupon } from '@/api/index'

export default {
  layout: 'keepAlive',
  name: 'Coupon',
  components: {
    LoadingCenter,
    Head,
    HeadWrapper,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Dialog.Component.name]: Dialog.Component,
    [List.name]: List,
    ActCardItem,
    CouponsItem,
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
          path: '/activity/coupon',
        },
        // {
        //   name: '购卡',
        //   iconName: 'gouka',
        //   path: '/my/coupon/act-card',
        // },
      ],
      HeaderHeight: '',
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userInfo: (state) => state.user, // 登录的用户信息
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    this.tabActive = parseInt(this.$route.query.tabActive || 0)
    this.tabActiveIndex = this.tabActive

    // this.FooterNavHeight = this.$refs.FooterNav.$el.offsetHeight
    this.initData()
    // this.getHeaderHeight()
  },
  methods: {
    // getHeaderHeight() {
    //   this.$nextTick(() => {
    //     this.HeaderHeight = this.$refs.couponHeaderWarpper.offsetHeight
    //     console.log(this.HeaderHeight)
    //   })
    // },
    initData() {
      const that = this
      if (window.AlipayJSBridge) {
        window.AlipayJSBridge.call('getLoginUserInfo', (res) => {
          console.log('mpass里获取用户信息', res)
          if (res.code && res.code === 200) {
            const userData = JSON.parse(res.data)
            if (userData && (userData.id || userData.userId)) {
              userData.userId = userData.userId || userData.id
            }
            console.log('userData', userData)
            this.$store.dispatch('user/setUser', userData)

            that.init()
            that.onLoad()
            // this.formData.userId = userData.id
            // this.formData.userType = util.getUserType(userData.type)
            // this.formData.userName = userData.nickName
            // this.formData.userCode = userData.no
          } else {
            this.$xToast.error('获取用户信息失败')
          }
        })
      } else if (this.isInApp) {
        if (this.userInfo.userId && this.userInfo.token) {
          this.init()
          this.onLoad()
        } else {
          that.$appFn.dggGetUserInfo(async function (res) {
            console.log('调用app获取信息', res)
            if (res && res.code === 200) {
              // 兼容启大顺参数返回
              that.$store.dispatch(
                'user/setUser',
                typeof res.data === 'string' ? JSON.parse(res.data) : res.data
              )
              that.init()
              that.onLoad()
            } else {
              const isLogin = await that.$isLogin()
              that.init()
              that.onLoad()
            }
          })
        }
      } else {
        this.init()
        this.onLoad()
      }
    },
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
      this.list = []
      this.tabActiveIndex = this.tabActive
      this.$router.replace({
        query: {
          tabActive: this.tabActive,
        },
      })
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
        this.getCardList()
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
          this.finished = true

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

          this.list = responseData
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '请求失败')
        })
    },

    getCardList() {
      this.loading = false
      const params = {
        condition: 1, //
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
            this.list.concat(res.rows)
          }
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '请求失败')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.coupon {
  min-height: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  background-color: #f5f5f5;

  &-header {
    &-warpper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #ffffff;
      z-index: 999;
      border-bottom: 1px solid #f5f5f5;
    }
  }

  ::v-deep .sp-work-tab {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #999999;
    text-align: center;
  }
  ::v-deep .sp-work-tab--active {
    color: #222222;
  }

  ::v-deep .sp-work-tabs__line {
    background-color: #4974f5;
  }
  .empty-container {
    min-height: 100vh;
    background-color: #fff;

    .empty-text ::v-deep .sp-empty__description {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 30px;
    }
  }
  .coupon_list {
    width: 670px;
    margin: 24px auto 0;
  }

  .rules_and_invalid {
    font-family: PingFangSC-Regular;

    font-size: 24px;
    color: #999999;

    border-bottom: 1px solid #f5f5f5;

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
  .rules_and_invalid_bk {
    background: #f5f5f5;
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

  ::v-deep .sp-tab__text {
    font-family: PingFang SC;
    font-size: 28px;
    font-weight: bold;
  }
}
</style>
