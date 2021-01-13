<template>
  <div class="page-content">
    <!-- START 头部Header-->
    <MyHeader
      ref="header"
      title="公司交易"
      :fixed="false"
      head-class="head-icon"
    >
      <template v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
        </span>
      </template>
    </MyHeader>
    <!-- END   头部Header-->

    <NavBtns class="nav-btn-margin" />

    <Banner class="banner-margin" />

    <Form />

    <HotIndustry class="banner-margin" />

    <WithAssetsType class="with-assets-type-margin" />

    <RecommendCompany />

    <!-- START 固定底部-->
    <FixedBottom
      v-sensorsTrack:p_plannerBoothClick="{
        name: `推荐规划师点击`,
        track_code: 'SPTG000007',
        recommend_number: '',
        planner_number: pagePlanner.jobNum,
        planner_name: pagePlanner.name,
      }"
      :planner="pagePlanner"
    />
    <!-- END 固定底部-->

    <!-- START IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- END IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from '@/components/common/head/header'
import NavBtns from '@/components/spread/companyTransaction/NavBtns'
import Banner from '@/components/spread/companyTransaction/Banner'
import Form from '@/components/spread/companyTransaction/Form'
import HotIndustry from '@/components/spread/companyTransaction/HotIndustry'
import WithAssetsType from '@/components/spread/companyTransaction/WithAssetsType'
import RecommendCompany from '@/components/spread/companyTransaction/RecommendCompany'
import DggImCompany from '~/components/spread/DggImCompany'
import FixedBottom from '~/components/spread/common/FixedBottom'
export default {
  name: 'Index',
  components: {
    MyHeader,
    NavBtns,
    Banner,
    Form,
    HotIndustry,
    WithAssetsType,
    RecommendCompany,
    FixedBottom,
    DggImCompany,
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name || '成都',
    }),
  },
  data() {
    return {
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
    }
  },
  created() {
    this.getPagePlanner()
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '公司交易聚合页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性

    // 神策埋点-浏览-一次
    window.sensors.track('pageview', {
      name: `推广公司交易聚合页浏览`,
      track_code: 'SPTG000002',
    })
    window.sensors.track('p_plannerBoothVisit', {
      name: `推荐规划师浏览`,
      track_code: 'SPTG000006',
      recommend_number: '',
      planner_number: this.pagePlanner.jobNum,
      planner_name: this.pagePlanner.name,
    })
  },
  methods: {
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        const planner = this.pagePlanner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || '',
          planner.imgSrc || ''
        )
      }
    },
    getPagePlanner() {
      // const url = 'https://tbigdataapiservice.dgg.cn/planner/recommend'
      const url = 'https://tmjy.dgg.cn/bigData'
      this.$axios.get(url).then((res) => {
        console.log(res.data)
      })
      // this.$axios({ url: '/bigData', method: 'get' }).then((res) => {
      //   console.log(res.data)
      //   // this.plannerName = res.data.realName
      //   // this.plannerId = res.data.userCentreId
      // })
    },
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  // 自定义头部组件右侧样式
  .my-customize-header {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .my-customize-header-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }

  .nav-btn-margin {
    margin-top: 24px;
  }

  .banner-margin {
    margin: 64px auto;
  }
  .with-assets-type-margin {
    margin-bottom: 32px;
  }

  /deep/ .my-sp-bottombar {
    z-index: 100;
  }

  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
}
</style>
