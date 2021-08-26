<template>
  <div class="container">
    <!-- <div
      v-if="isInApp"
      class="app_header_fill"
      style="height: 0.6rem; background-color: #2b292a"
    ></div> -->

    <HeadWrapper
      :fill="false"
      :line="ClassState == 0 ? true : false"
      :background-color="`rgba(255,255,255,${headBkOpacity})`"
      @onHeightChange="onHeightChange"
    >
      <Head
        :class-state="ClassState"
        code="protocol100052"
        title="先服务后收费"
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
                $router.push('/login/protocol?categoryCode=protocol100052')
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
        :class="{ rule_in_app: isInApp }"
        @click="$router.push('/login/protocol?categoryCode=' + ruleCode)"
      >
        规则
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
              :finished-text="
                activityProductList.length > 0 ? '没有更多了' : '暂无数据'
              "
              @load="onLoad"
            >
              <div v-if="activityProductList && activityProductList.length > 0">
                <div
                  v-for="(item, index) in activityProductList"
                  :key="index"
                  @click="jumpProductDetail(item)"
                >
                  <Card :item="item" :parse-price="parsePrice"></Card>
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
  name: 'Server',
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
      specType: 'HDZT_ZTTYPE_XFWHSF',

      hasCity: true,
      imageHead: '',
      imageHeadDefault: this.$ossImgSetV2('eyufuwzo88o0000.png'), // 'https://cdn.shupian.cn/sp-pt/wap/images/eik2dfytts00000.png'
      headerHeight: 0,
      ClassState: 1,
      headBkOpacity: 0,

      advertCode: 'ad100072',
      ruleCode: 'protocol100052',
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
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Server' })
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },
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
  },
  head() {
    return { title: '先服务后收费' }
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
          // min-width: 36px;
          font-weight: bold;
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
