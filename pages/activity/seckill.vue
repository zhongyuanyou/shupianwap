<template>
  <!-- 限时直降 -->
  <div class="container">
    <div
      v-if="isInApp"
      class="app_header_fill"
      style="height: 0.6rem; background-color: #1c1a1b"
    ></div>
    <HeadWrapper
      :fill="false"
      :line="ClassState == 0 ? true : false"
      :background-color="ClassState == 0 ? '#fff' : ''"
      @onHeightChange="onHeightChange"
    >
      <Head
        :class-state="ClassState"
        code="protocol100047"
        title="限时直降"
        :back="uPGoBack"
        :search="clickInputHandle"
      ></Head>

      <!-- <div class="search_container">
        <div class="search">
          <div class="left-back" @click="uPGoBack">
            <my-icon
              name="nav_ic_back"
              class="back_icon"
              size="0.4rem"
              :color="ClassState == 0 ? '#1A1A1A' : '#fff'"
            ></my-icon>
          </div>
          <div class="search-box"></div>
          <div class="right">
            <my-icon
              class="search-icon"
              name="sear_ic_sear"
              size="0.4rem"
              :color="ClassState == 0 ? '#1A1A1A' : '#fff'"
              @click.native="clickInputHandle"
            ></my-icon>
            <span
              class="rule"
              :style="{ color: ClassState == 0 ? '#1A1A1A' : '#fff' }"
              @click="
                $router.push('/login/protocol?categoryCode=protocol100047')
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
    </div>

    <div class="content_container">
      <Time :time="time"></Time>

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
import Time from '@/components/activity/seckill/Time.vue'
import Card from '~/components/activity/Card.vue'
import Head from '~/components/activity/Head.vue'
import NoData from '@/components/activity/NoData.vue'

export default {
  name: 'Seckill',
  layout: 'keepAlive',
  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    Head,
    Card,
    NoData,
    Time,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_XSQG',

      hasCity: true,

      imageHead: this.$ossImgSetV2('57zm6tubgjo0000.jpg'), // 'https://cdn.shupian.cn/sp-pt/wap/images/57zm6tubgjo0000.jpg'

      headerHeight: 0,
      ClassState: 1,

      ruleCode: 'protocol100047',
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
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Seckill' })
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
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
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .img_container {
    position: relative;
    min-height: 300px;
    background: #f8f8f8;

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
