<template>
  <div ref="homeRef" class="home-page-content">
    <Head
      ref="searchBannerRef"
      :page-scroll-top="pageScrollTop"
      :fiexd-banner-data="initData.fiexdBannerData"
    />
    <!-- S 搜索 + 大banner -->
    <!-- <SearchBanner
      ref="searchBannerRef"
      :fiexd-banner-data="initData.fiexdBannerData"
    /> -->
    <!-- E 搜索 + 大banner -->
    <!-- S 金刚区nav -->
    <HomeNav
      :fiexd-nav="initData.fiexdNavData"
      :roll-nav="initData.rollNavData"
    />
    <!-- E 金刚区nav -->
    <!-- S 轮播banner -->
    <!-- <SwiperBanner :swiper-data="initData.rollBannerData" /> -->
    <!-- S 限时秒杀广告位置 -->
    <SkillGroup :skill-data="initData.skillData" />
    <!-- E 限时秒杀-->
    <!-- E 轮播banner -->
    <!-- S 帮我找服务 -->
    <!-- <Help ref="showScollHeight" :help-banner-data="initData.helpBannerData" /> -->
    <!-- E 帮我找服务 -->
    <client-only>
      <!-- S 限时特惠 -->
      <!-- <Preferential :init-data="asyncData.preferential" /> -->
      <!-- E 限时特惠 -->
      <!-- S 资讯精选 -->
      <!-- <Information
        v-if="asyncData.information.length"
        :info-data="asyncData.information"
      /> -->
      <!-- E 资讯精选 -->
      <!-- S 热门服务 -->
      <!-- <HotServe
        v-if="asyncData.rotationAd.length"
        :hot-data="asyncData.rotationAd"
      /> -->
      <!-- E 热门服务 -->
      <!-- S 营销入口区域 -->
      <Marketing
        ref="showScollHeight"
        :subsidy-data="initData.subsidyData"
        :bd-data="initData.bdData"
        :help-banner-data="initData.helpBannerData"
      />
      <!-- 企服工具 -->
      <FirmServeTool :tool-nav-list="initData.toolNavList" />
      <!-- E 营销入口区域 -->
      <!-- S 推荐服务 -->
      <Recommend ref="recommendRef" />
      <!-- E 推荐服务 -->
      <!-- S 悬浮按钮 -->
      <FiexdBtn :page-scroll-top="pageScrollTop" />
      <!-- E 悬浮按钮 -->
      <!-- S 下载app弹框 -->
      <DownloadApp
        v-if="!closeAppOpen"
        @handleDialogClosed="handleDialogClosed"
      />
      <!-- E 下载app弹框 -->
    </client-only>
  </div>
</template>

