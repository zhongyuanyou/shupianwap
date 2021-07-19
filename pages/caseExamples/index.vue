<template>
  <div class="case_examples_list">
    <div
      class="case_examples_list-header"
      :style="{ height: HeaderHeight + 'px' }"
    >
      <div ref="couponHeaderWarpper" class="case_examples_list-header-warpper">
        <Header class="my-header" title="案例"></Header>
        <client-only>
          <Classify></Classify>
        </client-only>
      </div>
    </div>

    <sp-list
      v-if="list.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-for="(item, index) of list" :key="index">
        <CaseExamplesList
          :item="item"
          @click.native="toDetails('/caseExamples/details', item)"
        ></CaseExamplesList>
      </div>
    </sp-list>

    <div v-if="list.length == 0 && loading == false">
      <sp-empty
        class="empty-text"
        :description="'暂无数据'"
        :image="imgAddress"
      />
    </div>

    <FooterNav ref="FooterNav">
      <div slot="header" class="rules_and_invalid"></div>
    </FooterNav>
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

import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import Header from '@/components/common/head/header.vue'
import FooterNav from '@/components/my/coupon/FooterNav.vue'

import Classify from '@/components/caseExamples/index/Classify.vue'
import CaseExamplesList from '@/components/caseExamples/index/List.vue'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'

import { caseApi } from '@/api/index'

export default {
  layout: 'keepAlive',
  name: 'CaseExamplesPage',
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
    CaseExamplesList,
    Classify,
    FooterNav,
  },
  data() {
    return {
      imgAddress: 'https://cdn.shupian.cn/sp-pt/wap/1d02v37qg6gw000.png',

      tabActive: 0,

      loading: false, // 加载效果状态
      error: false,
      finished: false,
      page: 1,
      limit: 7,

      list: [],

      HeaderHeight: '',
      // FooterNavHeight: 150,
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
    // this.tabActive = parseInt(this.$route.query.tabActive || 0)

    // this.FooterNavHeight = this.$refs.FooterNav.$el.offsetHeight
    this.initData()
    this.getHeaderHeight()
  },
  methods: {
    getHeaderHeight() {
      this.$nextTick(() => {
        this.HeaderHeight = this.$refs.couponHeaderWarpper.offsetHeight
        console.log(this.HeaderHeight)
      })
    },
    initData() {
      if (this.isInApp) {
        if (this.userInfo.userId && this.userInfo.token) {
          this.init()
          this.onLoad()
        } else {
          const that = this
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
    toDetails(path, item) {
      console.log(path, item)
      this.$router.push({
        path,
        query: {
          id: item.id,
        },
      })
    },
    init() {
      console.log('执行init')
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },

    onLoad() {
      this.loading = true

      console.log('执行 onLoad')

      this.getCaseList()
    },
    getCaseList() {
      const params = {
        orderItems: [
          {
            column: 'createTime',
            asc: true,
          },
        ], //
        limit: this.limit,
        page: this.page,
      }
      caseApi
        .case_list(params)
        .then((res) => {
          if (params.page === 1) {
            this.list = res.records
          } else {
            this.list.concat(res.records)
          }

          this.loading = false
          this.page++
          if (this.page > res.totalPage || !res.totalPage) {
            this.finished = true
          }
        })
        .catch((err) => {
          this.loading = false
          this.error = true
          this.$xToast.error(err.message || '请求失败')
        })
    },
  },
}
</script>

<style lang="less" scoped>
.case_examples_list {
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

  ::v-deep .sp-work-tab__text {
    font-family: PingFang SC;
    font-size: 28px;
    font-weight: bold;
  }
  ::v-deep .sp-work-tab--active {
    color: #222222;
  }

  ::v-deep .sp-work-tabs__line {
    background-color: #4974f5;
  }
  .empty-text ::v-deep .sp-empty__description {
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 30px;
  }
}
</style>
