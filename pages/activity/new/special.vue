<template>
  <div class="container">
    <HeadWrapper :fill="false">
      <div class="search_container">
        <div class="search">
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
      <img
        width="100%"
        src="https://cdn.shupian.cn/sp-pt/wap/images/6kfpkqxmcv00000.png"
        alt=""
      />

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
      <Box title="爆款单品" :list="recommendProductList"></Box>

      <sp-sticky class="tabs-box" :offset-top="44">
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
        <!-- <div>
        </div> -->
      </sp-sticky>
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
                    :end-time="endTime"
                    :item="item"
                    :overflow-dot="overflowDot"
                    :parse-price="parsePrice"
                  ></Card>
                  <div class="line"></div>
                </div>
              </div>
              <div v-if="isNoData" class="no-data">
                <img
                  src="https://cdn.shupian.cn/sp-pt/wap/images/bzre7lw14o00000.png"
                  alt=""
                  srcset=""
                />
              </div>
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
import Box from '@/components/activity/special/Box.vue'
import Card from '@/components/activity/special/Card.vue'

export default {
  name: 'Subsidy',
  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,

    Box,
    Card,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_TM',
      // specType: 'HDZT_ZTTYPE_QWBT',
      nowIndex: 0,
      list: [],
      style: {
        iconStyle: '',
        searchStyle: '',
      },
      tabs: ['全部', '99元封顶', '899元封顶', '1999元封顶'],
      hasCity: true,

      imageHead: 'https://cdn.shupian.cn/sp-pt/wap/images/6kfpkqxmcv00000.png',
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
  head() {
    return { title: '官方补贴全网低价' }
  },
}
</script>


<style lang="less" scoped>
::v-deep .head-wrapper-warpper {
  border-bottom: 0;
}
.container {
  font-family: PingFangSC;

  .search_container {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    .search {
      display: flex;
      align-items: center;
      padding: 16px 0;

      background: url('https://cdn.shupian.cn/sp-pt/wap/images/6kfpkqxmcv00000.png');
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
    background: #f8f8f8;
    border-radius: 24px;
    overflow: hidden;

    .tabs-box {
      width: 100vw;
      border-radius: 24px 24px 0 0;
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

        &::-webkit-scrollbar {
          width: 0 !important;
        }
        .li-tab {
          white-space: nowrap;

          margin-right: 40px;

          font-size: 32px;
          color: #999999;
          letter-spacing: 0;
          cursor: pointer;
        }
        .active {
          font-weight: bold;
          color: #222222;
        }
      }
    }
    .container-body {
      background: #ffffff;
      z-index: 1;
      padding: 0 20px;
      &::after {
        display: block;
        clear: both;
      }
      .body-content {
        background-color: #fff;
        min-height: 80vh;
        .line {
          height: 1px;
          background: #f4f4f4;
        }
      }
    }
  }
}
</style>
