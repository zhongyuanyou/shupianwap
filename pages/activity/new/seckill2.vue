<template>
  <div class="container">
    <HeadWrapper :fill="true" :line="false" @onHeightChange="onHeightChange">
      <div class="search_container">
        <div class="search">
          <!-- @click="uPGoBack" -->
          <div class="left-back" @click="uPGoBack">
            <my-icon
              name="nav_ic_back"
              class="back_icon"
              size="0.4rem"
              color="#FFFFFF"
            ></my-icon>
          </div>
          <div class="search-box">
            <img
              class="header_img"
              src="https://cdn.shupian.cn/sp-pt/wap/images/6pkx5baf85s0000.png"
              alt=""
            />
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div><Sum :state="state"></Sum></div>
    </HeadWrapper>

    <div v-if="!isNoData" ref="fill_container" class="fill_container"></div>

    <div class="content_container">
      <div class="container-body">
        <div class="body-content">
          <sp-pull-refresh
            v-model="refreshing"
            :disabled="refreshDisabled"
            @refresh="onRefresh"
          >
            <sp-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div v-if="activityProductList && activityProductList.length > 0">
                <div
                  v-for="(item, index) in activityProductList"
                  :key="index"
                  @click="jumpProductDetail(item)"
                >
                  <Card
                    :item="item"
                    :overflow-dot="overflowDot"
                    :parse-price="parsePrice"
                  ></Card>
                </div>
              </div>
              <NoData
                :is-no-data="isNoData"
                :style="{ marginTop: headerHeight + 'px' }"
              ></NoData>
            </sp-list>
          </sp-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { CountDown, Sticky, List, PullRefresh } from '@chipspc/vant-dgg'

import activityMixin from './activityMixin'
import HeadWrapper from '@/components/common/head/HeadWrapper.vue'

import Card from '@/components/activity/special/Card.vue'
import NoData from '@/components/activity/NoData.vue'
import Sum from '@/components/activity/seckill2/Sum.vue'

export default {
  name: 'Exclusive',
  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,

    Card,
    NoData,
    Sum,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_DJZS',

      hasCity: false,

      imageHead: 'https://cdn.shupian.cn/sp-pt/wap/images/57zm6tubgjo0000.jpg',

      headerHeight: '',

      ClassState: 1,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
    }),
    userInfo() {
      return this.$store.state.user
    },
    state() {
      if (this.isNoData) {
        return 0
      }
      return this.ClassState
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      const boxHeight = this.$refs.fill_container.clientHeight // 盒子高度
      if (scrollHeight > boxHeight) {
        this.ClassState = 0
      } else {
        this.ClassState = 1
      }
    },
    onHeightChange(height) {
      this.headerHeight = height
    },
  },
  head() {
    return { title: '限时直降' }
  },
}
</script>


<style lang="less" scoped>
.container {
  font-family: PingFangSC;
  background: #f8f8f8;
  .search_container {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    .search {
      display: flex;
      align-items: center;

      padding: 16px 0;

      background: #4974f5;

      .left-back {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 32px;
        .back_icon {
          width: 40px;
          height: 40px;
        }
      }

      .search-box {
        margin-right: 40px;
        height: 88px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .header_img {
          height: 39px;
        }
      }
      .right {
        display: flex;
        align-items: center;

        .rule {
          height: 28px;

          font-weight: bold;
          font-size: 28px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: right;
          line-height: 28px;
          margin: 0 32px;
        }
      }
    }
  }

  .fill_container {
    background: #4974f5;
    height: 220px;
  }

  .content_container {
    position: relative;
    margin-top: -184px;

    border-radius: 24px;
    overflow: hidden;

    .container-body {
      z-index: 1;
      padding: 0 20px;
      &::after {
        display: block;
        clear: both;
      }
      .body-content {
        min-height: 100vh;
      }
    }
  }
}
</style>
