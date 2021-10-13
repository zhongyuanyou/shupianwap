
<template>
  <!-- 99特卖 -->
  <div class="container">
    <HeadWrapper
      :fill="false"
      :line="false"
      :background-color="`rgba(19,29,61,${headBkOpacity})`"
      @onHeightChange="onHeightChange"
    >
      <Head2
        :class-state="ClassState"
        code="protocol100046"
        title="99特卖"
        :back="uPGoBack"
        :search="clickInputHandle"
        :click-input-handle="clickInputHandle"
        :has-city="hasCity && isService"
        :activity-type-options="activityTypeOptions"
        :city-name="cityName"
      ></Head2>
    </HeadWrapper>

    <div ref="fill_container" class="img_container">
      <img width="100%" :src="imageHead" alt="" />
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
              <div
                v-if="activityProductList && activityProductList.length > 0"
                class="card-container"
              >
                <div class="card-colunm-1">
                  <Card
                    v-for="(item, index) in activityProductList_1"
                    :key="index"
                    class="card"
                    :item="item"
                    :parse-price="parsePrice"
                    :first="index == 0"
                    :last="activityProductList_1.length - 1 == index"
                    @click.native="jumpProductDetail(item)"
                  ></Card>
                </div>
                <div class="card-colunm-2">
                  <Card
                    v-for="(item, index) in activityProductList_2"
                    :key="index"
                    class="card"
                    :item="item"
                    :parse-price="parsePrice"
                    :first="index == 0"
                    :last="activityProductList_2.length - 1 == index"
                    @click.native="jumpProductDetail(item)"
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
import { mapState, mapMutations } from 'vuex'
import { CountDown, Sticky, List, PullRefresh } from '@chipspc/vant-dgg'

import activityMixin from '@/mixins/activityMixin.js'
import HeadWrapper from '@/components/common/head/HeadWrapper.vue'
import Recommend from '~/components/activity/special/Recommend.vue'
import Card from '~/components/activity/special/Card.vue'
import Head2 from '~/components/activity/special/Head2.vue'
import Classification from '@/components/activity/special/Classification.vue'

import NoData from '@/components/activity/NoData.vue'

export default {
  name: 'Special',
  layout: 'default',
  components: {
    // Header,
    HeadWrapper,

    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,

    Recommend,
    Head2,
    Card,
    NoData,
    Classification,
  },
  mixins: [activityMixin],
  data() {
    return {
      specType: 'HDZT_ZTTYPE_TM',

      hasCity: true,
      imageHead: '', // this.$ossImgSetV2('720ewx0kml00000.png'),

      imageHeadDefault: this.$ossImgSetV2('720ewx0kml00000.png'),
      headerHeight: 0,

      headBkOpacity: 0,
      ClassState: 1,
      advertCode: 'ad100115',
      ruleCode: 'protocol100046',
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
    RecommendList() {
      // if (this.activityProductList.length >= 3) {
      return this.activityProductList.slice(0, 3)
      // }
      // return []
    },
    activityProductList_1() {
      return this.activityProductList.filter((item, index) => {
        return index % 2 === 0
      })
    },
    activityProductList_2() {
      return this.activityProductList.filter((item, index) => {
        return index % 2 === 1
      })
    },
  },

  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Special' })
    window.addEventListener('scroll', this.handleScroll) // 监听（绑定）滚轮滚动事件
  },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll)
  // },

  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    setTopColor() {
      if (this.isInApp) {
        this.$appFn.dggChangeTopColor(
          {
            flags: 'light',
          },
          (res) => {
            console.log('DGGSetColorRes', res)
          }
        )
      }
    },
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
    return { title: '99特卖' }
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
    .recommend {
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      // margin: 2.6% 2.6% 0;
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
    // margin-top: -24px;
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

      .card-container {
        overflow: hidden;
        display: flex;
        .card-colunm-1 {
          flex: 1;
          padding-right: 10px;
        }
        .card-colunm-2 {
          flex: 1;
          padding-left: 10px;
        }
      }
    }
  }
  ::v-deep .sp-list__finished-text {
    padding: 24px 0px;
    line-height: 0.25rem;
    text-align: center;
  }
}
</style>
