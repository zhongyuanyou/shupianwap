<template>
  <div class="container">
    <HeadWrapper :fill="false" :line="false" @onHeightChange="onHeightChange">
      <div class="search_container">
        <div class="search" :style="{ backgroundImage: `url(${imageHead})` }">
          <!-- @click="uPGoBack" -->
          <div class="left-back" @click="uPGoBack">
            <my-icon
              name="nav_ic_back"
              class="back_icon"
              size="0.4rem"
              color="#FFFFFF"
            ></my-icon>
          </div>
          <div class="search-box"></div>
          <div class="right">
            <my-icon
              class="search-icon"
              name="sear_ic_sear"
              size="0.4rem"
              color="#FFFFFF"
              @click.native="clickInputHandle"
            ></my-icon>
            <span
              class="rule"
              @click="
                $router.push('/login/protocol?categoryCode=protocol100034')
              "
              >规则</span
            >
          </div>
        </div>
      </div>
    </HeadWrapper>

    <div class="img_container">
      <img width="100%" :src="imageHead" alt="" />

      <div v-if="isTimerShow" class="count-down">
        <div class="down-time">
          <div>距本场结束还剩</div>
          <div class="time">{{ time.day }}</div>
          <div>天</div>
          <div class="time">{{ time.hour }}</div>
          <div>:</div>
          <div class="time">{{ time.min }}</div>
          <div>:</div>
          <div class="time">{{ time.sec }}</div>
        </div>
      </div>
    </div>

    <div class="content_container">
      <Recommend
        title="爆款单品"
        :parse-price="parsePrice"
        :list="recommendProductList"
        @jump="
          (item) => {
            jumpProductDetail(item)
          }
        "
      ></Recommend>
      <client-only>
        <Classification
          :is-service="isService"
          :city-name="cityName"
          :header-height="headerHeight"
          :current-index="currentIndex"
          :activity-type-options="activityTypeOptions"
          :swich-city-handle="swichCityHandle"
          :menu-tab="menuTab"
        />
      </client-only>
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
                <Card
                  v-for="(item, index) in activityProductList"
                  :key="index"
                  :last="activityProductList.length - 1 == index"
                  :item="item"
                  :overflow-dot="overflowDot"
                  :parse-price="parsePrice"
                  @click.native="jumpProductDetail(item)"
                ></Card>
              </div>
              <NoData :is-no-data="isNoData"></NoData>
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
import Recommend from '~/components/activity/Recommend.vue'
import Card from '~/components/activity/Card.vue'
import NoData from '@/components/activity/NoData.vue'
import Classification from '@/components/activity/Classification.vue'
export default {
  name: 'Exclusive',
  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,

    Recommend,
    Card,
    NoData,
    Classification,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_DJZS',

      hasCity: false,

      imageHead: 'https://cdn.shupian.cn/sp-pt/wap/images/dfnawx8oxnc0000.jpg',

      headerHeight: 0,
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
  },
  methods: {
    onHeightChange(height) {
      this.headerHeight = height
    },
  },
  head() {
    return { title: '独家专售' }
  },
}
</script>


<style lang="less" scoped>
.container {
  font-family: PingFangSC;

  .search_container {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    .search {
      display: flex;
      align-items: center;
      padding: 16px 0;

      background-size: 100% auto;
      -moz-background-size: 100% auto;
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

        display: flex;
        align-items: center;
        flex: 1;
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

  .img_container {
    position: relative;
    .count-down {
      position: absolute;
      top: 68.5%;
      width: 100%;

      font-size: 24px;
      color: #ffedcb;
      letter-spacing: 0;
      line-height: 24px;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      .down-time {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;

        color: #ffedcb;
        line-height: 24px;

        letter-spacing: 2px;
        display: flex;
        align-items: center;

        .time {
          font-weight: bold;
          // min-width: 36px;
          padding: 0 5px;
          height: 36px;
          line-height: 36px;
          background-image: linear-gradient(139deg, #7e9fff 0%, #4974f5 100%);
          border-radius: 4px;

          font-family: Bebas;
          font-size: 24px;
          color: #fff;
          text-align: center;
          margin: 0 8px;
        }
      }
    }
  }

  .content_container {
    position: relative;
    margin-top: -24px;
    background: #f8f8f8;
    border-radius: 24px;
    overflow: hidden;

    .container-body {
      background: #f8f8f8;
      z-index: 1;
      padding: 0 20px;
      &::after {
        display: block;
        clear: both;
      }
      .body-content {
        min-height: 80vh;
      }
    }
  }
}
</style>
