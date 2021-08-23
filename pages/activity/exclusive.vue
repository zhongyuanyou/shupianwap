<template>
  <div class="container">
    <!-- <div
      v-if="isInApp"
      class="app_header_fill"
      style="height: 0.6rem; background-color: #1e1e1e"
    ></div> -->

    <HeadWrapper
      :fill="false"
      :line="ClassState == 0 ? true : false"
      :background-color="`rgba(255,255,255,${headBkOpacity})`"
      @onHeightChange="onHeightChange"
    >
      <Head
        :class-state="ClassState"
        code="protocol100048"
        title="独家专售"
        :back="uPGoBack"
        :search="clickInputHandle"
      ></Head>
    </HeadWrapper>

    <div ref="fill_container" class="img_container">
      <img width="100%" :src="imageHead" alt="" />
      <div
        class="rule"
        :class="{ rule_in_app: isInApp }"
        @click="$router.push('/login/protocol?categoryCode=' + ruleCode)"
      >
        规则
      </div>
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
          :has-city="hasCity && isService"
          :city-name="cityName"
          :header-height="headerHeight - 1"
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
              :finished-text="
                activityProductList.length > 0 ? '没有更多了' : '暂无数据'
              "
              @load="onLoad"
            >
              <div v-if="activityProductList && activityProductList.length > 0">
                <Card
                  v-for="(item, index) in activityProductList"
                  :key="index"
                  :last="activityProductList.length - 1 == index"
                  :item="item"
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
import { mapState, mapMutations } from 'vuex'
import { CountDown, Sticky, List, PullRefresh } from '@chipspc/vant-dgg'

import activityMixin from '@/mixins/activityMixin.js'
import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import Recommend from '~/components/activity/Recommend.vue'
import Card from '~/components/activity/Card.vue'
import Head from '~/components/activity/Head.vue'
import NoData from '@/components/activity/NoData.vue'
import Classification from '@/components/activity/Classification.vue'
export default {
  name: 'Exclusive',
  layout: 'default',
  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,

    Head,
    Recommend,
    Card,
    NoData,
    Classification,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_DJZS',

      hasCity: true,
      imageHead: this.$ossImgSetV2('6kicshv3vcw0000.jpg'), // 'https://cdn.shupian.cn/sp-pt/wap/images/dfnawx8oxnc0000.jpg',

      headerHeight: 0,
      headBkOpacity: 0,
      ClassState: 1,
      advertCode: 'ad100076',
      ruleCode: 'protocol100048',
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
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Exclusive' })
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },

  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    handleScroll() {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      const boxHeight = this.$refs.fill_container.clientHeight // 盒子高度
      let opacity = 0
      if (scrollHeight < boxHeight / 2) {
        opacity = scrollHeight / (boxHeight / 2)
      } else {
        opacity = 1
      }
      if (opacity > 0.8) {
        this.ClassState = 0
      } else {
        this.ClassState = 1
      }

      this.headBkOpacity = opacity
    },
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
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .img_container {
    position: relative;
    min-height: 300px;
    background: #f8f8f8;

    .count-down {
      position: absolute;
      top: 74.8%;

      transform: translate(0, -50%);

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
          // min-width: 36px;
          padding: 0 5px;
          min-width: 36px;
          height: 36px;
          line-height: 36px;
          background-image: linear-gradient(139deg, #7e9fff 0%, #4974f5 100%);
          border-radius: 4px;

          font-family: Bebas;
          //        font-weight: bold;
          font-size: 24px;
          color: #fff;
          text-align: center;
          margin: 0 8px;
          letter-spacing: 0;
        }
      }
    }

    .rule {
      // header的z-index是999
      z-index: 1000;
      background: rgba(255, 255, 255, 0.2);

      border-radius: 100px 0 0 100px;

      opacity: 0.9;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 40px;

      position: absolute;
      right: 0;
      top: 40px;
      height: 40px;
      width: 96px;
      text-align: center;
    }
    .rule_in_app {
      top: 100px;
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
