<template>
  <div ref="homeRef" class="home-page-content">
    <!-- S 搜索 + 大banner -->
    <SearchBanner
      ref="searchBannerRef"
      :fiexd-banner-data="initData.fiexdBannerData"
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
    <Help ref="showScollHeight" :help-banner-data="initData.helpBannerData" />
    <!-- E 帮我找服务 -->
    <client-only>
      <!-- S 限时特惠 -->
      <Preferential :init-data="asyncData.preferential" />
      <!-- E 限时特惠 -->
      <!-- S 资讯精选 -->
      <Information
        v-if="asyncData.information.length"
        :info-data="asyncData.information"
      />
      <!-- E 资讯精选 -->
      <!-- S 热门服务 -->
      <HotServe
        v-if="asyncData.rotationAd.length"
        :hot-data="asyncData.rotationAd"
      />
      <!-- E 热门服务 -->
      <!-- S 推荐服务 -->
      <Recommend ref="recommendRef" />
      <!-- E 推荐服务 -->
      <!-- S 悬浮按钮 -->
      <FiexdBtn />
      <!-- E 悬浮按钮 -->
      <!-- S 下载app弹框 -->
      <InstallAppDialog
        v-if="!closeAppOpen"
        v-model="showInstallAppDialog"
        :close-on-click-overlay="false"
        @closed="handleDialogClosed"
      />
      <!-- E 下载app弹框 -->
    </client-only>
  </div>
</template>

<script>
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
import { homeApi } from '@/api'
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
import SwiperBanner from '@/components/home/SwiperAd'
import Help from '@/components/home/HelpAd'
import Preferential from '@/components/home/Preferential'
import Information from '@/components/home/Information'
import HotServe from '@/components/home/HotServe'
import Recommend from '@/components/home/Recommend'
import FiexdBtn from '@/components/home/FiexdBtn'
import InstallAppDialog from '@/components/common/app/InstallAppDialog'
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
    InstallAppDialog,
  },
  async asyncData({ $axios, redirect, app }) {
    // 获取用户是否手动关闭过下载app的弹框，手动关闭过不再弹出
    const closeAppOpen = app.$cookies.get('closeAppOpen', {
      path: '/',
    })

    const fiexdAdCode = 'ad100234' // 顶部固定banner的code
    const rollAdCode = 'ad100237' // 导航下方轮播banner code
    const helpAdCode = 'ad113183' // 帮我找下方banner code(服务榜单)
    // 首屏请求导航和广告的参数
    const initReqParams = {
      locationCodeList: [fiexdAdCode, rollAdCode, helpAdCode], // 广告位code列表
      rollPage: 1, // 滚动导航当前页
      rollLimit: 1000, // 滚动导航每页条数
      fixedPage: 1, // 固定导航当前页
      fixedLimit: 5, // 固定导航每页条数
      fixedNavCategoryCode: 'nav100007', // 固定导航分类code
      rollNavCategoryCode: 'nav100012', // 滚动导航分类code
      platformCode: CHIPS_PLATFORM_CODE, // 平台code
      terminalCode: WAP_TERMINAL_CODE, // 终端code
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
      //   , {
      //     headers: {
      //       'x-cache-control': 'cache',
      //     },
      //   }
    } catch (error) {
      redirect('/500')
    }
    return {
      initData,
      closeAppOpen,
    }
  },
  data() {
    return {
      showInstallAppDialog: true,
      adModuleOne: ['ad100235', 'ad100236'], // 限时特惠板块
      adModuleTwo: ['ad100239', 'ad100240', 'ad100241', 'ad100242'], // 热门服务板块
      asyncReqParams: {
        infoLimit: 3, // 资讯每页数量
        infoPage: 1, // 资讯当前页
        categoryCode: 'con100032', // 查询资讯的分类code
        platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
        terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
        locationCodeList: [], // 广告编码
      },
      asyncData: {
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
      //   , {
      //       headers: {
      //         'x-cache-control': 'cache',
      //       },
      //     }
      this.$axios
        .post(homeApi.asyncRequest, this.asyncReqParams)
        .then((res) => {
          //   console.log('客户端：', res.data)
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
  mounted() {
    // 埋点-当前页面公共属性注册
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端首页', // 当前页面或服务名称
      current_url: location.href, // 发生地址
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {
    // 用户手动关闭下载app提示弹框后，记录状态到cookie，刷新页面不再弹出，使用默认过期时间（关闭浏览器过期，下次再访问，再次弹出）
    handleDialogClosed() {
      this.$cookies.set('closeAppOpen', true, {
        path: '/',
      })
    },
  },
}
</script>
<style lang="less">
.home-page-content + .open-app {
  max-width: 1000px;
  left: 50% !important;
  transform: translateX(-50%) !important;
}
</style>
<style lang="less" scoped>
.home-page-content {
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
