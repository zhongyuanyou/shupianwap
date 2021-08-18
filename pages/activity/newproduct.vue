<template>
  <div class="container">
    <div
      v-if="isInApp"
      class="app_header_fill"
      style="height: 0.6rem; background-color: #2b292a"
    ></div>

    <HeadWrapper
      :fill="false"
      :line="ClassState == 0 ? true : false"
      :background-color="ClassState == 0 ? '#fff' : ''"
      @onHeightChange="onHeightChange"
    >
      <Head
        :class-state="ClassState"
        code="protocol100035"
        title="新品首发"
        :back="uPGoBack"
        :search="clickInputHandle"
      ></Head>
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
  name: 'Newproduct',
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
      specType: 'HDZT_ZTTYPE_XTSF',

      hasCity: true,
      imageHead: this.$ossImgSetV2('c3uw9dpx8vk0000.jpg'), // 'https://cdn.shupian.cn/sp-pt/wap/images/c3uw9dpx8vk0000.jpg'
      headerHeight: 0,
      ClassState: 1,
      advertCode: 'ad100033', // 广告code
      ruleCode: 'protocol100035',
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
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Newproduct' })
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  // beforeDestroy() {
  //   console.log('beforeDestroy')
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

      if (scrollHeight > boxHeight - this.headerHeight) {
        this.ClassState = 0
      } else {
        this.ClassState = 1
      }
    },
  },
  head() {
    return { title: '新品首发' }
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
