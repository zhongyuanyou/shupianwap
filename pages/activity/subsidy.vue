<template>
  <!-- 官方补贴全网低价 -->
  <div class="container">
    <HeadWrapper
      :fill="false"
      :line="false"
      :background-color="`rgba(19,29,61,${headBkOpacity})`"
      @onHeightChange="onHeightChange"
    >
      <Head
        :class-state="ClassState"
        code="protocol100034"
        title="官方补贴"
        :back="uPGoBack"
        :search="clickInputHandle"
        :click-input-handle="clickInputHandle"
        :has-city="hasCity && isService"
        :activity-type-options="activityTypeOptions"
        :city-name="cityName"
      ></Head>
    </HeadWrapper>

    <div ref="fill_container" class="img_container">
      <img width="100%" :src="imageHead" alt="" />
      <!--
        本页面未使用推荐商品，从分类的列表取前三个商品展示
        :list="recommendProductList" -->
      <Recommend
        class="recommend"
        :parse-price="parsePrice"
        :list="RecommendList"
        @jump="
          (item) => {
            jumpProductDetail(item)
          }
        "
      ></Recommend>
    </div>

    <div class="content_container">
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
              :finished-text="
                activityProductList.length > 0 ? '没有更多了' : '暂无数据'
              "
              @load="onLoad"
            >
              <div v-if="activityProductList && activityProductList.length > 0">
                <Card
                  v-for="(item, index) in activityProductList"
                  :key="index"
                  :first="index == 0"
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
import Recommend from '~/components/activity/subsidy/Recommend.vue'
import Card from '~/components/activity/subsidy/Card.vue'
import Head from '~/components/activity/subsidy/Head.vue'
import NoData from '@/components/activity/NoData.vue'
import Classification from '@/components/activity/subsidy/Classification.vue'
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
      imageHead: this.$ossImgSetV2('coxz4e42e0w0000.png'),
      imageHeadDefault: this.$ossImgSetV2('coxz4e42e0w0000.png'), // 'https://cdn.shupian.cn/sp-pt/wap/images/c0mhpvuyb2o0000.jpg',
      headerHeight: 0,
      ClassState: 1,
      advertCode: 'ad100075',
      ruleCode: 'protocol100034',

      headBkOpacity: 0,
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
    RecommendList() {
      if (this.activityProductList.length >= 3) {
        return this.activityProductList.slice(0, 3)
      }
      return []
    },
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Subsidy' })
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

      // if (scrollHeight > boxHeight - this.headerHeight) {
      //   this.ClassState = 0
      // } else {
      //   this.headBkOpacity = 0 // 透明度
      //   this.ClassState = 1
      // }
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
    width: 100%;
    overflow: hidden;
    .recommend {
      position: absolute;
      bottom: 21%;
      //bottom: 242px;
      // width: 100%;
      left: -40px;
      right: -40px;
    }
  }

  .content_container {
    position: relative;
    margin-top: -96px;
    // background: #f8f8f8;
    border-radius: 24px;
    overflow: hidden;

    .container-body {
      background: #fff;
      z-index: 1;
      // padding: 0 20px;
      &::after {
        display: block;
        clear: both;
      }
      .body-content {
        min-height: 80vh;
        padding: 0 20px;
      }
    }
  }
}
</style>
