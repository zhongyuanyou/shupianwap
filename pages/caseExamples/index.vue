<template>
  <div class="case_examples_list">
    <div
      class="case_examples_list-header"
      :style="{ height: HeaderHeight + 'px' }"
    >
      <div ref="couponHeaderWarpper" class="case_examples_list-header-warpper">
        <Header class="my-header" title="案例广场"></Header>
        <client-only>
          <Classify :search="search" @select="selectClassify"></Classify>
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

    <div v-if="list.length == 0 && loading == false" class="empty-container">
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
      limit: 15,

      list: [],
      search: {
        productTypeCode: '',
        productOneBelongCode: '',
        productTwoBelongCode: '',
        dealProvince: '',
        dealCity: '',
        dealArea: '',

        orderItems: [
          {
            column: 'caseScore',
            asc: false,
          },
          {
            column: 'isTop',
            asc: false,
          },
          {
            column: 'createTime',
            asc: false,
          },
        ],
      },
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
    this.search.productTypeCode = this.$route.query.goodsType
    this.search.productOneBelongCode = this.$route.query.classCode1
    // this.search.productTwoBelongCode = this.$route.query.classCode2

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
    // 分类选择
    selectClassify(tab1, tab2, tab3) {
      console.log(tab1, tab2, tab3)
      if (tab1.value === 2) {
        this.search.orderItems = [
          {
            column: 'caseScore',
            asc: false,
          },
          {
            column: 'createTime',
            asc: false,
          },
        ]
      } else {
        this.search.orderItems = [
          {
            column: 'caseScore',
            asc: false,
          },
          {
            column: 'isTop',
            asc: false,
          },
          {
            column: 'createTime',
            asc: false,
          },
        ]
      }

      if (tab2.value && tab2.value.length > 0) {
        if (tab2.value[0] && tab2.value[0] !== -1) {
          this.search.productTypeCode = tab2.value[0]
        } else {
          this.search.productTypeCode = ''
        }
        if (tab2.value[1] && tab2.value[1] !== -1) {
          this.search.productOneBelongCode = tab2.value[1]
        } else {
          this.search.productOneBelongCode = ''
        }
        if (tab2.value[2] && tab2.value[2] !== -1) {
          this.search.productTwoBelongCode = tab2.value[2]
        } else {
          this.search.productTwoBelongCode = ''
        }
      }

      if (tab3.value && tab3.value.length > 0) {
        if (tab3.value[0] && tab3.value[0] !== -1) {
          this.search.dealProvince = tab3.value[0]
        } else {
          this.search.dealProvince = ''
        }
        if (tab3.value[1] && tab3.value[1] !== -1) {
          this.search.dealCity = tab3.value[1]
        } else {
          this.search.dealCity = ''
        }
        if (tab3.value[2] && tab3.value[2] !== -1) {
          this.search.dealArea = tab3.value[2]
        } else {
          this.search.dealArea = ''
        }
      }
      this.initData()
      // this.search.orderItems = {}
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
        limit: this.limit,
        page: this.page,
      }
      const search = Object.assign({}, params, this.search)
      caseApi
        .case_list(search)
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

  .empty-container {
    height: 100vh;
    background-color: #ffffff;

    .empty-text ::v-deep .sp-empty__description {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 30px;
    }
  }
}
</style>
