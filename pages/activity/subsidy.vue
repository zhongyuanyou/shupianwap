<template>
  <div class="container">
    <div
      v-if="isInApp"
      class="app_header_fill"
      style="height: 0.6rem; background-color: #1e1e1e"
    ></div>
    <HeadWrapper
      :fill="false"
      :line="ClassState == 0 ? true : false"
      :background-color="ClassState == 0 ? '#fff' : ''"
      @onHeightChange="onHeightChange"
    >
      <Head
        :class-state="ClassState"
        code="protocol100034"
        title="官方补贴"
        :back="uPGoBack"
        :search="clickInputHandle"
      ></Head>

      <!-- <div class="search_container">
        <div class="search" :style="{ backgroundImage: `url(${imageHead})` }">
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
      </div> -->
    </HeadWrapper>

    <div ref="fill_container" class="img_container">
      <img width="100%" :src="imageHead" alt="" />
      <div
        class="rule"
        @click="$router.push('/login/protocol?categoryCode=' + ruleCode)"
      >
        规则
      </div>
      <div class="count-down">
        <div class="down-time">
          <span>已累计补贴</span>
          <span class="time">3</span>
          <span class="time">2</span>
          <span class="time">4</span>
          <span class="time">5</span>
          <span class="time">8</span>
          <span class="time">9</span>
          <!-- <span>.</span>
          <span class="time">0</span> -->
          <span>万</span>
        </div>
        <div class="des">- 按照商品销量 · 好评率 · 服务等综合设计 -</div>
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
  name: 'Subsidy',
  layout: 'default',

  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,

    Recommend,
    Card,
    Head,
    NoData,
    Classification,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_QWBT',

      hasCity: true,
      imageHead: this.$ossImgSetV2('c0mhpvuyb2o0000.jpg'), // 'https://cdn.shupian.cn/sp-pt/wap/images/c0mhpvuyb2o0000.jpg',
      headerHeight: 0,
      ClassState: 1,

      ruleCode: 'protocol100034',
    }
  },
  //
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
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Subsidy' })
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    onHeightChange(height) {
      this.headerHeight = height
    },
    handleScroll() {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop // 滚动高度
      const boxHeight = this.$refs.fill_container.clientHeight // 盒子高度

      if (scrollHeight > boxHeight - this.headerHeight) {
        this.ClassState = 0
      } else {
        this.ClassState = 1
      }
    },
  },
  head() {
    return { title: '官方补贴全网低价' }
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

      width: 100%;
      top: 64.2%;

      // margin-top: 53%;

      font-size: 24px;
      color: #ffedcb;
      letter-spacing: 0;
      line-height: 24px;
      text-align: center;
      // display: flex;
      // flex-direction: row;
      // justify-content: center;
      // align-items: center;

      .down-time {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;

        color: #ffedcb;
        line-height: 24px;

        letter-spacing: 2px;
        display: flex;
        align-items: center;
        justify-content: center;

        .time {
          // min-width: 36px;

          padding: 0 5px;
          min-width: 36px;
          height: 36px;
          line-height: 36px;
          background-image: linear-gradient(139deg, #7e9fff 0%, #4974f5 100%);
          border-radius: 4px;

          font-family: Bebas;
          font-size: 24px;
          color: #fff;
          text-align: center;
          margin: 0 4px;
        }
      }
      .des {
        opacity: 0.3;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;
        margin-top: 47px;
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
