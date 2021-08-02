<template>
  <div class="container">
    <HeadWrapper :fill="false" @onHeightChange="onHeightChange">
      <div class="search_container">
        <div class="search" :style="{ backgroundImage: `url(${imageHead})` }">
          <!-- @click="uPGoBack" -->
          <div class="left-back">
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
    </div>

    <div class="content_container">
      <Time :time="time"></Time>
      <!-- <sp-sticky class="tabs-box" :offset-top="headerHeight">
        <ul class="tabs-box-items">
          <li
            v-for="(item, index) in activityTypeOptions"
            :key="index"
            class="li-tab"
            :class="{ active: index == currentIndex }"
            @click="menuTab(item, index)"
          >
            {{ item.labelName }}
          </li>
        </ul>

      </sp-sticky> -->
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
import Time from '@/components/activity/seckill/Time.vue'
import Card from '@/components/activity/special/Card.vue'
import NoData from '@/components/activity/NoData.vue'

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
    Time,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_DJZS',

      hasCity: false,

      imageHead: 'https://cdn.shupian.cn/sp-pt/wap/images/57zm6tubgjo0000.jpg',

      headerHeight: '',
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
    return { title: '限时直降' }
  },
}
</script>


<style lang="less" scoped>
::v-deep .head-wrapper-warpper {
  border-bottom: 0;
}
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
      top: 0;
      width: 100%;
      margin-top: 43%;
      // margin-top: 53%;

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
        font-weight: bold;
        color: #ffedcb;
        line-height: 24px;

        letter-spacing: 2px;
        display: flex;
        align-items: center;

        .time {
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

    .tabs-box {
      height: 96px;
      line-height: 96px;
      font-size: 0;

      ::v-deep .sp-sticky {
        background-color: #fff;
        overflow: hidden;

        &.sp-sticky--fixed {
          border-radius: 0 0 0 0;
        }
      }

      .tabs-box-items {
        display: flex;
        background: #f8f8f8;
        overflow-x: scroll;

        // height: 96px;
        // line-height: 96px;
        padding: 0px 40px;

        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .li-tab {
          // display: inline-block;
          white-space: nowrap;

          margin-right: 40px;

          font-size: 32px;
          color: #999999;
          letter-spacing: 0;
          cursor: pointer;

          height: 96px;
          line-height: 96px;
        }
        .active {
          position: relative;
          font-weight: bold;
          color: #222222;
        }
        .active::after {
          content: '';
          position: absolute;
          top: 58px;
          right: 0;

          width: 60px;
          height: 12px;
          background-image: linear-gradient(
            270deg,
            rgba(73, 116, 245, 0) 0%,
            #4974f5 100%
          );
          border-radius: 6px;
        }
      }
    }
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
