<template>
  <div class="seal">
    <!--  头部  -->
    <Header :title="headTitle"></Header>
    <!--  头部  -->
    <!--  轮播/表单  -->
    <banner></banner>
    <!--  轮播/表单  -->
    <!--  刻章服务  -->
    <seal-serve></seal-serve>
    <!--  刻章服务  -->
    <!--  立即咨询  -->
    <consult-tel :tel="consultTel" title=""></consult-tel>
    <!--  立即咨询  -->
    <!--  服务介绍  -->
    <ServiceIntroduced></ServiceIntroduced>
    <!--  服务介绍  -->
    <!--  规划师  -->
    <gui-hua-shi-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    ></gui-hua-shi-swipe>
    <!--  规划师  -->
    <!--  服务流程  -->
    <process></process>
    <!--  服务流程  -->
  </div>
</template>

<script>
import Header from '~/components/common/head/header'
import Banner from '~/components/spread/seal/Banner'
import sealServe from '~/components/spread/seal/SealServe'
import consultTel from '@/components/spread/common/ConsultTel'
import guiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import process from '~/components/spread/seal/Process'
import ServiceIntroduced from '@/components/spread/common/ServiceIntroduced'
export default {
  name: 'Idnex',
  components: {
    Header,
    Banner,
    sealServe,
    consultTel,
    guiHuaShiSwipe,
    process,
    ServiceIntroduced,
  },
  data() {
    return {
      headTitle: '印章刻制',
      consultTel: '4000 - 962540',
      plannersData: [
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
      plannersCommon: {
        title: '咨询规划师',
        imName: '税务筹划_咨询规划师_在线咨询',
        telName: '税务筹划_咨询规划师_拨打电话',
      },
    }
  },
  head() {
    return {
      title: '印章刻制',
      meta: [
        {
          name: 'keywords',
          content: '专利转让网,专利转让平台,优质专利,专利交易,顶呱呱交易平台',
        },
        {
          name: 'description',
          content:
            '顶呱呱交易平台，提供特价专利转让、精品专利交易、专利买卖出售服务。百万海量专利资源在线选购，即买即用，专业的专利买卖平台就上顶呱呱，安全放心！',
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.seal {
  width: 750px;
  margin: 0 auto;
  /deep/ .my-head {
    width: 750px !important;
    left: auto !important;
  }
}
</style>