<script>
import { PLATFORM_CODE, TERMINAL_CODE } from '@/config/constant'
import { homeApi } from '@/api'
import Head from '@/components/home/Head.vue'
// import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav.vue'
import SkillGroup from '@/components/home/SkillGroup.vue'
import FirmServeTool from '@/components/home/FirmServeTool.vue'
// import SwiperBanner from '@/components/home/SwiperAd'
// import Help from '@/components/home/HelpAd'
// import Preferential from '@/components/home/Preferential'
// import Information from '@/components/home/Information'
// import HotServe from '@/components/home/HotServe'
import Recommend from '@/components/home/RecommendSale.vue'
import FiexdBtn from '@/components/home/FiexdBtn.vue'
import DownloadApp from '@/components/common/app/DownloadApp.vue'
import Marketing from '@/components/home/Marketing'
export default {
  layout: 'newNav',
  name: 'Home',
  components: {
    Head,
    // SearchBanner,
    HomeNav,
    FirmServeTool,
    // SwiperBanner,
    // Help,
    // Preferential,
    // Information,
    // HotServe,
    Recommend,
    FiexdBtn,
    DownloadApp,
    SkillGroup,
    Marketing,
  },
  async asyncData({ $axios, redirect, app }) {
    // 获取用户是否手动关闭过下载app的弹框，手动关闭过不再弹出
    // const closeAppOpen = app.$cookies.get('closeAppOpen', {
    //   path: '/',
    // })
    const fiexdAdCode = 'ad100234' // 顶部固定banner的code
    const rollAdCode = 'ad100237' // 导航下方轮播banner code
    const helpAdCode = 'ad113285' // 帮我找下方banner code(服务榜单)
    const skillCode = 'ad113282' // 秒杀
    const subsidyCode = 'ad113284' // 千万补贴 政策补贴
    const bkCode = 'ad100032' // 必懂 直播 code
    // 首屏请求导航和广告的参数
    const initReqParams = {
      locationCodeList: [
        fiexdAdCode,
        rollAdCode,
        helpAdCode,
        skillCode,
        subsidyCode,
        bkCode,
      ], // 广告位code列表
      rollPage: 1, // 滚动导航当前页
      rollLimit: 1000, // 滚动导航每页条数
      fixedPage: 1, // 固定导航当前页
      fixedLimit: 5, // 固定导航每页条数
      fixedNavCategoryCode: 'nav100007', // 固定导航分类code
      rollNavCategoryCode: 'nav100012', // 滚动导航分类code
      toolNavCategoryCode: 'nav100026', // 企服工具
      platformCode: PLATFORM_CODE.wap, // 平台code
      terminalCode: TERMINAL_CODE.wap, // 终端code
    }
    const initData = {
      fiexdBannerData: [], // 固定广告
      rollBannerData: [], // 轮播广告
      helpBannerData: [], // 帮我找广告
      fiexdNavData: [], // 固定导航
      rollNavData: [], // 滚动导航
      skillData: [], // 限时秒杀广告
      subsidyData: [], // 营销区域千万补贴
      bdData: [], // 营销区域必懂入口，直播入口广告
    }
    try {
      const res = await $axios.post(homeApi.initRequest, initReqParams)
      if (res.code && res.data) {
        if (res.data.advertising) {
          initData.fiexdBannerData =
            res.data.advertising && res.data.advertising[fiexdAdCode]
              ? res.data.advertising[fiexdAdCode]
              : []
          initData.rollBannerData =
            res.data.advertising && res.data.advertising[rollAdCode]
              ? res.data.advertising[rollAdCode]
              : []
          initData.helpBannerData =
            res.data.advertising && res.data.advertising[helpAdCode]
              ? res.data.advertising[helpAdCode]
              : []
          initData.skillData =
            res.data.advertising && res.data.advertising[skillCode]
              ? res.data.advertising[skillCode]
              : []
          initData.subsidyData =
            res.data.advertising && res.data.advertising[subsidyCode]
              ? res.data.advertising[subsidyCode]
              : []
          initData.bdData =
            res.data.advertising && res.data.advertising[bkCode]
              ? res.data.advertising[bkCode]
              : []
        }
        initData.fiexdNavData = res.data.fixedNavList
          ? res.data.fixedNavList
          : []
        initData.rollNavData = res.data.rollNavList ? res.data.rollNavList : []
        initData.toolNavList = res.data.toolNavList ? res.data.toolNavList : []
        initData.ddd = res.ddddd
      }
      return {
        initData,
      }
    } catch (error) {
      console.error(error)
      return {
        initData,
      }
    }
  },
  data() {
    return {
      pageScrollTop: 0,
      adModuleOne: ['ad100235', 'ad100236'], // 限时特惠板块
      adModuleTwo: ['ad100239', 'ad100240', 'ad100241', 'ad100242'], // 热门服务板块
      asyncReqParams: {
        infoLimit: 3, // 资讯每页数量
        infoPage: 1, // 资讯当前页
        categoryCode: 'con100032', // 查询资讯的分类code
        platformCode: PLATFORM_CODE.wap, // 查询资讯的平台code
        terminalCode: TERMINAL_CODE.wap, // 查询资讯的终端code
        locationCodeList: [], // 广告编码
      },
      closeAppOpen: true,
      asyncData: {
        preferential: [], // 限时特惠
        information: [], // 资讯精选
        rotationAd: [], // 热门服务
      },
      initData: {
        fiexdBannerData: [], // 固定广告
        rollBannerData: [], // 轮播广告
        helpBannerData: [], // 帮我找广告
        fiexdNavData: [], // 固定导航
        rollNavData: [], // 滚动导航
        skillData: [],
      },
    }
  },
  created() {
    this.asyncReqParams.locationCodeList = this.adModuleOne.concat(
      this.adModuleTwo
    )
    this.closeAppOpen = this.$cookies.get('closeAppOpen', {
      path: '/',
    })
  },
  mounted() {
    if (!this.initData.fiexdNavData.length) {
      this.getHomeData()
    }
    // 监听页面
    window.addEventListener(
      'pageshow',
      (e) => {
        if (
          e.persisted ||
          (window.performance && window.performance.navigation.type === 2)
        ) {
          if (
            !this.$store.state.user.userInfo.token ||
            !this.$store.state.user.token
          ) {
            const token = this.$cookies.get('token', {
              path: '/',
            })
            const userId = this.$cookies.get('userId', {
              path: '/',
            })
            const userName = this.$cookies.get('userName', {
              path: '/',
            })
            const userType = this.$cookies.get('userType', {
              path: '/',
            })
            const userPhone = this.$cookies.get('userPhone', {
              path: '/',
            })
            const avatar = this.$cookies.get('avatar', {
              path: '/',
            })
            if (token && token !== 'undefined') {
              this.$store.dispatch('user/setUser', {
                token,
                userId,
                userName,
                userType,
                userPhone,
                avatar,
              })
            }
          }
        }
      },
      false
    ) //
    // 方法2:window.history.replaceState(null, '', window.location.href + '?timestamp=' + new Date().getTime());
  },
  methods: {
    // 用户手动关闭下载app提示弹框后，记录状态到cookie，刷新页面不再弹出，使用默认过期时间（关闭浏览器过期，下次再访问，再次弹出）
    handleDialogClosed() {
      this.closeAppOpen = true
      this.$cookies.set('closeAppOpen', true, {
        path: '/',
      })
    },
    async getHomeData() {
      const fiexdAdCode = 'ad100234' // 顶部固定banner的code
      const rollAdCode = 'ad100237' // 导航下方轮播banner code
      const helpAdCode = 'ad113183' // 帮我找下方banner code(服务榜单)
      const skillCode = 'ad113282' // 秒杀
      const subsidyCode = 'ad100018' // 千万补贴
      const bkCode = 'ad100032' // 必懂 直播 code
      // 首屏请求导航和广告的参数
      const initReqParams = {
        locationCodeList: [
          fiexdAdCode,
          rollAdCode,
          helpAdCode,
          skillCode,
          subsidyCode,
          bkCode,
        ], // 广告位code列表
        rollPage: 1, // 滚动导航当前页
        rollLimit: 1000, // 滚动导航每页条数
        fixedPage: 1, // 固定导航当前页
        fixedLimit: 5, // 固定导航每页条数
        fixedNavCategoryCode: 'nav100007', // 固定导航分类code
        rollNavCategoryCode: 'nav100012', // 滚动导航分类code
        toolNavCategoryCode: 'nav100026', // 企服工具
        platformCode: PLATFORM_CODE.wap, // 平台code
        terminalCode: TERMINAL_CODE.wap, // 终端code
      }
      const initData = {
        fiexdBannerData: [], // 固定广告
        rollBannerData: [], // 轮播广告
        helpBannerData: [], // 帮我找广告
        fiexdNavData: [], // 固定导航
        rollNavData: [], // 滚动导航
        skillData: [],
        subsidyData: [], // 营销区域千万补贴
        bdData: [], // 营销区域必懂入口，直播入口广告
        toolNavList: [], // 工具
      }
      try {
        const res = await this.$axios.post(homeApi.initRequest, initReqParams)
        if (res.code && res.data) {
          if (res.data.advertising) {
            initData.fiexdBannerData =
              res.data.advertising && res.data.advertising[fiexdAdCode]
                ? res.data.advertising[fiexdAdCode]
                : []
            initData.rollBannerData =
              res.data.advertising && res.data.advertising[rollAdCode]
                ? res.data.advertising[rollAdCode]
                : []
            initData.helpBannerData =
              res.data.advertising && res.data.advertising[helpAdCode]
                ? res.data.advertising[helpAdCode]
                : []
            initData.skillData =
              res.data.advertising && res.data.advertising[skillCode]
                ? res.data.advertising[skillCode]
                : []
            initData.subsidyData =
              res.data.advertising && res.data.advertising[subsidyCode]
                ? res.data.advertising[subsidyCode]
                : []
            initData.bdData =
              res.data.advertising && res.data.advertising[bkCode]
                ? res.data.advertising[bkCode]
                : []
          }
          initData.fiexdNavData = res.data.fixedNavList
            ? res.data.fixedNavList
            : []
          initData.rollNavData = res.data.rollNavList
            ? res.data.rollNavList
            : []
          initData.toolNavList = res.data.toolNavList
            ? res.data.toolNavList
            : []
          this.initData = initData
        }
      } catch (error) {
        console.error(error)
      }
    },
    getMoreData() {
      // 获取非首屏数据（广告 + 资讯）
      this.$axios
        .post(homeApi.asyncRequest, this.asyncReqParams)
        .then((res) => {
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
    },
  },
  head() {
    return {
      title: '薯片企服-公司注册商标专利交易查询申请法律咨询服务平台',
      meta: [
        {
          name: 'keywords',
          content:
            '企业服务, 商标注册，法律咨询，会计代理，代缴社保，商标查询，企查查，天眼企服',
        },
        {
          name: 'description',
          content:
            '薯片企服是成都薯片科技有限公司旗下自研可信企业服务平台，薯片企服依托智能科技，传递价值生意，致力于为全类型，各阶段的企业及个人提供：工商服务、会计代理、财税咨询、知识产权代理、资质许可证办理咨询、品牌设计、IT/软件、营销推广、人事社保代理等多品类的线上服务。',
        },
        { name: 'spptmd-track_code', content: 'SPW000004' },
      ],
    }
  },
}
</script>
<style lang="less">
.home-page-content + .open-app {
  max-width: 1000px;
  left: 50% !important;
  transform: translateX(-50%) !important;
}
.sp-main-box {
  width: 100%;
  margin: 0 auto 20px auto;
  padding: 0 20px;
  .inner {
    background: white;
    overflow: hidden;
    border-radius: 24px;
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
.sp-home-title {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #222222;
  line-height: 32px;
  padding: 20px;
  .to-more {
    position: relative;
    width: 70px;
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: rgba(73, 116, 245, 1);
    line-height: 34px;
    display: block;
    float: right;
    .sp-icon {
      position: absolute;
      top: 4px;
      right: 0;
    }
  }
}
</style>
<style lang="less" scoped>
.home-page-content {
  max-width: 1000px;
  margin: 0 auto;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #f5f5f5;
  ::v-deep .sp-sticky--fixed {
    max-width: 1000px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
