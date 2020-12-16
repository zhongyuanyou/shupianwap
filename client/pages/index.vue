<template>
  <div class="page-content">
    <!-- S 搜索 + 大banner -->
    <SearchBanner
      ref="searchBannerRef"
      :fiexd-banner-data="initData.fiexdBannerData"
      :city-data="asyncData.cityData"
    />
    <!-- E 搜索 + 大banner -->
    <!-- S 金刚区nav -->
    <HomeNav
      :fiexd-nav="initData.fiexdNavData"
      :roll-nav="initData.rollNavData"
    />
    <!-- E 金刚区nav -->
    <!-- S 轮播banner -->
    <SwiperBanner :swiper-data="initData.rollBannerData" />
    <!-- E 轮播banner -->
    <!-- S 帮我找服务 -->
    <Help :help-banner-data="initData.helpBannerData" />
    <!-- E 帮我找服务 -->
    <!-- S 限时特惠 -->
    <Preferential :init-data="asyncData.preferential" />
    <!-- E 限时特惠 -->
    <!-- S 资讯精选 -->
    <Information :info-data="asyncData.information" />
    <!-- E 资讯精选 -->
    <!-- S 热门服务 -->
    <HotServe :hot-data="asyncData.rotationAd" />
    <!-- E 热门服务 -->
    <!-- S 推荐服务 -->
    <Recommend ref="recommendRef" />
    <!-- E 推荐服务 -->
    <!-- S 悬浮按钮 -->
    <FiexdBtn />
    <!-- E 悬浮按钮 -->
  </div>
</template>

<script>
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
import { homeApi } from '@/api'
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
import SwiperBanner from '@/components/home/SwiperBanner'
import Help from '@/components/home/Help'
import Preferential from '@/components/home/Preferential'
import Information from '@/components/home/Information'
import HotServe from '@/components/home/HotServe'
import Recommend from '@/components/home/Recommend'
import FiexdBtn from '@/components/home/FiexdBtn'
export default {
  layout: 'nav',
  name: 'Home',
  components: {
    SearchBanner,
    HomeNav,
    SwiperBanner,
    Help,
    Preferential,
    Information,
    HotServe,
    Recommend,
    FiexdBtn,
  },
  async asyncData({ $axios }) {
    const fiexdAdCode = 'ad100130' // 顶部固定banner的code
    const rollAdCode = 'ad100130' // 导航下方轮播banner code
    const helpAdCode = 'ad100130' // 帮我找下方banner code
    // 首屏请求导航和广告的参数
    const initReqParams = {
      locationCodeList: [fiexdAdCode, rollAdCode, helpAdCode], // 广告位code列表
      rollPage: 1, // 滚动导航当前页
      rollLimit: 1000, // 滚动导航每页条数
      fixedPage: 1, // 固定导航当前页
      fixedLimit: 5, // 固定导航每页条数
      fixedNavCategoryCode: 'nav100001', // 固定导航分类code
      fixedNavPlatformCode: 'COMDIC_PLATFORM_CRISPS', // 固定导航平台code
      rollNavCategoryCode: 'nav100001', // 滚动导航分类code
      rollNavPlatformCode: 'COMDIC_PLATFORM_CRISPS', // 滚动导航平台code
    }
    const initData = {
      fiexdBannerData: [], // 固定广告
      rollBannerData: [], // 轮播广告
      helpBannerData: [], // 帮我找广告
      fiexdNavData: [], // 固定导航
      rollNavData: [], // 滚动导航
    }
    try {
      const res = await $axios.post(homeApi.initRequest, initReqParams)
      console.log('服务端', res)
      if (res.code === 200) {
        initData.fiexdBannerData = res.data.advertising[fiexdAdCode] || []
        initData.rollBannerData = res.data.advertising[rollAdCode] || []
        initData.helpBannerData = res.data.advertising[helpAdCode] || []
        initData.fiexdNavData = res.data.fixedNavList || []
        initData.rollNavData = res.data.rollNavList || []
      }
    } catch (error) {}
    return {
      initData,
    }
  },
  data() {
    return {
      adModuleOne: ['ad100002', 'ad100002'], // 限时特惠板块
      adModuleTwo: ['ad100002', 'ad100002', 'ad100002', 'ad100002'], // 热门服务板块
      asyncReqParams: {
        infoLimit: 3, // 资讯每页数量
        infoPage: 1, // 资讯当前页
        categoryCode: '', // 查询资讯的分类code
        platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
        terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
        locationCodeList: [], // 广告编码
      },
      asyncData: {
        cityData: [], // 站点列表
        preferential: [], // 限时特惠
        information: [], // 资讯精选
        rotationAd: [], // 热门服务
      },
    }
  },
  created() {
    if (process.client) {
      this.asyncReqParams.locationCodeList = this.adModuleOne.concat(
        this.adModuleTwo
      )
      // 获取非首屏数据（广告 + 资讯）
      this.$axios
        .post(homeApi.asyncRequest, this.asyncReqParams)
        .then((res) => {
          console.log('客户端：', res.data)
          this.asyncData.cityData = res.data.cityList
          this.adModuleOne.forEach((item) => {
            if (res.data.advertising[item]) {
              this.asyncData.preferential.push(res.data.advertising[item])
            }
          })
          this.asyncData.information = res.data.information
          this.adModuleTwo.forEach((item) => {
            if (res.data.advertising[item]) {
              this.asyncData.rotationAd.push(res.data.advertising[item])
            }
          })
        })
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.page-content {
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
  /deep/ .sp-sticky--fixed {
    max-width: 1000px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
